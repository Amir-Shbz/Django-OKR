import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import '../styles/pages/login.css';

export default function Login({ authenticate }) {

    let navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    function focused(e) {
        if (e.target.name === "passwordInput") {
            document.getElementById('emailLabel').removeAttribute('class');
            document.getElementById('passwordLabel').setAttribute('class', 'text-primary');
        } else {
            document.getElementById('passwordLabel').removeAttribute('class');
            document.getElementById('emailLabel').setAttribute('class', 'text-primary');
        }
    }

    function blur(e) {
        document.getElementById('emailLabel').removeAttribute('class');
        document.getElementById('passwordLabel').removeAttribute('class');
    }

    function onChanged(type, e) {
        if (type === "email") {
            setData({ email: e.target.value, password: data.password });
        } else if (type === "password") {
            setData({ email: data.email, password: e.target.value });
        }
    }

    async function submit(e) {
        e.preventDefault();
        let isValid = true;

        if (data.email.length < 1) {
            document.getElementById('emailLabel').classList.add('invalid-label');
            document.getElementById('emailInput').classList.add('invalid-input');
            document.getElementById('emailFeedback').style.display = 'block';
            isValid = false;
        }

        if (data.password.length < 1) {
            document.getElementById('passwordLabel').classList.add('invalid-label');
            document.getElementById('passwordInput').classList.add('invalid-input');
            document.getElementById('passwordFeedback').style.display = 'block';
            isValid = false;
        }
        if (isValid) {

            try {
                const result = (await axios.post('https://roshanai.pythonanywhere.com/auth/login/', {
                    email: data.email,
                    password: data.password
                })).data;

                localStorage.setItem('auth', 'ok');
                localStorage.setItem('token',  result.token);
                authenticate();
                navigate('/dashboard');
            } catch (error) {
                console.log(error);
                document.getElementById('credentialsFeedback').style.display = 'block';
            }
        }
    }

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center flex-column">
            <div className="row">
                <h1 className="text-center text-dark fs-1">Sign In</h1>
                <div id="credentialsFeedback" className="invalid-feedback text-center">
                                    Invalid Credentials.
                                </div>
            </div>
            <div className="row mt-2">
                <form className="needs-validation" noValidate={true}>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="row">
                            <div className="col-sm-12 col-md-1 offset-md-4 my-auto">
                                <label htmlFor="emailInput" id="emailLabel">E-mail</label>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-2">
                                <input id="emailInput" value={data.email} onChange={(e) => onChanged("email", e)} placeholder="Enter your e-mail" onFocus={focused} onBlur={blur} name="emailInput" type="email" className="text-primary w-100 form-control" required={true} />
                                <div className="invalid-feedback" id="emailFeedback">
                                    Please provide a valid E-mail.
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-12 col-md-1 offset-md-4 my-auto">
                                <label htmlFor="passwordInput" id="passwordLabel">Password</label>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-2">
                                <input id="passwordInput" value={data.password} onChange={(e) => onChanged("password", e)} placeholder="Enter your password" onFocus={focused} onBlur={blur} name="passwordInput" type="password" className="text-primary w-100 form-control m-input" />
                                <div id="passwordFeedback" className="invalid-feedback">
                                    Please provide a valid Password.
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-12 col-md-2 offset-md-3"></div>
                            <div className="col-sm-12 col-md-4 col-lg-4 col-xl-2 mt-2">
                                <Button text="Sign In" onClick={(e) => {submit(e)}} />
                                <a className="btn btn-large btn-block text-center w-100 mt-2" href="/google"><img src="https://weekdone.com/img/integrations/btn_google_light_normal_ios.svg" alt="G" />  <span>Sign in with Google</span> </a>
                                <p className="help-block center">
                                    <a href="/">Forgot password?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}