import React, { useEffect } from 'react'
import Ceneterpage from './HomePage/Ceneterpage';
import LSidebar from './HomePage/LSidebar';
import RSidebar from './HomePage/RSidebar'
import Navbar from './HomePage/Navbar';

function Home() {
    return (
        <React.Fragment>
            <Navbar />
            <section className='h-100 pt-4 container-sm d-flex justify-content-between align-items-start flex-grow-1'>
                <LSidebar />    
                <Ceneterpage />
                <RSidebar />
            </section>
        </React.Fragment>
    )
}
export default Home;