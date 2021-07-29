import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAPIError from '../../../hooks/useAPIError';
import { getCarDetails } from '../../../services/Cars/carFirebase';

function CarDetailsBoxes() {
  const [carData, setCarData] = useState({});
  const { id } = useParams();
  const { addError } = useAPIError();

  useEffect(() => {
    getCarDetails(id)
      .then((car) => {
        setCarData(car.data());
      })
      .catch((err) => {
        addError(err);
      });
  }, []);
  return (
    <div className="car-data-wrapper">
      <h2>Statistics</h2>
      <div className="line"></div>
      {carData ? (
        <div>
          <div className="car-data-boxes">
            <div className="box">
              <h4>Fuel</h4>
              <p>
                {carData.fuel ? carData.fuel.map((fuel) => `${fuel} `) : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Odometer</h4>
              <p>
                {carData['lastMileage'] ? `${carData['lastMileage']} km` : '-'}
              </p>
            </div>
            <div className="box">
              <h4>KMs Tracked</h4>
              <p>
                {carData['KMsTracked'] ? `${carData['KMsTracked']} km` : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Fuel Ups</h4>
              <p>{carData['Fuel Ups'] ? carData['Fuel Ups'].length : '-'}</p>
            </div>
          </div>
          <div className="car-data-boxes">
            <div className="box">
              <h4>Avg Mileage</h4>
              <p>
                {carData['Fuel Ups'] &&
                carData['Fuel Ups'].filter(
                  (fuelUp) =>
                    fuelUp.hasOwnProperty('lPerKM') && fuelUp.full === true
                ).length > 0
                  ? `${(
                      carData['Fuel Ups']
                        .filter(
                          (fuelUp) => fuelUp.lPerKM && fuelUp.full === true
                        )
                        .reduce((a, b) => ({
                          lPerKM: a.lPerKM + b.lPerKM,
                        })).lPerKM /
                      carData['Fuel Ups'].filter(
                        (fuelUp) => fuelUp.lPerKM && fuelUp.full === true
                      ).length
                    ).toFixed(2)} L/100 km`
                  : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Worst Mileage</h4>
              <p>
                {carData['Fuel Ups'] &&
                carData['Fuel Ups'].filter(
                  (fuelUp) =>
                    fuelUp.hasOwnProperty('lPerKM') && fuelUp.full === true
                ).length > 0
                  ? `${Math.max
                      .apply(
                        Math,
                        carData['Fuel Ups']
                          .filter(
                            (fuelUp) => fuelUp.lPerKM && fuelUp.full === true
                          )
                          .map((fuelUp) => fuelUp.lPerKM)
                      )
                      .toFixed(2)} L/100 km`
                  : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Best Mileage</h4>
              <p>
                {carData['Fuel Ups'] &&
                carData['Fuel Ups'].filter(
                  (fuelUp) =>
                    fuelUp.hasOwnProperty('lPerKM') && fuelUp.full === true
                ).length > 0
                  ? `${Math.min
                      .apply(
                        Math,
                        carData['Fuel Ups']
                          .filter(
                            (fuelUp) => fuelUp.lPerKM && fuelUp.full === true
                          )
                          .map((fuelUp) => fuelUp.lPerKM)
                      )
                      .toFixed(2)} L/100 km`
                  : '-'}
              </p>
            </div>
          </div>
          <div className="car-data-boxes">
            <div className="box">
              <h4>Average Price / L</h4>
              <p>
                {carData['Fuel Ups']
                  ? `${(
                      carData['Fuel Ups'].reduce((a, b) => ({
                        total: a.total + b.total,
                      })).total /
                      carData['Fuel Ups'].reduce((a, b) => ({
                        liters: a.liters + b.liters,
                      })).liters
                    ).toFixed(3)}`
                  : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Average Price / Km</h4>
              <p>
                {carData['Fuel Ups'] &&
                carData['Fuel Ups'].filter(
                  (fuelUp) =>
                    fuelUp.hasOwnProperty('expnsePerKm') && fuelUp.full === true
                ).length > 0
                  ? `${(
                      carData['Fuel Ups']
                        .filter(
                          (fuelUp) => fuelUp.expnsePerKm && fuelUp.full === true
                        )
                        .reduce((a, b) => ({
                          expnsePerKm: a.expnsePerKm + b.expnsePerKm,
                        })).expnsePerKm /
                      carData['Fuel Ups'].filter(
                        (fuelUp) => fuelUp.expnsePerKm && fuelUp.full === true
                      ).length
                    ).toFixed(3)}`
                  : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Average Price Fuel Up</h4>
              <p>
                {carData['Fuel Ups']
                  ? `${(
                      carData['Fuel Ups'].reduce((a, b) => ({
                        total: a.total + b.total,
                      })).total / carData['Fuel Ups'].length
                    ).toFixed(2)}`
                  : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Total Money Spend</h4>
              <p>
                {carData['Fuel Ups']
                  ? `${carData['Fuel Ups']
                      .reduce((a, b) => ({
                        total: a.total + b.total,
                      }))
                      .total.toFixed(2)}`
                  : '-'}
              </p>
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