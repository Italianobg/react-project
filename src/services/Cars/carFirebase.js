import { firestore } from '../../utils/firebase';
const db = firestore;

function addCar(type, make, model, imageUrl) {
  return db.collection('cars').add({
    type,
    make,
    model,
    imageUrl,
  });
}

function addFuelUp(id, data) {
  return db
    .collection('cars')
    .doc(id)
    .set({ 'Fuel Ups': data }, { merge: true });
}

function editCar(type, make, model, imageUrl, id) {
  return db.collection('cars').doc(id).update({
    type,
    make,
    model,
    imageUrl,
  });
}

function setCarField(id, obj) {
  return db.collection('cars').doc(id).set(obj, { merge: true });
}

function getAllCars() {
  return db.collection('cars').get();
}

function getCarDetails(id) {
  return db.collection('cars').doc(id).get();
}

function deleteCar(id) {
  return db.collection('cars').doc(id).delete();
}

export {
  addCar,
  addFuelUp,
  editCar,
  setCarField,
  getAllCars,
  getCarDetails,
  deleteCar,
};
