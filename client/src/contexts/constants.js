export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : 'some production url';

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern';

export const POST_LOADED_SUCCESS = 'POST_LOADED_SUCCESS';
export const POST_LOADED_FAIL = 'POST_LOADED_FAIL';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const FIND_POST = 'FIND_POST';
