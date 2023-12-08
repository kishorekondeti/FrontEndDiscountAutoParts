import axios from "axios";
import AdminHead from "./head";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')
function SubCategories(){
    const[categories,setCategory] = useState([])
    const[subCategories,setSubCategory] = useState([])
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
    })
    useEffect(()=>{
        axios.get(rest.endPointViewSubCategory2,header)
        .then(response => {
          console.log(response.data)
          setSubCategory(response.data)
          
       })
       .catch(err => {
          console.log(err);
       })
    },[count])

    const AddSubCategory  = e =>{
        e.preventDefault();
        let subCategoryName = document.getElementById("subCategoryName").value;
        let categoryId = document.getElementById("categoryId").value;
        let subCategory = {
            "subCategoryName":subCategoryName
        }
        axios.post(rest.endPointAddSubCategory+"?categoryId="+categoryId,subCategory,header)
        .then(response => {
          console.log(response.data)
          alert(response.data)
          setCount(count+1)
          
       })
       .catch(err => {
          console.log(err);
       })

       document.getElementById("subCategoryName").value="";
       document.getElementById("categoryId").value="";
        
    }
    return(
        <>
        <AdminHead/>
        <div className="container-fluid mt-3">
            <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-4">
            <form onSubmit={AddSubCategory}>
                <div className="row">
                    <div className="col-md-6">
                     <input type="text" className="form-control" id="subCategoryName" placeholder="Sub Part Name" maxLength="50" required onKeyPress={(event) => {
                                    if (!/^[A-Za-z0-9]*$/.test(event.key)) {event.preventDefault();}}}></input>
                    </div>
                    <div className="col-md-6">
                     <select className="form-control" id="categoryId" required>
                        <option>Choose Part</option>
                        {categories.map((category,index)=>
                        <option value={category['categoryId']}>{category['categoryName']}</option>
                        )}
                     </select>
                    </div>
                    <div className="text-end mt-3">
                     <input type="submit" value={"Add SubPart"} className="btn btn-primary w-50" style={{fontSize:"13px"}}></input>
                    </div>
                </div>
                
            </form>

            <table className="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th>Part Id</th>
                        <th>SubPart Name</th>
                        <th>Part</th>
                    </tr>
                </thead>
                <tbody>
                   {subCategories.map((subCategory,index)=>
                    <tr>
                     <td>{subCategory['subCategoryId']}</td>
                     <td>{subCategory['subCategoryName']}</td>
                     <td>{subCategory['categoryModel']['categoryName']}</td>
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
export default SubCategories;