import Login from './components/User/Login';
import Register from './components/User/Register';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Statistics from './components/Statistics';
import Features from './components/Features';
import Cars from './components/Cars/View/Cars';
import AddEditCar from './components/Add-Edit Car/AddEditCar';
import coverImg from './images/title.jfif';
import { Link, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllCars } from './services/Cars/carFirebase';
import CarDetails from './components/Cars/View/CarDetails';
import APIErrorProvider from './provider/APIErrorProvider';
import APIErrorNotification from './components/APIErrorNotification';
import useAPIUser from './hooks/useAPIUser';
import './App.css';

function App() {
  const [carList, setCarList] = useState([]);
  const { user } = useAPIUser();

  function setCarListHandler(carList) {
    setCarList(carList);
  }
  useEffect(() => {
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
    <APIErrorProvider>
      <APIErrorNotification />
      <div className="App">
        <header>
          <div className="wrapper header">
            <div className="title">
              <Link to="/">
                <i className="fas fa-gas-pump"> </i>
                Fuel Tracker
              </Link>
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
                {user !== null && user.user !== null ? '' : <Features />}
              </Route>
              <Route path="/add-car" component={AddEditCar} exact />
              <Route path="/car/edit/:id" component={AddEditCar} exact />
            </section>
            <section>
              {user !== null && user.user !== null ? (
                <Route path={['/', '/login', '/register']} exact>
                  <Cars
                    carList={carList}
                    setCarListHandler={setCarListHandler}
                  />
                </Route>
              ) : (
                ''
              )}

              <Route
                path={[
                  '/car/:id',
                  '/car/fuel-up/:id',
                  '/car/fuel-ups/:id',
                  '/car/fuel-ups/:id/edit/:number',
                ]}
                exact
              >
                <CarDetails />
              </Route>
            </section>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </APIErrorProvider>
  );
}

export default App;
