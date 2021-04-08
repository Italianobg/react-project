import React, { useState, useEffect, Suspense, useRef } from 'react';
import './AddEditCar.css';
import * as carModels from '../../services/Cars/carModels';
import loading from '../../images/loading.gif';
import CarType from './CarType';
import CarMake from './CarMake';
import CarModel from './CarModel';
import { useHistory, useParams } from 'react-router-dom';
import {
  addCar,
  editCar,
  getCarDetails,
} from '../../services/Cars/carFirebase';
import useAPIError from '../../hooks/useAPIError';
import useAPIUser from '../../hooks/useAPIUser';
const CarImage = React.lazy(() => import('./CarImage'));

function AddEditCar(props) {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [changedType, setChangedType] = useState();
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [makes, setMakes] = useState([
    { id: 'unknownMakes', name: 'Choose...' },
  ]);
  const [models, setModels] = useState([
    { id: 'unknownModels', name: 'Choose...' },
  ]);
  const { addError } = useAPIError();
  const { user } = useAPIUser();
  let errors = [];
  let history = useHistory();

  useEffect(() => {
    carModels
      .getAll()
      .then((cars) => {
        setVehicles(cars.makes);
      })
      .catch((err) => addError(err.message));
  }, [props, addError]);

  useEffect(() => {
    if (id) {
      getCarDetails(id)
        .then((car) => {
          setSelectedType(car.data().type);
          setSelectedMake(car.data().make);
          setSelectedModel(car.data().model);
          setImageUrl(car.data().imageUrl);
        })
        .catch((err) => {
          addError(err.message);
        });
    }
  }, [id, imageUrl, addError]);

  function setChangedTypeHandler(type) {
    setChangedType(type);
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
    const image = e.target.imageUrl.src;

    errors = [];

    if (image === '') {
      errors.push('Please add picture');
    }
    if (type === 'A' || make === 'Choose...' || model === 'Choose...') {
      errors.push('Please specify make and model');
    }

    if (errors.length < 1) {
      if (id) {
        editCar(type, make, model, image, id, user.user.uid)
          .then(() => {
            history.push(`/car/${id}`);
          })
          .catch((err) => {
            addError(err.message);
          });
      } else {
        addCar(type, make, model, image, user.user.uid)
          .then(() => {
            history.push('/');
          })
          .catch((err) => {
            addError(err.message);
          });
      }
    } else {
      addError(errors);
    }
  }

  return (
    <div className="selectCar">
      {id ? <h2>Edit your car</h2> : <h2>Add your car</h2>}
      <div className="line"></div>
      <form onSubmit={onAddCarHandler}>
        <Suspense
          fallback={
            <img src={loading} alt="Loading..." className="loading"></img>
          }
        >
          <CarImage image={imageUrl} />
        </Suspense>
        <CarType
          selectedType={selectedType}
          setAllMakes={setAllMakes}
          setChangedTypeHandler={setChangedTypeHandler}
          vehicles={vehicles}
        />
        <CarMake
          selectedMake={selectedMake}
          selectedType={selectedType}
          changedType={changedType}
          makes={makes}
          models={models}
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
          {id ? (
            <button type="submit">Edit Car</button>
          ) : (
            <button type="submit">Add Car</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddEditCar;
