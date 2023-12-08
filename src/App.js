import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/home";
import React from "react";
import CustomerLogin from "./Components/home/CustomerLogin";
import MerchantLogin from "./Components/home/MerchantLogin";
import AdminLogin from "./Components/home/AdminLogin";
import CustomerRegistration from "./Components/home/CustomerRegistration";
import AdminHome from "./Components/admin/AdminHome";
import Logout from "./Components/logout";
import Categories from "./Components/admin/Categories";
import SubCategories from "./Components/admin/SubCategories";
import Merchants from "./Components/admin/Merchants";
import Brands from "./Components/admin/Brands";
import MerchantHome from "./Components/merchant/MerchantHome";
import AddProduct from "./Components/merchant/AddProduct";
import ViewProducts from "./Components/merchant/ViewProducts";
import CustomerHome from "./Components/customer/CustomerHome";
import ViewOrders from "./Components/customer/viewOrders";
import OrderNow from "./Components/customer/OrderNow";
import RatingForProduct from "./Components/customer/RatingForProduct";
import Message from "./Components/customer/Message";
import GetRatings from "./Components/customer/GetRatings";
import Discounts from "./Components/merchant/discounts";
function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>
        <Route path='/'  Component={Home} />
        <Route path='/alogin'  Component={AdminLogin} />
        <Route path='/mlogin'  Component={MerchantLogin} />
        <Route path='/clogin'  Component={CustomerLogin} />
        <Route path='/CustomerReg'  Component={CustomerRegistration} />
        <Route path='/ahome'  Component={AdminHome} />
        <Route path='/logout'  Component={Logout} />
        <Route path='/categories'  Component={Categories} />
        <Route path='/subCategories'  Component={SubCategories} />
        <Route path='/merchants'  Component={Merchants} />
        <Route path='/brands'  Component={Brands} />
        <Route path='/mhome'  Component={MerchantHome} />
        <Route path='/addProduct'  Component={AddProduct} />
        <Route path='/viewProducts'  Component={ViewProducts} />
        <Route path='/chome'  Component={CustomerHome} />
        <Route path='/viewOrders'  Component={ViewOrders} />
        <Route path='/orderNow'  Component={OrderNow} />
        <Route path='/ratingForProduct'  Component={RatingForProduct} />
        <Route path='/message'  Component={Message} />
        <Route path='/getRatings'  Component={GetRatings} />
        <Route path='/discounts'  Component={Discounts} />
        
       </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
