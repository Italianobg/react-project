import { useEffect, useState } from 'react';
import { Link, Route, useHistory, useParams } from 'react-router-dom';
import { deleteCar, getCarDetails } from '../../services/Cars/carFirebase';
import { storage } from '../../utils/firebase';
import './CarDetails.css';
import CarDetailsBoxes from './CarDetailsBoxes';
import CarFuelUp from './CarFuelUp';
import useAPIError from '../../hooks/useAPIError';

function CarDetails() {
  let history = useHistory();
  const { id } = useParams();
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
  }, [id, addError]);

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
            <h2>
              {carData.make} - {carData.model}
            </h2>
          </div>
          <div className="line"> </div>
          <div className="car-data-img-wrapper">
            <img src={carData.imageUrl} alt="Car" />
          </div>
          <div className="line"> </div>
          <div className="car-data-buttons">
            <Link to={`/car/fuel-up/${id}`}>
              <button> Add Fuel Up </button>
            </Link>
            <Link to={`/car/edit/${id}`}>
              <button> Edit </button>
            </Link>
            <button type="button" onClick={deleteCarHandler}>
              Delete
            </button>
          </div>
        </div>
        <Route path="/car/:id" exact>
          <CarDetailsBoxes carData={carData} />
        </Route>
        <Route path="/car/fuel-up/:id" exact>
          <CarFuelUp id={id} />
        </Route>
      </div>
    </div>
  );
}
export default CarDetails;