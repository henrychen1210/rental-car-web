import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";

const Signup = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [dr_lic, setDr_lic] = useState("")
    const [insurance, setInsurance] = useState("")
    const [policy, setPolicy] = useState("")

    const [corpName, setCorpName] = useState("")
    const [corpNo, setCorpNo] = useState("")
    const [empID, setEmpID] = useState("")

    const [accountType, setAccountType] = useState("")

    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isChecked, setIsChecked] = useState(false);
    
    const navigate = useNavigate();

    // Call the server API to check if the given email ID already exists
    const checkAccountExists = (callback) => {
        fetch("http://localhost:3080/check-account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email})
        })
        .then(r => r.json())
        .then(r => {
            callback(r?.userExists)
        })
    }

    // Log in a user using email and password
    const logIn = () => {
        fetch("http://localhost:3080/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        .then(r => r.json())
        .then(r => {
            if ('success' === r.message) {
                localStorage.setItem("user", JSON.stringify({email, token: r.token}))
                props.setLoggedIn(true)
                props.setEmail(email)
                navigate("/")
            } else {
                window.alert("Wrong email or password")
            }
        })
    }

    ///// indivual signup
    const individualSignUp = async () => {
        try {
            const results = await axios.post("http://localhost:3002/register_individual", { 
                email: email,
                firstname: fname,
                lastname: lname,
                phonenumber: phone,
                driverlicence: dr_lic,
                insurance: insurance,
                policy: policy,
                password: password });
            //console.log(results.data);

            if (results.data == "register sucessfully!") {
                navigate("/login")
            }
            else  {
                setPasswordError("Individual sign up error")
            }
        } catch (err) {
            setPasswordError("Individual sign up error")
            console.log(err);
        }
    }

    /// cor sign up
    const corprateSignUp= async () => {
        try {
            const results = await axios.post("http://localhost:3002/register_corporate", { 
                email: email,
                phonenumber: phone,
                corporate: corpName,
                registration: corpNo,
                empid: empID,
                password: password });
            //console.log(results.data);

            if (results.data == "register sucessfully!") {
                navigate("/login")
            }
            else  {
                setPasswordError("Sing Up Error")
            }
        } catch (err) {
            setPasswordError("Sing Up Error")
            console.log(err);
        }
    }
        
    const onButtonClick = () => {

        // Set initial error values to empty
        setEmailError("")
        setPhoneError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === phone) {
            setPhoneError("Please enter a phone number")
            return
        }

        if (phone.length != 10) {
            setPhoneError("The phone number must be 10 digit")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }
        
        if (accountType == "I") {
            individualSignUp()
        }
        else if (accountType == "C") {
            corprateSignUp()
        }

        /*
        // Authentication calls will be made here...       
        // Check if email has an account associated with it
        checkAccountExists(accountExists => {
            // If yes, log in 
            if (accountExists)
                logIn()
            else
            // Else, ask user if they want to create a new account and if yes, then log in
                if (window.confirm("An account does not exist with this email address: " + email + ". Do you want to create a new account?")) {
                    logIn()
                }
        })  
        */
    }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleToHomeClick = () => {
        navigate("/")
    }

    useEffect(() => {
        // Fetch the user email and token from local storage
        const user = JSON.parse(localStorage.getItem("user"))
    
        // If the token/email does not exist, mark the user as logged out
        if (!user || !user.token) {
          setLoggedIn(false)
          return
        }
    
        // If the token exists, verify it with the auth server to see if it is valid
        fetch("http://localhost:3080/verify", {
                method: "POST",
                headers: {
                    'jwt-token': user.token
                  }
            })
            .then(r => r.json())
            .then(r => {
                setLoggedIn('success' === r.message)
                setEmail(user.email || "")
            })
      }, [])

    return <div className={"mainContainer"}>
        <div id="greenSection">
            <img src='/wowlogo.png' className="logoImage"></img>
        </div>

        <div className="menuBarSection">
            <button onClick={handleToHomeClick} id="homeButton">
                <span>WoW</span>
                <img src='/car.png' width={"40px"}></img>
            </button>
        </div>
        <div id="signupBlock">
            <div className={"titleContainer"}>
                <div>Sign Up</div>
            </div>
            <br />

            <div className="signUpTypeButtonContainer">
                <button onClick={() => setAccountType("I")} className={accountType == "I" ? "selectButtonI": "nonSelectButtonI"}> Individual </button>
                <button onClick={() => setAccountType("C")} className={accountType == "C" ? "selectButtonC": "nonSelectButtonC"}> Corporate </button>
            </div>
            

            {accountType == "I" && 
                <div id="signInputContainer">
                    <div className={"inputContainer"}>
                        <input
                            value={fname}
                            placeholder="First Name"
                            onChange={ev => setFname(ev.target.value)}
                            className={"inputBoxSmall"} />
                            
                    </div>

                    <div className={"inputContainer"}>
                        <input
                            value={lname}
                            placeholder="Last Name"
                            onChange={ev => setLname(ev.target.value)}
                            className={"inputBoxSmall"} />
                    </div>
                
                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={dr_lic}
                            placeholder="Driver Licence No."
                            onChange={ev => setDr_lic(ev.target.value)}
                            className={"inputBox"} />
                    </div>
                    
                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={insurance}
                            placeholder="Insurance Company"
                            onChange={ev => setInsurance(ev.target.value)}
                            className={"inputBox"} />
                    </div>
                    
                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={policy}
                            placeholder="Insurance Policy No."
                            onChange={ev => setPolicy(ev.target.value)}
                            className={"inputBox"} />
                    </div>

                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={email}
                            placeholder="Email"
                            onChange={ev => setEmail(ev.target.value)}
                            className={"inputBox"} />
                        <label className="errorLabel">{emailError}</label>
                    </div>
                
                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={phone}
                            placeholder="+1 | Phone No."
                            onChange={ev => setPhone(ev.target.value)}
                            className={"inputBox"} />
                        <label className="errorLabel">{phoneError}</label>
                    </div>
                    

                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={ev => setPassword(ev.target.value)}
                            className={"inputBox"} />
                        <label className="checkboxLabel">
                            The password must be 8 characters or longer.
                        </label>
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    

                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            className={"inputButton"}
                            type="button"
                            onClick={onButtonClick}
                            value={"Sign Up"} />
                    </div>
                    <label className="checkboxLabel" style={{ gridColumn: '1 / 3' }}>
                        Already have an account? &nbsp;
                        <a href="/login" rel="noreferrer" className="linklabel">
                            Login
                        </a>
                    </label>
                </div>
            }

            {accountType == "C" &&
                <div id="signInputContainer">
                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={corpName}
                            placeholder="Corporate Name"
                            onChange={ev => setCorpName(ev.target.value)}
                            className={"inputBox"} />
                    </div>
                    
                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={corpNo}
                            placeholder="Registration number"
                            onChange={ev => setCorpNo(ev.target.value)}
                            className={"inputBox"} />
                    </div>
                    
                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={empID}
                            placeholder="Employee ID"
                            onChange={ev => setEmpID(ev.target.value)}
                            className={"inputBox"} />
                    </div>

                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={email}
                            placeholder="Email"
                            onChange={ev => setEmail(ev.target.value)}
                            className={"inputBox"} />
                        <label className="errorLabel">{emailError}</label>
                    </div>
                
                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            value={phone}
                            placeholder="+1 | Phone No."
                            onChange={ev => setPhone(ev.target.value)}
                            className={"inputBox"} />
                        <label className="errorLabel">{phoneError}</label>
                    </div>
                    

                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={ev => setPassword(ev.target.value)}
                            className={"inputBox"} />
                        <label className="checkboxLabel">
                            The password must be 8 characters or longer.
                        </label>
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    

                    <div className={"inputContainer"} style={{ gridColumn: '1 / 3' }}>
                        <input
                            className={"inputButton"}
                            type="button"
                            onClick={onButtonClick}
                            value={"Sign Up"} />
                    </div>
                    <label className="checkboxLabel" style={{ gridColumn: '1 / 3' }}>
                        Already have an account? &nbsp;
                        <a href="/login" rel="noreferrer" className="linklabel">
                            Login
                        </a>
                    </label>
                </div>
            }
        </div>
    </div>
}

export default Signup