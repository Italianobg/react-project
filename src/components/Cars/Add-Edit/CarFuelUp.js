import { useEffect, useRef, useState } from 'react';
import getGasStations from '../../../services/googleMapsGasStations.js';
import { fuelUp, setCarField } from '../../../services/Cars/carFirebase';
import './CarFuelUp.css';
import useAPIError from '../../../hooks/useAPIError';
import { useHistory, useParams } from 'react-router';
import GasStation from './GasStation.js';
import Fuel from './Fuel.js';
import FuelUpData from './FuelUpData.js';
import { validation } from '../../../utils/validation';

const fuels = [
  { name: 'Select Fuel', types: ['Select Type'] },
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
    name: 'Select Fuel',
    types: ['Select Type'],
  });
  const [types, setTypes] = useState(['Select Type']);
  const [position, setPosition] = useState({});
  const [gasStations, setGasStations] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [editSelected, setEditSelected] = useState();
  const didMount = useRef(false);
  const { addError } = useAPIError();
  const { id } = useParams();
  let history = useHistory();

  const [inputsData, setInputsData] = useState({
    date: '',
    odometer: '',
    station: '',
    fuel: '',
    type: '',
    liters: '',
    total: '',
    price: '',
    full: false,
  });

  useEffect(() => {
    if (!gasStations && position['coords']) {
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
  }, [position, addError, gasStations]);

  useEffect(() => {
    if (didMount.current) {
    } else {
      didMount.current = true;
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition(position);
      });
    }
  }, [types, selectedFuel, suggestions, addError]);

  useEffect(() => {
    if (props.number >= 0 && Object.keys(props.carData).length > 0) {
      setEditSelected(true);
      setInputsData({ ...props.carData['fuelUps'][props.number] });
      setSelectedFuel(
        fuels.find(
          (fuel) => fuel.name === props.carData['fuelUps'][props.number].fuel
        )
      );
    } else {
      setEditSelected(false);
      setInputsData({
        ...inputsData,
        date,
        odometer: props.carData.fuelUps
          ? props.carData.fuelUps[props.carData.fuelUps.length - 1].odometer
          : '',
      });
    }
  }, [props.carData, date, props.number]);

  function dateOnChange(e) {
    setInputsData({
      ...inputsData,
      date: e.target.value,
    });
  }

  function odometerOnChange(e) {
    setInputsData({
      ...inputsData,
      odometer: +e.target.value || '',
    });
  }
  function selectFuel(e) {
    setInputsData({
      ...inputsData,
      fuel: e.target.value,
    });
    setSelectedFuel(fuels.find((fuel) => fuel.name === e.target.value));
  }

  function selectType(e) {
    setInputsData({
      ...inputsData,
      type: e.target.value,
    });
  }

  function litersHandler(e) {
    setInputsData({
      ...inputsData,
      liters: +e.target.value || '',
      price: +(inputsData.total / e.target.value).toFixed(3),
    });
  }

  function totalPriceHandler(e) {
    setInputsData({
      ...inputsData,
      total: +e.target.value || '',
      price: +(e.target.value / inputsData.liters).toFixed(3),
    });
  }
  function setGasStationOnChange(e) {
    setInputsData({
      ...inputsData,
      station: e.target.value || e.target.innerHTML,
    });
  }

  function setSuggestionsHandler(suggestions) {
    setSuggestions(suggestions);
  }

  function setGasStationsHandler(gasStations) {
    setGasStations(gasStations);
  }

  function toggleFullTankCheckBox(e) {
    setInputsData({
      ...inputsData,
      full: e.target.checked,
    });
  }

  function fuelUpCarDataEdit(carData, editSelected, index) {
    if (editSelected) {
      carData.fuelUps[index] = inputsData;
    } else {
      if (!carData.fuelUps) {
        carData.fuelUps = [];
      }
      carData.fuelUps.push(inputsData);
    }

    return carData;
  }

  function addFuelUpHandler(e) {
    e.preventDefault();
    let carData = { ...props.carData };
    let errors = validation(props.carData, e, editSelected, props.number);
    if (errors.length > 0) {
      addError(errors);
    } else {
      fuelUpCarDataEdit(carData, editSelected, props.number);

      fuelUp(props.id, carData)
        .then((res) => {
          props.setCarData(carData);
          history.push(`/car/${id}`);
        })
        .catch((err) => addError(err));
    }
  }

  return (
    <div className="car-data-wrapper fuel-up-wrapper">
      <h2>Fuel Up</h2>
      <div className="line"></div>
      <form onSubmit={addFuelUpHandler} className="fuel-up">
        <div>
          Date:{' '}
          <input
            name="date"
            type="date"
            defaultValue={inputsData.date}
            onChange={dateOnChange}
          />
        </div>
        <div>
          Odometer:
          <input
            name="odometer"
            type="number"
            onChange={odometerOnChange}
            value={inputsData.odometer}
          />
        </div>

        <GasStation
          position={position}
          gasStations={gasStations}
          suggestions={suggestions}
          inputsData={inputsData}
          setSuggestions={setSuggestionsHandler}
          setGasStations={setGasStationsHandler}
          setGasStationOnChange={setGasStationOnChange}
        ></GasStation>

        <Fuel
          selectedFuel={selectedFuel}
          fuels={fuels}
          inputsData={inputsData}
          selectFuel={selectFuel}
          selectType={selectType}
          setTypes={setTypes}
        ></Fuel>

        <FuelUpData
          inputsData={inputsData}
          litersHandler={litersHandler}
          totalPriceHandler={totalPriceHandler}
          toggleFullTankCheckBox={toggleFullTankCheckBox}
        ></FuelUpData>

        <div className="line"></div>
        {editSelected ? (
          <button type="submit">Edit Fuel Up</button>
        ) : (
          <button type="submit">Add Fuel Up</button>
        )}
      </form>
    </div>
  );
}

export default CarFuelUp;
