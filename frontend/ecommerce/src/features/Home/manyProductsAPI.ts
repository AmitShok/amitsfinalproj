import axios from "axios";
import { SERVER } from "../../globalVar";

export function addProdFetch(creds:any) {
    console.log(creds);
    return new Promise<{ data: any }>((resolve) =>
      axios
        .post(SERVER + "upload_image/", creds, {headers:{"content-type": "multipart/form-data",
      } })
        .then((res) => resolve({ data: res.data }))
    );
  }
  
  // export function getAllProducts() {
  //   return new Promise<{ data: any }>((resolve) =>
  //   axios.get(SERVER + "myProducts")
  //       .then((res) => resolve({ data: res.data }))
  //   );
  // }
  export function getAllProducts(allProducts = false) {
    const url = allProducts ? `${SERVER}myProducts?all=true` : `${SERVER}myProducts`;
    return new Promise<{ data: any }>((resolve) =>
      axios.get(url).then((res) => resolve({ data: res.data }))
    );
  }
  

  export function getNextProds(creds:string) {
    return new Promise<{ data: any }>((resolve) =>
    axios.get(creds)
        .then((res) => resolve({ data: res.data }))
    );
  }