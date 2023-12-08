import axios from "axios";
import AdminHead from "./head";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')
function Categories(){
    const[categories,setCategory] = useState([])
    const[count,setCount] = useState([])
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointViewCategory,header)
        .then(response => {
          console.log(response.data)
          setCategory(response.data)
          
       })
       .catch(err => {
          console.log(err);
       })
    },[count])
    const AddCategory = e =>{
    e.preventDefault();
    let categoryName = document.getElementById("categoryName").value;
    let category = {
        "categoryName":categoryName
    }
    axios.post(rest.endPointAddCategory,category,header)
       .then(response => {
         alert(response.data)
         document.getElementById("categoryName").value="";
         setCount(count+1)
      })
      .catch(err => {
          alert("Something Went Wrong")
      })

      document.getElementById("categoryName").value="";

    }
    return(
        <>
        <AdminHead/>
        <div className="container-fluid mt-3">
            <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-4">
            <form onSubmit={AddCategory}>
                <div className="row">
                    <div className="col-md-6">
                    <input type="text" className="form-control" id="categoryName" placeholder="Enter Part Name" maxLength="50" required onKeyPress={(event) => {
                                    if (!/^[A-Za-z0-9]*$/.test(event.key)) {event.preventDefault();}}}></input>
                    </div>
                    <div className="col-md-6">
                    <input type="submit" value={"Add Part"} className="btn btn-primary w-100" style={{fontSize:"16"}}></input>
                    </div>
                </div>
                
            </form>

            <table className="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th>Part Id</th>
                        <th>Part Name</th>
                    </tr>
                </thead>
                <tbody>
                   {categories.map((category,index)=>
                    <tr>
                     <td>{category['categoryId']}</td>
                     <td>{category['categoryName']}</td>
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
export default Categories;