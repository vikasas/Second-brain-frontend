import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export  function useContent(){
    const [contents , Setcontents] = useState([]);
    const [newcontent , setNewcontent] = useState(false);
    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content` , {
        headers:{
            "Authorization" : localStorage.getItem("token")
        }}).then((response) => {
        Setcontents(response.data.content)
         })
    }

    useEffect(() => {
        refresh()
    } , [])

    useEffect(()=>{
        if(newcontent){
            refresh();
            setNewcontent(false);
        }
    }, [newcontent])
    
    return {content : contents , refresh}
    
}

// hooks/useContent.ts
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../config";

// export function useContent() {
//   const [contents, setContents] = useState([]);
//   const [newContentAdded, setNewContentAdded] = useState(false);

//   const refresh = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       });
//       setContents(response.data.content);
//     } catch (err) {
//       console.error("Failed to fetch content", err);
//     }
//   };

//   useEffect(() => {
//     // Initial fetch
//     refresh();
//   }, []);

//   useEffect(() => {
//     if (newContentAdded) {
//       refresh();
//       setNewContentAdded(false); // reset the flag after refreshing
//     }
//   }, [newContentAdded]);

//   return { content: contents, triggerRefresh: () => setNewContentAdded(true) };
// }
