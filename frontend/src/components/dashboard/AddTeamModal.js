import React from 'react'
import { AddTeam } from '../modalsContents/AddTeam'

export const AddTeamModal = () => {
    return (
        <div className="modal" id="addTeamModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className='container-fluid d-flex  my-3'>
                <h5 className='mx-auto' style={{ color: '#455a64' }}>ADD TEAM</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className='container mt-5'>
                 <AddTeam />
              </div>
            </div>
          </div>
        </div>
      )
}
