import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Order from './component/Orders.js'
import Vehicles from './component/Vehicles.js'
import Accounts from './component/Accounts.js'

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
        setSelected("accounts")
    }


    const orderInfo = [
        {orderID: '10001', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99823', vin: 'JJJJJJ87621'},
        {orderID: '10002', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99823', vin: 'JJJJJJ87621'},
        {orderID: '10003', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99823', vin: 'JJJJJJ87621'},
        {orderID: '10004', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99823', vin: 'JJJJJJ87621'},
        {orderID: '10005', pick_date: '2023-12-01', drop_date: '2023-12-3', start_odo: '562014', end_odo: '927432', pick_loc: 'New York', drop_loc: 'Boston', customer_id: '99823', vin: 'JJJJJJ87621'}
    ]

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
                {selected == "accounts" && <img src='/right.png' width={"20px"}></img> }
                <label>Accounts</label>
            </button>
        </div>

        <div className="databaseContainer">
            {selected == "orders" && <Order></Order>}
            {selected == "vehicles" && <Vehicles></Vehicles>}
            {selected == "accounts" && <Accounts></Accounts>}
        </div>
    </div>
}

export default Manage