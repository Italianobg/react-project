import { useEffect } from 'react';
import { getAllCars } from '../services/Cars/carFirebase';
import CarCard from './CarCard';
import './Cars.css';

function Cars(props) {
  useEffect(() => {
    getAllCars().then((cars) => {
      console.log('getAllCars');
      props.setCarListHandler(
        cars.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="cars">
      <h2>My Cars</h2>
      <div className="line"></div>

      <div className="cars-list">
        {props.carList.map((car) => {
          return <CarCard key={car.id} car={car} />;
        })}
      </div>

      {props.carList.lenght === 0 && <h4>No car in your garage!</h4>}
    </div>
  );
}
export default Cars;
