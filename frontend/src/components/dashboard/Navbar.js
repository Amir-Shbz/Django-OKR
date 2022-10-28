import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    let navigate = useNavigate();

    let temp = 0;
    let temp2 = 0;
    function collapse() {
        if (temp === 1) {
            temp = 0;
            document.getElementsByClassName('dashboard-left')[0].classList = 'col-md-4 col-lg-4 col-xl-2 dashboard-left';
            document.getElementsByClassName('dashboard-menu')[0].style.display = 'block';
            document.getElementsByClassName('dashboard-left')[0].style.maxWidth = '';
            document.getElementsByClassName('dashboard-main')[0].style.width = '';
            document.getElementsByClassName('dashboard-main')[0].classList = 'col-md-8 col-lg-8 col-xl-10 dashboard-main';
            document.getElementsByClassName('dashboard-sidebar')[0].classList = 'col-md-2 col-lg-2 col-xl-2 dashboard-sidebar p-0';
        } else {
            temp = 1;
            document.getElementsByClassName('dashboard-left')[0].classList = 'col-md-4 col-lg-4 col-xl-1 dashboard-left';
            document.getElementsByClassName('dashboard-left')[0].style.maxWidth = '3%';
            document.getElementsByClassName('dashboard-menu')[0].style.display = 'none';
            document.getElementsByClassName('dashboard-main')[0].classList = 'col-md-8 col-lg-8 col-xl-11 dashboard-main';
            document.getElementsByClassName('dashboard-main')[0].style.width = '97%';
            document.getElementsByClassName('dashboard-sidebar')[0].classList = 'col-md-2 col-lg-2 col-xl-12 dashboard-sidebar p-0';
        }
    }

    function toggleSearch() {
        if (temp2 === 1){
            temp2 = 0;
            document.getElementById('searchInput').style.display = 'none';
        }else {
            temp2 = 1;
            document.getElementById('searchInput').style.display = 'inline';
        }
    }

    function signout() {
        localStorage.removeItem('auth');
        navigate('/');
    }
    
    return (
        <div className='row p-1 dashboard-main-navbar'>
            <div className='col-4 align-self-center'>
                <i onClick={collapse} className="fa-solid fa-compress"></i>
                <i className="fa-solid fa-apple-whole text-black-50 mx-3"></i>
                <i onClick={toggleSearch} className="fa-solid fa-magnifying-glass" id="dropdownSearch" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <input style={{display: 'none'}} id="searchInput" type="search" placeholder='Search for tags, teams and prople' className='mx-2 dashboard-menu-search'/>
                <div className="dropdown-menu p-2 mt-3 w-100" aria-labelledby="dropdownSearch">
                    <div className='row'>
                        <div className='col-4'>
                            <span style={{ fontSize: '12px' }}>Your Weekdone</span>
                            <ul style={{listStyle: 'none', color: '#455a64'}} className="mt-2 dashboard-navbar-search-menu">
                                <li>Newsfeed</li>
                                <hr />
                                <li>Your Quarter</li>
                                <hr />
                                <li>Your Settings</li>
                            </ul>
                        </div>
                        <div className='col-4'>
                            <span style={{ fontSize: '12px' }}>Get An Answer To Your Questions</span>
                            <ul style={{listStyle: 'none', color: '#455a64'}} className="mt-2 dashboard-navbar-search-menu">
                                <li>Are my OKRs on track</li>
                                <li>How are my organization OKRs this quarter</li>
                                <hr />
                                <li>Show me latest updates by everyone</li>
                                <li>Show me latest updates from my team</li>
                            </ul>
                        </div>
                        <div className='col-4'>
                            <span style={{ fontSize: '12px' }}>Quarterly Objectives</span>
                            <ul style={{listStyle: 'none', color: '#455a64'}} className="mt-2 dashboard-navbar-search-menu">
                                <li>Objectives related to me</li>
                                <hr />
                                <li>Your Quarter</li>
                                <li>Your Team this quarter</li>
                                <li>Your Company this quarter</li>
                                <hr />
                                <li>Objective alignment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-6' style={{ color: 'gray'}}>
                <h4>Quarterly Objectives
                </h4>
            </div>
            <div className='col-2 d-flex flex-row justify-content-between px-3 align-items-center'>
                <button className='btn btn-primary dashboard-main-navbar-add-button' id="dropdownAdd" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-circle-plus"></i> Add</button>
                <ul className="dropdown-menu p-2 mt-2 dashboard-navbar-drop-menu" aria-labelledby="dropdownAdd">
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-cookie-bite"></i><span className='mx-1'>Weekly Item</span></a></li>
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-object-group"></i><span className='mx-1'>Quarterly Objective</span></a></li>
                    <hr />
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-person-circle-plus"></i><span className='mx-1'>Invite</span></a></li>
                </ul>
                <i className="fa-solid fa-crown"></i>
                <i style={{ cursor: 'pointer' }} className="fa-solid fa-bell" id="dropdownNotif" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <div className="dropdown-menu p-2 mt-4 dashboard-navbar-drop-menu" aria-labelledby="dropdownNotif">
                    No notifications to show
                </div>
                <div style={{ cursor: 'pointer' }} className='d-inline' id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className='dashboard-menu-avatar bg-danger text-white'>mh</span>
                    <i className="fa-solid fa-caret-down mx-1"></i>
                </div>
                <ul className="dropdown-menu p-2 mt-2 dashboard-navbar-drop-menu" aria-labelledby="dropdownMenu">
                    <li><a className="dropdown-item" href="/"><span className='dashboard-menu-avatar bg-danger text-white'>mh</span><span className='mx-1'>mohammad h</span></a></li>
                    <hr />
                    <span style={{ fontSize: '12px' }}>Settings</span>
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-user"></i><span className='mx-1'>Your account</span></a></li>
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-cloud-arrow-up"></i><span className='mx-1'>Import & Integerations</span></a></li>
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-gear"></i><span className='mx-1'>Company settings</span></a></li>
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-people-group"></i><span className='mx-1'>People & Teams</span></a></li>
                    <hr />
                    <span style={{ fontSize: '12px' }}>Help</span>
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-chalkboard-user"></i><span className='mx-1'>Learning Center</span></a></li>
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-circle-question"></i><span className='mx-1'>Help & FAQ</span></a></li>
                    <hr />
                    <li><a className="dropdown-item" href="/"><i className="fa-solid fa-cube"></i><span className='mx-1'>Upgrade package</span></a></li>
                    <hr />
                    <li onClick={signout}><a className="dropdown-item" href="/"><i className="fa-solid fa-arrow-right-from-bracket"></i><span className='mx-1'>Sign out</span></a></li>
                </ul>
            </div>
        </div>
    )
}
