import { useEffect, useState } from 'react';

function CarDetailsBoxes(props) {
  const [fuels, setFuels] = useState([]);
  const [firstMileage, setFirstMileage] = useState();
  const [lastMileage, setLastMileage] = useState();
  const [averageMileage, setAverageMileage] = useState();
  const [worstMileage, setWorstMileage] = useState();
  const [bestMileage, setBestMileage] = useState();
  const [averagePriceKm, setAveragePriceKm] = useState();

  function getData(array, key) {
    return array.map((d) => d[key]);
  }
  function getMinData(array, key) {
    return Math.min(...getData(array, key));
  }
  function getMaxData(array, key) {
    return Math.max(...getData(array, key));
  }

  function getAverageData(array, key) {
    return (
      [...getData(array, key)].reduce((a, b) => a + b) /
      [...getData(array, key)].length
    );
  }

  useEffect(() => {
    let fullTankArray = [];
    let litersSinceLastFull = 0;
    let totalSinceLastFull = 0;
    let mileageSinceLastFull = 0;

    if (props.carData.fuelUps) {
      setFuels([
        ...new Set(props.carData.fuelUps.map((fuelUp) => fuelUp.fuel)),
      ]);
      setFirstMileage(props.carData.fuelUps[0].odometer);
      setLastMileage(
        props.carData.fuelUps[props.carData.fuelUps.length - 1].odometer
      );

      let firstFullTankIndex, lastFullTankIndex;
      firstFullTankIndex = props.carData.fuelUps.findIndex((x) => x.full);
      lastFullTankIndex =
        props.carData.fuelUps.length -
        1 -
        props.carData.fuelUps.reverse().findIndex((x) => x.full);
      props.carData.fuelUps.reverse();

      for (
        let index = firstFullTankIndex + 1;
        index <= lastFullTankIndex;
        index++
      ) {
        if (props.carData.fuelUps[index].full) {
          totalSinceLastFull += props.carData.fuelUps[index].total;
          litersSinceLastFull += props.carData.fuelUps[index].liters;
          mileageSinceLastFull +=
            props.carData.fuelUps[index].odometer -
            props.carData.fuelUps[index - 1].odometer;
          fullTankArray.push({
            total: totalSinceLastFull,
            liters: litersSinceLastFull,
            mileage: mileageSinceLastFull,
            consumption: (litersSinceLastFull / mileageSinceLastFull) * 100,
            pricePerKM: totalSinceLastFull / mileageSinceLastFull,
          });
          litersSinceLastFull = 0;
          litersSinceLastFull = 0;
          mileageSinceLastFull = 0;
        } else {
          totalSinceLastFull += props.carData.fuelUps[index].total;
          litersSinceLastFull += props.carData.fuelUps[index].liters;
          mileageSinceLastFull +=
            props.carData.fuelUps[index].odometer -
            props.carData.fuelUps[index - 1].odometer;
        }

        setWorstMileage(getMaxData(fullTankArray, 'consumption'));
        setBestMileage(getMinData(fullTankArray, 'consumption'));
        setAverageMileage(getAverageData(fullTankArray, 'consumption'));
        setAveragePriceKm(getAverageData(fullTankArray, 'pricePerKM'));
      }
    }
  }, [props.carData]);
  return (
    <div className="car-data-wrapper">
      <h2>Statistics</h2>
      <div className="line"></div>
      {props.carData ? (
        <div>
          <div className="car-data-boxes">
            <div className="box">
              <h4>Fuel</h4>
              <p>{fuels.length > 0 ? fuels.join(', ') : '-'}</p>
            </div>
            <div className="box">
              <h4>Odometer</h4>
              <p>{lastMileage ? `${lastMileage} km` : '-'}</p>
            </div>
            <div className="box">
              <h4>KMs Tracked</h4>
              <p>
                {lastMileage && firstMileage
                  ? `${lastMileage - firstMileage} km`
                  : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Fuel Ups</h4>
              <p>
                {props.carData.fuelUps ? props.carData.fuelUps.length : '-'}
              </p>
            </div>
          </div>
          <div className="car-data-boxes">
            <div className="box">
              <h4>Avg Mileage</h4>
              <p>
                {averageMileage ? `${averageMileage.toFixed(2)} L/100 km` : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Worst Mileage</h4>
              <p>
                {worstMileage ? `${worstMileage.toFixed(2)} L/100 km` : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Best Mileage</h4>
              <p>{bestMileage ? `${bestMileage.toFixed(2)} L/100 km` : '-'}</p>
            </div>
          </div>
          <div className="car-data-boxes">
            <div className="box">
              <h4>Average Price / L</h4>
              <p>
                {props.carData.fuelUps
                  ? `${(
                      getAverageData(props.carData.fuelUps, 'total') /
                      getAverageData(props.carData.fuelUps, 'liters')
                    ).toFixed(3)}`
                  : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Average Price / Km</h4>
              <p>{averagePriceKm ? `${averagePriceKm.toFixed(3)}` : '-'}</p>
            </div>
            <div className="box">
              <h4>Average Price Fuel Up</h4>
              <p>
                {props.carData.fuelUps
                  ? `${getAverageData(props.carData.fuelUps, 'total').toFixed(
                      2
                    )}`
                  : '-'}
              </p>
            </div>
            <div className="box">
              <h4>Total Money Spend</h4>
              <p>
                {props.carData.fuelUps
                  ? `${props.carData.fuelUps
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
