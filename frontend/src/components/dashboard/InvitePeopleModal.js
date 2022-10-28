import React, { useState } from 'react'
import { InviteByEmail } from '../modalsContents/InviteByEmail'
import { InviteByLink } from '../modalsContents/InviteByLink';

export const InvitePeopleModal = () => {
  const [section, setSection] = useState(1);

  function sectionSwitch(sectionNumber) {
    if (section === 1 && sectionNumber === 2) {
      setSection(2);
      document.getElementById('emailModalButton').classList.remove('dashboard-modal-button-selected');
      document.getElementById('linkModalButton').classList.add('dashboard-modal-button-selected');
    } else if (section === 2 && sectionNumber === 1) {
      setSection(1);
      document.getElementById('linkModalButton').classList.remove('dashboard-modal-button-selected');
      document.getElementById('emailModalButton').classList.add('dashboard-modal-button-selected');
    }
  }
  return (
    <div className="modal my-auto" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className='container-fluid d-flex  my-3'>
            <h5 className='mx-auto' style={{ color: '#455a64' }}>INVITE PEOPLE TO WEEKDONE</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className='container'>
            <button id="emailModalButton" onClick={() => sectionSwitch(1)} className='btn dashboard-modal-button dashboard-modal-button-selected'>Invite By E-Mail</button>
            <button id="linkModalButton" onClick={() => sectionSwitch(2)} className='btn dashboard-modal-button' style={{ boxShadow: 'none !important', border: 'none !important' }}>Invite By Link</button>
          </div>
          <div className='container mt-5'>
            {section === 1 ? <InviteByEmail /> : <InviteByLink />}
          </div>
        </div>
      </div>
    </div>
  )
}
