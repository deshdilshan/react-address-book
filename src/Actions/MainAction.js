import { apiRequestPost, apiRequestGet } from '../Common/CommonData';
import { LOAD_ADDRESSES, ADD_ADDRESS, REMOVE_ADDRESS } from './types';
import '../Common/CommonData';

export const getAddressDetails = () => {
    return dispatch => {
        getAddressDetailsAPI(dispatch);
    }
}


const getAddressDetailsAPI = (dispatch) => {
    apiRequestGet('getAllContacts', dispatch).then(response => {
        console.log('getAddressDetailsAPI');
        console.log(response);
        if (response.status == "success") {
            var data = response['data'];
            dispatch({
                type: LOAD_ADDRESSES, payload: data
            });
        } else {
            dispatch({
                type: LOAD_ADDRESSES, payload: {}
            });
        }
    });
}



export const addAddress = (params) => {
    return dispatch => {
        addAddressAPI(dispatch, params);
    }
}


const addAddressAPI = (dispatch, params) => {
    apiRequestPost('create', params, dispatch).then(response => {
        console.log('addAddressAPI');
        console.log(response);
        if (response.status == 'success') {
            dispatch({
                type: ADD_ADDRESS, payload: 1
            });
        } else {
            dispatch({
                type: ADD_ADDRESS, payload: 0
            });
        }
    });
}


export const editAddress = (params) => {
    return dispatch => {
        console.log(params);
        editAddressAPI(dispatch, params);
    }
}


const editAddressAPI = (dispatch, params) => {
    apiRequestPost('update', params, dispatch).then(response => {
        console.log('editAddressAPI');
        console.log(response);
        if (response.status == 'success') {
            dispatch({
                type: ADD_ADDRESS, payload: 1
            });
        } else {
            dispatch({
                type: ADD_ADDRESS, payload: 0
            });
        }
    });
}

export const removeAddress = (params) => {
    return dispatch => {
        removeAddressAPI(dispatch, params);
    }
}


const removeAddressAPI = (dispatch, params) => {
    apiRequestPost('delete', params, dispatch).then(response => {
        console.log('removeAddressAPI');
        console.log(response);
        if (response.status == 'success') {
            dispatch({
                type: REMOVE_ADDRESS, payload: 1
            });
        } else {
            dispatch({
                type: REMOVE_ADDRESS, payload: 0
            });
        }
    });
}
