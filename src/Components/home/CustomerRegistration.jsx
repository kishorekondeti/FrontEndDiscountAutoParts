import axios from "axios";
import Head from "./head";
import React from "react";
import { Link } from "react-router-dom";
const rest = require('../../EndPoints')
function CustomerRegistration(){
    let header = {
        headers: {
            "Content-type": "Application/json"
        }
    }

    const CustomerRegAction = e =>{
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let password= document.getElementById("password").value;
        let address = document.getElementById("address").value;
       
        let postdata = {
            "name":name,
            "email":email,
            "phone":phone,
            "password":password,
            "address":address
        }
        axios.post(rest.endPointCReg,postdata,header)
        .then(response => {
          console.log(response.data)
          alert(response.data)
          document.getElementById("name").value="";
          document.getElementById("email").value="";
          document.getElementById("phone").value="";
          document.getElementById("password").value="";
          document.getElementById("address").value="";

          
       })
       .catch(err => {
          console.log(err);
       })

         

    }

    return(
        <>
        <Head/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card p-4 mt-4">
                        <div className="text-center h4">New Customer Registration</div>
                        <form onSubmit={CustomerRegAction}>
                            <div className="form-group mt-1">
                                <label>Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Name" maxLength="50" required onKeyPress={(event) => {
                                    if (!/^[A-Za-z]*$/.test(event.key)) {event.preventDefault();}}}></input>
                            </div>
                            <div className="form-group mt-1">
                                <label>Email</label>
                                <input type="email" className="form-control mt-1" id="email" placeholder="Enter Email" maxLength="50" required></input>
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="tel" className="form-control mt-1" id="phone" placeholder="Enter Phone Number" maxLength="10" required onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control mt-1" id="password" placeholder="Enter Password" required></input>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <textarea id="address" className="form-control" placeholder="Address" required></textarea>
                            </div>
                            <input type="submit" value="Register" className="btn btn-primary w-100 mt-2"></input>
                            <div className="mt-3">
                               Already Account ?<Link to={"/clogin"} >Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
              
            </div>
        </div>
        </>
    )
}
export default CustomerRegistration;