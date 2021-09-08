export const asyncBookList = (data) => {
    return { type: 'bookList', payload: data };
};
export const asyncPurchaseList = (data) => {
    return { type: 'purchaseList', payload: data };
};
export const asyncSetUser = (data) => {
    return { type: 'setUser', payload: data };
};
export const asyncSignOut = () => {
    return { type: 'signOut' };
};
