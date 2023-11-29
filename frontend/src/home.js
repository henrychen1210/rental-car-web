import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyCheckbox from './component/MyCheckBox.js';
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SortByCheckBox from './component/SortByCheckBox.js';
import SearchResult from "./component/SearchResult.js";




const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();
    const [name, setName] = useState("Henry") // set temparary name
    const [pickUpLocation, setPickUpLocation] = useState("")
    const [pickUpDate, setPickUpDate] = useState("")
    const [pickUpTime, setPickUpTime] = useState("")
    const [dropOffLocaction, setDropOffLocaction] = useState("")
    const [dropOffDate, setDropOffDate] = useState("")
    const [dropOffTime, setDropOffTime] = useState("")
    const [checkedEconomy, setCheckedEconomy] = useState(false)
    const [checkedCompact, setCheckedCompact] = useState(false)
    const [checkedMidsize, setCheckedMidsize] = useState(false)
    const [checkedStanderd, setCheckedStanderd] = useState(false)
    const [checkedFullSize, setCheckedFullSize] = useState(false)
    const [checkedPremium, setCheckedPremium] = useState(false)
    const [checkedLuxury, setCheckedLuxury] = useState(false)
    const [checkedMinivan, setCheckedMinivan] = useState(false)
    const [checkedSUV, setCheckedSUV] = useState(false)
    const [checkedOther, setCheckedOther] = useState(false)
    const [checked2to5seats, setChecked2to5seats] = useState(false)
    const [checked6seats, setChecked6seats] = useState(false)
    const [sortBy, setSortBy] = useState("Recommend")
    const [carList, setVarList] = useState([])


    const people = [
        { id: 1, name: 'New York' },
        { id: 2, name: 'Boston' },
        { id: 3, name: 'Chicago' },
        { id: 4, name: 'Philadelphia' },
        { id: 5, name: 'Pittsburgh' },
        { id: 6, name: 'Columbus' },
    ]

    const carInfoList = [
        { id: 1, model: 'Kia Forte', capacity: 5, location: 'New York', dailyRate: 120.00},
        { id: 2, model: 'Honda CR-V', capacity: 5, location: 'Boston', dailyRate: 150.00},
        { id: 3, model: 'Toyota Prius', capacity: 5, location: 'Chicago', dailyRate: 115.50},
        { id: 4, model: 'Honda Civic', capacity: 5, location: 'Columbus', dailyRate: 105.00},
        { id: 1, model: 'Kia Forte', capacity: 5, location: 'New York', dailyRate: 120.00},
        { id: 2, model: 'Honda CR-V', capacity: 5, location: 'Boston', dailyRate: 150.00},
        { id: 3, model: 'Toyota Prius', capacity: 5, location: 'Chicago', dailyRate: 115.50},
        { id: 4, model: 'Honda Civic', capacity: 5, location: 'Columbus', dailyRate: 105.00},
        { id: 1, model: 'Kia Forte', capacity: 5, location: 'New York', dailyRate: 120.00},
        { id: 2, model: 'Honda CR-V', capacity: 5, location: 'Boston', dailyRate: 150.00},
        { id: 3, model: 'Toyota Prius', capacity: 5, location: 'Chicago', dailyRate: 115.50},
        { id: 4, model: 'Honda Civic', capacity: 5, location: 'Columbus', dailyRate: 105.00},
    ]
    
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

    const findButtonClick = () => {
        console.log(pickUpLocation.name)
        console.log(pickUpDate.$d)
        console.log(pickUpTime.$H + ":" + pickUpTime.$m)
        console.log(dropOffLocaction.name)
        console.log(dropOffDate.$d)
        console.log(dropOffTime.$H + ":" + dropOffTime.$m)
        
    }

    const handleSortByClick = (newValue) => {
        setSortBy(() => {
            console.log(newValue.value);
            return newValue;
        });
    }


    return <div className="mainContainer">
        <img src='/home_image_1.png' id="homeImage"></img>
        <div id="menuBarSection">
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

            {(loggedIn && <div id="accountButtonSection">
                <button onClick={handleToSignupClick} id="accountButton">
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
                    <MyCheckbox options={people} placeholder={"Pick up Location"} width={"400px"} onChange={(newValue) => setPickUpLocation(newValue)}/>
                </div>

                <div className=""  style={{ gridColumn: '1 / 3' }}>
                    <MyCheckbox options={people} placeholder={"Drop off Location"} width={"400px"} onChange={(newValue) => setDropOffLocaction(newValue)}/>
                </div>

                <div className=""  style={{ gridColumn: '1' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} className="inputTimeBox">           
                        <DatePicker 
                            label="Pick Up Date"
                            onChange={(newValue) => setPickUpDate(newValue)}
                            className="timePickerBox"
                        />
                    </LocalizationProvider>
                </div>

                <div className=""  style={{ gridColumn: '2' }} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>           
                        <TimePicker 
                            label="Pick Up Time"
                            onChange={(newValue) => setPickUpTime(newValue)}
                            className="timePickerBox"
                        />
                    </LocalizationProvider>
                </div>

                <div className=""  style={{ gridColumn: '1' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>           
                        <DatePicker 
                            label="Drop Off Date"
                            onChange={(newValue) => setDropOffDate(newValue)}
                            className="timePickerBox"
                        />
                    </LocalizationProvider>
                </div>

                <div className=""  style={{ gridColumn: '2' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>           
                        <TimePicker 
                            label="Drop off time"
                            onChange={(newValue) => setDropOffTime(newValue)}
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

            <div className="filter_section">
                <label className="titleContainer" id="filter_title">Filter by</label>

                <label className="titleContainer" id="filter_subtitle">
                    <label>Type</label>
                    <label>From</label>
                </label>


                <div className="checkboxes-container">
                    <label>
                        <label>
                            <input type="checkbox" checked={checkedEconomy} onChange={() => setCheckedEconomy(!checkedEconomy)}/>
                            &nbsp;
                            Economy
                        </label> 
                        <label>$70</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checkedCompact} onChange={() => setCheckedCompact(!checkedCompact)}/>
                            &nbsp;
                            Compact
                        </label> 
                        <label>$72</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checkedMidsize} onChange={() => setCheckedMidsize(!checkedMidsize)}/>
                            &nbsp;
                            Midsize
                        </label> 
                        <label>$74</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checkedStanderd} onChange={() => setCheckedStanderd(!checkedStanderd)}/>
                            &nbsp;
                            Standard
                        </label> 
                        <label>$79</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checkedFullSize} onChange={() => setCheckedFullSize(!checkedFullSize)}/>
                            &nbsp;
                            Full-size
                        </label> 
                        <label>$79</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checkedPremium} onChange={() => setCheckedPremium(!checkedPremium)}/>
                            &nbsp;
                            Premium
                        </label> 
                        <label>$90</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checkedLuxury} onChange={() => setCheckedLuxury(!checkedLuxury)}/>
                            &nbsp;
                            Luxury
                        </label> 
                        <label>$94</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checkedMinivan} onChange={() => setCheckedMinivan(!checkedMinivan)}/>
                            &nbsp;
                            Minivan
                        </label> 
                        <label>$179</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checkedSUV} onChange={() => setCheckedSUV(!checkedSUV)}/>
                            &nbsp;
                            SUV
                        </label> 
                        <label>$81</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checkedOther} onChange={() => setCheckedOther(!checkedOther)}/>
                            &nbsp;
                            Other
                        </label> 
                        <label>$81</label>
                    </label>

                </div>

                <label className="titleContainer" id="filter_subtitle">
                    <label>Capacity</label>
                    <label>From</label>
                </label>

                <div className="checkboxes-container">

                    <label>
                        <label>
                            <input type="checkbox" checked={checked2to5seats} onChange={() => setChecked2to5seats(!checked2to5seats)}/>
                            &nbsp;
                            2-5 seats
                        </label> 
                        <label>$70</label>
                    </label>

                    <label>
                        <label>
                            <input type="checkbox" checked={checked6seats} onChange={() => setChecked6seats(!checked6seats)}/>
                            &nbsp;
                            6+ seats
                        </label> 
                        <label>$108</label>
                    </label>

                </div>
                
            </div>

            <div className="filterLine"></div>

            <div className="searchSection">
                <div className="sortByContainer">
                    <label>Sort By</label>
                    <SortByCheckBox onChange={handleSortByClick}></SortByCheckBox>
                </div>

                <div className='searchOptionContainer'>
                    {carInfoList.map((car) =>{
                        return <SearchResult carInfo={car}></SearchResult>
                    })}
                </div>

            </div>


        </div>
        

    </div>
}

export default Home;