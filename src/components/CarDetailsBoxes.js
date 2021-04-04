function CarDetailsBoxes(props) {
  return (
    <div className="car-data-wrapper">
      <div className="car-data-boxes">
        <div className="box">
          <h4>Fuel Types</h4>
          <p>{props.carData.fuel}</p>
        </div>
        <div className="box">
          <h4>Milage</h4>
          <p> 265 045{props.carData.milage} km</p>
        </div>
        <div className="box">
          <h4>KMs Tracked</h4>
          <p>{props.carData.fillup} km</p>
        </div>
        <div className="box">
          <h4>Fuel Ups</h4>
          <p>{props.carData.fillup}</p>
        </div>
      </div>
      <div className="car-data-boxes">
        <div className="box">
          <h4>Avg Milage</h4>
          <p>{props.carData.fillup}</p>
        </div>
        <div className="box">
          <h4>Last Milage</h4>
          <p>{props.carData.fillup}</p>
        </div>
        <div className="box">
          <h4>Best Milage</h4>
          <p>{props.carData.fillup}</p>
        </div>
      </div>
      <div className="car-data-boxes">
        <div className="box">
          <h4>Average Price / L</h4>
          <p>{props.carData.fillup}</p>
        </div>
        <div className="box">
          <h4>Average Price / Km</h4>
          <p>{props.carData.fillup}</p>
        </div>
        <div className="box">
          <h4>Average Price Fuel Up</h4>
          <p>{props.carData.fillup}</p>
        </div>
        <div className="box">
          <h4>Total Money Spend</h4>
          <p>{props.carData.fillup}</p>
        </div>
      </div>
    </div>
  );
}
export default CarDetailsBoxes;
