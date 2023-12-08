import Cookies from "js-cookie";
import CustomerHead from "./head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MerchantHead from "../merchant/head";
const rest = require('../../EndPoints')
function ViewOrders(){
    const navigate = useNavigate();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let type = params.get('type');
    const[orderList,setOrderList] = useState([])
    const[count,setCount] = useState(0)
    const[dispalyMessage,setDisplayMessage] = useState([""])
    console.log(type);
    let header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`   
        }
    }
    useEffect(()=>{
        axios.get(rest.endPointViewOrders+"?type="+type,header)
        .then(response => {
            console.log(response.data);
              setOrderList(response.data)
            
       })
       .catch(err => {
          console.log(err);
       })
    },[type])
    const OrderNowAction = e =>{
        e.preventDefault();
        let enteredCoupon = e.target[0].value;
         let orderId = e.target[1].value;
        let price = e.target[2].value;
        console.log(price);
        if(enteredCoupon!=""){
          axios.get(rest.endPointDiscountValidate+"?enteredCoupon="+enteredCoupon+"&orderId="+orderId,header)
          .then(response => {
               if(response.data.length==0){
                alert("Invalid Coupon")
                return
               }else{
                  let discount = response.data[0]['discount']
                  let price2 = parseInt(price)-parseInt(price) * parseFloat(discount/100)
                 navigate("/orderNow?orderId="+orderId+"&price="+price2)
               }
        })
        .catch(err => {
            console.log(err);
        })
        }else{
          navigate("/orderNow?orderId="+orderId+"&price="+price)
        }

    }
    const DispatchOrder = e =>{
        e.preventDefault();
        let orderId = e.target[0].value;
        axios.get(rest.endPointDispatchOrder+"?orderId="+orderId,header)
       .then(response => {
           alert(response.data);
           navigate("/viewOrders?type=dispatched")
       })
       .catch(err => {
           console.log(err)
       })
    }
    const RecievedAction = e =>{
        e.preventDefault();
        let orderId = e.target[0].value;
        axios.get(rest.endPointDelivered+"?orderId="+orderId,header)
        .then(response => {
            alert(response.data);
            navigate("/viewOrders?type=history")
        })
        .catch(err => {
            console.log(err)
        })
    }
    const RatingForProduct = e=>{
        e.preventDefault();
        let productId = e.target[0].value;
        let orderItemId = e.target[1].value;
        navigate("/ratingForProduct?productId="+productId+"&orderItemId="+orderItemId)
    }
    const removeItem = e =>{
      e.preventDefault();
      let orderId = e.target[0].value;
      let orderItemId = e.target[1].value;
      axios.get(rest.endPointRemoveProduct+"?orderId="+orderId+"&orderItemId="+orderItemId,header)
      .then(response => {
          alert(response.data);
          
          navigate("/message?msg=Product Removed")
          
      })
      .catch(err => {
          console.log(err)
      })

    }

    return(
        <>
        
        {Cookies.get("role")==='Customer'?<><CustomerHead/></>:<></>}
        {Cookies.get("role")==='Merchant'?<><MerchantHead/></>:<></>}
        <div className="container mt-3">
            <div className="row">
                {orderList.map((order,index)=>
                  <div className="col-md-12 mt-1">
                    <div className="card p-3 mt-1" style={{boxShadow: "0px 0px 7px rosybrown"}}>
                        <div className="text-center h4" style={{textTransform:"uppercase"}}> {order['orderModel']['status']}</div>
                      <div className="row">
                        <div className="col-md-7 p-3">
                          <div className="row">
                                {order['orderItemModels'].map((orderItem,index)=>
                                <div className="col-md-3 card mt-1 p-2 ms-2">
                                    <img src={'data:image/jpeg;base64,'+orderItem['productModel']['picture2']}  style={{height:'100px',maxWidth:'100%'}} />
                                    <div className="h6" style={{textTransform:"uppercase"}}>{orderItem['productModel']['productName']}</div>
                                    <div className="" style={{fontSize:"13px"}}>Ordered : <b>{orderItem['quantity']}</b></div>
                                    <div className="" style={{fontSize:"13px"}}>Price : $ <b>{parseFloat(orderItem['quantity'])* parseFloat(orderItem['productModel']['price'])}</b></div>
                                    {Cookies.get("role")==='Customer'?<>
                                    {order['orderModel']['status']==='delivered'?<>
                                    {orderItem['status']==='Ordered'?<>
                                    <form onSubmit={RatingForProduct}>
                                       <input type="hidden" id="productId" value={orderItem['productModel']['productId']}></input>
                                       <input type="hidden" id="orderItemId" value={orderItem['orderItemId']}></input>
                                      <input type="submit" value={"Give Rating"} className="btn btn-primary mt-2" style={{fontSize:"13px"}}></input>
                                    </form>
                                    </>:<></>}
                                  </>:<></>}
                                    </>:<></>}
                                    {Cookies.get("role")==='Customer'?<>
                                    {order['orderModel']['status']==='cart'?<>
                                    <form onSubmit={removeItem}>
                                    <input type="hidden" id="orderId" value={order['orderModel']['orderId']}></input>
                                       <input type="hidden" id="orderItemId" value={orderItem['orderItemId']}></input>
                                      <input type="submit" value={"Remove Product"} className="btn btn-danger mt-2" style={{fontSize:"13px"}}></input>
                                    </form>
                                  </>:<></>}
                                    </>:<></>}
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-5 mt-3">
                           <div className="row">
                             <div className="col-md-6">
                                <div className="text-secondary" style={{fontSize:"13px"}}>Order By</div>
                                <div className="h6">{order['orderModel']['customerModel']['name']} (Customer)</div>
                                <div className="text-secondary" style={{fontSize:"13px"}}>Order Date</div>
                                <div className="h6">{order['orderModel']['orderedDate'].split(".")[0].replace("T", " ").substring(0, 16)}</div>
                             </div>
                             <div className="col-md-6">
                                 <div className="text-secondary" style={{fontSize:"13px"}}>Merchant</div>
                                <div className="h6">{order['orderModel']['merchantModel']['name']}({order['orderModel']['merchantModel']['phone']})</div>
                             </div>
                           </div>
                           {Cookies.get("role")==='Customer'?<>
                           {order['orderModel']['status']==='cart'?<>
                          <form onSubmit={OrderNowAction}>
                          <input type="text" id="enteredCoupon" className="mt-5" placeholder="Enter Coupon"></input>
                            <input type="hidden" id="orderId" value={order['orderModel']['orderId']}></input>
                            <input type="hidden" id="price" value={order['orderModel']['totalPrice']}></input>
                            <input type="submit" value={"Order Now"} className="btn btn-primary  ms-2 " style={{fontSize:"13px"}}></input>
                          </form>
                          </>:<></>}
                          {order['orderModel']['status']==='dispatched'?<>
                          <form onSubmit={RecievedAction}>
                            <input type="hidden" id="orderId" value={order['orderModel']['orderId']}></input>
                            <input type="submit" value={"Receive Order"} className="btn btn-primary mt-2" style={{fontSize:"13px"}}></input>
                          </form>
                          </>:<></>}
                         

                           </>:<></>}
                          {Cookies.get('role')==='Merchant'?<>
                           {order['orderModel']['status']==='ordered'?<>
                           <form onSubmit={DispatchOrder}>
                            <input type="hidden" id="orderId" value={order['orderModel']['orderId']}></input>
                            <input type="submit" value={"Dispatch Order"} className="btn btn-primary mt-2" style={{fontSize:"13px"}}></input>
                          </form>
                           </>:<></>}
                          </>:<></>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
        </div>

        </>
    )
}
export default ViewOrders;