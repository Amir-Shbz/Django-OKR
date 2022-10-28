import React from 'react'

export const InviteByLink = () => {

  function focused(e) {
    if (e.target.name === "teamInput") {
      document.getElementById('teamLabel').classList.add('text-primary');
    }
  }
  return (
    <form className='px-5 dashboard-modal-form'>
      <div className="row mb-3">
        <label id="teamLabel" className="col-sm-2 col-form-label">Team</label>
        <div className="col-sm-10">
          <select onFocus={focused} name="teamInput" className="form-select" aria-label="Default select example">
            <option>- Choose a team to get the link -</option>
            <option value="1">Default Team</option>
          </select>
        </div>
      </div>
      <div className='row d-flex justify-content-center my-4'>
        <button type="submit" className="btn btn-primary rounded-1" style={{ maxWidth: '10%', boxShadow: 'none' }}>Done</button>
      </div>
    </form>
  )
}
