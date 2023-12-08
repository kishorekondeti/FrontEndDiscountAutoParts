import axios from "axios";
import Head from "./head";
import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')

function AdminLogin(){
    const navigate = useNavigate();
    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }

    function AdminLogginAction(e){
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        
        let postData = {
            "email":email,
            "password":password
        }
        axios.post(rest.endPointAlogin,postData,header)
        .then(response => {
          console.log(response.data)
          if(response.data==='Invalid Login Details'){
            alert("Invalid Login Details")
            return
        }
        else{
           Cookies.set("token",response.data)
            Cookies.set("role","Admin")
            navigate("/ahome")
        }
          

          
       })
       .catch(err => {
          alert("Soemthing Went Wrong")
       })


    }
    return(
        <>
        <Head/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-3 mt-5">
                    <div className="text-center h4">Admin Login</div>
                        <form onSubmit={AdminLogginAction}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" id="email" className="form-control mt-1 p-3" placeholder="Enter Email" maxLength="50" required></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" id="password" className="form-control mt-1 p-3" placeholder="Enter Password" required></input>
                            </div>
                            <input type="submit" value={"Login"} className="btn btn-primary  w-100 mt-3"></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default AdminLogin;