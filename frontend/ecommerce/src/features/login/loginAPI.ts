import axios from "axios";
import {SERVER} from "../../globalVar"

export function userFetch(creds:any) {
    return new Promise<{ data: any }>((resolve,reject) =>
      axios
        .post(SERVER+ "login", { username:creds.username, password:creds.password })
        .then((res) => resolve({ data: res.data }))      
        .catch((error)=>reject(error.data))

    );
  }


export function userRegister(creds:any) {
  return new Promise<{ data: any }>((resolve,reject) =>
    axios
      .post(SERVER+ "register", { username:creds.username, password:creds.password,address:creds.address,phone_number:creds.phone_number,email:creds.email })
      .then((res) => resolve({ data: res.data }))
      .catch((error)=>  reject(error.response.data))
  );
}
  
  export function refreshUser(refresh:any) {
    return new Promise<{ data: any }>((resolve) =>
      axios
        .post(SERVER+ "refresh", { refresh })
        .then((res) => resolve({ data: res.data }))
        .catch((error)=>console.log(error))
    );
  }

  export function logoutUser(refresh:any) {
    return new Promise<{ data: any }>((resolve) =>
      axios
        .post(SERVER+ "logout", { refresh })
        .then((res) => resolve({ data: res.data }))
    );
  }
