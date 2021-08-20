import { useEffect, useState } from 'react';
import './CarCard.css';

function CarCard(props) {
  const [fuels, setFuels] = useState([]);

  useEffect(() => {
    if (props.car.fuelUps)
      setFuels([...new Set(props.car.fuelUps.map((fuelUp) => fuelUp.fuel))]);
  }, [props]);

  return (
    <article className="box">
      <div>
        <h4>
          {props.car.make} - {props.car.model}
        </h4>
      </div>
      <div className="img">
        <img src={props.car.imageUrl} alt="" />
      </div>
      <div>
        <p>
          {props.car.fuelUps
            ? `${
                props.car.fuelUps[props.car.fuelUps.length - 1].odometer
              } KM - ${fuels.join(', ')}`
            : 'Time for Fuel Up!'}
        </p>
      </div>
    </article>
  );
}

export default CarCard;
