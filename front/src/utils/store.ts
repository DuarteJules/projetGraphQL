// store.js
export interface User {
   id : string;
   username : string;
}

export const storeUser = (user : User): void => {
   localStorage.setItem('user', JSON.stringify(user))
}

export const storeToken = (token : string): void => {
   localStorage.setItem('token', JSON.stringify(token))
}
