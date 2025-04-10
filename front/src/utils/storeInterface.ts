export interface User {
    id : string;
    username : string;
}
export interface userStoreType {
    user : User | null;
    updateUser : (user : User | null) => void,
    token : string | null,
    updateToken : (token: string | null)=> void
}
