import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
function Logout(){
    const navigate = useNavigate();
    useEffect(()=>{
        Cookies.remove('token')
        Cookies.remove("role")
        navigate("/")
    })
    return(
        <>
     
        </>
    )
}
export default Logout;