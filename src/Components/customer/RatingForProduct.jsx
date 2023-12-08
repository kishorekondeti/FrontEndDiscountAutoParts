import { useNavigate } from "react-router-dom";
import CustomerHead from "./head";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require('../../EndPoints')
function RatingForProduct(){
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`   
        }
    }
    const navigate = useNavigate();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productId = params.get('productId');
    let orderItemId = params.get("orderItemId")
    const ratingAction = e =>{
        e.preventDefault();
        let rating = document.getElementById("rating").value;
        let productId = document.getElementById("productId").value;
        let review = document.getElementById("review").value;
        let orderItemId = document.getElementById("orderItemId").value;
        axios.get(rest.endPointRatingForProduct+"?productId="+productId+"&review="+review+"&rating="+rating+"&orderItemId="+orderItemId,header)
        .then(response => {
            alert(response.data);
            navigate("/viewOrders?type=history")
 
        })
        .catch(err => {
            console.log(err)
        })


    }
    return(
        <>
        <CustomerHead/>
        <div className="container mt-3" style={{position:'absolute',top:'50px',left:'150px'}}>
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-5 mt-5">
                <div className="card p-3">
                    <div className="text-center h4">Give Rating</div>
                    <form onSubmit={ratingAction}>
                        <input type="hidden" id="productId" value={productId}></input>
                        <input type="hidden" id="orderItemId" value={orderItemId}></input>
                        <div className="form-group">
                            <label>Rating</label>
                            <select id="rating" className="form-control mt-1">
                                <option value={"5"}>5</option>
                                <option value={"4"}>4</option>
                                <option value={"3"}>3</option>
                                <option value={"2"}>2</option>
                                <option value={"1"}>1</option>
                            </select>
                        </div>
                        <div className="form-group mt-1">
                            <label>Review</label>
                            <textarea id="review" className="form-control mt-1" placeholder="Comment"></textarea>
                        </div>
                        <input type="submit" value={"Submit"} className="btn btn-primary w-100 mt-3"></input>
                        
                    </form>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default RatingForProduct;