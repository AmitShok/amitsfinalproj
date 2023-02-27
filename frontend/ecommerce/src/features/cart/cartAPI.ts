import axios from "axios";
import { SERVER } from "../../globalVar";


// export function prodFetch(creds:any) {
//     console.log(creds);
//     return new Promise<{ data: any }>((resolve) =>
//       axios
//         .post(SERVER + "upload_image/", creds, {headers:{"content-type": "multipart/form-data",
//       } })
//         .then((res) => resolve({ data: res.data }))
//     );
//   }
  

export function sendOrder(creds:any) {
  console.log(creds);
  return new Promise<{ data: any }>((resolve) =>
    axios
      .post(SERVER + "order", creds, {headers:{"content-type": "application/json",'Authorization': `Bearer ${localStorage.getItem('axx')}`
    } })
      .then((res) => resolve({ data: res.data }))
  );
}
