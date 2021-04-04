import { useEffect, useRef, useState } from 'react';
import getGasStations from '../services/googleMapsGasStations.js';
import './CarFuelUp.css';
const fuels = [
  { name: 'Petrol', types: ['A95', 'A98', 'A100'] },
  { name: 'Diesel', types: ['Diesel', 'Diesel+', 'Diesel MaxMotion'] },
  { name: 'LPG', types: ['LPG'] },
  { name: 'CNG', types: ['CNG'] },
  { name: 'Electric', types: ['Electric'] },
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
  const [liters, setLiters] = useState();
  const [total, setTotal] = useState();
  const [pricePerL, setPricePerL] = useState();
  const [position, setPosition] = useState({});
  const didMount = useRef(false);
  const [gasStations, setGasStations] = useState();
  const [suggestions, getSuggestions] = useState();

  useEffect(() => {
    if (didMount.current) {
      console.log(position);
      setTypes(selectedFuel.types);
      if (liters && total) {
        setPricePerL((total / liters).toFixed(2));
      } else {
        setPricePerL('');
      }
      if (!gasStations && position) {
        getGasStations(
          position.coords.latitude,
          position.coords.longitude
        ).then((res) => {
          setGasStations(res.results);
          console.log(res.results);
        });
      }
    } else {
      didMount.current = true;
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition(position);
      });
    }
  }, [types, selectedFuel, liters, total, position]);

  function selectFuel(e) {
    setSelectedFuel(fuels.find((fuel) => fuel.name === e.target.value));
  }

  function litersHandler(e) {
    setLiters(e.target.value);
  }

  function totalPriceHandler(e) {
    setTotal(e.target.value);
  }
  function filterSuggestions(e) {}
  function addFuelUpHandler(e) {}
  return (
    <div className="car-data-wrapper fuel-up-wrapper">
      <h2>Fuel Up</h2>
      <div className="line"></div>
      <form onSubmit={addFuelUpHandler} className="fuel-up">
        <div>
          <input name="date" type="date" defaultValue={date} />
          <input name="odometer" type="number" placeholder="Odometer" />
        </div>
        <div>
          <input
            name="station"
            type="text"
            placeholder="Gas Station"
            onChange={filterSuggestions}
          />
        </div>
        {suggestions ? (
          <div>
            <input name="station" type="text" placeholder="Gas Station" />
          </div>
        ) : (
          ''
        )}
        <div>
          <label>Fuel:</label>
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
          <label>Fuel Type:</label>
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
          <input
            type="text"
            name="liters"
            placeholder="Liters"
            onChange={litersHandler}
          />
          <input
            type="text"
            name="total"
            placeholder="Total Price"
            onChange={totalPriceHandler}
          />
          <input
            type="text"
            name="pricePerL"
            placeholder="Price / L"
            defaultValue={pricePerL}
            disabled
          />
        </div>
        <div>
          <div className="full-tank">
            <label>Full Tank</label>
            <input name="fullTank" type="checkbox" id="fullTank" />
          </div>
        </div>
        <div className="line"></div>
        <button type="submit">Add Fuel Up</button>
      </form>
    </div>
  );
}

export default CarFuelUp;
