import axios from "axios";
import AdminHead from "./head";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')
function Merchants(){
    const[merchants,setMerchant] = useState([])
    const[count,setCount] = useState([])
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointViewMerchants,header)
        .then(response => {
          console.log(response.data)
          setMerchant(response.data)
          
       })
       .catch(err => {
          console.log(err);
       })
    },[count])

    const MerchantAddAction = e =>{
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
        axios.post(rest.endPointAddMerchant,postdata,header)
        .then(response => {
          console.log(response.data)
          alert(response.data)
          document.getElementById("name").value="";
          document.getElementById("email").value="";
          document.getElementById("phone").value="";
          document.getElementById("password").value="";
          document.getElementById("address").value="";
          setCount(count+1)

          
       })
       .catch(err => {
          console.log(err);
       })

    }
    return(
        <>
        <AdminHead/>
        <div className="conatainer">
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 mt-4">
                        <div className="text-center h4">Add New Vendor</div>
                    <form onSubmit={MerchantAddAction}>
                            <div className="form-group mt-1">
                                <label>Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Name" maxLength="50" required onKeyPress={(event) => {
                                    if (!/^[A-Za-z0-9]*$/.test(event.key)) {event.preventDefault();}}}></input>
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
                            
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="text-center h4 mt-3">Vendors List</div>
                    <table className="table table-bordered mt-2">
                        <thead>
                        <tr>
                            <th>Vendor Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                        </thead>
                      
                        <tbody>
                        {merchants.map((merchant,index)=>
                        <tr>
                            <td>{merchant['merchantId']}</td>
                            <td>{merchant['name']}</td>
                            <td>{merchant['email']}</td>
                            <td>{merchant['phone']}</td>
                            <td>{merchant['address']}</td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
export default Merchants