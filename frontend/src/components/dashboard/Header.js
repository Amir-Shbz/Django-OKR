import React from 'react'

export const Header = () => {

    function sectionSwitch(params) {

    }
    return (
        <div className='row dashboard-main-header py-2'>
            <div className='col-4'></div>
            <div className='col-4 px-5'>
                <h4>Company<i className="fa-solid fa-star mx-1"></i></h4>
            </div>
            <div className='col-4 align-items-center px-3 d-flex justify-content-end'>
                <i className="fa-solid fa-arrow-down-short-wide" data-bs-toggle="tooltip" data-bs-placement="top" title="Filter"></i>
                <i className="fa-solid fa-file-export" data-bs-toggle="tooltip" data-bs-placement="top" title="Export"></i>
                <i className="fa-solid fa-tv" data-bs-toggle="tooltip" data-bs-placement="top" title="Present at a meeting"></i>
                <i className="fa-solid fa-angle-left"></i>
                <i className="fa-solid fa-calendar-days" data-bs-toggle="tooltip" data-bs-placement="top" title="Calender days"></i>
                <span>This Quarter</span>
                <i className="fa-solid fa-angle-right"></i>
            </div>
            <div className='col-12 d-flex justify-content-center mt-3' style={{ paddingInline: '25%' }}>
                <button id="emailModalButton" onClick={() => sectionSwitch(1)} className='btn dashboard-modal-button dashboard-modal-button-selected'>By Categories</button>
                <button id="linkModalButton" onClick={() => sectionSwitch(2)} className='btn dashboard-modal-button' style={{ boxShadow: 'none !important', border: 'none !important' }}>Hierarchy</button>
                <button id="linkModalButton" onClick={() => sectionSwitch(2)} className='btn dashboard-modal-button' style={{ boxShadow: 'none !important', border: 'none !important' }}>Tree</button>
                <button id="linkModalButton" onClick={() => sectionSwitch(2)} className='btn dashboard-modal-button' style={{ boxShadow: 'none !important', border: 'none !important' }}>Initiatives</button>
                <button id="linkModalButton" onClick={() => sectionSwitch(2)} className='btn dashboard-modal-button' style={{ boxShadow: 'none !important', border: 'none !important' }}>Updates</button>
            </div>
        </div>
    )
}
