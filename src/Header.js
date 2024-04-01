import React, {useState, useEffect} from 'react';
import './style.css'; 
import {local_url, student_url, api_url} from './configuration';
import axios from 'axios';

const Header = () => {

    // const renderViewAsOptions = () => {
    //     if (role.includes('Admin') && role.includes('User')) {
    //         return (
    //             <>
    //                 <a href="#">Admin</a>
    //                 <a href="#">User</a>
    //             </>
    //         );
    //     } else if (role.includes('Admin')) {
    //         return <a href="#">Admin</a>;
    //     } else if (role.includes('User')) {
    //         return <a href="#">User</a>;
    //     } else {
    //         return null; 
    //     }
    // };


    return (
        <div className="header">
            <div className='header-contents'>
                <div className="logo-container">
                    <img src={process.env.PUBLIC_URL + '/alletec.webp'} alt="Logo" className="logo" />
                </div>
                <div className="dropdown-container">
                    <div className="dropdown">
                        <button className="dropbtn">Students</button>
                        <div className="dropdown-content">
                            <a href="http://localhost:3000/">Student Records</a>
                            <a href="http://localhost:3000/">About us</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Contact</button>
                        <div className="dropdown-content">
                            <a href="#">Contact Information</a>
                            <a href="#">Write to us</a>
                        </div>
                    </div>
                    {/* <div className="dropdown">
                        <button className="dropbtn">View As</button>
                        <div className="dropdown-content">
                            {renderViewAsOptions()}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Header;
