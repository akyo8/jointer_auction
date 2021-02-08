
import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import ContractData from '../../../ContractData'
import logo from '../../../assets/auction/images/footer-logo.png';
import close_btn from '../../../assets/auction/images/close-btn.png';
import DECIMALS from '../../../decimalConstant'
import * as notification from '../../../components/notification';

import social_icon01 from '../../../assets/auction/images/social-icon01.png';
import social_icon02 from '../../../assets/auction/images/social-icon02.png';
import social_icon03 from '../../../assets/auction/images/social-icon03.png';
import social_icon07 from '../../../assets/auction/images/social-icon07.png';


const $ = window.$;
const jQuery = window.jQuery;

class SideBar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            web3Provider: this.props.web3Provider,
            auctionDetails: this.props.auctionDetails,
            fundCollectorInstance: null,
            userTotalFund: 0,
            totalGetFrom: 0,
            groupInvest: 0,
            individualInvest: 0,
            tokenGet: 0,
            bonus: '0x',
            afterBouns: 0,
            discount: 0,
            todaySupplySDB: 0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (this.props.totalBalance !== nextProps.totalBalance) {
            this.setState({ totalBalance: nextProps.totalBalance });
        }

        if (this.state.todayCon !== nextProps.todayCon) {
            this.setState({
                auctionDetails: nextProps.auctionDetails,
                groupInvest: (nextProps.auctionDetails.remainingAvailableInvestment).toFixed(2),
                individualInvest: (nextProps.auctionDetails.remainingAvailableInvestment).toFixed(2),
                todaySupplySDB: nextProps.auctionDetails.remainingAvailableInvestment < nextProps.auctionDetails.yesterdayContribution ? nextProps.auctionDetails.todaySupply : nextProps.auctionDetails.remainingAvailableInvestment / nextProps.auctionDetails.yesterdayContribution * nextProps.auctionDetails.todaySupply
            }, () => {
                this.checkInvestment();
                this.intitSideBars();
            });
        }

        if (this.props.accounts !== nextProps.accounts) {
            const fundCollectorInstance = new nextProps.web3Provider.web3.eth.Contract(
                ContractData.FundCollectorAbi,
                ContractData.FundCollectorAddress
            );
            this.setState({
                web3Provider: nextProps.web3Provider,
                fundCollectorInstance: fundCollectorInstance
            }, () => {
                this.checkInvestment();
                this.intitSideBars();
            });
        }
    }

    checkInvestment() {
        const { web3Provider, fundCollectorInstance } = this.state;
        if (web3Provider.isLogin && !this.props.auctionStop) {
            fundCollectorInstance.methods.userTotalFund(web3Provider.accounts[0]).call({}, (error, userTotalFund) => {
                fundCollectorInstance.methods.userTotalReturnToken(web3Provider.accounts[0]).call({}, (error, totalGetFrom) => {
                    this.setState({
                        totalGetFrom: web3Provider.web3.utils.fromWei(totalGetFrom),
                        userTotalFund: web3Provider.web3.utils.fromWei(userTotalFund, "mwei")
                    })
                })

            })
        }
    }

    intitSideBars = async () => {
        $('.ycpBTN,.ycpSection,.jiBonusBTN,.jiBonus-Section,.multiplier-Box01,.multiplier-Box02, .down-Scroll,#sideBar .investNow').unbind();

        $(".ycpBTN").click(function (e) {
            $(".ycpSection,.ycpBTN").toggleClass("active");
            e.stopPropagation();
        });

        $(".ycpSection").click(function (e) {
            e.stopPropagation();
        });

        $(".jiBonusBTN").click(function (e) {
            $(".jiBonus-Section, .jiBonusBTN").toggleClass("active");
            $(".jiBonus-Section").mCustomScrollbar('scrollTo', '#auction-Detail');
            $("html").toggleClass("Scroll-no");
            e.stopPropagation();
        });

        $(".jiBonus-Section").click(function (e) {
            e.stopPropagation();
        });
        $(".MB-boxclick").click(function (e) {
            e.preventDefault();
            $(".multiplier-Box01").fadeIn(function () { $(this).focus(); });
        });
        $(".multiplier-Box01").on('blur', function () {
            $(this).fadeOut();
        });

        $(".MB-boxclick-02").click(function (e) {
            e.preventDefault();
            $(".multiplier-Box02").fadeIn(function () { $(this).focus(); });
        });
        $(".multiplier-Box02").on('blur', function () {
            $(this).fadeOut();
        });

         

        $(document).click(function () {
            $(".jiBonus-Section, .jiBonusBTN ,.ycpBTN , .ycpSection").removeClass("active");
        });
        $(".down-Scroll").click(function () {
            $(".jiBonus-Section").mCustomScrollbar('scrollTo', '#auction-Detail');
        });
        $("#sideBar .investNow").click(() => {
            this.props.openPopup(".tokens-Popup02")
        });
        $('#copyTextSDB01, #copyTextSDB02').unbind();
        $("#copyTextSDB01").click(function (event) {
            event.preventDefault();
            $('#contractAddressSDB01').select();
            document.execCommand("copy");
            notification.successMsg("Address copied successfully!")
        })
        $("#copyTextSDB02").click(function (event) {
            event.preventDefault();
            $('#contractAddressSDB02').select();
            document.execCommand("copy");
            notification.successMsg("Address copied successfully!", "copyAddress")
        })
    }

    componentDidMount = async () => {
        this.intitSideBars();
    }

    calculateInvestment(e) {
        let name = e.target.name;
        if (!isNaN(e.target.value)) {
            let state = this.state;
            if (Number(e.target.value) > this.state.auctionDetails.maxContributionAllowed) {
                state[name] = this.state.auctionDetails.maxContributionAllowed.toFixed(2);
            } else {
                state[name] = e.target.value;
            }
            if (Number(state["individualInvest"]) > Number(state["groupInvest"])) {
                state["individualInvest"] = state["groupInvest"];
            }
            if (state["groupInvest"][0] === "0" && state["groupInvest"][1] === "0" && state["groupInvest"].length > 1 && !state["groupInvest"].includes(".")) {
                state["groupInvest"] = "0." + e.target.value.slice(1, e.target.value.length)
            }
            if (state["individualInvest"][0] === "0" && state["individualInvest"][1] === "0" && state["individualInvest"].length > 1 && !state["individualInvest"].includes(".")) {
                state["individualInvest"] = "0." + e.target.value.slice(1, e.target.value.length)
            }
            if (e.target.name === "groupInvest") {
                state["todaySupplySDB"] = this.state.groupInvest < this.state.auctionDetails.yesterdayContribution ? this.state.auctionDetails.todaySupply : this.state.groupInvest / this.state.auctionDetails.yesterdayContribution * this.state.auctionDetails.todaySupply
            }
            let userget = (this.state.todaySupplySDB) * (state["individualInvest"] / state["groupInvest"]);
            let individual = state["individualInvest"] / state["groupInvest"] * 100;
            let afterBonus = 0;
            let bonus = '0x';
            if (individual >= 95) {
                afterBonus = userget * 2;
                bonus = '2x'
            } else if (individual >= 75) {
                afterBonus = userget * 1.75;
                bonus = '1.75x'
            } else if (individual >= 50) {
                afterBonus = userget * 1.50;
                bonus = '1.50x'
            } else if (individual >= 25) {
                afterBonus = userget * 1.25;
                bonus = '1.25x'
            } else {
                afterBonus = userget;
            }
            state["bonus"] = bonus;
            state["afterBouns"] = afterBonus.toFixed(2);
            state["tokenGet"] = userget.toFixed(2);
            let discount = ((state["individualInvest"] / (afterBonus * this.state.auctionDetails.currentJNTRMarketValue)) - 1) * 100;
            state["discount"] = !isNaN(discount) ? discount : 0;
            this.setState({ state })
        }
    }

    clearInputs(e) {
        if (e.target.name === "groupInvest") {
            this.setState({
                groupInvest: ""
            })
        } else if (e.target.name === "individualInvest") {
            this.setState({
                individualInvest: ""
            })
        }
    }

    render() {
        return (
            <div className="clearfix" id="sideBar">
                <div className="Btns">
                    {this.state.web3Provider.isLogin ?
                        <a href="javascript:void(0)" className="ycpBTN no-ani">Your Current Performance &nbsp;&nbsp;<i className="fas fa-caret-square-up"></i></a>
                        : null}

                    <a href="javascript:void(0)" className="jiBonusBTN no-ani"><i className="fas fa-caret-square-up "></i> &nbsp;&nbsp;Investment Simulation</a>
                </div>

                <section className="ycpSection">
                    <div className="ycpContainer">
                        <div className="ycpBox" id="ycpOBox">
                            <div className="ycpMainbox">
                                <div className="ycpsubbox01 ycpIcon01">Total Investment<span>$ {(Number(this.state.userTotalFund)).toLocaleString(undefined, DECIMALS.CURRECNY_PRICE)} </span></div>
                                <div className="ycpsubbox01 ycpIcon02">Total JNTR Won <span className="help-circle">
                                    <i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="#wonTxt" aria-hidden="true"></i>

                                </span>  <div id="wonTxt"> <div className="wonTxt-content"> This number may not match the JNTR in your wallet because 90% of your JNTR may still be locked through Downside Protection.  <br /> <a href="javascript:void(0);">Unlock all of your JNTR</a></div></div>  <span>{(Number(this.state.totalGetFrom)).toLocaleString(undefined, DECIMALS.TOKENSUPPLY)}</span></div>
                                <div className="ycpsubbox01 ycpIcon03">Total JNTR Value <span className="help-circle">
                                    <i className="fas fa-question-circle protip" data-pt-position="right" data-pt-title="Total JNTR value in your connected wallet" aria-hidden="true"></i>
                                </span><span>$ {(Number(this.state.totalGetFrom) * Number(this.state.auctionDetails.currentJNTRMarketValue)).toLocaleString(undefined, DECIMALS.CURRECNY_PRICE)} </span></div>
                                <div className="ycpsubbox01 ycpIcon04" >Total ROI<span> {isNaN(((Number(this.state.totalGetFrom) * Number(this.state.auctionDetails.currentJNTRMarketValue) / Number(this.state.userTotalFund)) * 100).toFixed(2)) ? "0.00" : ((Number(this.state.totalGetFrom) * Number(this.state.auctionDetails.currentJNTRMarketValue) / Number(this.state.userTotalFund)) * 100).toFixed(2)} % </span></div>
                                <div className="ycpsubbox01"><a href="javascript:void(0)" className="ji-btn01 no-ani investNow">Invest Now</a> {/*
                                <a href="javascript:void(0)" className="ji-Red-btn01 no-ani investNow">Add JNTR to your wallet to see<br/> your current performance</a> */}

                                    <div className="ycp-TTFix01 no-ani align-right">
                                        <div className="investText01">
                                            How to add JNTR to your wallet
                                <i className="help-circle no-ani">
                                                <i className="fas fa-question-circle" aria-hidden="true"></i>
                                                <div className="htjinwall-popup no-ani">
                                                    <ul className="list-Text">
                                                        <li><i>1.</i>Click to copy the smart contract address
                                                                <span className="input-Bx02 no-ani npCopyFix" id="copyTextSDB01" >
                                                                <input type="text" value="0xdd902f73e59e03e3ec1131dc9c57a5e49cb19cb8" id="contractAddressSDB01" className="no-ani" />
                                                                <a href="javascript:void(0);" className="copy-Btn"><i className="fas fa-copy"></i></a>
                                                            </span>
                                                        </li>
                                                        <li><i>2.</i>Paste the address in the "Token Contract Address" field in the "Custom Token" section of your wallet </li>
                                                        <li><i>3.</i> Click "next then "add token" to confirm </li>
                                                    </ul>
                                                </div>

                                            </i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="jiBonus-Section">
                    <div id="jiBonus-Box">
                        <div className="container-Grid">
                            <div className="jiBonus-Box">
                                <div className="jiB-Box01">
                                    <div className="jiB-Subbox jiB-icon01"> <span>Group Bonus</span> Higher investment than yesterday will trigger and increased supply. The more invested, the greater the discount. <i className="help-circle">
                                    <i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Total JNTR value in your connected wallet" aria-hidden="true"></i>
                                </i>
                    <div className="jiB-socialBox"> <span>Share to Grow the Group Bonus</span>
                                            <div>
                                                <ul className="social-Icons">
                                                    <li><a href="https://www.linkedin.com/shareArticle?url=https://www.elementzero.network/jointerauction/" target="_blank" className="social-icon-01 ani-1"><img src={social_icon01} alt="" /></a></li>
                                                    <li><a href="https://twitter.com/share?url=https://www.elementzero.network/jointerauction/" target="_blank" className="social-icon-02 ani-1"><img src={social_icon02} alt="" /></a></li>
                                                    <li><a href="https://www.facebook.com/sharer.php?u=https://www.elementzero.network/jointerauction/" target="_blank" className="social-icon-03 ani-1"><img src={social_icon03} alt="" /></a></li>
                                                    <li><a href="javascript:void(0)" className="social-icon-07 ani-1 popup03"><img src={social_icon07} alt="" /></a></li>
                                                </ul>
                                            </div> </div>
                                    </div>
                                </div>
                                <div className="jiB-Box01">
                                    <div className="jiB-Subbox jiB-icon02"> <span>Individual Bonus</span> Earn based on your percentage to the group.<br />
The more you invest the greater your individual bonus.<i className="help-circle">
                                    <i className="fas fa-question-circle MB-boxclick-02" ></i>
                                </i>  <div className="multiplier-Box">
                                        <div className="multiplier-Box02">

                                        <p>Investors are incentivized to lead the daily investment round. The bonus is based on their place amongst all investors in the group. </p><br />

                                        <p>Example:<br />
Let’s say the final amount of funds invested for a single day is $100,000;<br />
Investor A and Investor B both invest $40,000, Investor C $10,000, Investor D $5,000, Investor E $3,000, Investor F $1,500, Investor G $500;<br />
In this scenario, Investor A and Investor B have tied for first place. Therefore, the bonus value of the first two places is added together (90%) and divided by 2. So Investor A and Investor B receive a 45% bonus. Further, Investor C receives a 30% bonus, Investor D receives a 20% bonus, Investor E receives a 10% bonus, Investor F receives no individual bonus, Investor G receives no individual bonus</p>


                                        </div>

                                </div>
                    <br /> <br />

                                        {/* <strong className="cont-Text">Invest <strong className="orange-text">$35,000</strong> today for a chance at <strong className="orange-text">1.5x</strong></strong><br /> */}
                                        {this.state.web3Provider.isLogin ?
                                            <a href="javascript:void(0)" className="ji-Nbtn01 ani-1  MB-boxclick">Check Your Potential Individual Bonus Rank</a>
                                            : <a href="javascript:void(0)" className="ji-Nbtn01 ani-1  MB-boxclick">Check Your Potential Individual Bonus Rank </a>}
                                        <div className="multiplier-Box">
                                            {/* <span><i className="fas fa-question-circle"></i></span> */}
                                            <div className="multiplier-Box01" tabIndex="-1">

                                                <div className="jiTitle03">Your Potential Individual Bonus Rank</div>
                                                <p className="text-center">Investors are incentivized to lead the daily investment round. The bonus is based on their place amongst all investors in the group.
</p>
                                                <div className="jiB-table01 hideMobile">
                                                    <table width="100%" border="1" bordercolor="#000000" cellSpacing="0" cellPadding="5">
                                                        <tbody>
                                                            <tr>
                                                                <th align="left" valign="middle" scope="row">1st</th>
                                                                <th align="center" valign="middle">2nd</th>
                                                                <th align="center" valign="middle">3rd</th>
                                                                <th align="center" valign="middle">4th</th>
                                                                <th align="center" valign="middle">5th</th>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" valign="middle" scope="row">50%</td>
                                                                <td align="center" valign="middle">40%</td>
                                                                <td align="center" valign="middle">30%</td>
                                                                <td align="center" valign="middle">20%</td>
                                                                <td align="center" valign="middle">10%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="jiB-table01 showMobile">
                                                    <table width="100%" border="1" bordercolor="#000000" cellSpacing="0" cellPadding="5">
                                                        <tbody>
                                                            <tr>
                                                                <th align="left" valign="middle" scope="row">1st</th>
                                                                <td align="left" valign="middle" scope="row">50%</td>
                                                            </tr>
                                                            <tr>
                                                                <th align="center" valign="middle">2nd</th>
                                                                <td align="center" valign="middle">40%</td>
                                                            </tr>
                                                            <tr>
                                                                <th align="center" valign="middle">3rd</th>
                                                                <td align="center" valign="middle">30%</td>
                                                            </tr>
                                                            <tr>
                                                                <th align="center" valign="middle">4th</th>
                                                                <td align="center" valign="middle">20%</td>
                                                            </tr>
                                                            <tr>
                                                                <th align="center" valign="middle">5th</th>
                                                                <td align="center" valign="middle">10%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="invNow-btnBar">


                                                    {this.state.web3Provider.isLogin ?
                                                        <a href="javascript:void(0)" className="ji-btn01   investNow" >Invest Now</a>
                                                        : <a href="javascript:void(0)" className="ji-btn01 iyw-mainB ani-1  investNow" >Invest Now <div className="iyw-btn01">
                                                            <span><i className="fab fa-ethereum"></i></span> INTEGRATE YOUR WALLET</div></a>}




                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <a href="javascript:void(0)" className="down-Scroll"><i className="fas fa-angle-down"></i></a> */}
                            </div>
                            <div className="jiAuc-mainbox" id="auction-Detail">
                                <div className="jiAuc-subbox">
                                    <div className="jiAucs-Title01">Total GROUP investment today<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Total investments by the group" aria-hidden="true"></i></i></div>
                                    <div className="jiAucs-Title02">
                                        <input type="text" value={this.state.groupInvest} name="groupInvest" onMouseDown={(e) => this.clearInputs(e)} onChange={(e) => this.calculateInvestment(e)} />
                                    </div>
                                    <div className="jiAucs-Title03 orange-Color">&nbsp;</div>
                                    <div className="jiAucs-Title04">
                                        <span style={{ width: "60%" }}>Max Supply:<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="This supply represents the max supply possible for today after the group bonus (up to 150%) is achieved" aria-hidden="true"></i></i> </span>
                                        <span>{Number(this.state.todaySupplySDB).toLocaleString(undefined, DECIMALS.TOKENSUPPLY)} JNTR</span>
                                        <br />
                                        <span style={{ width: "60%" }}>Max Group Investment Allowed:</span>
                                        <span>${Number(this.state.auctionDetails.maxContributionAllowed).toLocaleString(undefined, DECIMALS.TOKENSUPPLY)}</span>
                                    </div>
                                </div>
                                <div className="jiAuc-subbox">
                                    <div className="jiAucs-Title01">YOUR Total investment today<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Your investments compared to the group's investments" aria-hidden="true"></i></i></div>
                                    <div className="jiAucs-Title02">
                                        <input type="text" value={this.state.individualInvest} name="individualInvest" onMouseDown={(e) => this.clearInputs(e)} onChange={(e) => this.calculateInvestment(e)} />
                                    </div>
                                    <div className="jiAucs-Title03 orange-Color">&nbsp; </div>
                                    {/* <div className="jiAucs-Title04"><span>Max Investment Allowed:</span><span>{Number(this.state.auctionDetails.remainingAvailableInvestment).toLocaleString(undefined, DECIMALS.TOKENSUPPLY)}</span></div> */}
                                    <div className="jiAucs-Title04"><span>JNTR you Won:</span><span>{Number(this.state.tokenGet).toLocaleString(undefined, DECIMALS.TOKENSUPPLY)}</span></div>
                                    <div className="jiAucs-Title04 npSelectFix"><span>Choose Your Individual Bonus:<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="help text here" aria-hidden="true"></i></i></span><span>
                                        <div className="is_SelectBox">
                                        <select value={this.state.value} onChange={this.handleChange}>
                                            <option value="grapefruit">30%</option>
                                            <option value="lime">50%</option>
                                            <option value="coconut">80%</option>
                                            <option value="mango">90</option>
                                        </select>
                                        </div>
          
          </span></div>
                                    <div className="jiAucs-Title04"><span>Total JNTR for you:</span><span>{Number(this.state.afterBouns).toLocaleString(undefined, DECIMALS.CURRECNY_PRICE)}</span></div>
                                </div>
                                <div className="jiAuc-subbox">
                                    <div className="jiAucs-Title01">Your Potential Discount <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Based on simulating the group and individual bonuses" aria-hidden="true"></i></i></div>
                                    <div className="jiAucs-Title02-2 green-Color"> {this.state.discount.toFixed(2)}%</div>
                                    <div className="jiAucs-Title03 orange-Color">[Based on $ {Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4)}]</div>
                                    {this.state.web3Provider.isLogin ?
                                        <div className="no-ani">
                                            <a href="javascript:void(0)" className="ji-btn01   investNow" id="addContribution04">Invest Now</a>

                                            <div className="ycp-TTFix01 align-right">
                                                <div className="investText01">
                                                    How to add JNTR to your wallet
                                <i className="help-circle  ">
                                                        <i className="fas fa-question-circle" aria-hidden="true"></i>

                                                        <div className="htjinwall-popup no-ani">
                                                            <ul className="list-Text">
                                                                <li><i>1.</i>Click to copy the smart contract address
                                                                <span className="input-Bx02 no-ani npCopyFix" id="copyTextSDB02" >
                                                                        <input type="text" value="0xdd902f73e59e03e3ec1131dc9c57a5e49cb19cb8" id="contractAddressSDB02" className="no-ani" />
                                                                        <a href="javascript:void(0);" className="copy-Btn"><i className="fas fa-copy"></i></a>
                                                                    </span>
                                                                </li>
                                                                <li><i>2.</i>Paste the address in the "Token Contract Address" field in the "Custom Token" section of your wallet </li>
                                                                <li><i>3.</i> Click "next then "add token" to confirm </li>
                                                            </ul>
                                                        </div>
                                                    </i>
                                                </div>
                                            </div> </div>
                                        : <a href="javascript:void(0)" className="ji-btn01 iyw-mainB ani-1  investNow" id="addContribution04">Invest Now <div className="iyw-btn01">
                                            <span><i className="fab fa-ethereum"></i></span> INTEGRATE YOUR WALLET</div> </a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

export default SideBar;
