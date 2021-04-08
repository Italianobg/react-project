import api from '../api';

export const getAll = () => {
    return fetch(api.cars)
        .then(res => res.json())
};