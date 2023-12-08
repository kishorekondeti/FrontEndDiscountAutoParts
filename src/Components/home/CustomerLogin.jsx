import { Link, useNavigate } from "react-router-dom";
import Head from "./head";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')
function CustomerLogin(){
    const navigate = useNavigate();
    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }


    const CustomerLoginAction = e =>{
        e.preventDefault(); 
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let postdata = {
            "email":email,
            "password":password
        }
        axios.post(rest.endPointCustomerLogin,postdata,header)
        .then(response => {
          if(response.data==='Invalid Login Details'){
            alert("Invalid Login Details")
            return
        }
        else{
            Cookies.set("token",response.data)
            Cookies.set("role","Customer")
            navigate("/chome?email=${email}")
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
                    <div className="text-center h4">Customer Login</div>
                        <form onSubmit={CustomerLoginAction}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" id="email" className="form-control mt-1 p-3" placeholder="Enter Email"></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" id="password" className="form-control mt-1 p-3" placeholder="Enter Password"></input>
                            </div>
                            <input type="submit" value={"Login"} className="btn btn-primary  w-100 mt-3"></input>
                            <div className="mt-3">
                               New Customer ?<Link to={"/CustomerReg"} >Create Account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CustomerLogin