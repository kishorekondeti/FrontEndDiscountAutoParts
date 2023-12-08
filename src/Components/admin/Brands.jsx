import Cookies from "js-cookie";
import AdminHead from "./head"
import React, { useEffect, useState } from "react";
import axios from "axios";
const rest = require('../../EndPoints')
function Brands(){
    const[brands,setBrand] = useState([])
    const[count,setCount]  = useState([])
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointViewBrand,header)
        .then(response => {
          console.log(response.data)
          setBrand(response.data)
          
       })
       .catch(err => {
          console.log(err);
       })
    },[count])
    
    const AddBrand = e =>{
    e.preventDefault();
    let brandName = document.getElementById("brandName").value;
    let postdata = {
        "brandName":brandName
    }
    axios.post(rest.endPointAddBrand,postdata,header)
       .then(response => {
         alert(response.data)
         document.getElementById("brandName").value="";
         setCount(count+1)
      })
      .catch(err => {
          alert("Something Went Wrong")
      })

      document.getElementById("brandName").value="";



    }
    return(
        <>
        <AdminHead/>
        <div className="container-fluid mt-3">
            <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-4">
            <form onSubmit={AddBrand}>
                <div className="row">
                    <div className="col-md-6">
                    <input type="text" className="form-control" id="brandName" placeholder="Brand Name" maxLength="20" required onKeyPress={(event) => {
                                    if (!/^[A-Za-z]*$/.test(event.key)) {event.preventDefault();}}}></input>
                    </div>
                    <div className="col-md-6">
                    <input type="submit" value={"Add Brand"} className="btn btn-primary w-100" style={{fontSize:"16"}}></input>
                    </div>
                </div>
                
            </form>

            <table className="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th>Brand Id</th>
                        <th>Brand Name</th>
                    </tr>
                </thead>
                <tbody>
                  {brands.map((brand,index)=>
                  <tr>
                    <td>{brand['brandId']}</td>
                    <td>{brand['brandName']}</td>
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
export default Brands