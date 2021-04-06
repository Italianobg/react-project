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
          {props.car['last milage']
            ? `${props.car['last milage']} km`
            : 'Time for Fuel Up!'}{' '}
        </p>
      </div>
    </article>
  );
}

export default CarCard;
