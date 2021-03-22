import Login from './components/User/Login';
import Register from './components/User/Register';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Statistics from './components/Statistics';
import Features from './components/Features';
import Cars from './components/Cars';
import AddCar from './components/AddCar';
import coverImg from './images/title.jfif';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="wrapper header">
          <div className="title">
            <i className="fas fa-gas-pump"> </i>
            Fuel Tracker
          </div>
          <Navigation />
        </div>
      </header>
      <main>
        <Login />
        <Register />
        <div className="wrapper">
          <section className="heading">
            <div className="heading-title">
              <h1> Managing your Vehicles, Expenses & Time </h1>
              <h3> Easy and everywhere! </h3>
            </div>
            <div className="heading-img">
              <img src={coverImg} alt="" />
            </div>
          </section>
          <section className="main-content">
            <Statistics />
            <Features />
            <AddCar />
          </section>
          <aside>
            <Cars />
          </aside>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
