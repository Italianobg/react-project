import './Statistics.css';

function Statistics() {
  return (
    <section className="statistics">
      <article className="box">
        <div>
          <i className="fas fa-burn"> </i> <h4> Fuel Ups </h4>{' '}
        </div>{' '}
        <div>
          <p> 40 </p>{' '}
        </div>{' '}
      </article>{' '}
      <article className="box">
        <div>
          <i className="fas fa-road"> </i> <h4> Kilometers Recorded </h4>{' '}
        </div>{' '}
        <div>
          <p> 260000 </p>{' '}
        </div>{' '}
      </article>{' '}
      <article className="box">
        <div>
          <i className="fas fa-car"> </i> <h4> Vehicles Tracked </h4>{' '}
        </div>{' '}
        <div>
          <p> 18 </p>{' '}
        </div>{' '}
      </article>{' '}
      <article className="box">
        <div>
          <i className="fas fa-users"> </i> <h4> Users </h4>{' '}
        </div>{' '}
        <div>
          <p> 2 </p>{' '}
        </div>{' '}
      </article>{' '}
    </section>
  );
}

export default Statistics;
