
import React, { Component } from "react";
import { Link } from 'react-router-dom';

// import logo from '../../../assets/auction/images/logo.png';
import close_btn from '../../../assets/auction/images/close-btn.png'

import exchange_icon01 from '../../../assets/auction/images/jtrExc-Icon01.png';
import exchange_icon02 from '../../../assets/auction/images/jtrExc-Icon02.png';
import exchange_icon03 from '../../../assets/auction/images/jtrExc-Icon03.png';
import exchange_icon04 from '../../../assets/auction/images/jtrExc-Icon04.png';

import exchange_icon from '../../../assets/auction/images/exchange-icon.png';
import swap_icon from '../../../assets/auction/images/swap-icon.png';
import buy_back from '../../../assets/auction/images/buy-back-icon.png';




const $ = window.$;
const jQuery = window.jQuery;

class Liquidity extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        $("#liquadity .tab-Link").hover(function () {
            $(".tab-Link").removeClass("active")
            $(this).addClass("active")
            $(".tab-Content").hide();
            $("#" + $(this).attr("data-id")).show();
        });
    }

    render() {
        return (
            <div className="liquidity-Popup" id="liquadity">
                <a href="javascript:void(0)" onClick={() => { this.props.closePopUp(".liquidity-Popup") }} className="close-Icon"><img src={close_btn} alt="" /></a>
                <div className="liquidity-Container">
                    <div className="jiTitle03">LIQUIDITY 24/7</div>
                    <div className="tab-Nav">
                        <a href="javascript:void(0)" className="tab-Link ani-1 active" data-id="tab-1"><span className="icon-Box"><img src={exchange_icon} alt="" /></span>
                        <span><i>Secondary Market</i>
                        Exchanges</span></a>
                        <a href="javascript:void(0)" className="tab-Link ani-1 hideMobile" data-id="tab-2"><span className="icon-Box"><img src={swap_icon} alt="" /></span><span><i>Secondary Market</i>SmartSwap</span></a>
                        <a href="javascript:void(0)" className="tab-Link ani-1 hideMobile" data-id="tab-3"><span className="icon-Box"><img src={buy_back} alt="" /></span>
                        <span><i>Secondary Market</i> Liquidity Reserve </span></a>
                    </div>
                    <div className="tab-Content" id="tab-1">
                        <div className="jiTitle01">Choose your secondary market exchange</div>
                        <div className="exchange-Box">
                            <div className="exchange-Icon">
                                <a href="javascript:void(0)"><img src={exchange_icon01} alt="" className="ani-1" /></a>
                            </div>
                            <div className="exchange-Icon">
                                <a href="javascript:void(0)"><img src={exchange_icon02} alt="" className="ani-1" /></a>
                            </div>
                            <div className="exchange-Icon">
                                <a href="javascript:void(0)"><img src={exchange_icon03} alt="" className="ani-1" /></a>
                            </div>
                            <div className="exchange-Icon">
                                <a href="javascript:void(0)"><img src={exchange_icon04} alt="" className="ani-1" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="tab-Nav">
                        <a href="javascript:void(0)" className="tab-Link ani-1 showMobile" data-id="tab-2"><span className="icon-Box"><img src={swap_icon} alt="" /></span>SmartSwap</a>
                    </div>
                    <div className="tab-Content" id="tab-2">
                        <div className="jiTitle01">Trade Crypto - Without Loss of Value</div>
                        <p>SmartSwap offers free Peer-to-Peer (P2P) and Peer-to-Community (P2C) cross-chain swaps that lets users exchange the exact value between two assets.</p>
                        <a href="javascript:void(0)" className="ani-1 goto-Btn">Go To SmartSwap</a>
                    </div>
                    <div className="tab-Nav">
                        <a href="javascript:void(0)" className="tab-Link ani-1 showMobile" data-id="tab-3"><span className="icon-Box"><img src={buy_back} alt="" /></span>Buyback Program</a>
                    </div>
                    <div className="tab-Content" id="tab-3">
                        <div className="jiTitle01">Redeem your JNTR</div>
                        <p>JNTR is redeemable through Jointer's Liquidity Reserve</p>
                        <a href="javascript:void(0)" className="ani-1 goto-Btn02">Go To Liquidity Reserve</a>
                    </div>
                </div>
            </div>

        );
    }
}

export default Liquidity;
