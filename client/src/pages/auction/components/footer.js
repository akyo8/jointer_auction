
import React, { Component } from "react";
import { Link } from 'react-router-dom';

import logo from '../../../assets/auction/images/footer-logo.png';
import close_btn from '../../../assets/auction/images/close-btn.png'

import social_icon01 from '../../../assets/auction/images/social-icon01.png';
import social_icon02 from '../../../assets/auction/images/social-icon02.png';
import social_icon03 from '../../../assets/auction/images/social-icon03.png';
import social_icon04 from '../../../assets/auction/images/social-icon04.png';
import social_icon05 from '../../../assets/auction/images/social-icon05.png';
import social_icon06 from '../../../assets/auction/images/social-icon06.png';


const $ = window.$;
const jQuery = window.jQuery;

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        $(".tab-Link02").click(function () {
            $(".tab-Link02").removeClass("active")
            $(this).addClass("active")
            $(".tab-Content02").hide();
            $("#" + $(this).attr("data-id")).fadeIn("slow");
        });
    }

    render() {
        return (
            <footer className="footer">
                <div className="footer-Block">
                    <div className="footer-left">
                        <div className="footer-logo"> <Link to="/"><img src={logo} alt="" /></Link> 
                        <span className="f-Link"> 
                        <a href="/jntr_about" className="ani-1">ABOUT US</a> <a href="javascript:void(0)" className="ani-1" onClick={() => this.props.openPopup(".how-Popup")}>HOW IT WORKS</a> <a href="javascript:void(0)" className="ani-1">FQA</a> <a href="javascript:void(0)" className="ani-1 yellow-Color">Invest Us</a> </span> </div>
                        <p><span>© JOINTER 2016-2019</span> <a href="javascript:void(0)" className="ani-1">Privacy Policy</a> | <a href="javascript:void(0)" className="ani-1">Term of Use</a> | <a href="javascript:void(0)" className="ani-1">Cookie Policy</a> </p>
                        <p>Blockchain solutions for commercial real estate, providing increased liquidity, improved returns, and minimized risk</p>
                    </div>
                    <div className="footer-right">
                        <ul className="social-Icons">
                            <h5>Follow Our Network</h5>
                            <li><a href="https://www.linkedin.com/company/element-zero-network/" target="_blank" className="social-icon-01 ani-1"><img src={social_icon01} alt="" /></a></li>
                            <li><a href="https://twitter.com/ElementZeroCOIN" target="_blank" className="social-icon-02 ani-1"><img src={social_icon02} alt="" /></a></li>
                            <li><a href="https://www.facebook.com/elementzeronetwork/" target="_blank" className="social-icon-03 ani-1"><img src={social_icon03} alt="" /></a></li>
                            <li><a href="https://steemit.com/@elementzero/" target="_blank" className="social-icon-04 ani-1"><img src={social_icon04} alt="" /></a></li>
                            <li><a href="https://t.me/ElementZeroNetwork" target="_blank" className="social-icon-05 ani-1"><img src={social_icon05} alt="" /></a></li>
                            <li><a href="https://medium.com/element-zero" target="_blank" className="social-icon-06 ani-1"><img src={social_icon06} alt="" /></a></li>
                        </ul>
                        {/* <p>Do you have a website? <a href="javascript:void(0)" className="ani-1">click here</a> to add your website to our network </p>
                    <p>with 115,000+ comercial investors & professional members.</p> */}
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;
