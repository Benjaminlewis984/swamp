const INITIAL_STATE = {
    buyer: '',
    seller: '',
    m_id: '',
    status: false,
    soldAmount: 0,
    transaction_id: 0,
};

const purchaseReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'USER_SET_BUYER':
            return {
                ...state,
                buyer: action.buyer,
            };
        case 'USER_SET_SELLER':
            return {
                ...state,
                seller: action.seller,
            };
        case 'USER_SET_M_ID':
            return {
                ...state,
                m_id: action.m_id,
            };
        case 'USER_SET_STATUS':
            return {
                ...state,
                status: action.status,
            };
        case 'USER_SET_LAST_SOLD_AMOUNT':
            return {
                ...state,
                soldAmount: action.soldAmount,
            };
        case 'USER_SET_TRANSACTION_ID':
            return {
                ...state,
                transaction_id: action.transaction_id,
            };
        default:
            return state;
    }
};


export default purchaseReducer;