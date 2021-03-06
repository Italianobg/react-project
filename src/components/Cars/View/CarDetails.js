import { useEffect, useState } from 'react';
import { Link, Route, useHistory, useParams } from 'react-router-dom';
import { deleteCar, getCarDetails } from '../../../services/Cars/carFirebase';
import { storage } from '../../../utils/firebase';
import './CarDetails.css';
import CarDetailsBoxes from '../View/CarDetailsBoxes';
import CarFuelUp from '../Add-Edit/CarFuelUp';
import useAPIError from '../../../hooks/useAPIError';
import CarFuelUps from './CarFuelUps';

function CarDetails() {
  let history = useHistory();
  const { id, number } = useParams();
  const [carData, setCarData] = useState({});
  const { addError } = useAPIError();

  useEffect(() => {
    getCarDetails(id)
      .then((car) => {
        setCarData(car.data());
      })
      .catch((err) => {
        addError(err);
      });
  }, []);

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
          <CarDetailsBoxes carData={carData} setCarData={setCarData} />
        </Route>
        <Route path="/car/fuel-up/:id" exact>
          <CarFuelUp id={id} carData={carData} setCarData={setCarData} />
        </Route>
        <Route path="/car/fuel-ups/:id" exact>
          <CarFuelUps id={id} carData={carData} setCarData={setCarData} />
        </Route>
        <Route path="/car/fuel-ups/:id/edit/:number" exact>
          <CarFuelUp
            id={id}
            number={number}
            carData={carData}
            setCarData={setCarData}
          />
        </Route>
      </div>
    </div>
  );
}
export default CarDetails;
