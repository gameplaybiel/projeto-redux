import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 user: null,
 users: [],
 loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: (state, action) => {

            if(action.payload.name.length <= 4){
                alert('PREENCHA UM NOME COM MAIS DE 4 letras');
                return { ...state }
            }

            return {
                ...state,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    address: null,
                }
            }
        },
        logoutUser: (state) => {
            return {
                ...state,
                user: null,
            };
        },
        addAddress: (state, action) => {
            if(action.payload.location === '' || action.payload.number === ''){
                alert('Preencha todos os campos')
                return { ...state }
            }

            if(state.user === null){
                alert('Faça o login para cadastrar um endereço')
                return { ...state }
            }
            alert('Dados atualizados!')

            return {
                ...state,
                user: {
                    ...state.user,
                    address: {
                        location: action.payload.location,
                        number: action.payload.number,
                    }
                }
            }
        },
        deleteAddress: (state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    address: null,
                }
            }
        },
        fetchUsers: (state) => {
            state.loading = true;
        },
        fecthUsersSucess: (state, action) => {
            console.log(action.payload);
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFailure: (state, action) => {
            console.log('CAIU NA FAILURE');
            console.error(action.payload);
            state.loading = false;
        },
        fetchUserById: (state) => {
        console.log('CHAMOU NO SLICE');
        },
        fetchUserByIdSucess: (state, action) => {
            console.log('User do Id');
            console.log(action.payload);
        },
        fetchUserByIdFailure: (state) => {
            console.log('DEU ERRO No fetchById');
        }
    }
})

export const { createUser, logoutUser, addAddress, deleteAddress, fetchUsers,
     fecthUsersSucess, fetchUsersFailure, fetchUserById, fetchUserByIdSucess, fetchUserByIdFailure } = userSlice.actions;
export default userSlice.reducer;