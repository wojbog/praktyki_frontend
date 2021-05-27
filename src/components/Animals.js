import React from 'react'
import AnimalsList from './AnimalsList'
import AnimalsSideBarNav from './AnimalsSideBarNav'

const Animals = () => {

    return (
        <div className="Animals"> 
            <AnimalsSideBarNav />
            <AnimalsList />
        </div>
    )
}

export default Animals
