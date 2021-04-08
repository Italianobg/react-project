import { useEffect, useRef, useState } from 'react';
import getGasStations from '../../services/googleMapsGasStations.js';
import {
  addFuelUp,
  getCarDetails,
  setCarField,
} from '../../services/Cars/carFirebase';
import './CarFuelUp.css';
import useAPIError from '../../hooks/useAPIError';
import { useHistory, useParams } from 'react-router';

const fuels = [
  { name: 'Petrol', types: ['A95', 'A98', 'A100'] },
  { name: 'Diesel', types: ['Diesel', 'Diesel+', 'Diesel MaxMotion'] },
  { name: 'LPG', types: ['LPG'] },
  { name: 'CNG', types: ['CNG'] },
];

function CarFuelUp(props) {
  let someDate = new Date();
  someDate.setDate(someDate.getDate());
  let date = someDate.toISOString().substr(0, 10);

  const [selectedFuel, setSelectedFuel] = useState({
    name: 'Petrol',
    types: ['A95', 'A98', 'A100'],
  });
  const [types, setTypes] = useState(['A95', 'A98', 'A100']);
  const [liters, setLiters] = useState('');
  const [total, setTotal] = useState('');
  const [pricePerL, setPricePerL] = useState('');
  const [position, setPosition] = useState({});
  const [gasStation, setGasStation] = useState('');
  const [gasStations, setGasStations] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [focus, setFocus] = useState(false);
  const [fullTank, setFullTank] = useState(false);
  const didMount = useRef(false);
  const { addError } = useAPIError();
  const { id } = useParams();
  let errors = [];
  let history = useHistory();

  useEffect(() => {
    if (didMount.current) {
      setTypes(selectedFuel.types);
      if (liters && total) {
        setPricePerL((total / liters).toFixed(2));
      } else {
        setPricePerL('');
      }
      if (!gasStations && position) {
        getGasStations(position.coords.latitude, position.coords.longitude)
          .then((res) => {
            let names = [];
            setGasStations(res.results);
            res.results.map((gasStation) => {
              return names.push(gasStation.name);
            });
            setSuggestions(names);
          })
          .catch((err) => {
            addError(err.message);
          });
      }
    } else {
      didMount.current = true;
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition(position);
      });
    }
  }, [
    types,
    selectedFuel,
    liters,
    total,
    position,
    suggestions,
    gasStations,
    fullTank,
    addError,
  ]);

  function selectFuel(e) {
    setSelectedFuel(fuels.find((fuel) => fuel.name === e.target.value));
  }

  function litersHandler(e) {
    setLiters(e.target.value);
  }

  function totalPriceHandler(e) {
    setTotal(e.target.value);
  }
  function setGasStationOnChange(e) {
    setGasStation(e.target.value);
  }

  function setGasStationHandler(e) {
    setGasStation(e.target.innerHTML);
  }

  function focusHandler(e) {
    setFocus(true);
  }

  function blurHandler(e) {
    setTimeout(function () {
      setFocus(false);
    }, 500);
  }

  function toggleFullTankCheckBox(e) {
    setFullTank((oldState) => !oldState);
  }

  function addFuelUpHandler(e) {
    e.preventDefault();
    getCarDetails(props.id)
      .then((res) => {
        if (e.target.odometer.value === '') {
          errors.push('Please input Odometer');
        }

        if (+e.target.odometer.value < 0) {
          errors.push('Odometer value can not be negative number');
        }
        if (e.target.odometer.value <= res.data()['lastMilage']) {
          errors.push(
            `The odometer value could not be less then previous record - ${
              res.data()['lastMilage']
            }`
          );
        }
        if (
          (res.data().fuel !== undefined &&
            e.target.selectedFuel.value === 'Diesel' &&
            res.data().fuel !== 'Diesel') ||
          (res.data().fuel !== undefined &&
            res.data().fuel === 'Diesel' &&
            e.target.selectedFuel.value !== 'Diesel')
        ) {
          errors.push(
            `Different fuel was used compared with previous fuel ups - ${
              res.data().fuel
            }`
          );
        }

        if (e.target.liters.value === '') {
          errors.push('Please input Liters');
        }
        if (+e.target.liters.value <= 0) {
          errors.push('Liters cannot be negative');
        }
        if (e.target.total.value === '') {
          errors.push('Please input Total Price');
        }

        if (+e.target.total.value <= 0) {
          errors.push('Total price can not be negativa value');
        }
        if (errors.length > 0) {
          addError(errors);
        } else {
          let fuelUpData = {
            date: e.target.date.value,
            odometer: +e.target.odometer.value,
            station: e.target.station.value,
            fuel: e.target.selectedFuel.value,
            type: e.target.type.value,
            liters: +e.target.liters.value,
            total: +e.target.total.value,
            price: +e.target.pricePerL.value,
            full: e.target.fullTank.value === 'true',
          };

          let oldFuelUps = [];
          if (res.data().hasOwnProperty('Fuel Ups')) {
            oldFuelUps = res.data()['Fuel Ups'];
            let fullTankArr = oldFuelUps.map((fuelUp) => fuelUp.full);
            let lastIndex = fullTankArr.lastIndexOf(true);
            let totalsSinceLastFullTank = 0;
            let litersSinceLastFullTank = 0;
            if (lastIndex >= 0) {
              let kmsSinceLastFullTank =
                fuelUpData.odometer - oldFuelUps[lastIndex].odometer;
              for (let i = lastIndex + 1; i < oldFuelUps.length; i++) {
                totalsSinceLastFullTank += oldFuelUps[i].total;
                litersSinceLastFullTank += oldFuelUps[i].liters;
              }
              totalsSinceLastFullTank += fuelUpData.total;
              litersSinceLastFullTank += fuelUpData.liters;

              fuelUpData = {
                ...fuelUpData,
                KMsSinceLast: kmsSinceLastFullTank,
                totalsSinceLast: totalsSinceLastFullTank,
                litersSinceLast: litersSinceLastFullTank,
                lPerKM: (litersSinceLastFullTank / kmsSinceLastFullTank) * 100,
                expnsePerKm: totalsSinceLastFullTank / kmsSinceLastFullTank,
              };
            }
            oldFuelUps.push(fuelUpData);
            if (!res.data().fuel.includes(fuelUpData.fuel)) {
              setCarField(props.id, {
                fuel: [...res.data().fuel, fuelUpData.fuel],
              })
                .then((res) => {})
                .catch((err) => addError(err));
            }
            setCarField(props.id, { lastMilage: +fuelUpData.odometer })
              .then((res) => {})
              .catch((err) => addError(err));
            setCarField(props.id, {
              KMsTracked: +fuelUpData.odometer - +res.data()['firstMilage'],
            })
              .then((res) => {})
              .catch((err) => addError(err));
          } else {
            setCarField(props.id, { fuel: [fuelUpData.fuel] })
              .then((res) => {})
              .catch((err) => addError(err));
            setCarField(props.id, { firstMilage: +fuelUpData.odometer })
              .then((res) => {})
              .catch((err) => addError(err));
            setCarField(props.id, { lastMilage: +fuelUpData.odometer })
              .then((res) => {})
              .catch((err) => addError(err));
            setCarField(props.id, { KMsTracked: +0 })
              .then((res) => {})
              .catch((err) => addError(err));
            oldFuelUps.push(fuelUpData);
          }

          addFuelUp(props.id, oldFuelUps)
            .then((res) => {
              history.push(`/car/${id}`);
            })
            .catch((err) => addError(err));
        }
      })
      .catch((err) => addError(err));
  }

  return (
    <div className="car-data-wrapper fuel-up-wrapper">
      <h2>Fuel Up</h2>
      <div className="line"></div>
      <form onSubmit={addFuelUpHandler} className="fuel-up">
        <div>
          Date: <input name="date" type="date" defaultValue={date} />
        </div>
        <div>
          Odometer:
          <input name="odometer" type="number" />
        </div>
        <div>
          Gas Station:
          <input
            name="station"
            type="text"
            onChange={setGasStationOnChange}
            onFocus={focusHandler}
            onBlur={blurHandler}
            value={gasStation}
          />
        </div>
        {suggestions && focus ? (
          <ul>
            {suggestions.map((name, index) => {
              if (name.toLowerCase().includes(gasStation.toLowerCase())) {
                return (
                  <li
                    name="suggestions"
                    key={index}
                    value={name}
                    onClick={setGasStationHandler}
                  >
                    {name}
                  </li>
                );
              } else {
                return '';
              }
            })}
          </ul>
        ) : (
          ''
        )}
        <div>
          Fuel:
          <select
            name="selectedFuel"
            onChange={selectFuel}
            value={selectedFuel.name}
          >
            {fuels.map((fuel, index) => {
              return (
                <option key={index} value={fuel.name}>
                  {fuel.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          Fuel Type:
          <select name="type">
            {types
              ? types.map((type, index) => {
                  return (
                    <option key={index} defaultValue={type}>
                      {type}
                    </option>
                  );
                })
              : ''}
          </select>
        </div>
        <div>
          Liters:
          <input
            type="number"
            name="liters"
            onChange={litersHandler}
            step="0.01"
          />
        </div>
        <div>
          Total Price:
          <input
            type="number"
            name="total"
            onChange={totalPriceHandler}
            step="0.01"
          />
        </div>
        <div>
          Price/L:
          <input
            type="number"
            name="pricePerL"
            defaultValue={pricePerL}
            disabled
          />
        </div>
        <div>
          <div className="full-tank">
            Full Tank:
            <input
              name="fullTank"
              type="checkbox"
              id="fullTank"
              onClick={toggleFullTankCheckBox}
              value={fullTank}
            />
          </div>
        </div>
        <div className="line"></div>
        <button type="submit">Add Fuel Up</button>
      </form>
    </div>
  );
}

export default CarFuelUp;
