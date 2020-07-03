import { LOAD_ADDRESSES, ADD_ADDRESS, REMOVE_ADDRESS, REQUEST_FAIL } from '../Actions/types';

const INITIAL_STATE = {
    addressList: [],
    addStatus: -1,
    removeStatus: -1,
    isRequestFail: -1
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_ADDRESSES:
            return { ...state, addressList: action.payload, isRequestFail: 0 };
        case ADD_ADDRESS:
            return { ...state, addStatus: action.payload, removeStatus: -1, isRequestFail: 0 };
        case REMOVE_ADDRESS:
            return { ...state, removeStatus: action.payload, addStatus: -1, isRequestFail: 0 };
        case REQUEST_FAIL:
            return { ...state, isRequestFail: 1, removeStatus: -1, addStatus: -1 };
        default:
            return { INITIAL_STATE };
    }
};