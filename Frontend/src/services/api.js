//const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:4000/";

console.log(BASE_URL);
//auth endpoints

export const endpoints = {
  SIGNUP_API: BASE_URL + "api/v1/auth/signup",
  LOGIN_API: BASE_URL + "api/v1/auth/login",
};

//Todo Endpoints
export const todoendpoints = {
  CREATE_TODO: BASE_URL + "api/v1/createTodo",
  DELETE_TODO: BASE_URL + "api/v1/deleteTodo/",
  GETALL_TODO: BASE_URL + "api/v1/getTodos",
};
