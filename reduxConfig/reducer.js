const initialState = {
    bookList: null,
    purchaseList: [],
    user: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'bookList':
            return { ...state, bookList: action.payload };
        case 'purchaseList':
            return { ...state, purchaseList: action.payload };
        case 'setUser':
            return { ...state, user: action.payload };
        case 'signOut':
            return initialState;
        default:
            return state;
    }
};