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

function getAllCars() {
    return db.collection('cars')
        .get()
}

export {
    addCar,
    getAllCars,
}