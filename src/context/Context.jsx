import { createContext, useState } from "react";
import runChat from "../config/gemini";
// import runChat from "../config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {
const [input,setInput] = useState('');
const [recentPrompt,setRecentPrompt] = useState('');
const [previewsPrompt,setPreviesPrompt]= useState([]);
const [showResult,setShowResult]=useState(false);
const [loading,setLoading]=useState(false);
const [resultData,setResultData]=useState('');


const delayPara = (index,nextWord)=>{
setTimeout(function(){
setResultData(prev=>prev+nextWord);
},75*index)
}


const newChat = ()=>{
  setLoading(false);
  setShowResult(false);
}
  const onSend = async (prompt) => {

    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt !== undefined){
      response = await runChat(prompt);
      setRecentPrompt(prompt)
    }else{
      setPreviesPrompt(prev=>[...prev,input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    // setPreviesPrompt(prev=>[...prev,input]);
    // const response = await runChat(input);


    setRecentPrompt(input);
    let responseArray = response.split("**");
    let newResponse = "";
    for(let i = 0; i<responseArray.length;i++){
      if(i===0 || i%2 !== 1){
        newResponse += responseArray[i];
      }else{
        newResponse+= "<b>"+responseArray[i]+"</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    // setResultData(response);
    // setResultData(newResponse);


    // setResultData(newResponse2)

    let newResponseArray = newResponse2.split(" ");
    for(let i = 0; i< newResponseArray.length; i++){
      const nextWord = newResponseArray[i];
      delayPara(i,nextWord+" ");
    }
    setLoading(false);
    setInput("");
  };

  // onSend("what is male actor name of devdas indian move?");

  const contextValue = {
    previewsPrompt,
    setPreviesPrompt,
    onSend,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
    newChat,

  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;


// import { createContext, useEffect } from "react";
// import runChat from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   useEffect(() => {
//     const testApi = async () => {
//       try {
//         const response = await runChat("what is reactjs?");
//         console.log("API Response:", response);
//       } catch (error) {
//         console.error("API Error:", error);
//       }
//     };
    
//     testApi();
//   }, []);

//   const onSend = async (prompt) => {
//     return await runChat(prompt);
//   };

//   const contextValue = {
//     onSend
//   };

//   return (
//     <Context.Provider value={contextValue}>{props.children}</Context.Provider>
//   );
// };

// export default ContextProvider;