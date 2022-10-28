import React from 'react';
import { AddTeamModal } from '../components/dashboard/AddTeamModal';
import { ByCategories } from '../components/dashboard/ByCategories';
import { Header } from '../components/dashboard/Header';
import { InvitePeopleModal } from '../components/dashboard/InvitePeopleModal';
import Menu from '../components/dashboard/Menu';
import { Navbar } from '../components/dashboard/Navbar';
import '../styles/pages/dashboard.css';

export default function Dashboard() {


  return (
    <div className='container-fluid'>
      <InvitePeopleModal />
      <AddTeamModal />
      <div className='dashboard row min-vh-100'>
        <div className='col-md-4 col-lg-4 col-xl-2 dashboard-left'>
          <div className='row h-100'>
            <div className='col-md-2 col-lg-2 col-xl-2 dashboard-sidebar p-0'>
              <div className='h-75 dashboard-sidebar-top'>
                <div className='mb-2 d-flex align-items-center justify-content-center flex-column dashboard-sidebar-selected' style={{ backgroundColor: '#fafbfb', height: '10%' }}>
                  <i className="fa-solid fa-house fa-xl mt-4 text-primary"></i>
                  <span className='dashboard-sidebar-span mx-auto mt-3 text-primary'>Home</span>
                </div>
                <div className='d-flex align-items-center justify-content-center flex-column' style={{ height: '10%' }}>
                  <i className="fa-solid fa-newspaper fa-xl mt-4"></i>
                  <span className='dashboard-sidebar-span mx-auto mt-3 text-center'>News feed</span>
                </div>
              </div>
              <div style={{ height: '5%' }}></div>
              <div className='dashboard-sidebar-bottom'>
                <div className='d-flex align-items-center justify-content-center flex-column' style={{ height: '10%' }}>
                  <i className="fa-brands fa-rocketchat fa-xl mt-4"></i>
                  <span className='dashboard-sidebar-span mx-auto mt-3 text-center'>Support Chat</span>
                </div>
                <div className='d-flex align-items-center justify-content-center flex-column' style={{ height: '10%' }}>
                  <i className="fa-solid fa-circle-question fa-xl mt-4"></i><br />
                  <span className='dashboard-sidebar-span mx-auto mt-3'>Help</span>
                </div>
              </div>
            </div>
            <div className='col-md-10 col-lg-10 col-xl-10 dashboard-menu'>
              <Menu />
            </div>
          </div>
        </div>
        <div className='col-md-8 col-lg-8 col-xl-10 dashboard-main'>
            <Navbar />
            <Header />
            <ByCategories />
        </div>
      </div>
    </div>
  )
}