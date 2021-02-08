import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import ContractData from '../../../ContractData'
import logo from '../../../assets/jntr_note/images/footer-logo.png';
import close_btn from '../../../assets/jntr_note/images/close-btn.png';
import DECIMALS from '../../../decimalConstant'
import * as notification from '../../../components/notification';


const $ = window.$;
const jQuery = window.jQuery;

class Footer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    intitSideBars = async () => {
    }

    componentDidMount = async () => {
    }

    render() {
        return (
            <footer className="footer">
                <div className="footer-Block">
                    <div className="footer-left">
                        <div className="footer-logo"> <a href="https://www.jointer.io/demo/edge-investment/" target="_blank"><img src="images/logo.png" alt="" /></a>
                            <span className="f-Link">
                                <a href="javascript:void(0);" className="ani-1">ABOUT US</a>
                                <a href="javascript:void(0);" className="ani-1">How It Works</a>
                                <a href="javascript:void(0);" className="ani-1">Contact Us</a>
                                <a href="javascript:void(0);" className="ani-1 yellow-Color">invest</a>
                            </span> </div>
                        <p><span>© JOINTER 2016-2020 </span> <a href="javascript:void(0);" className="ani-1 openModal01">Privacy Policy</a> |
            <a href="javascript:void(0);" className="ani-1 openModal02">Term of Use</a> |
            <a href="javascript:void(0);" className="ani-1 openModal03">Cookie Policy</a> </p>
                        <p>Blockchain solutions for commercial real estate, providing increased liquidity, improved returns, and minimized risk</p>
                    </div>
                    <div className="footer-right">
                        <ul className="social-Icons">
                            <h5>JOIN OUR COMMUNITY</h5>
                            <li><a href="javascript:void(0);" className="social-icon-01 ani-1"><img src="images/social-icon01.png" alt="" /></a></li>
                            <li><a href="javascript:void(0);" className="social-icon-02 ani-1"><img src="images/social-icon02.png" alt="" /></a></li>
                            <li><a href="javascript:void(0);" className="social-icon-03 ani-1"><img src="images/social-icon03.png" alt="" /></a></li>
                            <li><a href="javascript:void(0);" className="social-icon-04 ani-1"><img src="images/social-icon04.png" alt="" /></a></li>
                            <li><a href="javascript:void(0);" className="social-icon-05 ani-1"><img src="images/social-icon05.png" alt="" /></a></li>
                            <li><a href="javascript:void(0);" className="social-icon-06 ani-1"><img src="images/social-icon06.png" alt="" /></a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;