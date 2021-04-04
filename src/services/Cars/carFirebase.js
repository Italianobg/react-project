import { firestore } from '../../firebase/firebase';
const db = firestore;

function addCar(type, make, model, imageUrl) {
    return db.collection('cars')
        .add({
            type,
            make,
            model,
            imageUrl,
        })
}

function editCar(type, make, model, imageUrl, id) {
    return db.collection('cars').doc(id)
        .update({
            type,
            make,
            model,
            imageUrl,
        })
}

function getAllCars() {
    return db.collection('cars')
        .get()
}

function getCarDetails(id) {
    return db.collection('cars')
        .doc(id)
        .get()
}

function deleteCar(id) {
    return db.collection('cars')
        .doc(id)
        .delete()
}

export {
    addCar,
    editCar,
    getAllCars,
    getCarDetails,
    deleteCar
}