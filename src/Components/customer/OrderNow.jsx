import { useNavigate } from "react-router-dom";
import CustomerHead from "./head";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
const rest = require('../../EndPoints')
function OrderNow(){
    const navigate = useNavigate();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let price = params.get('price');
    let orderId = params.get('orderId');
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`   
        }
    }

    const OrderProduct = e =>{
        e.preventDefault();
           var regex_care_name = /^[a-zA-Z ]*$/;
            let nameOnCard = document.getElementById("nameOnCard").value
            if(!regex_care_name.test(nameOnCard)){
                document.getElementById("nameOncard-message").innerHTML="Invalid Name on Card";
                e.preventDefault();
                return 
            }else{
                document.getElementById("nameOncard-message").innerHTML="";
            }
    
            let cardNumber = document.getElementById("cardNumber").value
            if(cardNumber.length!=16){
                document.getElementById("cardNumber-message").innerHTML="Card Number Should be 16";
                e.preventDefault();
                return 
            }else{
                document.getElementById("cardNumber-message").innerHTML="";
            }
    
            let cvv = document.getElementById("cvv").value
            if(cvv.length!=3){
                document.getElementById("cvv-message").innerHTML="Invalid CVV";
                e.preventDefault();
                return 
            }else{
                document.getElementById("cvv-message").innerHTML="";
            }
    
    
            // let expireDate = document.getElementById("expireDate").value
            // if(expireDate.length!=5){
            //     document.getElementById("date_message").innerHTML="Invalid Expire Date";
            //     e.preventDefault();
            //     return 
            // }else{
            //     document.getElementById("date_message").innerHTML="";
            // }
        let orderId = document.getElementById("orderId").value;
        axios.get(rest.endPointOrderNow+"?orderId="+orderId,header)
       .then(response => {
           alert(response.data);
           navigate("/viewOrders?type=ordered")

       })
       .catch(err => {
           console.log(err)
       })

    }
    return(
        <>
        <CustomerHead/>
        <div className="container">
    <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 mt-2">
            <div className="card p-4 mt-3 ">
                <form id="OrderMedicineForm" onSubmit={OrderProduct}>
                    <input type="hidden" id="orderId" value={orderId}></input>
                    <input type="hidden" id="totalPrice"  value={price}></input>
                    <label>Price</label>
                    <input type="text" value={price} readOnly class="form-control" />
                        <div class="mt-2">
                            <label for="nameOnCard">Name on Card</label>
                            <input type="text" name="nameOnCard" id="nameOnCard" placeholder="Enter Name On Card" class="form-control" maxLength="30" required onKeyPress={(event) => {
                                    if (!/^[A-Za-z ]*$/.test(event.key)) {event.preventDefault();}}} />
                            <div className="mt-1 text-danger" id="nameOncard-message"></div>
                        </div>
                        <div class="mt-2">
                            <label for="cardNumber">Card Number</label>
                            <input type="text" name="cardNumber" id="cardNumber" placeholder="Enter Card Number" class="form-control" maxLength="16" required onKeyPress={(event) => {
                                    if (!/^[0-9]*$/.test(event.key)) {event.preventDefault();}}} />
                            <div className="mt-1 text-danger" id="cardNumber-message"></div>
                        </div>
                        
                        <div class="mt-2">
                            <label for="cvv">CVV</label>
                            <input type="password" name="cvv" id="cvv" placeholder="Enter CVV" class="form-control" maxLength="3" required onKeyPress={(event) => {
                                    if (!/^[0-9]*$/.test(event.key)) {event.preventDefault();}}} />
                            <div className="mt-1 text-danger" id="cvv-message"></div>
                        </div>
                        {/* <div class="mt-2">
                            <label for="expireDate">Expire Date</label>
                            <input type="text" name="expireDate" id="expireDate" placeholder="MM/YY" class="form-control mt-1" required />
                            <div className="mt-1 text-danger" id="date_message"></div>
                        </div> */}
                        <div class="mt-2">
                            <label for="expireDate">Expire Date</label>
                            <input type="date" name="expireDate" id="expireDate" class="form-control mt-1" min={new Date().toISOString().split("T")[0]} required />
                            <div className="mt-1 text-danger" id="date_message"></div>
                        </div>
                    <input type="submit" value="Place Order" class="btn btn-primary w-100 mt-2" />
                </form>
            </div>
        </div>
    </div>
</div>
        </>
    )
}
export default OrderNow;