import Navigation from './components/Navigation.js';
import Footer from './components/Footer.js';
import Statistics from './components/Statistics.js';
import Features from './components/Features.js';
import coverImg from './images/title.jfif';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="wrapper header">
          <div className="title">
            <i class="fas fa-gas-pump"></i>
            Fuel Tracker
          </div>
          <Navigation />
        </div>
      </header>
      <main>
        <div className="wrapper">
          <section className="heading">
            <div className="heading-title">
              <h1>Managing your Vehicles, Expenses & Time</h1>
              <h3>Easy and everywhere!</h3>
            </div>
            <div className="heading-img">
              <img src={coverImg} alt="" srcset="" />
            </div>
          </section>
          <Statistics />
          <Features />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
