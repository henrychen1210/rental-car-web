import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyCheckbox from './component/MyCheckBox.js';
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SortByCheckBox from './component/SortByCheckBox.js';
import SearchResult from "./component/SearchResult.js";
import axios from "axios";

const Home = (props) => {
    const { loggedIn, employee, email } = props
    const navigate = useNavigate();
    const [name, setName] = useState("") // set temparary name

    const [pickUpLocation, setPickUpLocation] = useState("")
    const [pickUpDate, setPickUpDate] = useState("")
    const [pickUpTime, setPickUpTime] = useState(new Date())
    const [dropOffLocaction, setDropOffLocaction] = useState("")
    const [dropOffDate, setDropOffDate] = useState("")
    const [dropOffTime, setDropOffTime] = useState(new Date())
    const [sortBy, setSortBy] = useState("Recommend")

    const [carInfoList, setCarInfoList] = useState([])
    const [coupon_id, setCoupon_id] = useState("")
    const [couponInfo, setCouponInfo] = useState("")


    const [isCheckOut, setIsCheckOut] = useState(false)
    const [selectCar, setSelectCar] = useState("")

    const [payment, setPayment] = useState({
        paymentID: '',
        pmt_date: '',
        pmt_method: '',
        start_odo: '',
        car_num: '',
        paid_amt: '',
        invID: '',
    });
    
    const location = [
        { id: 1, name: 'New York' },
        { id: 2, name: 'Boston' },
        { id: 3, name: 'Chicago' },
        { id: 4, name: 'Philadelphia' },
        { id: 5, name: 'Pittsburgh' },
        { id: 6, name: 'Columbus' },
    ]

    const getCarInfoList = async () => {
        try {
          //const response = await fetch(`http://localhost:3002/vehicles`);
          //const results = await response.json();
          const results = await axios.get("http://localhost:3002/vehicles")
          setCarInfoList(results.data);
          //console.log(results);
        } catch (err) {
          console.log(err);
        }
    };
    
    const searchPaymentByCouponId = async (couponId) => {
        try {
            console.log('couponId: ' + couponId);
            const results = await axios.post("http://localhost:3002/couponBy", { id: couponId });
            setCouponInfo(results.data[0])
            console.log(results.data[0]);
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
    }, []);
    
    
    const onButtonClick = () => {
        // You'll update this function later
        if (loggedIn) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else {
            navigate("/login")
        }
    }

    const handleToHomeClick = () => {
        navigate("/")
    }

    const handleToSignupClick = () => {
        navigate("/signup")
    }

    const handleToLoginClick = () => {
        navigate("/login")
    }

    const handleToManageClick = () => {
        navigate("/manage")
    }

    const findButtonClick = () => {
        getCarInfoList();
    }

    const handleSortByClick = (newValue) => {
        setSortBy(newValue)
        console.log(sortBy)
    }

    const handlePaymentInputChange = (e) => {
        const { name, value } = e.target;
        setPayment({ ...payment, [name]: value });
      };
      
    const placeTheOrderClick = () => {

    }

    const useCouponClick = () => {
        searchPaymentByCouponId(coupon_id)
    }

    return <div className="mainContainer">
        <img src='/home_image_1.png' id="homeImage"></img>
        <div className="menuBarSection">
            <button onClick={handleToHomeClick} id="homeButton">
                <span>WoW</span>
                <img src='/car.png' width={"40px"}></img>
            </button>


            {(!loggedIn && <div id="logSignButtonSection">
                <button onClick={handleToLoginClick} className="logSignButton" id="loginButton">
                    <label >Login</label>
                </button>

                <button onClick={handleToSignupClick} className="logSignButton" id="signupButton">
                    <label >Sign up</label>
                </button>
            </div>)}

            {(loggedIn && !employee && <div id="accountButtonSection">
                <button onClick={handleToSignupClick} id="accountButton">
                    <label >Hi, {name}</label>
                    <img src='/account.png' width={"30px"}></img>
                </button>
            </div>)}

            {(loggedIn && employee && <div id="accountButtonSection">
                <button onClick={handleToManageClick} id="accountButton">
                    <label >Hi, {name}</label>
                    <img src='/account.png' width={"30px"}></img>
                </button>
            </div>)}


        </div>

        <div className="wowContainer">
            <label>World</label>
            <label id="ofLabel">  of</label>
            <label>Wheel</label>
        </div>


        <div id="rentSection">
            <label className="titleContainer" id="rentACar">Rent A Car</label>
            

            <div className="rentCarInputContainer">

                <div className=""  style={{ gridColumn: '1 / 3' }}>
                    <MyCheckbox options={location} placeholder={"Pick up Location"} width={"400px"} onChange={(newValue) => setPickUpLocation(newValue)}/>
                </div>

                <div className=""  style={{ gridColumn: '1 / 3' }}>
                    <MyCheckbox options={location} placeholder={"Drop off Location"} width={"400px"} onChange={(newValue) => setDropOffLocaction(newValue)}/>
                </div>

                <div className=""  style={{ gridColumn: '1' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} className="inputTimeBox">           
                        <DatePicker 
                            label="Pick Up Date"
                            onChange={(newValue) => setPickUpDate(new Date(newValue))}
                            className="timePickerBox"
                        />
                    </LocalizationProvider>
                </div>

                <div className=""  style={{ gridColumn: '2' }} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>           
                        <TimePicker 
                            label="Pick Up Time"
                            onChange={(newValue) => setPickUpTime(new Date(newValue))}
                            className="timePickerBox"
                        />
                    </LocalizationProvider>
                </div>

                <div className=""  style={{ gridColumn: '1' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>           
                        <DatePicker 
                            label="Drop Off Date"
                            onChange={(newValue) => setDropOffDate(new Date(newValue))}
                            className="timePickerBox"
                        />
                    </LocalizationProvider>
                </div>

                <div className=""  style={{ gridColumn: '2' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>           
                        <TimePicker 
                            label="Drop off time"
                            onChange={(newValue) => setDropOffTime(new Date(newValue))}
                            className="timePickerBox"
                        />
                    </LocalizationProvider>
                </div>

                <div className="findButtonContainer">
                    <button onClick={findButtonClick} className="findButton">
                        Find Now
                    </button>
                </div>
                
            </div>
        </div>

        <div className="rentService">
            

            {!isCheckOut && <div className="searchSection">
                {/* A JSX comment 
                <div className="sortByContainer">
                    <label>Sort By</label>
                    <SortByCheckBox onChange={handleSortByClick}></SortByCheckBox>
                </div>
                */}

                <div className='searchOptionContainer'>
                    {carInfoList.map((car, index) =>{
                        return <SearchResult key={index} carInfo={car} setIsCheckOut={setIsCheckOut} setSelectCar={setSelectCar}></SearchResult>
                    })}
                </div>

            </div>}

            {isCheckOut && <div className="searchSection">
                <button className="backToSearchButton" onClick={() => setIsCheckOut(false)}>
                    <img src='/left.png' width={"40px"}></img>
                </button>

                <div className="checkoutSection">
                    <img src={`/${selectCar.model}.png`} id="carImage"></img>
                    
                    <div className="checkOutInfoContainer">
                        <label className="modelName">{selectCar.make} {selectCar.model}</label>
                        
                        <label> 
                            {pickUpLocation.name} {pickUpDate.toLocaleString('En', { month: 'short' })} {pickUpDate.getDate()} {pickUpDate.getFullYear()} {`${String(pickUpTime.getHours()).padStart(2, '0')}:${String(pickUpTime.getMinutes()).padStart(2, '0')}`}
                            <img src={"/up_cal.png"} id="checkOutIcon"></img>
                        </label>
                        
                        <label>
                            {dropOffLocaction.name} {dropOffDate.toLocaleString('En', { month: 'short' })} {dropOffDate.getDate()} {dropOffDate.getFullYear()} {`${String(dropOffTime.getHours()).padStart(2, '0')}:${String(dropOffTime.getMinutes()).padStart(2, '0')}`}
                            <img src={"/down_cal.png"} id="checkOutIcon"></img>
                        </label>
                    </div>

                    
                </div>

                <div className="checkoutSection">
                    <label className="modelName">Total Cost</label>
                    
                    <div className="checkOutInfoContainer">
                        <br/>
                        <label> 
                            Daily rate &nbsp; ${selectCar.daily_rate.toFixed(2)} &nbsp; x &nbsp; {(dropOffDate.getDate() - pickUpDate.getDate())} day &nbsp; = &nbsp; ${(((dropOffDate.getDate() - pickUpDate.getDate())) * selectCar.daily_rate).toFixed(2)}
                        </label>

                        <div className="checkOutForm">
                            {couponInfo == '' &&  <label className='checkOutFormSubtitle'> Coupon: &nbsp;
                                    <input type="text" value={coupon_id} onChange={(event) => setCoupon_id(event.target.value)}/>
                                </label>
                            }

                            {couponInfo != '' &&  <label className='checkOutFormSubtitle'> Coupon: &nbsp;
                                    {couponInfo.dis_per}% off = ${(((dropOffDate.getDate() - pickUpDate.getDate())) * selectCar.daily_rate).toFixed(2) * (1 - couponInfo.dis_per / 100)}
                                </label>
                            }

                           
                            <button  className='submitButton' onClick={useCouponClick}>
                                Use Coupon
                            </button> 
                        </div>
                    </div>
                </div>

                <div className="checkoutSection">
                    <label className="modelName">Payment</label>

                    <div className="checkOutInfoContainer">
                        <br/>
                        <div className="checkOutForm">
                            <label className='checkOutFormSubtitle'> Card Number: &nbsp;
                                <input type="text" name="card_num" onChange={handlePaymentInputChange}/>
                            </label>

                            <label className='checkOutFormSubtitle'> EXP Date: &nbsp;
                                <input type="text"/>
                            </label>

                            <label className='checkOutFormSubtitle'> CVV: &nbsp;
                                <input type="text"/>
                            </label>

                            <label className='checkOutFormSubtitle'> Name on Card: &nbsp;
                                <input type="text"/>
                            </label>
                            <button className='submitButton' onClick={placeTheOrderClick}>
                                Place this Order
                            </button> 
                        </div>
                    </div>

                    
                </div>
            </div>}
        </div>
    </div>
}

export default Home;