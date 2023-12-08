import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyCheckbox from './component/MyCheckBox.js';
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SortByCheckBox from './component/SortByCheckBox.js';
import SearchResult from "./component/SearchResult.js";
import axios from "axios";

const Home = (props) => {
    const { loggedIn, employee, email, fName, customerInfo } = props
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
    const [estimateMileage, setEstimateMileage] = useState("")
    const [coupon_message, setCoupon_message] = useState("")
    const [couponInfo, setCouponInfo] = useState("")
    const [location, setLocation] = useState([])

    const [rental_id, setRental_id] = useState("")
    const [invoiceInfo, setInvoiceInfo] = useState({
        inv_id: '',
        inv_date: '',
        inv_amt: '',
        rental_id: ''
    })

    const [payComplete, setPayomplete] = useState(false)

    const [showInvoice, setShowInvoice] = useState(false)
    const [showPayment, setShowPayment] = useState(false)

    const [paymentMethod, setPaymentMethod] = useState("")

    const [isCheckOut, setIsCheckOut] = useState(false)
    const [selectCar, setSelectCar] = useState({})

    const [card_num, setCard_num] = useState("")

    // get all location
    const getlocationList = async () => {
        try {
          const results = await axios.get("http://localhost:3002/get_all_location")
          setLocation(results.data);
          //console.log(results);
        } catch (err) {
          console.log(err);
        }
    };

    // get all vehicles
    const getCarInfoList = async () => {
        try {
          const results = await axios.get("http://localhost:3002/vehicles")
          setCarInfoList(results.data);
          //console.log(results);
        } catch (err) {
          console.log(err);
        }
    };

    // search car based on location
    const getCarInfoListByLocation = async () => {
        try {
            const results = await axios.post("http://localhost:3002/searchvehicle", { location: pickUpLocation.id });
            setCarInfoList(results.data)
            //console.log(results.data);
        } catch (err) {
            console.log(err);
        }
    };

    // apply discount
    const searchByCouponId = async (couponId) => {
        try {
            const results = await axios.post("http://localhost:3002/applydiscount", { discount: couponId });
            //console.log(results.data[0]);
            if (results.data[0]){
                setCouponInfo(results.data[0])
                setCoupon_message("")
            }
            else
                setCoupon_message("Wrong Coupon Code")
            
        } catch (err) {
            console.log(err);
        }
    };


    // get Invoice
    const getInvoice = async (rental_id) => {
        try {
            console.log('rental_id: ' + rental_id);
            const results = await axios.post("http://localhost:3002/invoice", { rental_id: 1 }); // ? need to be modify when database is done (rental_id)
            //console.log(results.data[0]);
            setInvoiceInfo(results.data[0])
            
        } catch (err) {
            console.log(err);
        }
    };

    // place Order
    const placeOrder = async () => {
        try {
            if (customerInfo == {}){
                setCoupon_message("Please Login First!!!")
                return
            }

            const results = await axios.post("http://localhost:3002/insert_order", { 
                pick_date: pickUpDate, 
                drop_date: dropOffDate, 
                start_odo: selectCar.odo, 
                end_odo: String(parseInt(selectCar.odo) + parseInt(estimateMileage)), 
                pick_loc: pickUpLocation.id, 
                drop_loc: dropOffLocaction.id, 
                customer_id: customerInfo.customer_id,
                vin: selectCar.vin
            });

            //console.log(results.data.insertId);
            const insertID = results.data.insertId

            setRental_id(insertID);


            //console.log("rental_id: " + rental_id);
            getInvoice(rental_id); 
            setShowInvoice(true);

        } catch (err) {
            console.log(err);
        }
    };


    // insert a payment
    const pay = async () => {
        try {
            const results = await axios.post("http://localhost:3002/pay", { 
                paymentMethod: paymentMethod, 
                cardNumber: card_num, 
                amount:invoiceInfo.inv_amt , 
                invID: invoiceInfo.inv_id }); 

            if (results.data == "pay sucessfully!"){
                setPayomplete(true)
            }
            
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        getlocationList();
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
        getCarInfoListByLocation();
    }
    
    const useCouponClick = () => {
        searchByCouponId(coupon_id)
    }

    const checkOutClick = () => {
        setShowPayment(true);
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
                <button id="accountButton">
                    <label >Hi</label>
                    <img src='/account.png' width={"30px"}></img>
                </button>
            </div>)}

            {(loggedIn && employee && <div id="accountButtonSection">
                <button onClick={handleToManageClick} id="accountButton">
                    <label >Hi, Employee</label>
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
                {/*
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

            {isCheckOut && 
                <div className="searchSection">
                    <button className="backToSearchButton" onClick={() => setIsCheckOut(false)}>
                        <img src='/left.png' width={"40px"}></img>
                    </button>

                    <div className="checkoutSection">
                        <img src={`/${selectCar.model}.png`} id="carImage"></img>
                        
                        <div className="checkOutInfoContainer">
                            <label className="modelName">{selectCar.make} {selectCar.model} </label>
                            
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
                    <label className="modelName">Cost</label>
                    
                    <div className="checkOutInfoContainer">
                        <br/>
                        <label> 
                            Daily rate &nbsp; ${selectCar.daily_rate.toFixed(2)} &nbsp; x &nbsp; {(dropOffDate.getDate() - pickUpDate.getDate())} day &nbsp; = &nbsp; ${(((dropOffDate.getDate() - pickUpDate.getDate())) * selectCar.daily_rate).toFixed(2)}
                        </label>

                        <div className="checkOutForm">
                            <label className='checkOutFormSubtitle'> Estimate mileage: &nbsp;
                                {!showInvoice && <input type="text" value={estimateMileage} onChange={(event) => setEstimateMileage(event.target.value)}/>}
                                {showInvoice && estimateMileage + "mile"}
                            </label>

                            {couponInfo == '' &&  <label className='checkOutFormSubtitle'> Coupon Code: &nbsp;
                                    <input type="text" value={coupon_id} onChange={(event) => setCoupon_id(event.target.value)}/>
                                </label>
                            }

                            {couponInfo != '' &&  <label className='checkOutFormSubtitle'> Coupon: &nbsp;
                                    {couponInfo.dis_per}% off
                                </label>
                            }

                            <label className="errorLabel">{coupon_message}</label>
                            {!showInvoice &&
                                <div> 
                                    {couponInfo == '' &&  <button  className='submitButton' onClick={useCouponClick}>
                                            Use Coupon
                                        </button> 
                                    }
                                    {couponInfo != '' &&  <button  className='submitButton' onClick={() => setCouponInfo('')}>
                                            Reset Coupon
                                        </button> 
                                    }
    
                                    <button className='submitButton' onClick={placeOrder}>
                                        Place this Order
                                    </button> 
                                </div>
                            }
                           
                            
                               
                            
                        </div>
                    </div>
                </div>

                {showInvoice && <div className="checkoutSection">
                    <label className="modelName">Invoice</label>

                    <div className="checkOutInfoContainer">
                        <br/>
                        <div className="checkOutForm">
                            <label className='checkOutFormSubtitle'> Order Number: #{rental_id} </label>
                            <label className='checkOutFormSubtitle'> Date: {invoiceInfo.inv_date.slice(0, 10)} </label>
                            <label className='checkOutFormSubtitle'> Amount: ${invoiceInfo.inv_amt} </label>        
                        </div>
                        {!showPayment &&
                            <button className='submitButton' onClick={checkOutClick}>
                                Check Out
                            </button> 
                        }
                        
                    </div>
                </div>}

                {showPayment && <div className="checkoutSection">
                    {!payComplete &&
                    <>
                    <label className="modelName">Payment</label>

                    
                        <div className="checkOutInfoContainer">
                            <br/>
                            <div className="checkOutForm">
                                    <>
                                    <div className="signUpTypeButtonContainer">
                                        <button onClick={() => setPaymentMethod("G")} className={paymentMethod == "G" ? "selectButtonI": "nonSelectButtonI"}> Gift Card </button>
                                        <button onClick={() => setPaymentMethod("C")} className={paymentMethod == "C" ? "selectButtonC": "nonSelectButtonC"}> Credid Card </button>
                                    </div>
                                    <br />
                                    <label className='checkOutFormSubtitle'> Card Number: &nbsp;
                                        <input type="text" value={card_num} onChange={(event) => setCard_num(event.target.value)}/>
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
                                    
                                    <button className='submitButton' onClick={pay}>
                                        Pay
                                    </button> 
                                    </>
                            </div>
                        </div>
                    </>}
                    {payComplete &&
                        <label id="thankLabel" > 
                            <>Have a Good Ride!</>
                            <img src='/car.png' width={"80px"}></img>
                        </label>
                    }
                </div>}
            </div>}
        </div>
    </div>
}

export default Home;