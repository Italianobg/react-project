import './CarCard.css';

function CarCard(props) {
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
          {props.car.lastMileage
            ? `${props.car.lastMileage} km - ${props.car.fuel}`
            : 'Time for Fuel Up!'}
        </p>
      </div>
    </article>
  );
}

export default CarCard;
