import React from 'react'
import { ByCategoriesItem } from './main/byCategories/ByCategoriesItem'
import { SpritItem } from './main/byCategories/SpritItem'

export const ByCategories = () => {
    return (
        <div className='row p-5'>
            <div className='col-7'>
                <button className="dashboard-by-categories-button"><i className="fa-solid fa-bullseye"></i> Objectives</button>
                <button className="dashboard-by-categories-button"><i className="fa-brands fa-osi"></i> Initiatives</button>
            </div>
            <div className='col-4 offset-1'>
                <span className='dashboard-by-categories-p'><b>This report</b> will be sent to your team in 3 days</span>
            </div>
            <h6 className='mt-5'>Goals for the week</h6>
            <ByCategoriesItem placeholder="Add a weekly plan" index="0" />
            <h6 className='mt-5'>Any wins today?</h6>
            <ByCategoriesItem placeholder="Add a weekly accomplishment" index="1" />
            <h6 className='mt-5'>Your current struggles</h6>
            <ByCategoriesItem placeholder="Add a weekly challange" index="2" />
            <h6 className='mt-5'>Lessons learned</h6>
            <ByCategoriesItem placeholder="Add a weekly item" index="3" />
            <h6 className='mt-5'>Team improvement ideas</h6>
            <ByCategoriesItem placeholder="Add a weekly item" index="4" />

            <div className='mt-5'>
                <SpritItem title="Happiness" icons="star"/>
                <SpritItem title="Team sprit" icons="heart"/>
                <SpritItem title="Energy level" icons="energy"/>
                <SpritItem title="Work-life balance" icons="balance"/>
            </div>
        </div>
    )
}
