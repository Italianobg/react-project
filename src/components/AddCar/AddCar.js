import React, { useState, useEffect, Suspense, useRef } from 'react';
import './AddCar.css';
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
const CarImage = React.lazy(() => import('./CarImage'));

function AddCar(props) {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [selectedType, setSelectedType] = useState('C');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [makes, setMakes] = useState([
    { id: 'unknownMakes', name: 'Choose...' },
  ]);
  const [models, setModels] = useState([
    { id: 'unknownModels', name: 'Choose...' },
  ]);
  const [formErrors, setFormErrors] = useState([]);
  let errors = [];
  let history = useHistory();

  let didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      if (id) {
        getCarDetails(id).then((car) => {
          setSelectedType(car.data().type);
          setSelectedMake(car.data().make);
          setSelectedModel(car.data().model);
          setImageUrl(car.data().imageUrl);
        });
      }
    } else {
      didMount.current = true;
      carModels
        .getAll()
        .then((cars) => {
          setVehicles(cars.makes);
        })
        .catch((err) => errors.push(err));
    }
  }, [selectedType, errors, id]);

  function setType(type) {
    setSelectedType(type);
  }

  function setImage(url) {
    setImageUrl(url);
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

    errors = [''];
    setFormErrors('');

    if (imageUrl === '') {
      errors.push('Please add picture');
    }
    if (type === 'A' || make === 'Choose...' || model === 'Choose...') {
      errors.push('Please specify make and model');
    }
    setFormErrors(errors);

    if (errors.length === 1) {
      if (id) {
        editCar(type, make, model, imageUrl, id)
          .then(() => {
            history.push(`/car/${id}`);
          })
          .catch((err) => {
            errors.push(e);
            setFormErrors(errors);
          });
      } else {
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
  }

  return (
    <div className="selectCar">
      {id ? <h2>Edit your car</h2> : <h2>Add your car</h2>}
      <form onSubmit={onAddCarHandler}>
        <Suspense
          fallback={
            <img src={loading} alt="Loading..." className="loading"></img>
          }
        >
          <CarImage setImage={setImage} imageUrl={imageUrl} />
        </Suspense>
        <CarType
          id={id}
          vehicles={vehicles}
          selectedType={selectedType}
          makes={makes}
          setType={setType}
          setAllMakes={setAllMakes}
        />
        <CarMake
          id={id}
          makes={makes}
          selectedType={selectedType}
          selectedMake={selectedMake}
          models={models}
          setMake={setMake}
          setAllModels={setAllModels}
        />
        <CarModel
          id={id}
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
      <div className="errors">
        {formErrors.map((err) => {
          return <p key={err}>{err}</p>;
        })}
      </div>
    </div>
  );
}

export default AddCar;
