import { useOktaAuth } from "@okta/okta-react"
import { SpinnerLoading } from "../components/utils/SpinnerLoading";
import {Navigate} from "react-router-dom"
import OktaSignInWidget from "./OktaSignInWidget";

const LoginWidget =({config}) =>{
    const {oktaAuth, authState} = useOktaAuth();
    const onSuccess = (tokens) =>{
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err)=>{
        console.log("Sing in error:", err);
    }

    if(!authState){
        return(
            <SpinnerLoading />
        );
    }
    return authState.isAuthenticated ?
    <Navigate to={{pathname:"/"}} />
    :
    <OktaSignInWidget onSuccess={onSuccess} onError={onError} config={config} />
};

export default LoginWidget;