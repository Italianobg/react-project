import { firestore } from '../../utils/firebase';
const db = firestore;

function incrementUser(counter) {
    return db.collection('totals').doc('user').set(
        counter
    );
}

function getUsersCounter() {
    return db.collection('totals').doc('user').get()
}

export { incrementUser, getUsersCounter }