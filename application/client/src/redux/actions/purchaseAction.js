export const setBuyer = buyer => ({
    type: 'USER_SET_BUYER',
    buyer,
});
export const setSeller = seller => ({
    type: 'USER_SET_SELLER',
    seller,
});
export const setM_id = m_id => ({
    type: 'USER_SET_M_ID',
    m_id,
});
export const setTransactionId = transactionId => ({
    type: 'USER_SET_TRANSACTION_ID',
    transactionId,
});
export const setSoldAmount = soldAmount => ({
    type: 'USER_SET_LAST_SOLD_AMOUNT',
    soldAmount,
});
export const setStatus = status => ({
    type: 'USER_SET_STATUS',
    status,
});

export const sendingApproval = () => (dispatchEvent, getState) => {
    console.log('sending approval Function !!!');

    const username = getState().signupReducer.username;
    const seller = getState().purchaseReducer.seller;
    const status = getState().purchaseReducer.status;
    const m_id = getState().purchaseReducer.m_id;
    const transaction_id = getState().purchaseReducer.transaction_id;

    const axios = require("axios");
    const body = {
        username: `${username}`,
        seller: `${seller}`,
        status: `${status}`,
        m_id: `${m_id}`,
        transaction_id: `${transaction_id}`,
    };

    axios.post(`/purchases`, body, { validateStatus: false })
        .then((response) => {
            console.log("Response from backend", response);
            if (response.data.success === 'true') {
                console.log("Successfully SENT");
            }
            else {
                console.log("ERROR in SENDING");
            }
        })
    //}
    // })

};

