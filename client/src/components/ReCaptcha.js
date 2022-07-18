import { useState, useEffect, useCallback } from 'react';
import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha
} from 'react-google-recaptcha-v3'
import axios from 'axios';
import {Button} from '@mui/material'


export const ReCaptcha = ({setToken, setValidationResponse}) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }
        const token = await executeRecaptcha("action")
        console.log(token)

        setToken(token)
        axios.post('http://localhost:5000/api/captcha',{token:token}).then((response) => {setValidationResponse(JSON.stringify(response.data))})
    }, [executeRecaptcha,setToken]);
    return <Button variant="contained" onClick={handleReCaptchaVerify}>Verify recaptcha</Button>
}
export const Captcha = () => {
    const [token,setToken] = useState("Not yet set")
    const [validationResponse, setValidationResponse] = useState("Not yet set")
    return (
        <div style={{ padding: "10", flexDirection: "column", width: '100%', display: "flex", alignItems: "center" }}>
            <h1>Testing recaptcha</h1>
            <GoogleReCaptchaProvider reCaptchaKey="6LfxzNwgAAAAAKTHGLz0G4kYKxgyesgjWbyCPcNY">
                < ReCaptcha setToken={setToken} setValidationResponse={setValidationResponse}/>
            </GoogleReCaptchaProvider>
            <h4>Token:</h4> 
            <p style={{maxWidth:"70%", wordWrap:"break-word"}}>{token}</p>
            <h4>Validation response: {validationResponse}</h4>
        </div>
    );
}
