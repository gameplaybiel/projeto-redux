import { all, takeEvery, call, put, delay, takeLatest } from 'redux-saga/effects';
import { fecthUsersSucess, fetchUsersFailure,fetchUserByIdFailure, fetchUserByIdSucess } from './slice';
import axios from 'axios';

function* fetchUsers(){
    try {
        yield delay(2000); // Simula um atraso de 2 segundos
        const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
        yield put(fecthUsersSucess(response.data));
    } catch(error){
        yield put(fetchUsersFailure(error.message));
    }
}

function* fetchUserById(action){
    try{
        const userId = action.payload;
        const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/`);
        yield put(fetchUserByIdSucess(response.data));
    } catch(error){
        yield put(fetchUserByIdFailure(error.message));
    }
}

export default all([
    takeEvery('user/fetchUsers', fetchUsers),
    takeEvery('user/fetchUserById', fetchUserById),
]);