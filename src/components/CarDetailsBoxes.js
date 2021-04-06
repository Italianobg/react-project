function CarDetailsBoxes(props) {
  console.log(props.carData);
  return (
    <div className="car-data-wrapper">
      {props.carData ? (
        <div>
          <div className="car-data-boxes">
            <div className="box">
              <h4>Fuel</h4>
              <p>{props.carData.fuel}</p>
            </div>
            <div className="box">
              <h4>Odometer</h4>
              <p>
                {props.carData['last milage']
                  ? `${props.carData['last milage']} km`
                  : 'N/A'}
              </p>
            </div>
            <div className="box">
              <h4>KMs Tracked</h4>
              <p>
                {props.carData['kms tracked']
                  ? `${props.carData['kms tracked']} km`
                  : 0}
              </p>
            </div>
            <div className="box">
              <h4>Fuel Ups</h4>
              <p>
                {props.carData['Fuel Ups']
                  ? props.carData['Fuel Ups'].length
                  : 0}
              </p>
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
      ) : (
        ''
      )}
    </div>
  );
}
export default CarDetailsBoxes;
