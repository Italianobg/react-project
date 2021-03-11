import Navigation from './components/Navigation.js';
import Footer from './components/Footer.js';
import coverImg from './images/cover.jpg';
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
          <section>
            <div>
              <h1>Managing your Viechles, Expences and Time</h1>
              <h3>Easy and everywhere!</h3>
            </div>
            <img src={coverImg} alt="" srcset="" />
          </section>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
