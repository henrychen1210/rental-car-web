import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";

const Login = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isEmployeeChecked, setIsEmployeeChecked] = useState(false);
    
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
    const logIn = async () => {
        try {
            const results = await axios.post("http://localhost:3002/login", { email: email, password: password });
            //console.log(results.data);

            if (results.data[0]) {
                setLoggedIn(true)
                props.setEmail(email)
                props.setLoggedIn(true)
                props.setCustomerInfo(results.data[0])
                navigate("/")
            }
            else if ( "Email or password is wrong" )  {
                setPasswordError("Wrong Email or Password")
            }
        } catch (err) {
            setPasswordError("Wrong Email or Password")
            console.log(err);
        }
    }

    // Log in a employee using email and password ???
    const empLogIn = async () => {
        try {
            const results = await axios.post("http://localhost:3002/emplogin", { email: email, password: password });
            console.log(results.data);

            if (results.data == "login sucessfully!") {
                setLoggedIn(true)
                props.setEmail(email)
                props.setLoggedIn(true)
                props.setEmployee(true)
                navigate("/")
            }
            else  {
                setPasswordError("Wrong Email or Password")
            }
        } catch (err) {
            setPasswordError("Wrong Email or Password")
            console.log(err);
        }
    }
        
    const onButtonClick = () => {
        
        // Set initial error values to empty
        setEmailError("")
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

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        if (isEmployeeChecked) {
            empLogIn()
        }
        else {

            logIn()
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
    }

    const handleCheckboxChange = (event) => {
        setIsEmployeeChecked(event.target.checked);
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
        <div id="loginImage">
            <img src='/login_left.png' id="loginLeft"></img>
            <img src='/wowlogo.png' className="logoImage"></img>
            
        </div>
        <div className="menuBarSection">
            <button onClick={handleToHomeClick} id="homeButton">
                <span>WoW</span>
                <img src='/car.png' width={"40px"}></img>
            </button>
        </div>
        <div id="loginBlock">
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br /><br /><br /><br />
            <div className={"inputContainer"}>
                <input
                    value={email}
                    placeholder="Email"
                    onChange={ev => setEmail(ev.target.value)}
                    className={"inputBox"} />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={ev => setPassword(ev.target.value)}
                    className={"inputBox"} />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={"Login"} />
            </div>
            <div className={"labelContainer"}>
                <label className="checkboxLabel">
                    <input
                        className={"inputCheckBox"}
                        type="checkbox"
                        onChange={handleCheckboxChange}
                    />
                    Employee Login
                </label>
                <a href="" rel="noreferrer" className="checkboxLabel">
                    <img src='/lock.png' width={"20px"}></img>
                    Froget password
                </a>
            </div>
            <br />
            <br />
            <label className="label">
                First time? &nbsp;
                <a href="/signup" rel="noreferrer" className="linklabel">
                    Sign up
                </a>
            </label>
        </div>
    </div>
}

export default Login