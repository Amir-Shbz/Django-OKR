import React from 'react'
import { Link } from 'react-router-dom';

export default function Login({authenticate}) {
    return (
        <div className="App d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <h1>Weekdone.com Clone</h1>
            <div className="d-flex w-100 justify-content-center">
                <Link to="/signup"><button className="btn btn-primary" style={{ minWidth: '200px' }}>Sign Up</button></Link>
                <Link to="/login"><button className="btn btn-primary mx-2" style={{ minWidth: '200px' }}>Login</button></Link>
            </div>
        </div>
    )
}
