import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import ContractData from '../../../ContractData'
import logo from '../../../assets/jntr_note/images/footer-logo.png';
import close_btn from '../../../assets/jntr_note/images/close-btn.png';
import DECIMALS from '../../../decimalConstant'
import * as notification from '../../../components/notification';


const $ = window.$;
const jQuery = window.jQuery;

class Header extends PureComponent {

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
            <header className="header">
                <div className="logo">
                    <a href="https://www.jointer.io/demo/edge-investment/" target="_blank"><img src="images/logo.png" alt="" /></a>
                    <span className="award-text"><img src="images/award-icon.png" alt="" /><span>Award Winning Company</span></span>
                </div>
                <nav className="rgdev green-btn clearfix">
                    <ul className="mobile-sub rgdev-list">
                        <li className="rgdev-item edge-Btn active"><a href="jointer-note.html" className="ani-1"><span className="icon-Box edge-Coin"></span>JNTR</a></li>
                        <li className="rgdev-item edge-Btn"><a href="jointer-etn.html" className="ani-1"><span className="icon-Box edge-x-Coin"></span>JNTR/ETN</a></li>
                        <li className="rgdev-item edge-Btn"><a href="jointer-stock.html" className="ani-1"><span className="icon-Box edge-e-Coin"></span>JNTR/STOCK</a></li>
                        <li className="rgdev-item liveauc-Btn"><a title="AUCTION" className="ani-1" href="http://demo.minddeft.net/np/jointer-investment/" target="_blank">LIVE AUCTION </a></li>
                        <li className="rgdev-item"><a title="SUPPORT" className="user-Menu n-collapsed" href="javascript:void(0);" data-toggle="n-collapse" data-target="#userBox" aria-expanded="false" aria-controls="userBox"><span className="user-Icon"><i className="fas fa-user-circle"></i></span><span className="user-Status"><img src="images/green-dot.png" alt="" /></span></a> <span id="userBox" className="autoClose n-collapse" aria-expanded="false">
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-home"></i></span>Home</a>
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-user"></i></span>Profile</a>
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-globe-americas"></i></span>Network</a>
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-envelope"></i></span>Message</a>
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-bell"></i></span>Notification</a>
                        </span> </li>
                        <li className="rgdev-item">
                            <a className="ani-1 langBox" href="javascript:void(0);" data-toggle="n-collapse" data-target="#langBox" aria-expanded="false" aria-controls="langBox"><img src="images/eng-icon.png" alt="" /></a>
                        </li>
                    </ul>
                    <div id="langBox" className="autoClose n-collapse">
                        <div className="langBoxContainer clearfix">
                            <div className="lanbox01">
                                <a href="javascript:void(0);" className="active">
                                    <div className="lanIconbox"><i className="lanicon01"></i></div> English </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon02"></i></div> 中文繁體 </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon03"></i></div> Tiếng Việt </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon04"></i></div> العربية </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon05"></i></div> Deutsch </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon06"></i></div> Pусский </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon07"></i></div> Español </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon08"></i></div> <span style={{ unicodeBidi: "bidi-override" }}>תירבע</span> </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon09"></i></div> BAHASA INDONESIA </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon010"></i></div> Türkçe </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon011"></i></div> Português </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon012"></i></div> हिन्दी </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon013"></i></div> Français </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon014"></i></div> 한국어 </a>
                            </div>
                            <div className="lanbox01">
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon015"></i></div> 日本語 </a>
                            </div>
                            <div className="lanbox01 ani-1" >
                                <a href="javascript:void(0);">
                                    <div className="lanIconbox"><i className="lanicon015 translateLanguage"></i></div>
                                    <div id="google_translate_element"></div></a>
                            </div>
                        </div>
                    </div>
                    <div className="rgdev-mobile"><span className="icon-bar"></span> <span className="icon-bar"></span><span className="icon-bar"></span></div>
                    <div className="rgdev-text">Navigation</div>
                </nav>
                <div className="rgdev-item mobile-Item01"><a title="SUPPORT" className="ani-1 user-Menu" href="javascript:void(0);" data-toggle="n-collapse" data-target="#userBox1" aria-expanded="false" aria-controls="userBox"><span className="user-Icon"><i className="fas fa-user-circle"></i></span><span className="user-Status"><img src="images/green-dot.png" alt="" /></span></a>
                    <span id="userBox1" className="autoClose n-collapse">
                        <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-home"></i></span>Home</a>
                        <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-user"></i></span>Profile</a>
                        <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-globe-americas"></i></span>Network</a>
                        <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-envelope"></i></span>Message</a>
                        <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i className="fas fa-bell"></i></span>Notification</a>
                    </span>
                </div>
                <div className="rgdev-item mobile-Item02">
                    <a className="ani-1 langBox" href="javascript:void(0);" data-toggle="n-collapse" data-target="#langBox" aria-expanded="false" aria-controls="langBox"><img src="images/eng-icon.png" alt="" /></a>
                </div>
            </header>
        );
    }
}

export default Header;