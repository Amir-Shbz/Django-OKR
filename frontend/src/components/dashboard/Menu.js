import React, { useState } from 'react'
import { useSelector } from 'react-redux';
export default function Menu() {
  const teams = useSelector((state) => state.teams.value);

  const teamsItems = teams.map((team, index) =>
    <li key={index} className='d-flex align-items-center p-2'>
      <span className='dashboard-menu-avatar bg-danger text-white'>{team.name.slice(0, 2)}</span>
      <span className="d-inline-block text-truncate text-black-50 mx-1" style={{ maxWidth: '150px' }}>
        {team.name}
      </span>
    </li>
  );

  const [hidden, setHidden] = useState(false);

  return (
    <div>
      <input type='search' placeholder='Find people or teams...' className='dashboard-menu-search d-block mx-auto mt-2 px-2' style={{ width: '80%' }} />
      <div className='dashboard-menu-block py-2 px-1 mt-2 d-flex align-items-center'>
        <span className='dashboard-menu-avatar bg-danger text-white'>mh</span>
        <span className="dashboard-menu-name d-inline-block text-truncate mx-2" style={{ maxWidth: '250px', color: '#b0bec5' }}>
          mohammad hossein mazandaranian
        </span>
      </div>
      <hr className='w-100' />
      <div className='mx-3 d-flex align-items-center'>
        <i className="fa-solid fa-list" style={{ color: '#b0bec5' }}></i><span className='mx-1' style={{ fontSize: '12px', color: '#b0bec5' }}>COMPANY REPORTS</span>
      </div>
      <div className='dashboard-menu-block px-3 py-3 mt-3 d-flex align-items-center'>
        <i className="fa-solid fa-apple-whole fa-lg text-black-50"></i><span className='text-primary mx-2' style={{ fontSize: '14px' }}>Company</span>
      </div>
      <div onClick={() => setHidden(s => !s)} className='dashboard-menu-block px-3 py-3 d-flex align-items-center'>
        <span className='dashboard-menu-avatar dashboard-menu-avatar-default-team text-primary p-1'>DT</span><span className='mx-1 w-100' style={{ color: '#b0bec5', fontSize: '14px' }} >Default Team</span>
        {!hidden ? <i className="fa-solid fa-angle-up"></i> : null}
        {hidden ? <i className="fa-solid fa-angle-down"></i> : null}
      </div>
      <div className='px-1 mt-1 d-flex align-items-center'>
        {!hidden ? <ul className='dashboard-menu-list' style={{ width: '100%', overflow: 'hidden' }}>
          <li className='d-flex align-items-center p-2'>
            <span className='dashboard-menu-avatar bg-primary text-white'>E1</span>
            <span className='text-black-50 mx-1 text-truncate'>Example User 1</span>
          </li>
          <li className='d-flex align-items-center my-3 p-2'>
            <span className='dashboard-menu-avatar bg-primary text-white'>E2</span>
            <span className='text-black-50 mx-1 text-truncate' >Example User 2</span>
          </li>
          <li className='d-flex align-items-center p-2'>
            <span className='dashboard-menu-avatar bg-danger text-white'>mh</span>
            <span className="d-inline-block text-truncate text-black-50 mx-1" style={{ maxWidth: '150px' }}>
              mohammad hossein mazandaranian
            </span>
          </li>
          {teamsItems}
        </ul> : null
        }
      </div>
      <div className='dashboard-menu-block px-3 py-3 mt-3 d-flex align-items-center' data-bs-toggle="modal" data-bs-target="#addTeamModal" style={{ cursor: 'pointer' }}>
        <span className='dashboard-menu-avatar text-white' style={{ backgroundColor: 'skyblue' }}>+</span><span className='text-black-50 mx-2'>Add team</span>
      </div>
      <div className='dashboard-menu-block px-3 py-3 d-flex align-items-center' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: 'pointer' }}>
        <span className='dashboard-menu-avatar text-white' style={{ backgroundColor: 'skyblue' }}>+</span><span className='text-black-50 mx-2'>Invite people</span>
      </div>
      <hr />
      <button className='mx-auto w-100 bg-transparent text-primary dashboard-menu-remove-button p-2'>Remove examples</button>
    </div>

  );
}
