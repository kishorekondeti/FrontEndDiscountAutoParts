import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import CustomerHead from "./head";
import MerchantHead from "../merchant/head";
import axios from "axios";
const rest = require('../../EndPoints')
function GetRatings(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productId = params.get('productId');
    const[reviews,setReviews] = useState([])
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`   
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointGetRatings+"?productId="+productId,header)
        .then(response => {
            console.log(response.data);
         setReviews(response.data)
          
       })
       .catch(err => {
          console.log(err);
       })
    },[])

    return(
        <>
        {Cookies.get("role")==='Customer'?<><CustomerHead/></>:<></>}
        {Cookies.get("role")==='Merchant'?<><MerchantHead/></>:<></>}
        <div className="container mt-1">
            <div className="text-center mt-1 h5">Total Reviews</div>
            <div className="text-center h5  mt-5" id="review" style={{lineHeight:"100px"}}></div>
            <div className="row">
            <div className="col-md-2"></div>
             <div className="col-md-10">
                <div className="row">
                    {reviews.map((review,index)=>
                    <div className="card p-3 mt-2">
                        <div className="row">
                        <div className="col-md-4">
                            <div className="" style={{fontSize:"12px"}}>Rating : <b>{review['rating']}</b></div>
                        </div>
                        <div className="col-md-4">
                            <div className="" style={{fontSize:"12px"}}>Review By : <b className="h6">{review['customerModel']['name']}({review['customerModel']['phone']})</b></div>
                        </div>
                        <div className="col-md-4">
                            <div className="" style={{fontSize:"12px"}}>Date : <b style={{fontSize:"12px"}}>{review['date'].split('T')[0]}</b></div>
                        </div>
                     
                        </div>
                        <div className="card-body">
                            <div className="text-secondary " style={{fontSize:"12px"}}>Review</div>
                            <div className="h6 mt-1">{review['review']}</div>
                        </div>
                    </div>
                    )}
                </div>
   
            </div> 
            </div>
        </div>

        </>
    )
}
export default GetRatings;