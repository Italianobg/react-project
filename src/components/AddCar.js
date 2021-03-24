import React, { useState, useEffect } from 'react';
import './AddCar.css';
import * as carsServices from '../services/Cars/carsServices';

function AddCar(props) {
  const carTypes = {
    A: 'Choose...',
    C: 'Cars',
    B: 'Bikes',
  };

  const [vehicles, setVehicles] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedMake, setSelectedMake] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const [makes, setMakes] = useState([{ id: 'unknown', name: 'Choose...' }]);
  const [models, setModels] = useState([{ id: 'unknown', name: 'Choose...' }]);

  useEffect(() => {
    carsServices.getAll().then((cars) => {
      setVehicles(cars.makes);
    });
  });

  function filterMakes(e) {
    setSelectedType(e.target.value);
    let makesSelected = vehicles
      .filter((el) => {
        if (el['vehicleTypes'].includes(e.target.value)) {
          return el;
        }
        return '';
      })
      .sort((a, b) => a['name'].localeCompare(b['name']));
    setMakes(makesSelected);
  }

  function filterModels(e) {
    setSelectedMake(e.target.value);

    let modelsSelected = makes
      .find((el) => el.name === e.target.value)
      .models.filter((model) => {
        if (model.vehicleType === selectedType) {
          return model;
        }
        return '';
      })
      .sort((a, b) => a['name'].localeCompare(b['name']));
    setModels(modelsSelected);
  }

  function selectModelHandler(e) {
    setSelectedModel(e.target.value);
  }

  return (
    <div className="selectCar">
      <h2>Add your car</h2>
      <div>
        <span className="filewrap">
          Upload Car Image
          <input type="file" />
        </span>
      </div>
      <div>
        <label className="type">Type:</label>
        <select name="type" onChange={filterMakes} value={selectedType}>
          {Object.keys(carTypes).map((type, index) => {
            return (
              <option key={index} value={type}>
                {carTypes[type]}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label className="make">Make:</label>
        <select name="make" onChange={filterModels} value={selectedMake}>
          {makes.map((make, index) => {
            return (
              <option key={make.id} value={make.name}>
                {make.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          className="model"
          onChange={selectModelHandler}
          value={selectedModel}
        >
          Model:
        </label>
        <select name="model">
          {models.map((model, index) => {
            return (
              <option key={model.id} value={model.name}>
                {model.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <button type="submit">Add Car</button>
      </div>
    </div>
  );
}

export default AddCar;
