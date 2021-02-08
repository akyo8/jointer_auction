
import React, { Component } from "react";
import { Link } from 'react-router-dom';

// import logo from '../../../assets/auction/images/logo.png';
import close_btn from '../../../assets/auction/images/close-btn.png'





const $ = window.$;
const jQuery = window.jQuery;

class HowWork extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        $("#liquadity .tab-Link").click(function () {
            $(".tab-Link").removeClass("active")
            $(this).addClass("active")
            $(".tab-Content").hide();
            $("#" + $(this).attr("data-id")).fadeIn("slow");

        });
    }

    render() {
        return (
            <div>


            <div className="how-Popup">
                <a href="javascript:void(0)" onClick={() => { this.props.closePopUp(".how-Popup") }} className="close-Icon"><img src={close_btn} alt="" /></a>


                <div className="container-Grid">
                    <div className="jiTitle03">How it Works</div>
                    <div className="howW-mainbox">
                        <div className="howW-subbox"><i>1</i>Jointer hold a daily auction allowing investors to win JNTR at a discount <span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Supply is variable based on daily auction goals" aria-hidden="true"></i></span></div>
                        <div className="howW-subbox"><i>2</i>Investors invest funds to the auction</div>
                        <div className="howW-subbox"><i>3</i>JNTR is distributed daily on a pro-rata basis<span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Bonuses are calculated and distributed at this time" aria-hidden="true"></i></span></div>
                        <div className="howW-subbox"><i>4</i>JNTR changes value based on the market demand<span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="The market value is driven by the reserve" aria-hidden="true"></i></span></div>
                        <div className="howW-subbox"><i>5</i>Investors can keep holding or sell at anytime their JNTR<span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Investors can use multiple liquidity solutions such as secondary market exchanges, decentralized SmarSwap, and liquidity reserve" aria-hidden="true"></i></span></div>
                    </div>
                    <div className="Btns-02">
                        <a href="javascript:void(0)" className="how-Btn03 ani-1"><i className="fas fa-play-circle"></i>  WATCH OUR VIDEO</a>

                        <a href="http://www.jointer.io" target="_blank" className="how-Btn04 ani-1">EXPLORE MORE</a>

                        <a href="javascript:void(0);" target="_blank" className="how-Btn01 ani-1">INVESTMENT SIMULATION</a>


                        {this.props.isLogin ?
                            <a href="javascript:void(0)" onClick={() => { this.props.closePopUp(".how-Popup"); this.props.openPopup(".tokens-Popup02") }} className="how-Btn02 ani-1 investNow" >INVEST NOW</a>
                            : <a href="javascript:void(0)" onClick={() => { this.props.closePopUp(".how-Popup"); this.props.openPopup(".main-Popup") }} className="how-Btn02 iyw-mainB ani-1 ani-1 investNow" >INVEST NOW <div className="iyw-btn01">
                                <span><i className="fab fa-ethereum"></i></span> INTEGRATE YOUR WALLET</div></a>
                        }
                    </div>
 


                </div>



            </div>

            <div className="whatIs-JNTR">
                <a href="javascript:void(0)" onClick={() => { this.props.closePopUp(".whatIs-JNTR") }} className="close-Icon"><img src={close_btn} alt="" /></a>


                <div className="container-Grid">

                <div className="jiTitle03">WHAT IS JNTR</div>
                        <p className="watJntrText01">JNTR is a liquidity bridge that serves as a transfer of value between traditional commercial real estate equity and other blockchain based digital currencies</p>

                <div className="watJntrCMainbox">

                    <div  className="watJntrCSubBox">
                        <div className="watJntrCTitle01 watJntrCicon-01 ">JNTR face value</div>
                        <ul className="watJntrCTitle02">
                            <li>JNTR's starting face value is $0.01 USD</li>
                            <li>JNTR changes face value based on the Liquidity Reserve calculation [see a simulation on JNTR’s long term face value]</li>
                            <li>JNTR is used as the only method of payment to buy and sell Jointer’s security digital assets (such as JNTR/ETN or JNTR/STOCK ), placing JNTR at the center of the Jointer Syndication Economy</li>
                        </ul>
                    </div>

                    <div  className="watJntrCSubBox">
                        <div className="watJntrCTitle01 watJntrCicon-02 ">Daily Auction </div>
                        <ul className="watJntrCTitle02">
                            <li>Investors buying JNTR from Jointer’s Auction have the opportunity to gain a discount based on the auction results</li>
                            <li>In order to participate in the auction, investors will need to hold equal to or greater face value of unlocked JNTR in their wallet</li>
                            <li>Daily, total investments are capped at 150% of the previous day</li>
                            <li>The remaining 90% of investment goes to invest in Commercial Real Estate</li>
                        </ul>
                    </div>

                    <div  className="watJntrCSubBox">
                        <div className="watJntrCTitle01 watJntrCicon-03 ">Liquidity Reserves </div>
                        <ul className="watJntrCTitle02">
                            <li>Jointer contributes 10% of all funds raised from all company's sources to support the Liquidity Reserves</li>
                            <li>Circuit breakers protect the Liquidity Reserves against market volatility, black swan events, and pump and dump attempts</li>
                            <li>Jointer limits Liquidity Reserves redemptions by wallet to one time per day. Implementation discourages whales from taking advantage of Jointer’s Liquidity Reserves which help reduce slippage for all investors</li>
                        </ul>
                    </div>

                    <div  className="watJntrCSubBox">
                        <div className="watJntrCTitle01 watJntrCicon-04 ">JNTR Minting</div>
                        <ul className="watJntrCTitle02">
                            <li>New JNTR can mint only through Jointer’s Auction contract</li>
                            <li>For day 1 of the auction, Jointer will pre-mint 50,000 JNTR</li>
                            <li>Ongoing minting is determined by the daily Jointer Auction results</li>
                            <li>JNTR’s supply is uncapped</li>
                        </ul>
                    </div>

                    <div  className="watJntrCSubBox">
                        <div className="watJntrCTitle01 watJntrCicon-05 ">Trading</div>
                        <ul className="watJntrCTitle02">
                            <li>JNTR can swap to JNTR/ETN or JNTR/STOCK, which are backed by commercial real estate at any time</li>
                            <li>Secondary market exchanges and SmartSwap will allow 24/7 JNTR trading</li>
                        </ul>
                    </div>

                    <div  className="watJntrCSubBox">
                        <div className="watJntrCTitle01 watJntrCicon-06 ">Regulation</div>
                        <ul className="watJntrCTitle02">
                            <li>JNTR complies with US Reg D 506(c) and Internationally Reg S</li>
                            <li>In most countries JNTR may not be considered a security</li>
                            <li>Every investor must pass KYC and AML to participate in the Auction</li>
                        </ul>
                    </div>


                </div>

                <div className="jiTitle03 watTitleFix">Jointer Library</div>
<div className="libraryMbox clearfix">
    <a className="libraryblock clearfix libraryblockbg01 ani-1"
        href="https://docsend.com/view/s/jjx2nufhhr" target="_blank" data-aos="zoom-out" data-aos-delay="300">

        <div className="fileicobblock flblock01 clearfix"></div>
        <div className="lbblocktext clearfix"> <span>Jointer’s</span> <strong> Whitepaper</strong> </div>
    </a>

    <a className="libraryblock clearfix libraryblockbg02 ani-1"
        href="https://docsend.com/view/s/jky7kjc4au" target="_blank" data-aos="zoom-out" data-aos-delay="300">
        <div className="fileicobblock flblock02 clearfix"></div>
        <div className="lbblocktext clearfix"> <span>Jointer’s</span> <strong>Auction Document</strong> </div>
    </a>

    <a className="libraryblock clearfix libraryblockbg03 ani-1"
        href="https://docsend.com/view/s/jky7kjc4au" target="_blank" data-aos="zoom-out" data-aos-delay="300">
        <div className="fileicobblock flblock03 clearfix"></div>
        <div className="lbblocktext clearfix"> <span>Jointer’s</span> <strong> Pitch Deck</strong> </div>
    </a>

    <a className="libraryblock clearfix libraryblockbg03 ani-1" href="https://docsend.com/view/s/jky7kjc4au" target="_blank" data-aos="zoom-out" data-aos-delay="300">
        <div className="fileicobblock flblock03 clearfix"></div>
        <div className="lbblocktext clearfix"> <span>Jointer’s</span> <strong>One Page</strong> </div>
    </a>
</div>

                </div>


            </div>

            </div>   
        );
    }
}

export default HowWork;
