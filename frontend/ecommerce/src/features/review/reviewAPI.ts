import axios from "axios";
import { SERVER } from "../../globalVar";


  export function getReviews() {
    return new Promise<{ data: any }>((resolve) =>
    axios
        .post(SERVER + "reviews",{headers:{'Authorization': `Bearer ${localStorage.getItem('axx')}`
      } })
        .then((res) => resolve({ data: res.data }))
    );
  }


  export function sendNewReview(creds:any) {
    return new Promise<{ data: any }>((resolve) =>
    axios
        .post(SERVER + "createreview",creds,{headers:{'Authorization': `Bearer ${localStorage.getItem('axx')}`
      } })
        .then((res) => resolve({ data: res.data }))
    );
  }





// export function sendOrder(creds:any) {
//   console.log(creds);
//   return new Promise<{ data: any }>((resolve) =>
//     axios
//       .post(SERVER + "order", creds, {headers:{"content-type": "application/json",'Authorization': `Bearer ${localStorage.getItem('axx')}`
//     } })
//       .then((res) => resolve({ data: res.data }))
//   );
// }
