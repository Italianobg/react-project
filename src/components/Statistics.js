import './Statistics.css';

function Statistics(props) {
  return (
    <section className="statistics">
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
                  .reduce((a, b) => ({
                    'Fuel Ups': a['Fuel Ups'].length + b['Fuel Ups'].length,
                  }))['Fuel Ups']
              : ''}
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
              : ''}
          </p>
        </div>
      </article>
      <article className="box">
        <div>
          <i className="fas fa-car"> </i> <h4> Vehicles Tracked </h4>
        </div>
        <div>
          <p> {props.carList.length} </p>
        </div>
      </article>
      <article className="box">
        <div>
          <i className="fas fa-users"> </i> <h4> Users </h4>
        </div>
        <div>
          <p> 2 </p>
        </div>
      </article>
    </section>
  );
}

export default Statistics;
