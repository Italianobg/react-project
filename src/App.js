import Login from './components/User/Login';
import Register from './components/User/Register';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Statistics from './components/Statistics';
import Features from './components/Features';
import Cars from './components/Cars';
import AddCar from './components/AddCar/AddCar';
import coverImg from './images/title.jfif';
import './App.css';
import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllCars } from './services/Cars/carFirebase';
import CarDetails from './components/CarDetails';

function App() {
  const [carList, setCarList] = useState([]);

  function setCarListHandler(carList) {
    setCarList(carList);
  }
  useEffect(() => {
    console.log('getAllCars');
    getAllCars().then((cars) => {
      setCarList(
        cars.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

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
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
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
            <Route path={['/', '/login', '/register']} exact>
              <Statistics carList={carList} />
              <Features />
            </Route>
            <Route path="/add-car" component={AddCar} exact />
            <Route path="/car/edit/:id" component={AddCar} exact />
          </section>
          <section>
            <Route path={['/', '/login', '/register']} exact>
              <Cars carList={carList} setCarListHandler={setCarListHandler} />
            </Route>
            <Route path={['/car/:id', '/car/fuel-up/:id']} exact>
              <CarDetails />
            </Route>
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
