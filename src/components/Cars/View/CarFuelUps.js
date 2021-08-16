import { Link } from 'react-router-dom';
import './CarFuelUps.css';

function CarFuelUps(props) {
  return (
    <div className="car-data-wrapper fuel-up-wrapper">
      <h2>Fuel Ups</h2>
      <div className="line"></div>
      {props.carData['Fuel Ups'] ? (
        <div className="fuel-ups">
          <div className="box">
            <h4>
              <span>Date</span>
              <span>Fuel</span>
              <span>Liters</span>
              <span>Price</span>
              <span>Total</span>
              <span>Odometer</span>
              <span>Full Tank</span>
              <span>Edit</span>
            </h4>
            {props.carData['Fuel Ups'].map((carData) => {
              return (
                <p key={carData.odometer}>
                  <span>{carData.date}</span>
                  <span>{carData.fuel}</span>
                  <span>{carData.liters}</span>
                  <span>{carData.price}</span>
                  <span>{carData.total}</span>
                  <span>{carData.odometer}</span>
                  <span>
                    {carData.full ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      <i className="fas fa-times"></i>
                    )}
                  </span>
                  <span>
                    <Link
                      to={`/car/fuel-ups/${props.id}/edit/${props.carData[
                        'Fuel Ups'
                      ].indexOf(carData)}`}
                    >
                      <i className="far fa-edit"></i>
                    </Link>
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <h4 style={{ textAlign: 'center' }}>No Fuel Ups</h4>
      )}
    </div>
  );
}

export default CarFuelUps;
