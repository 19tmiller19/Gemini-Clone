import { createContext, useState } from "react";
import runChat from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) =>{

    const [input, setInput] = useState("");//used to save input data
    const [recentPrompt, setRecentPrompt] = useState("");//to save a recent data input in main component
    const [prevPrompts, setPreviousPrompts] = useState([]);//array used to store input history.. displayed in "recent tab"
    const [showResult, setShowresult] = useState(false);//boolean, once its true it will hide text boxes and display result
    const [loading, setLoading] = useState(false);//boolean, once true it will display loading animation. after getting data will be false again
    const [resultData, setResultData] = useState("");//used to display results on webpage

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev =>prev + nextWord);
        },75*index)

    }
    const newChat = () =>{
        setLoading(false);
        setShowresult(false);
    }
    
    const onSent = async(prompt)=>{

        setResultData("")
        setLoading(true)//displays loading animation on screen
        setShowresult(true)
        let response ;
        if (prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }else
        {
            setPreviousPrompts(prev =>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
       
        let responseArray = response.split("**")//stores response using split method
        let newResponse="" ;
        for(let i = 0; i < responseArray.length; i++)
        {
            if( i=== 0 || i%2 != 1) //when index is even number or zero
            { newResponse += responseArray[i];

            }else{
                newResponse += "<b>" + responseArray[i] + "</b>";//whereever we get the ** that text will be added in bold
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")//adds a line break instead of a *
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++) //this will add the typeing animation
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord +" ")
        }
        setLoading(false)//hides loading animation
        setInput("") //resets input field
    }

   
    const contextValue = {
        prevPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat


    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider