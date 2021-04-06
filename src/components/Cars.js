import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars } from '../services/Cars/carFirebase';
import CarCard from './CarCard';
import './Cars.css';

function Cars(props) {
  useEffect(() => {
    getAllCars().then((cars) => {
      if (!props.carList) {
        props.setCarListHandler(
          cars.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    });
  });

  return (
    <div className="cars">
      <h2>My Cars</h2>
      <div className="line"></div>

      <div className="cars-list">
        {props.carList.map((car) => {
          return (
            <div key={car.id}>
              <Link to={`/car/${car.id}`}>
                <CarCard car={car} />
              </Link>
            </div>
          );
        })}
      </div>

      {props.carList.length === 0 && <h4>No cars in your garage!</h4>}
    </div>
  );
}
export default Cars;
