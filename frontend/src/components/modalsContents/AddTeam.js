import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTeam } from '../../features/teamsSlice';

export const AddTeam = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('');

    function focused(e) {
        if (e.target.name === "teamNameInput") {
            document.getElementById('teamNameLabel').classList.add('text-primary');
        }
    }

    function blured(e) {
        if (e.target.name === "teamNameInput") {
            document.getElementById('teamNameLabel').classList.remove('text-primary');
        }
    }

    function typing(e) {
        setName(e.target.value);
    }

    async function submit(e) {
        e.preventDefault();

        try {
            const result = (await axios.post('http://roshanai.pythonanywhere.com/okr/addteam/', {
                'name': name,
                'token': localStorage.getItem('token')
            })).data;

            if(result.name) {
                dispatch(addTeam(result));
            }

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='px-5 dashboard-modal-form'>
            <div className="row mb-3">
                <label id="teamNameLabel" className="col-sm-2 col-form-label">Team name</label>
                <div className="col-sm-10">
                    <input onChange={typing} placeholder="Enter team name" onFocus={focused} onBlur={blured} name="teamNameInput" type="email" className="text-black-50 w-100 form-control" />
                </div>
            </div>
            <div className='row d-flex justify-content-center my-4'>
                <button onClick={submit} type="submit" className="btn btn-primary rounded-1" style={{ maxWidth: '10%', boxShadow: 'none' }}>Add Team</button>
                <button type="button" className="btn btn-link mx-2 dashboard-modal-button-cancel" data-bs-dismiss="modal" style={{ maxWidth: '10%' }}>Cancel</button>
            </div>
        </form>
    )
}
