import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Order from './component/Orders.js'
import Vehicles from './component/Vehicles.js'
import Customers from './component/Customers.js'
import Coupon from "./component/Coupon.js";

const Manage = (props) => {

    const navigate = useNavigate();
    const [selected, setSelected] = useState("orders");

    const handleToHomeClick = () => {
        navigate("/")
    }

    const handleToOrderClick = () => {
        setSelected("orders")
    }

    const handleToVehiclesClick = () => {
        setSelected("vehicles")
    }

    const handleToAccountsClick = () => {
        setSelected("customers")
    }

    const handleToCouponClick = () => {
        setSelected("coupon")
    }

    return<div className="mainContainer">
        <div className="menuBarSection" id="maageMenu">
            <button onClick={handleToHomeClick} id="homeButton">
                <span>WoW</span>
                <img src='/car.png' width={"40px"}></img>
            </button>
            <button id="manageButton">
                <img src='/account.png' width={"30px"}></img>
            </button>
        </div>

        <div className="sideBarContainer">

            <button onClick={handleToOrderClick}>
                {selected == "orders" && <img src='/right.png' width={"20px"}></img>}
                <label>Order</label>
            </button>
            <button onClick={handleToVehiclesClick}>
                {selected == "vehicles" && <img src='/right.png' width={"20px"}></img> }
                <label>Vehicles</label>
            </button>
            <button onClick={handleToAccountsClick}>
                {selected == "customers" && <img src='/right.png' width={"20px"}></img> }
                <label>Customers</label>
            </button>
            <button onClick={handleToCouponClick}>
                {selected == "coupon" && <img src='/right.png' width={"20px"}></img> }
                <label>Coupon</label>
            </button>
        </div>

        <div className="databaseContainer">
            {selected == "orders" && <Order></Order>}
            {selected == "vehicles" && <Vehicles></Vehicles>}
            {selected == "customers" && <Customers></Customers>}
            {selected == "coupon" && <Coupon></Coupon>}
        </div>
    </div>
}

export default Manage