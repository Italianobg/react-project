import { useEffect, useState } from 'react';
import useAPIError from '../hooks/useAPIError';
import { getUsersCounter } from '../services/User/userFirebase';
import './Statistics.css';

function Statistics(props) {
  const { addError } = useAPIError();
  const [users, setUsers] = useState();
  const [totalFuelUps, setTotalFuelUps] = useState();
  const [vechiclesTracked, setVechiclesTracked] = useState();
  const [trackedKMs, setTrackedKMs] = useState();

  useEffect(() => {
    getUsersCounter()
      .then((res) => {
        setUsers(res.data().counter);
      })
      .catch((err) => {
        addError(err.message);
      });

    setTotalFuelUps(
      props.carList.length > 0
        ? props.carList
            .filter((car) => car.hasOwnProperty('fuelUps'))
            .reduce((a, b) => {
              return {
                fuelUps: a['fuelUps'].concat(b['fuelUps']),
              };
            })['fuelUps'].length
        : ''
    );

    setTrackedKMs(
      props.carList.length > 0 &&
        props.carList
          .filter((car) => car.hasOwnProperty('fuelUps'))
          .filter((car) => car.fuelUps.length > 1).length > 0
        ? props.carList
            .filter((car) => car.hasOwnProperty('fuelUps'))
            .filter((car) => car.fuelUps.length > 1)
            .reduce(
              (a, c) =>
                a +
                c.fuelUps[c.fuelUps.length - 1].odometer -
                c.fuelUps[0].odometer,
              0
            )
        : ''
    );

    setVechiclesTracked(props.carList.length);
  }, [props.carList]);

  return (
    <section className="statistics">
      <div>
        <h2>Global Statistics</h2>
        <div className="line"></div>
      </div>
      <div className="statistics-box">
        <article className="box">
          <div>
            <i className="fas fa-burn"> </i> <h4> FuelUps </h4>
          </div>
          <div>
            <p>{totalFuelUps ? totalFuelUps : ' - '}</p>
          </div>
        </article>
        <article className="box">
          <div>
            <i className="fas fa-road"> </i> <h4> Kilometers Recorded </h4>
          </div>
          <div>
            <p>{trackedKMs ? trackedKMs : ' - '}</p>
          </div>
        </article>
        <article className="box">
          <div>
            <i className="fas fa-car"> </i> <h4> Vehicles Tracked </h4>
          </div>
          <div>
            <p> {vechiclesTracked ? vechiclesTracked : ' - '} </p>
          </div>
        </article>
        <article className="box">
          <div>
            <i className="fas fa-users"> </i> <h4> Users </h4>
          </div>
          <div className="users">
            <p> {users > 0 ? users : ' - '} </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Statistics;
