import { useEffect, useState } from 'react';
import { Link, Route, useHistory, useParams } from 'react-router-dom';
import { deleteCar, getCarDetails } from '../../services/Cars/carFirebase';
import { storage } from '../../utils/firebase';
import './CarDetails.css';
import CarDetailsBoxes from './CarDetailsBoxes';
import CarFuelUp from './CarFuelUp';
import useAPIError from '../../hooks/useAPIError';
import CarFuelUps from './CarFuelUps';

function CarDetails() {
  let history = useHistory();
  const { id, number } = useParams();
  const [carData, setCarData] = useState({});
  const [fuelUpToggle, setFuelUpToggle] = useState(true);
  const { addError } = useAPIError();

  useEffect(() => {
    if (fuelUpToggle) {
      getCarDetails(id)
        .then((car) => {
          setCarData(car.data());
          setFuelUpToggle(false);
        })
        .catch((err) => {
          addError(err);
        });
    }
  }, [id, addError, fuelUpToggle]);

  function deleteCarHandler() {
    if (carData.imageUrl) {
      storage
        .refFromURL(carData.imageUrl)
        .delete()
        .then(() => {})
        .catch((err) => {
          addError(err.message);
        });
    }
    deleteCar(id)
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        addError(err.message);
      });
  }

  function fuelUpToggleHandler(status) {
    setFuelUpToggle(status);
  }

  return (
    <div className="car-details">
      <div className="car-data">
        <div className="car-data-details">
          <div className="car-make">
            <Link to={`/car/${id}`}>
              <h2>
                {carData.make} - {carData.model}
              </h2>
            </Link>
          </div>
          <div className="line"> </div>
          <Link to={`/car/${id}`}>
            <div className="car-data-img-wrapper">
              <img src={carData.imageUrl} alt="Car" />
            </div>
          </Link>
          <div className="line"> </div>
          <div className="car-data-buttons">
            <Link to={`/car/fuel-up/${id}`}>
              <button> Add Fuel Up </button>
            </Link>
            <Link to={`/car/fuel-ups/${id}`}>
              <button> History </button>
            </Link>
            <Link to={`/car/edit/${id}`}>
              <button> Edit </button>
            </Link>
            <a href="/">
              <button type="button" onClick={deleteCarHandler}>
                Delete
              </button>
            </a>
          </div>
        </div>
        <Route path="/car/:id" exact>
          <CarDetailsBoxes carData={carData} />
        </Route>
        <Route path="/car/fuel-up/:id" exact>
          <CarFuelUp id={id} fuelUpToggleHandler={fuelUpToggleHandler} />
        </Route>
        <Route path="/car/fuel-ups/:id" exact>
          <CarFuelUps id={id} carData={carData} />
        </Route>
        <Route path="/car/fuel-ups/:id/edit/:number" exact>
          <CarFuelUp id={id} number={number} carData={carData} />
        </Route>
      </div>
    </div>
  );
}
export default CarDetails;
