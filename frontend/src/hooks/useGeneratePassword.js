/* eslint-disable no-useless-escape */
import { useState } from "react"

const useGeneratePassword = () =>{
    
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")

    const generatePassword = (checkboxData , length) =>{
        let charset = "", 
        generatedPassword = ""

        const selectedOptions = checkboxData.filter((check)=>check.state)

        if(selectedOptions.length === 0){
            setErrorMessage("Select at least one option");
            setPassword("")
            return 
        }

        selectedOptions.forEach((option)=>{
            switch(option.title){
                case "Uppercase":
                    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case "Lowercase":
                    charset += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "Numbers":
                    charset += "0123456789";
                    break;
                case "Symbols":
                    charset += "!#$%&()*+,-./:;<=>?@[\]^_{|}~";
                    break; 
                default:
                    break;
            }
        })

        for(let i=0;i<length;i++){
            const randomIndex = Math.floor(Math.random()*charset.length)
            generatedPassword += charset[randomIndex]
        }
        setPassword(generatedPassword);
        setErrorMessage("")
    }
    return {password , errorMessage , generatePassword}
}

export default useGeneratePassword