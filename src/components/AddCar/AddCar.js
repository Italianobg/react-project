import React, { useState, useEffect, Suspense } from 'react';
import './AddCar.css';
import * as carModels from '../../services/Cars/carModels';
import loading from '../../images/loading.gif';
import CarType from './CarType';
import CarMake from './CarMake';
import CarModel from './CarModel';
import { useHistory } from 'react-router-dom';
import { addCar } from '../../services/Cars/carFirebase';
const CarImage = React.lazy(() => import('./CarImage'));

function AddCar(props) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [makes, setMakes] = useState([{ id: 'unknown', name: 'Choose...' }]);
  const [models, setModels] = useState([{ id: 'unknown', name: 'Choose...' }]);
  const [formErrors, setFormErrors] = useState([]);
  let errors = [];
  let history = useHistory();

  useEffect(() => {
    let isSubscribed = true;

    carModels
      .getAll()
      .then((cars) => {
        if (isSubscribed) {
          setVehicles(cars.makes);
        }
      })
      .catch((err) => errors.push(err));

    return () => {
      isSubscribed = false;
    };
  });

  function setType(type) {
    setSelectedType(type);
  }

  function setMake(make) {
    setSelectedMake(make);
  }

  function setModel(model) {
    setSelectedModel(model);
  }

  function setAllMakes(make) {
    setMakes(make);
  }

  function setAllModels(model) {
    setModels(model);
  }

  function onAddCarHandler(e) {
    e.preventDefault();
    const type = e.target.type.value;
    const make = e.target.make.value;
    const model = e.target.model.value;

    let imageUrl = '';
    errors = [''];
    setFormErrors('');

    if (e.target.hasOwnProperty('imageUrl')) {
      imageUrl = e.target.imageUrl.src;
    } else {
      imageUrl = '';
    }

    if (imageUrl.length === 0) {
      errors.push('Please add picture');
    }
    if (type === 'A' || make === 'Choose...' || model === 'Choose...') {
      errors.push('Please specify make and model');
    }
    setFormErrors(errors);

    if (errors.length === 1) {
      addCar(type, make, model, imageUrl)
        .then(() => {
          history.push('/');
        })
        .catch((err) => {
          errors.push(e);
          setFormErrors(errors);
        });
    }
  }

  return (
    <div className="selectCar">
      <h2>Add your car</h2>
      <form onSubmit={onAddCarHandler}>
        <Suspense
          fallback={
            <img src={loading} alt="Loading..." className="loading"></img>
          }
        >
          <CarImage />
        </Suspense>
        <CarType
          vehicles={vehicles}
          setType={setType}
          setAllMakes={setAllMakes}
        />
        <CarMake
          makes={makes}
          selectedType={selectedType}
          setMake={setMake}
          setAllModels={setAllModels}
        />
        <CarModel
          models={models}
          selectedMake={selectedMake}
          selectedModel={selectedModel}
          setModel={setModel}
        />
        <div>
          <button type="submit">Add Car</button>
        </div>
      </form>
      <div className="errors">
        {formErrors.map((err) => {
          return <p key={err}>{err}</p>;
        })}
      </div>
    </div>
  );
}

export default AddCar;
