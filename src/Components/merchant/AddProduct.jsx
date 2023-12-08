import axios from "axios";
import MerchantHead from "./head";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const rest = require('../../EndPoints')
function AddProduct(){
    const[subCategoryies,setSubCategory] = useState([])
    const[brands,setBrand] = useState([])
    const [state, setState] = useState([])
    const fileSelectedHandler = (event) => {
        setState({
        selectedFile: event.target.files[0],
        filename: event.target.files
        })
    }

    let header = {
        headers: {
            'Content-Type': "multipart/form-data",
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
    },[])

    useEffect(()=>{
        axios.get(rest.endPointViewSubCategory2,header)
        .then(response => {
          console.log(response.data)
          setSubCategory(response.data)
          
       })
       .catch(err => {
          console.log(err);
       })
    },[])

    const ProductAction = e =>{
        e.preventDefault();
        let productName = document.getElementById("productName").value;
        let subCategoryId = document.getElementById("subCategoryId").value;
        let about = document.getElementById("about").value;
        let price = document.getElementById("price").value;
        let brandId = document.getElementById("brandId").value;
        let picture = document.getElementById("picture").value;

       let data = new FormData();
       data.append("productName",productName)
       data.append("about",about)
       data.append("price",price)
       data.append("subCategoryId",subCategoryId)
       data.append("brandId",brandId)
       data.append("picture",state.selectedFile)
       axios.post(rest. endPointAddProduct,data,header)
       .then(response => {
           alert(response.data);
           document.getElementById("productName").value="";
           document.getElementById("price").value="";
           document.getElementById("about").value="";

       })
       .catch(err => {
           console.log(err)
       })


    }

    
    
    return(
        <>
        <MerchantHead/>
        <div className="container mt-5">
        <form onSubmit={ProductAction}>
           <div className="card p-5 mt-3" >
            <div className="h4 text-center">Add Product</div>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input type="text"  className="form-control mt-1" id="productName" placeholder="Product Name" maxLength="25" required onKeyPress={(event) => {
                                    if (!/^[A-Za-z ]*$/.test(event.key)) {event.preventDefault();}}}></input>
                        </div>
                        <div className="form-group mt-2">
                            <label>Choose SubCategory</label>
                            <select id="subCategoryId" className="form-control mt-1" >
                                {subCategoryies.map((subCategory,index)=>
                                <option value={subCategory['subCategoryId']}>{subCategory['subCategoryName']}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group mt-1">
                            <label>About</label>
                            <textarea id="about"  className="form-control mt-1" placeholder="About Product" required></textarea>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="form-group mt-1">
                            <label>Price</label>
                                <div className="input-group mt-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <input type="number"  className="form-control border-left-0" id="price" placeholder="1 - 25000" min="1" max="25000" step="0.01" pattern="\d*" onChange={(e) => {
                                        if (e.target.value < 1 || e.target.value > 25000) {e.target.value = '';} else if (!/^\d*(\.\d{1,2})?$/.test(e.target.value)) {
                                            e.target.value = '';    
                                          } }} required></input>
                                </div>
                        </div>
                        <div className="form-group mt-2">
                            <label>Choose Brand</label>
                                <select id="brandId" className="form-control mt-2" >
                                    {brands.map((brand,index)=>
                                    <option value={brand['brandId']}>{brand['brandName']}</option>)}
                                </select>
                        </div>
                        <div className="form-group mt-2">
                            <label>Upload Picture</label>
                            <input type="file" className="form-control mt-2" id="picture" onChange={fileSelectedHandler}  placeholder="Price" accept="image/jpeg, image/png" required></input>
                        </div>
                        <div className="mt-4">
                          <input type="submit" value={"Add Product"} className="btn btn-primary w-100"></input>
                        </div>
                    </div>
                </div>
           </div>
        </form>
        </div>
        </>
    )
}
export default AddProduct;