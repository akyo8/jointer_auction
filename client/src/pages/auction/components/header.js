
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DECIMALS from '../../../decimalConstant'
import logo from '../../../assets/auction/images/logo.png';
import nav_line from '../../../assets/auction/images/nav-line.png';
import red_dot from '../../../assets/auction/images/red-dot.png';
import green_dot from '../../../assets/auction/images/green-dot.png';
import eng_icon from '../../../assets/auction/images/eng-icon.png';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rgDevOpen: false
    }
  }



  render() {
    return (
      <header className="header wow fadeInDown ">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <nav className="rgdev green-btn clearfix">
          <ul className="mobile-sub rgdev-list">
            {this.props.web3Provider.isLogin ?
              <li className="rgdev-item navText01 npMText-Fix01">
                Your Available <br /> Funds to Invest:
                <i className="help-circle">
                  <i
                    className="fas fa-question-circle protip"
                    data-pt-position="top"
                    data-pt-title="Available funds in your linked wallet"
                    aria-hidden="true"
                  ></i>
                </i>
                <span>${this.props.totalBalance.toLocaleString(undefined, DECIMALS.ETHER_PRICE)} <br /><i className="contrDisplay">[{this.props.etherBalance.toFixed(4)} ETH]</i></span>
              </li> : null}
            {this.props.web3Provider.isLogin ? (
              <li className="rgdev-item">
                <a title="Add Funds" onClick={() => this.props.openPopup(".tokens-Popup05")} className="ani-1 navBtn01" href="javascript:void(0)">
                  Add Funds
                    </a>
              </li>
            ) : null}
            {this.props.web3Provider.isLogin ? (
              <li className="rgdev-item nav_line">
                <img src={nav_line} width="13" height="40" alt="" />
              </li>
            ) : null}

            <li className="rgdev-item">
              <a
                title="LIQUIDITY 24/7"
                className="ani-1"
                href="javascript:void(0)"
                onClick={() => this.props.openPopup(".liquidity-Popup")}
                id="liquidity"
              >
                LIQUIDITY 24/7
                  </a>
            </li>
            <li className="rgdev-item">
              <a title="How It Work" className="ani-1 light_Font" href="javascript:void(0)" onClick={() => this.props.openPopup(".how-Popup")} id="how-Work">
                HOW IT WORKS
                  </a>
            </li>
            <li className="rgdev-item">
              <a title="What is JNTR" className="ani-1 light_Font" href="javascript:void(0)" onClick={() => this.props.openPopup(".whatIs-JNTR")}>
              WHAT IS JNTR
                  </a>
            </li>





            <li className="rgdev-item  npMenuFix no-ani">
              <a
                title="User"
                className="user-Menu"
                href="javascript:void(0)"
                data-toggle="n-collapse"
                data-target="#userBox"
                aria-expanded="false"
                aria-controls="userBox"
              >
                {/* <span className="user-Icon">
                  <i className="fas fa-user-circle"></i>
                </span> */}
                <span className="user-Status">
                  <img
                    src={
                      this.props.web3Provider.isLogin ? green_dot : red_dot
                    }
                    alt=""
                  />
                </span>
              </a>

              {this.props.web3Provider.isLogin ? (
                <span id="userBox" className="autoClose n-collapse">
                  <Link to="/profile" target="_blank" className="no-ani">
                    <span className="icon-box">
                      <i className="fas fa-user"></i>
                    </span>
                        My Account
                      </Link>
                  <a href="javascript:void(0)" onClick={() => this.props.openPopup(".tokens-Popup05")}  className="no-ani">
                    <span className="icon-box">
                      <i className="fas fa-dollar-sign"></i>
                    </span>
                        Add Funds
                      </a>
                  {/* <Link to="/login">
                        <span className="icon-box">
                          <i className="fas fa-sign-in-alt"></i>
                        </span>
                        Logout
                      </Link> */}
                </span>
              ) : (
                  <span id="userBox" className="autoClose n-collapse">
                    <a href="javascript:void(0)" onClick={() => this.props.openPopup('.wallet-Popup')}   className="no-ani">
                      <span className="icon-box">
                        <i className="fas fa-sign-in-alt"></i>
                      </span>
                        Login
                      </a>
                  </span>
                )}
            </li>
            <li className="rgdev-item">
              <a
                className="ani-1 langBox"
                href="javascript:void(0)"
                data-toggle="n-collapse"
                data-target="#langBox"
                aria-expanded="false"
                aria-controls="langBox"
              >
                <img src={eng_icon} alt="" />
              </a>
            </li>
          </ul>

          <div id="langBox" className="autoClose n-collapse">
            <div className="langBoxContainer clearfix">
              <div className="lanbox01"> <a href="javascript:void(0)" className="active">
                <div className="lanIconbox"><i className="lanicon01"></i></div>
                                English </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon02"></i></div>
                                中文繁體 </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon03"></i></div>
                                Tiếng Việt </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon04"></i></div>
                                العربية </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon05"></i></div>
                                Deutsch </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon06"></i></div>
                                Pусский </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon07"></i></div>
                                Español </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon08"></i></div>
                <span style={{ unicodeBidi: "bidi-override" }}>תירבע</span> </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon09"></i></div>
                                BAHASA INDONESIA </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon010"></i></div>
                                Türkçe </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon011"></i></div>
                                Português </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon012"></i></div>
                                हिन्दी </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon013"></i></div>
                                Français </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon014"></i></div>
                                한국어 </a> </div>
              <div className="lanbox01 disableBTN"> <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon015"></i></div>
                                日本語 </a> </div>
              <div className="lanbox01 ani-1" > <a href="javascript:void(0)">
                <div className="lanIconbox"><i className="lanicon015 translateLanguage"></i></div>
                <div id="google_translate_element"></div>
              </a> </div>
            </div>
          </div>
          <div className="rgdev-mobile"><span className="icon-bar"></span> <span className="icon-bar"></span><span className="icon-bar"></span></div>
          <div className="rgdev-text">Navigation</div>
        </nav>
      </header>
    );
  }
}

export default Header;
