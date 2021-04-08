import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars } from '../../services/Cars/carFirebase';
import CarCard from './CarCard';
import useAPIUser from '../../hooks/useAPIUser';
import './Cars.css';
import useAPIError from '../../hooks/useAPIError';

function Cars(props) {
  const { user } = useAPIUser();
  const { addError } = useAPIError();

  useEffect(() => {
    getAllCars()
      .then((cars) => {
        if (
          !props.carList ||
          props.carList !==
            cars.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        ) {
          props.setCarListHandler(
            cars.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      })
      .catch((err) => {
        addError(err.message);
      });
  }, [addError, props.id]);

  return (
    <div className="cars">
      <h2>My Cars</h2>
      <div className="line"></div>

      <div className="cars-list">
        {props.carList
          .filter((car) => car.userID === user.user.uid)
          .map((car) => {
            return (
              <div key={car.id}>
                <Link to={`/car/${car.id}`}>
                  <CarCard car={car} />
                </Link>
              </div>
            );
          })}
      </div>

      {props.carList.filter((car) => car.userID === user.user.uid).length ===
        0 && <h4>No cars in your garage!</h4>}
    </div>
  );
}
export default Cars;
