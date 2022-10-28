import React, { useState } from 'react';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/signup.css';

export default function Signup() {

    let navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    function focused(e) {
        if (e.target.name === "passwordInput") {
            document.getElementById('fullNameLabel').classList.remove('text-primary');
            document.getElementById('emailLabel').classList.remove('text-primary');
            document.getElementById('howLabel').classList.remove('text-primary');
            document.getElementById('problemLabel').classList.remove('text-primary');
            document.getElementById('fieldLabel').classList.remove('text-primary');
            document.getElementById('manyLabel').classList.remove('text-primary');
            document.getElementById('passwordLabel').classList.add('text-primary');
        }else if (e.target.name === "emailInput") {
            document.getElementById('fullNameLabel').classList.remove('text-primary');
            document.getElementById('passwordLabel').classList.remove('text-primary');
            document.getElementById('howLabel').classList.remove('text-primary');
            document.getElementById('fieldLabel').classList.remove('text-primary');
            document.getElementById('manyLabel').classList.remove('text-primary');
            document.getElementById('emailLabel').classList.add('text-primary');
        }else if (e.target.name === "fullNameInput") {
            document.getElementById('passwordLabel').classList.remove('text-primary');
            document.getElementById('emailLabel').classList.remove('text-primary');
            document.getElementById('howLabel').classList.remove('text-primary');
            document.getElementById('problemLabel').classList.remove('text-primary');
            document.getElementById('fieldLabel').classList.remove('text-primary');
            document.getElementById('manyLabel').classList.remove('text-primary');
            document.getElementById('fullNameLabel').classList.add('text-primary');
        }else if (e.target.name === "how") {
            document.getElementById('passwordLabel').classList.remove('text-primary');
            document.getElementById('emailLabel').classList.remove('text-primary');
            document.getElementById('fullNameLabel').classList.remove('text-primary');
            document.getElementById('problemLabel').classList.remove('text-primary');
            document.getElementById('fieldLabel').classList.remove('text-primary');
            document.getElementById('manyLabel').classList.remove('text-primary');
            document.getElementById('howLabel').classList.add('text-primary');
        }else if (e.target.name === "problem") {
            document.getElementById('passwordLabel').classList.remove('text-primary');
            document.getElementById('emailLabel').classList.remove('text-primary');
            document.getElementById('fullNameLabel').classList.remove('text-primary');
            document.getElementById('howLabel').classList.remove('text-primary');
            document.getElementById('fieldLabel').classList.remove('text-primary');
            document.getElementById('manyLabel').classList.remove('text-primary');
            document.getElementById('problemLabel').classList.add('text-primary');
        }else if (e.target.name === "field") {
            document.getElementById('passwordLabel').classList.remove('text-primary');
            document.getElementById('emailLabel').classList.remove('text-primary');
            document.getElementById('fullNameLabel').classList.remove('text-primary');
            document.getElementById('howLabel').classList.remove('text-primary');
            document.getElementById('problemLabel').classList.remove('text-primary');
            document.getElementById('manyLabel').classList.remove('text-primary');
            document.getElementById('fieldLabel').classList.add('text-primary');
        }else if (e.target.name === "many") {
            document.getElementById('passwordLabel').classList.remove('text-primary');
            document.getElementById('emailLabel').classList.remove('text-primary');
            document.getElementById('fullNameLabel').classList.remove('text-primary');
            document.getElementById('howLabel').classList.remove('text-primary');
            document.getElementById('problemLabel').classList.remove('text-primary');
            document.getElementById('fieldLabel').classList.remove('text-primary');
            document.getElementById('manyLabel').classList.add('text-primary');
        }
    }

    function onChanged(type, e) {
        if (type === "email") {
            setData({ email: e.target.value, password: data.password, name: data.name });
        } else if (type === "password") {
            setData({ email: data.email, password: e.target.value, name: data.name });
        } else if (type === "name") {
            setData({ email: data.email, password: data.password, name: e.target.value })
        }
    }

    async function submit(e) {
        e.preventDefault();
        let isValid = true;

        if (data.email.length < 1) {
            document.getElementById('emailLabel').classList.remove('text-primary');
            document.getElementById('emailLabel').classList.add('invalid-label');
            document.getElementById('emailInput').classList.add('invalid-input');
            document.getElementById('emailFeedback').style.display = 'block';
            isValid = false;
        }

        if (data.name.length < 1) {
            document.getElementById('fullNameLabel').classList.remove('text-primary');
            document.getElementById('fullNameLabel').classList.add('invalid-label');
            document.getElementById('fullNameInput').classList.add('invalid-input');
            document.getElementById('fullNameFeedback').style.display = 'block';
            isValid = false;
        }

        if (data.password.length < 1) {
            document.getElementById('passwordLabel').classList.remove('text-primary');
            document.getElementById('passwordLabel').classList.add('invalid-label');
            document.getElementById('passwordInput').classList.add('invalid-input');
            document.getElementById('passwordFeedback').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            try {
                const result = (await axios.post('https://roshanai.pythonanywhere.com/auth/sign-up/', {
                email: data.email,
                password: data.password,
                name: data.name
            }, { mode: 'cors' })).data;
    
            console.log(result);
            navigate('/login');
            } catch (error) {
                console.log(error.response.data);
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row mt-5'>
                <h1 className='text-center'>Get started with Weekdone</h1>
                <p className='text-center' style={{ color: "#607d8b", fontSize: "70%" }}>Try now – your first 2 weeks are free. Set goals for your company & teams.</p>
                <div className='signup-page-herolist d-flex justify-content-between w-50 mx-auto' style={{ color: "#607d8b" }}>
                    <span className='fw-normal'><i>✓</i>OKR goal-setting methods</span>
                    <span className='fw-normal'><i>✓</i>Drive execution weekly</span>
                    <span className='fw-normal'><i>✓</i>Align company and teams</span>
                </div>
            </div>
            <div className='row mt-3 mx-auto'>
                <form>
                    <div className="form-group row">
                        <label htmlFor="fullNameInput" id="fullNameLabel" className="col-sm-1 offset-sm-4 col-form-label">Fullname</label>
                        <div className="col-sm-3">
                            <input onChange={(e) => onChanged("name", e)} onFocus={focused} name="fullNameInput" type="text" className="form-control" id="fullNameInput" placeholder="Enter your name" />
                        <div className="invalid-feedback" id="fullNameFeedback">
                                    Please provide a valid name.
                                </div>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label htmlFor="emailInput" id="emailLabel" className="col-sm-1 offset-sm-4 col-form-label">E-mail</label>
                        <div className="col-sm-3">
                            <input onChange={(e) => onChanged("email", e)} onFocus={focused} name="emailInput" type="email" className="form-control" id="emailInput" placeholder="Enter your e-mail" />
                        <div className="invalid-feedback" id="emailFeedback">
                                    Please provide a valid email.
                                </div>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label htmlFor="passwordInput" id="passwordLabel" className="col-sm-1 offset-sm-4 col-form-label">Password</label>
                        <div className="col-sm-3">
                            <input onChange={(e) => onChanged("password", e)} onFocus={focused} name="passwordInput" type="password" className="form-control" id="passwordInput" placeholder="Enter your password" />
                        <div className="invalid-feedback" id="passwordFeedback">
                                    Please provide a valid password.
                                </div>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label id="howLabel" className="col-sm-1 offset-sm-4 col-form-label">Use Case</label>
                        <div className="col-sm-3">
                            <select defaultValue="How do you want to use it?" onFocus={focused} name="how" className="form-select" aria-label="Default select example">
                                <option>How do you want to use it?</option>
                                <option value="1">Team project management</option>
                                <option value="2">Personal productivity</option>
                                <option value="3">Progress reporting</option>
                                <option value="4">Organizational OKRs and goal-setting</option>
                                <option value="5">Engagement and feedback</option>
                                <option value="5">Team communication</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label id="problemLabel" className="col-sm-1 offset-sm-4 col-form-label">Key Need</label>
                        <div className="col-sm-3">
                            <select defaultValue="Main problem or need?" onFocus={focused} name="problem" className="form-select" aria-label="Default select example">
                                <option>Main problem or need?</option>
                                <option value="1">Company or team is growing</option>
                                <option value="2">Work remotely or from home</option>
                                <option value="3">Align people and teams</option>
                                <option value="4">Current tools are lacking</option>
                                <option value="5">Engagement and feedback</option>
                                <option value="5">Keep track of tasks and projects</option>
                                <option value="6">Visualize team progress</option>
                                <option value="7">Keep track of tasks and projects</option>
                                <option value="8">Measure employee performance</option>
                                <option value="9">To switch from spreadsheets</option>
                                <option value="10">Other</option>
                                <option value="11">Automate reporting</option>
                                <option value="12">Increase collaboration and communication</option>
                                <option value="13">To set and manage plans and goals</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label id="fieldLabel" className="col-sm-1 offset-sm-4 col-form-label">Your Field</label>
                        <div className="col-sm-3">
                            <select defaultValue="Choose your field of expertise" onFocus={focused} name="field" className="form-select" aria-label="Default select example">
                                <option>Choose your field of expertise</option>
                                <option value="1">Support/Customer Service</option>
                                <option value="2">Product Management</option>
                                <option value="3">Align people and teams</option>
                                <option value="4">Technology/Engineering/R&D</option>
                                <option value="5">Marketing</option>
                                <option value="5">Sales</option>
                                <option value="6">HR</option>
                                <option value="7">Finance/Accounting</option>
                                <option value="8">Top Management/Leadership</option>
                                <option value="9">Training/Education</option>
                                <option value="10">Operations/Administrative</option>
                                <option value="11">Other</option>
                                <option value="12">Design</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label id="manyLabel" className="col-sm-1 offset-sm-4 col-form-label">Number of Users</label>
                        <div className="col-sm-3">
                            <select defaultValue="How many will use weekdone?" onFocus={focused} className="form-select" name="many" aria-label="Default select example">
                                <option>How many will use weekdone?</option>
                                <option value="1">1-3 users</option>
                                <option value="2">4-30 users</option>
                                <option value="3">31-50 users</option>
                                <option value="4">51-100 users</option>
                                <option value="5">101-250 users</option>
                                <option value="5">250-500 users</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                        <div className='col-sm-2 offset-sm-3'></div>
                        <div className='col-sm-3 d-flex justify-content-center flex-column'>
                            <Button text="Sign up for free" onClick={submit}/>
                            <a className="btn btn-large btn-block p-0 my-3 fw-bold fs-6" href="/google"><img src="https://weekdone.com/img/integrations/btn_google_light_normal_ios.svg" alt="G" />  <span>Or sign up with Google</span> </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}