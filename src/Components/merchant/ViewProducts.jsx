import React, { useEffect, useState } from "react";
import MerchantHead from "./head";
import Cookies from "js-cookie";
import axios from "axios";
import CustomerHead from "../customer/head";
import { useNavigate } from "react-router-dom";
const rest = require('../../EndPoints')
function ViewProducts(){
    const[searchKeyword, setKeywords] = useState("")
    const[subCategoryies,setSubCategory] = useState([])
    const[categoryId,setCategoryId] = useState("")
    const[subCategoryId,setSubCategoryId] = useState([])
    const[brandId,setBrandId] = useState("")
    const[products,setProduct] = useState([])
    const[brands,setBrand] = useState([])
    const[categoryies,setCategory] = useState([])
    const navigate = useNavigate();
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`   
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointViewBrand,header)
        .then(response => {
          setBrand(response.data)
          
       })
       .catch(err => {
          console.log(err);
       })
    },[])
    useEffect(()=>{
        axios.get(rest.endPointViewCategory,header)
        .then(response => {
          setCategory(response.data)
          
       })
       .catch(err => {
          console.log(err);
       })
    },[])
    useEffect(()=>{
        
        axios.get(rest.endPointViewSubCategory+"?categoryId="+categoryId,header)
        .then(response => {
          setSubCategory(response.data)
          
       })
       .catch(err => {
          console.log(err);
       })
    },[categoryId])

    useEffect(()=>{
        axios.get(rest.endPointViewProduct+"?searchKeyword="+searchKeyword+"&categoryId="+categoryId+"&subCategoryId="+subCategoryId+"&brandId="+brandId,header)
        .then(response => {
             console.log(response.data);
             setProduct(response.data)
             
         })
     .catch(err => {
         console.log(err)
     })
    },[categoryId,searchKeyword,subCategoryId,brandId])

    const AddToCart = e =>{
        e.preventDefault();
        let quantity = e.target[0].value;
        let productId = e.target[1].value;
        console.log(quantity);
        console.log(productId);
        axios.get(rest.endPointAddToCart+"?quantity="+quantity+"&productId="+productId,header)
       .then(response => {
           alert(response.data);
           

       })
       .catch(err => {
           console.log(err)
       })


    }
    const GetRatings = (productId) =>{
        console.log(productId);
        navigate("/getRatings?productId="+productId)

    }

    return(
        <>
        {Cookies.get("role")==="Customer"?<><CustomerHead/></>:<></>}
        {Cookies.get("role")==="Merchant"?<><MerchantHead/></>:<></>}
        <div className='container-fluid mt-4'>
                <form>
                    <div className='row'>
                        <div className='col-md-3'>
                        <label style={{fontSize:"13px"}}>Search By Part</label>
                            <select className='form-control mt-1' id='categoryId' onChange={e => setCategoryId(e.target.value)}>
                            <option value={""}>Choose Part</option>
                                {categoryies.map((category,index)=>
                                <option value={category['categoryId']}>{category['categoryName']}</option>
                                )}
                            </select>
                        </div>
                        <div className='col-md-3'>
                            <label style={{fontSize:"13px"}}>Search By SubPart</label>
                            <select className='form-control mt-1' id='subCategoryId' onChange={e => setSubCategoryId(e.target.value)}>
                                <option value={""}>Choose SubPart</option>
                                {subCategoryies.map((subCategory,index)=>
                                <option value={subCategory['subCategoryId']}>{subCategory['subCategoryName']}</option>
                                )}
                            </select>
                        </div>
                        <div className='col-md-3'>
                            <label style={{fontSize:"13px"}}>Search By Brand</label>
                            <select className='form-control mt-1' id='brandId' onChange={e => setBrandId(e.target.value)}>
                            <option value={""}>Choose Brand</option>
                                {brands.map((brand,index)=>
                                <option value={brand['brandId']}>{brand['brandName']}</option>
                                )}
                            </select>
                        </div>
                        <div className='col-md-3'>
                            <label style={{fontSize:"13px"}}>Search By Product</label>
                            <input type="text" id='searchKeyword' onChange={e=>setKeywords(e.target.value)} className='form-control mt-1' placeholder='Search Product'></input>
                        </div>
                        
                    </div>
                </form>
            </div>
            <div className="container-fluid mt-5">
            <div className="row">
                {products.map((product ,index)=>
                <div className="col-md-3">
                    <div className="card p-3 mt-1">
                        <div className="text-center  card-header">{product['productName']}</div>
                        <div className="">
                            <img src={'data:image/jpeg;base64,'+product['picture2']}  style={{height:'160px',width:'100%'}}></img>
                           
                        </div>
                        <div className="row">
                            <div className="col-md-6" >
                                <div className="text-secondary mt-1" style={{fontSize:"13px"}}>Price </div>
                                <div className=""><b className=" h6">$ {product['price']}</b></div>
                                <div className="text-secondary mt-1" style={{fontSize:"13px"}}>Ratings </div>
                                <button className="nav-link" onClick={()=>GetRatings(product['productId'])}><b className=" h6">{product['rating'].toFixed(1)}</b></button>
                            </div>
                            <div className="col-md-6">
                            <div className="text-secondary mt-1" style={{fontSize:"13px"}}>Brand</div>
                               <div className=""><b>{product['brandModel']['brandName']}</b></div>
                            </div>
                        </div>
                        {Cookies.get("role")==="Customer"?<>
                        <div className="card-footer">
                       <form onSubmit={AddToCart}>
                        <div className="row">
                                <div className="col-md-7">
                                    <input type="number"  id="quantity" className="form-control" placeholder="Enter Quantity" required  min="1" max="25" pattern="\d*" onChange={(e) => {
                                        if (e.target.value < 1 || e.target.value > 25) {e.target.value = '';} }}></input>
                                    <input type="hidden" id="productId" value={product['productId']}></input>
                                </div>
                                <div className="col-md-5">
                                    <input type="submit" value="Add To Cart" className="btn btn-danger"></input>
                                </div>
                          </div>
                        </form>
                        </div>
                        </>:<></>}
                       
                    </div>
                </div>
                )}
            </div>
        </div>
        </>
    )
}
export default ViewProducts;