import { useEffect, useState } from 'react';
import useAPIError from '../hooks/useAPIError';
import { getUsersCounter } from '../services/User/userFirebase';
import './Statistics.css';

function Statistics(props) {
  const { addError } = useAPIError();
  const [users, setUsers] = useState('');

  useEffect(() => {
    getUsersCounter()
      .then((res) => {
        setUsers(res.data().counter);
      })
      .catch((err) => {
        addError(err.message);
      });
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
            <i className="fas fa-burn"> </i> <h4> Fuel Ups </h4>
          </div>
          <div>
            <p>
              {props.carList.filter((car) => car.hasOwnProperty('Fuel Ups'))
                .length > 0
                ? props.carList
                    .filter((car) => car.hasOwnProperty('Fuel Ups'))
                    .reduce((a, b) => {
                      return {
                        'Fuel Ups': a['Fuel Ups'].concat(b['Fuel Ups']),
                      };
                    })['Fuel Ups'].length
                : ' - '}
            </p>
          </div>
        </article>
        <article className="box">
          <div>
            <i className="fas fa-road"> </i> <h4> Kilometers Recorded </h4>
          </div>
          <div>
            <p>
              {props.carList.filter((car) => car.hasOwnProperty('KMsTracked'))
                .length > 0
                ? props.carList
                    .filter((car) => car.hasOwnProperty('KMsTracked'))
                    .reduce((a, b) => ({
                      KMsTracked: a['KMsTracked'] + b['KMsTracked'],
                    })).KMsTracked
                : ' - '}
            </p>
          </div>
        </article>
        <article className="box">
          <div>
            <i className="fas fa-car"> </i> <h4> Vehicles Tracked </h4>
          </div>
          <div>
            <p> {props.carList.length > 0 ? props.carList.length : ' - '} </p>
          </div>
        </article>
        <article className="box">
          <div>
            <i className="fas fa-users"> </i> <h4> Users </h4>
          </div>
          <div>
            <p> {users > 0 ? users : ' - '} </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Statistics;
