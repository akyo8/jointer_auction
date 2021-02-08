import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import ContractData from '../../../ContractData'
import logo from '../../../assets/jntr_note/images/footer-logo.png';
import close_btn from '../../../assets/jntr_note/images/close-btn.png';
import DECIMALS from '../../../decimalConstant'
import * as notification from '../../../components/notification';


const $ = window.$;
const jQuery = window.jQuery;

class JNTRBaseLineData extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            todayContribution: this.props.todayContribution,
            auctionDetails: this.props.auctionDetails
        }
    }

    intitSideBars = async () => {

    }

    componentDidMount = async () => {

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.todayCon !== nextProps.todayCon) {
            this.setState({
                auctionDetails: nextProps.auctionDetails
            }, () => {
                this.forceUpdate();
            })
        }
    }

    render() {
        return (
            <div className="tokensale-Box01 wow fadeInRight" data-wow-delay="0.5s">
                <div className="sale-Box01">
                    {/* <!-- <div className="title-Wrap">
                                            <div className="Title03"> Amount Invested Yesterday: $150,000,000 </div>
                                            <div className="Title03 yellow-Color"> Auction April-2 </div>
                                        </div> --> */}
                    <div className="sale-Tokenbox">
                        <div className="amt-Box">
                            <div className="Title01">100,000</div>
                            <div className="text-Title">Daily JNTR Supply</div>
                        </div>
                        <div className="amt-Box">
                            <div className="Title01">${this.state.auctionDetails.todayContribution.toLocaleString(undefined, DECIMALS.CURRECNY_PRICE)}</div>
                            <div className="text-Title">Today's Contributions</div>
                        </div>
                        <div className="amt-Box">
                            <div className="Title01">${this.state.auctionDetails.todayContribution !== 0 ? (this.state.auctionDetails.todayContribution / this.state.auctionDetails.todaySupply).toLocaleString(undefined, DECIMALS.TOKENSUPPLY) : 0}/JNTR</div>
                            <div className="text-Title">Current Auction Cost</div>
                        </div>
                    </div>
                </div>
                <div className="sale-Box02">
                    <div className="Title03"> Reach the Daily Goal to Earn a Group Bonus  </div>
                    <div className="progress-Box">
                        <div className="progress-Bg">
                            <div className="jointer-progress">
                                &nbsp;
                        <div className="text-Wrap">
                                    <div className="text-Title"> 0% </div>
                                    <div className="text-Title yellow-Color"> Today Goal is $105,000 </div>
                                    <div className="text-Title">   </div>
                                </div>
                                <div className="jp-ornbox ani-1"></div>
                            </div>
                            <div className="jointer-bonus-progress">
                                <div className="jbp-bar" style={{ width: "20%" }}><div className="perc-Box">50.00% <span>(120,000 JNTR)</span> <span className="icon-Box">
                                    <img src="images/drop-arrow.png" alt="" />
                                </span> </div></div>
                                <div className="text-Wrap">
                                    {/* <!-- Today's Earn Bonus --> */}
                                    <div className="text-Title green-Color"> Group Bonus </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-Title">100% </div>
                    </div>
                    <div className="equity-Goal">
                        <div className="equity-goalBox">
                            <div className="text-Title green-Color"> Simulate Today's Auction <span><i
                                className="fas cust-fas fa-question-circle protip" data-pt-gravity="top"
                                data-pt-title="Total investment in USD"></i></span> </div>
                            <div className="input-Box">
                                {/* <!--                        <input inputmode="numeric" className="myInput" value="$300,000">--> */}
                                <input type="text" id="input01" value="$300,000" />
                            </div>
                            <p className="yellow-Color">Type here the Total Group Investment</p>
                            <div className="list-Title">
                                <span>Total Supply:</span>
                                <span>204,010 JNTR</span>
                            </div>
                            <div className="list-Title">
                                <span>Max Investment Allowed:</span>
                                <span>$100,000.25</span>
                            </div>
                        </div>
                        <div className="equity-goalBox">
                            <div className="text-Title green-Color"> Simulate Your Individual Bonus   <span><i
                                className="fas cust-fas fa-question-circle protip" data-pt-gravity="top"
                                data-pt-title="How much you will invest in USD"></i></span> </div>
                            <div className="input-Box">
                                <input type="text" id="input02" value="$42,315.35" />
                            </div>
                            <p className="yellow-Color"> Type here Your Investment</p>
                            <div className="list-Title">
                                <span>JNTR you Won:</span>
                                <span>27,063</span>
                            </div>
                            <div className="list-Title">
                                <span>Multiplier Bonus:</span>
                                <span>1.25x</span>
                            </div>
                            <div className="list-Title">
                                <span>Total JNTR for you:</span>
                                <span>33,828.75</span>
                            </div>
                        </div>
                        <div className="equity-goalBox">
                            <div className="text-Title green-Color">Your Potential  Discount </div>
                            <div className="text-Title01 green-Color">-27.9%</div>
                            <p>[Calculated with $1.276 market price]</p>
                        </div>
                    </div>
                </div>
                <div className="sale-Box03">
                    <span className="arrow-Down"><i className="fas fa-angle-down"></i></span>
                    <div className="token-descBox">
                        <div className="token-descBox01">
                            <div className="text-Title"> JNTR Baseline Price <span><i
                                className="fas cust-fas fa-question-circle protip" data-pt-gravity="top"
                                data-pt-title="Starting JNTR price in USD"></i></span> </div>
                            <div className="Title03 "> ${this.state.auctionDetails.baseLinePrice} </div>
                        </div>
                        <div className="token-descBox01">
                            <div className="text-Title"> Current JNTR Market Value <span><i
                                className="fas cust-fas fa-question-circle protip" data-pt-gravity="top"
                                data-pt-title="Current USD price"></i></span> </div>
                            <div className="Title03 "> ${this.state.auctionDetails.currentJNTRMarketValue.toLocaleString(undefined, DECIMALS.MARKETVALUE)} </div>
                        </div>
                        <div className="token-descBox01">
                            <div className="text-Title"> JNTR ROI Since Launch </div>
                            <div className="Title03 green-Color"> +{(this.state.auctionDetails.sinceLaunch * 100).toLocaleString(undefined, DECIMALS.JNTRROISINCELAUNCH)}% <span>({Number(this.state.auctionDetails.sinceLaunch).toFixed(2)}x)</span> </div>
                        </div>
                    </div>
                </div>
                <div className="sale-Box04">
                    <div className="timer-02 jntr_note_days">
                        <p>Current Distribution End In:</p>
                        <div id="timer02">
                            <div className="days"></div>
                            <div className="hours"></div>
                            <div className="minutes"></div>
                            <div className="seconds"></div>
                        </div>
                    </div>
                    <div className="live-auctionBbox"> <a href="https://www.elementzero.network/jointerauction" target="_blank" className="liveauction-Btn ani-1">LIVE
                      AUCTION</a> </div>
                </div>
            </div>
        );
    }
}

export default JNTRBaseLineData;