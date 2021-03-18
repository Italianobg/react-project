import './Features.css';
import { Component } from 'react';

class Features extends Component {
  render() {
    return (
      <section className="features">
        <div className="wrapper">
          <h2>Features</h2>
          <div className="line"></div>
          <article>
            <i className="far fa-lightbulb"></i>
            <div>
              <h3>Driver Smarter</h3>
              <p>
                Record fill-ups for all your cars and monitor your car’s
                efficiency.
              </p>
            </div>
          </article>
          <article>
            <i className="fas fa-cloud"></i>
            <div>
              <h3>Cloud Backup</h3>
              <p>
                Sign into the cloud and get easy access to all your data from
                anywhere and any device.
              </p>
            </div>
          </article>
          <article>
            <i className="fas fa-check-square"></i>
            <div>
              <h3>Control Your Expences</h3>
              <p>
                Know your vehicle's running costs and plan for your expenses.
              </p>
            </div>
          </article>
          <article>
            <i className="fas fa-money-bill-wave"></i>
            <div>
              <h3>Explore Gas Prices</h3>
              <p>Check the current gas prices at locations nearby.</p>
            </div>
          </article>
          <article>
            <i className="fas fa-stopwatch"></i>
            <div>
              <h3>Service Reminders</h3>
              <p>
                Log your repairs and services. We will remind you when it is{' '}
              </p>
            </div>
          </article>
        </div>
      </section>
    );
  }
}

export default Features;
