import moment from 'moment/moment';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div>
                <div className="footer p-10 bg-base-200 text-base-content">
                    <div>
                        <Link to='/'>
                            <img src="https://i.ibb.co/n3qfJ7W/summer-learning-camp-1.png" className='w-8 md:w-10 lg:w-14' alt="" />
                        </Link>
                        <p>Learning Camp Ltd.<br />Providing reliable tech since 2005</p>
                    </div>
                    <div>
                        <span className="footer-title">Services</span>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </div>
                </div>
            </div>
            <div className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>Copyright © {moment().format('YYYY')} - All right reserved by Learning Camp Ltd</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;