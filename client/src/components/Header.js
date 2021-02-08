import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuctionStore from '../stores/AuctionStores';

class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="header wow fadeInDown ani-1">
                <div className="logo"> <Link to="/"><img src="images/logo.png" alt="" /></Link> </div>
                <nav className="rgdev green-btn clearfix">
                    <ul className="mobile-sub rgdev-list">
                        {this.props.availableFund !== 0 ? <li className="rgdev-item navText01">Your Available Funds to Invest:<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Available funds in your connected wallet" aria-hidden="true"></i></i> <span>${Number(this.props.availableFund).toFixed(2)}</span> </li> : null}
                        {this.props.web3 !== null ?
                            <li className="rgdev-item"><a title="Add Funds" className="ani-1 navBtn01" href="#">Add Funds </a></li> : null}
                        {/* <li className="rgdev-item"><a title="Add Funds" className="ani-1 navBtn02" href="#"><i></i>Integrate Your Wallet </a></li> */}
                        <li className="rgdev-item nav_line"><img src="images/nav-line.png" width="13" height="40" alt="" /></li>
                        <li className="rgdev-item"><a title="LIQUIDITY 24/7" className="ani-1" href="#" id="liquidity">LIQUIDITY 24/7 </a></li>
                        <li className="rgdev-item"><a title="SUPPORT" className="ani-1" href="#" id="how-Work">HOW IT WORKS</a></li>
                        <li className="rgdev-item"><a title="SUPPORT" className="user-Menu" href="#" data-toggle="n-collapse" data-target="#userBox" aria-expanded="false" aria-controls="userBox">
                            <span className="user-Icon">
                                <i className="fas fa-user-circle"></i>
                            </span>
                            <span className="user-Status">
                                <img src={this.props.web3 !== null ? "images/green-dot.png" : "images/red-dot.png"} alt="" />
                            </span></a>

                            {this.props.web3 !== null ?
                                (
                                    <span id="userBox" className="autoClose n-collapse">
                                        <Link to="/profile"><span className="icon-box"><i className="fas fa-user"></i></span>My Account</Link>
                                        <a href="javascript:void(0)" className="add-funds"><span className="icon-box"><i className="fas fa-dollar-sign"></i></span>Add Funds</a>
                                        <Link to="/login" style={{ color: "red" }}><span className="icon-box"><i className="fas fa-sign-in-alt"></i></span>Logout</Link>
                                    </span>
                                ) : (
                                    <span id="userBox" className="autoClose n-collapse">
                                        <Link to="/login"><span className="icon-box"><i className="fas fa-sign-in-alt"></i></span>Login</Link>
                                    </span>
                                )
                            }

                        </li>
                        <li className="rgdev-item"> <a className="ani-1 langBox" href="#" data-toggle="n-collapse" data-target="#langBox" aria-expanded="false" aria-controls="langBox"><img src="images/eng-icon.png" alt="" /></a> </li>

                        {/* <li className="rgdev-item mobile-Item01"><a title="SUPPORT" className="ani-1 user-Menu" href="#" data-toggle="n-collapse" data-target="#userBox1" aria-expanded="false" aria-controls="userBox"><span className="user-Icon"><i className="fas fa-user-circle"></i></span><span className="user-Status"><img src="images/green-dot.png" alt="" /></span></a> <span id="userBox1" className="autoClose n-collapse"> <a href="#">User Profile</a> </span> </li>
                <li className="rgdev-item mobile-Item02"> <a className="ani-1 langBox" href="#" data-toggle="n-collapse" data-target="#langBox" aria-expanded="false" aria-controls="langBox"><img src="images/eng-icon.png" alt="" /></a> </li> */}

                    </ul>
                    <div id="langBox" className="autoClose n-collapse">
                        <div className="langBoxContainer clearfix">
                            <div className="lanbox01"> <a href="#" className="active">
                                <div className="lanIconbox"><i className="lanicon01"></i></div>
                                English </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon02"></i></div>
                                中文繁體 </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon03"></i></div>
                                Tiếng Việt </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon04"></i></div>
                                العربية </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon05"></i></div>
                                Deutsch </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon06"></i></div>
                                Pусский </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon07"></i></div>
                                Español </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon08"></i></div>
                                <span style={{ unicodeBidi: "bidi-override" }}>תירבע</span> </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon09"></i></div>
                                BAHASA INDONESIA </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon010"></i></div>
                                Türkçe </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon011"></i></div>
                                Português </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon012"></i></div>
                                हिन्दी </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon013"></i></div>
                                Français </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon014"></i></div>
                                한국어 </a> </div>
                            <div className="lanbox01"> <a href="#">
                                <div className="lanIconbox"><i className="lanicon015"></i></div>
                                日本語 </a> </div>
                            <div className="lanbox01 ani-1" > <a href="#">
                                <div className="lanIconbox"><i className="lanicon015 translateLanguage"></i></div>
                                <div id="google_translate_element"></div>
                            </a> </div>
                        </div>
                    </div>
                    <div className="rgdev-mobile"><span className="icon-bar"></span> <span className="icon-bar"></span><span className="icon-bar"></span></div>
                    <div className="rgdev-text">Navigation</div>
                </nav>
            </header>
        )
    }
}

export default Header;