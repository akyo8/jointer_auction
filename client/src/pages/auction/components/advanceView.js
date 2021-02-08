
import React, { PureComponent } from "react";
import ContractData from '../../../ContractData'
import { Link } from 'react-router-dom';
import * as notification from '../../../components/notification';
import StorageStore from '../../../stores/StorageStore'
import DECIMALS from '../../../decimalConstant'

import loader from '../../../assets/auction/images/loader.svg';

import *  as AuctionActions from '../../../actions/AuctionActions';
import AuctionStores from '../../../stores/AuctionStores';

const $ = window.$;
const jQuery = window.jQuery;

class AdvanceView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tranLoader: false,
            web3Provider: this.props.web3Provider,
            auctionDetails: this.props.auctionDetails,
            userInvestMent: [],
            selectedDay: null,
            todayCon: 0
        }

    }

    componentWillMount() {
        AuctionStores.on("CHECK_ADDRESS_INVESTMENT", this.addressInvestMentResponse.bind(this));
        setTimeout(function () {
            this.getData();
        }.bind(this), 500)
    }

    getData() {
        if (this.state.web3Provider.isLogin)
            AuctionActions.getAddressInvestMent(this.state.web3Provider.accounts[0]);
        else
            AuctionActions.getAddressInvestMent("0x0000000000000000000000000000000000000000");
    }

    componentWillUnmount() {
        AuctionStores.removeListener("CHECK_ADDRESS_INVESTMENT", this.addressInvestMentResponse.bind(this));
    }

    addressInvestMentResponse(response) {
        var investData = AuctionStores.getUserInvestDetails();
        this.setState({ userInvestMent: investData }, () => {
            this.props.updateGroupDisc(investData[investData.length - 1]);
        })
    }



    componentWillReceiveProps(nextProps) {
        if (this.state.todayCon !== nextProps.todayCon) {
            this.setState({
                todayCon: nextProps.todayCon,
                auctionDetails: nextProps.auctionDetails
            }, () => {
                this.getData();
            });
        }
        if (this.state.accounts !== nextProps.accounts) {
            this.setState({
                accounts: nextProps.accounts,
                web3Provider: nextProps.web3Provider,
            }, () => {
                this.getData();
            });
        }
    }

    componentDidMount() {
        $('.jiCal-Mbox').slick({
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 12,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 1,
                        infinite: true

                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        // $(".advance-Module").click(()=>{
        //     $('.jiCal-Mbox').slick('refresh');
        // });
    }


    onSelectedDayChange(key) {
        $("#calcyppLinkContent").collapse('hide');
        this.setState({
            selectedDay: key
        })
    }




    render() {

        let elementLast = null;
        let elementSelected = null;

        var UserInvestment = [];
        function tokenMultipler(data) {
            if (data === null) {
                return null;
            } else if (data >= 95) {
                return 2;
            } else if (data >= 75) {
                return 1.75;
            } else if (data >= 50) {
                return 1.50;
            } else if (data >= 25) {
                return 1.25;
            } else {
                return null
            }
        }
        function getMultiplierIf(totalInvest, userInvest, showNone = false) {
            if (showNone) {
                return "If you invest <strong>$</strong> you will have receive <strong>1.25X</strong> multiplier";
            }
            var percentageCal = userInvest * 100 / totalInvest;
            if (percentageCal === 0) {
                return 0;
            } else if (percentageCal >= 95) {
                return "";
            } else if (percentageCal >= 75 && percentageCal <= 95) {
                return "If you invested <strong>$" + (totalInvest * 0.95 - userInvest).toFixed(2) + "</strong> more you would have received <strong>2X</strong> multiplier";
            } else if (percentageCal >= 50 && percentageCal <= 75) {
                return "If you invested <strong>$" + (totalInvest * 0.75 - userInvest).toFixed(2) + "</strong> more you would have received <strong>1.75X</strong> multiplier";
            } else if (percentageCal >= 25 && percentageCal <= 50) {
                return "If you invested <strong>$" + (totalInvest * 0.50 - userInvest).toFixed(2) + "</strong> more you would have received <strong>1.50X</strong> multiplier";
            } else if (percentageCal <= 25) {
                return "If you invested <strong>$" + (totalInvest * 0.25 - userInvest).toFixed(2) + "</strong> more you would have received <strong>1.25X</strong> multiplier";
            } else {
                return null
            }
        }
        function tokenGet(data, tokenGet) {
            if (data === null) {
                return tokenGet;
            } else if (data >= 95) {
                return 2 * tokenGet;
            } else if (data >= 75) {
                return 1.75 * tokenGet;
            } else if (data >= 50) {
                return 1.50 * tokenGet;
            } else if (data >= 25) {
                return 1.25 * tokenGet;
            } else {
                return tokenGet;
            }
        }



        for (let x = 0; x < this.state.userInvestMent.length; x++) {
            let element = this.state.userInvestMent[x];
            let cost = element.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue) : element.marketCost;
            // let discount = element.userInvestRatio !== null ? "-" + (cost / element.tokenCost * tokenGet(element.userInvestRatio, element.tokenGet)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%" : "-";
            let discount = element.userInvest !== null ? (((element.userInvest / (tokenGet(element.userInvestRatio, element.tokenGet) * cost)) - 1) * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%" : "-";


            if (x === this.state.userInvestMent.length - 1) {
                element.totalSupply = this.state.auctionDetails.todaySupply;
                element.totalInvest = this.state.auctionDetails.todayContribution;
                element.tokenCost = this.state.auctionDetails.todayContribution / this.state.auctionDetails.todaySupply;
                element.tokenGet = ((element.totalSupply * element.userInvestRatio) / 100) !== 0 ? ((element.totalSupply * element.userInvestRatio) / 100) : null;
                let discountIN = element.userInvest !== null ? (((element.userInvest / (tokenGet(element.userInvestRatio, element.tokenGet) * cost)) - 1) * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%" : "-";
                discount = discountIN;
                elementLast = element;
                elementLast["discount"] = discountIN;
                elementLast["cost"] = cost;
                elementLast["groupDiscount"] = ((elementLast.tokenCost.toFixed(4)) / (elementLast.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4) : elementLast.marketCost.toFixed(4))) !== 0 ? (((((elementLast.tokenCost.toFixed(4)) / (elementLast.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4) : elementLast.marketCost.toFixed(4))) - 1) * 100).toFixed(2)) : 0;
                elementSelected = elementLast;
            }

            if (this.state.selectedDay !== null && this.state.selectedDay !== this.state.userInvestMent[x].auctionDayId) {
                elementSelected = this.state.userInvestMent[this.state.selectedDay];
                let cost = elementSelected.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue) : elementSelected.marketCost;
                let discount = elementSelected.userInvest !== null ? (((elementSelected.userInvest / (tokenGet(elementSelected.userInvestRatio, elementSelected.tokenGet) * cost)) - 1) * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%" : "-";
                elementSelected.cost = cost;
                elementSelected.discount = discount;
            }



            UserInvestment.push(
                <tr key={x}>
                    <td align="center" valign="middle">
                        {element.auctionDayId}
                    </td>
                    <td align="center" valign="middle">
                        <div className="tDataPopover ani-1">{Number(element.totalSupply).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                        {Number(Number(element.totalSupply).toFixed(2)).toLocaleString()}
                    </td>
                    <td align="center" valign="middle">
                        <div className="tDataPopover ani-1">${Number(element.totalInvest).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                        ${(element.totalInvest).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLEMAINDATA)}
                    </td>
                    <td align="center" valign="middle">
                        <div className="tDataPopover ani-1">${Number(element.tokenCost).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                        ${(element.tokenCost.toFixed(4)).toLocaleString()}
                    </td>
                    <td align="center" valign="middle">
                        <div className="tDataPopover ani-1">${element.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE) :
                            Number(element.marketCost).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                        ${element.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4) :
                            element.marketCost.toFixed(4)}
                    </td>
                    <td align="center" valign="middle" className="green-Color">
                        {/* {element.groupBonus > 100
                            ? (100 - element.groupBonus).toFixed(2)
                            : 0} */}
                        {/* {
                            ((((element.tokenCost.toFixed(4)) / (element.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4) : element.marketCost.toFixed(4))) - 1) * 100).toFixed(2)
                        } */}
                        {
                            element.totalInvest !== 0 ? ((element.totalInvest / (element.totalSupply * (element.isOpen ? this.state.auctionDetails.currentJNTRMarketValue :
                                element.marketCost)) - 1) * 100).toFixed(2) : 0
                            // ((element.tokenCost.toFixed(4)) / (element.isOpen ? 
                            //     Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4) 
                            //     : 
                            //     element.marketCost.toFixed(4))) !== 0 ? 
                            //         (((((element.tokenCost.toFixed(4)) / (element.isOpen ? 
                            //             Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4) 
                            //             : element.marketCost.toFixed(4))) - 1) * 100).toFixed(2)) 
                            //             : 0
                        }
                %
              </td>
                    <td align="center" valign="middle" className="jiT-text02">
                        {element.isOpen ? this.props.isNewAuctionStaring ?
                            <div className="jiT-timertxt">
                                <img src={loader} />
                            </div>
                            :
                            <div className="jiT-timertxt">
                                <span className="hours1">00</span>:<span className="minutes1">00</span>:<span className="seconds1">00</span>
                            </div>
                            :
                            'Auction Closed'}
                        {/* {element.isOpen ?
                            <div className="jiT-timertxt">
                                <span className="hours1">00</span>:<span className="minutes1">00</span>:<span className="seconds1">00</span>
                            </div>
                            :
                            'Auction Closed'} */}
                    </td>
                    <td align="center" valign="middle" className="jiT-greenback01">
                        {element.userInvest !== null ?
                            (x === this.state.userInvestMent.length - 1) ?
                                <div className="jiT-box01 jiT-greencheck">{"$" + element.userInvest.toFixed(2)}</div>
                                :
                                "$" + element.userInvest.toFixed(2)
                            :
                            "-"}
                    </td>
                    <td align="center" valign="middle">
                        {element.userInvestRatio !== null
                            ? element.userInvestRatio.toFixed(2) + "%"
                            : "-"}
                    </td>
                    <td align="center" valign="middle">
                        {element.tokenGet !== null ?
                            <div className="tDataPopover ani-1">
                                {(x === this.state.userInvestMent.length - 1 && element.userInvestRatio !== null) ?
                                    Number((element.totalSupply * element.userInvestRatio) / 100).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)
                                    :
                                    Number(element.tokenGet).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)
                                }
                            </div>
                            : null}
                        {element.tokenGet !== null ?
                            (x === this.state.userInvestMent.length - 1 && element.userInvestRatio !== null) ?
                                Number((element.totalSupply * element.userInvestRatio) / 100).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLEMAINDATA)
                                :
                                Number(element.tokenGet).toFixed(2).toLocaleString()
                            : "-"}
                    </td>
                    {tokenMultipler(element.userInvestRatio) !== null
                        ?
                        <td align="center" valign="middle"> {tokenMultipler(element.userInvestRatio) + "X"}
                            {tokenMultipler(element.userInvestRatio) !== 2 ?
                                <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title={getMultiplierIf(element.totalInvest, element.userInvest)} aria-hidden="true"></i></i>
                                : null
                            }
                        </td>
                        :
                        element.userInvest !== null ?
                            <td align="center" valign="middle" className="yellow-Color">
                                None &nbsp;
                            <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title={getMultiplierIf(element.totalInvest, element.userInvest)} aria-hidden="true"></i></i>
                            </td> :
                            (x === this.state.userInvestMent.length - 1 && !this.state.auctionDetails.auctionSoldOut) ?
                                <td align="center" valign="middle" className="yellow-Color">None
                                    <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title={getMultiplierIf(element.totalInvest, element.userInvest, true)} aria-hidden="true"></i></i>
                                </td> :
                                <td align="center" valign="middle">-</td>

                    }
                    <td align="center" valign="middle">
                        {tokenGet(element.userInvestRatio, element.tokenGet) !== null ?
                            <div className="tDataPopover ani-1">{Number(tokenGet(element.userInvestRatio, element.tokenGet)).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                            : null}
                        {tokenGet(element.userInvestRatio, element.tokenGet) !== null
                            ? tokenGet(element.userInvestRatio, element.tokenGet).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            : "-"}
                    </td>
                    <td align="center" valign="middle">
                        {tokenGet(element.userInvestRatio, element.tokenGet) !== null ?
                            <div className="tDataPopover ani-1">${Number((tokenGet(element.userInvestRatio, element.tokenGet) * cost)).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                            : null}
                        {tokenGet(element.userInvestRatio, element.tokenGet) !== null
                            ? "$" + (tokenGet(element.userInvestRatio, element.tokenGet) * cost).toFixed(2) : "-"}
                    </td>
                    <td align="center" valign="middle" className="advanceDiscount">
                        {discount}
                    </td>
                </tr>
            );
        }

        return (
            <div className="clearFix">
                <div className="container-Grid advance-Module wow fadeInUp" data-wow-delay="0.3s">
                    <a className="collapsed" onClick={() => { $('.jiCal-Mbox').slick('refresh') }} role="button" data-toggle="n-collapse" data-parent="#accordion01" href="#collaps-01" aria-expanded="false" aria-controls="collaps-01"><span className="open-Module">Advanced View</span><span className="close-Module">Advanced View <i className="fas fa-caret-down"></i></span>  
                    {/* <span className="close-Module"><i className="fas fa-caret-down"></i></span> */}
                    
                    </a>
                </div>
                <div id="collaps-01" className="panel-collapse n-collapse">
                    <div className="container-Grid npShowMD">
                        <div className="ji-ATable01">
                            <table width="100%" border="1" bordercolor="#000000" cellSpacing="0" cellPadding="5">
                                <tbody>
                                    <tr className="jiT-text01">
                                        <td align="center" valign="middle" style={{ backgroundColor: "#090909" }}>&nbsp;</td>
                                        <td colSpan="6" align="center" valign="middle" className="jiT-GreenBR">GROUP DISCOUNT</td>
                                        <td rowSpan="2" align="center" valign="middle" className="jiT-greenback02">
                                            <a href="javascript:void(0)" onClick={() => this.props.openPopup('.tokens-Popup04')} className="popup04"><span>Your Investment</span></a></td>
                                        <td colSpan="6" align="center" valign="middle" className="jiT-GreenBR">YOUR DISCOUNT</td>

                                    </tr>
                                    <tr className="jiT-text01">
                                        <td align="center" valign="middle">Day</td>
                                        <td align="center" valign="middle">Daily JNTR <br /> Supply<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Following day supply equals+/- the % invested of the daily goal" aria-hidden="true"></i></i></td>
                                        <td align="center" valign="middle"> Daily Total <br />
Investment<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Calculated in USD" aria-hidden="true"></i></i></td>
                                        <td align="center" valign="middle">Cost per<br />
JNTR<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="USD cost per JNTR in Auction" aria-hidden="true"></i></i></td>
                                        <td align="center" valign="middle">JNTR Market <br />
Value<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="USD value per JNTR  calculated by the reserve" aria-hidden="true"></i></i></td>
                                        <td align="center" valign="middle">Group <br />Discount<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Percentage discount obtained over the market price" aria-hidden="true"></i></i></td>
                                        <td align="center" valign="middle">Auction Status</td>
                                        <td align="center" valign="middle">Your % of Daily<br />
Investment<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Percentage to total daily investment" aria-hidden="true"></i></i></td>
                                        <td align="center" valign="middle">JNTR You<br />
Won<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Personal JNTR distribution" aria-hidden="true"></i></i></td>
                                        <td align="center" valign="middle">Individual <br />
                                        Bonus<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Max 2X" aria-hidden="true"></i></i></td>
                                        <td align="center" valign="middle">Total JNTR <br />
You Own</td>
                                        <td align="center" valign="middle">Your Total <br />
Value<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Total JNTR value in your connected wallet" aria-hidden="true"></i></i></td>
                                        <td align="center" valign="middle">Total <br />
Discount</td>

                                    </tr>

                                    {elementLast === null ? null :
                                        <tr className="jiT-text01 jiT-grayback01 npTableCenterFix">
                                            <th align="center" valign="middle">
                                                {elementLast.auctionDayId}
                                            </th>
                                            <th align="center" valign="middle">
                                                <div className="tDataPopover ani-1">{Number(elementLast.totalSupply).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                                                {(elementLast.totalSupply).toLocaleString()}
                                            </th>
                                            <th align="center" valign="middle">
                                                <div className="tDataPopover ani-1">${Number(elementLast.totalInvest).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                                                ${(elementLast.totalInvest).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLEMAINDATA)}
                                            </th>
                                            <th align="center" valign="middle">
                                                <div className="tDataPopover ani-1">${Number(elementLast.tokenCost).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                                                ${elementLast.tokenCost.toFixed(4)}
                                            </th>
                                            <th align="center" valign="middle">
                                                <div className="tDataPopover ani-1">${Number(this.state.auctionDetails.currentJNTRMarketValue).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                                                ${(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4)}
                                            </th>
                                            <th align="center" valign="middle" className="green-Color">
                                                {/* {elementLast.groupBonus > 100
                                                    ? (100 - elementLast.groupBonus).toFixed(2)
                                                    : 0}
                                                    % */}
                                                {elementLast.groupDiscount}
                                                %
                                            </th>
                                            <th align="center" valign="middle">
                                                {this.props.isNewAuctionStaring ?
                                                    <div className="jiT-timertxt">
                                                        <img src={loader} />
                                                    </div>
                                                    :
                                                    <div className="jiT-timertxt"><span className="hours1">00</span>:<span className="minutes1">00</span>:<span className="seconds1">00</span></div>
                                                }
                                            </th>
                                            {/* 
                                                <div className="jiT-timertxt"><span className="hours1">00</span>:<span className="minutes1">00</span>:<span className="seconds1">00</span></div>
                                             */}
                                            <th align="center" valign="middle" className="jiT-greenback01">
                                                <a href="javascript:void(0)" id="addContribution" className="ji-btn02 ani-1 iyw-mainB ani-1 investNow" onClick={() => this.props.openPopup('.wallet-Popup')}>

                                                    {this.state.web3Provider.isLogin ?
                                                        <span>Invest Now</span>
                                                        : <span>Invest Now <div className="iyw-btn01">
                                                            Integrate Your Wallet</div></span>}
                                                </a>
                                            </th>

                                            <th align="center" valign="middle">
                                                {elementLast.userInvestRatio !== null
                                                    ? elementLast.userInvestRatio.toFixed(2) + "%"
                                                    : "-"}
                                            </th>
                                            <th align="center" valign="middle">
                                                {(elementLast.tokenGet !== null && elementLast.userInvestRatio !== null) ?
                                                    <div className="tDataPopover ani-1">
                                                        {Number((elementLast.totalSupply * elementLast.userInvestRatio) / 100).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}
                                                    </div>
                                                    : null}

                                                {(elementLast.tokenGet !== null && elementLast.userInvestRatio !== null) ?
                                                    ((elementLast.totalSupply * elementLast.userInvestRatio) / 100).toFixed(2)
                                                    : "-"}
                                            </th>
                                            {tokenMultipler(elementLast.userInvestRatio) !== null ?
                                                <th align="center" valign="middle">{tokenMultipler(elementLast.userInvestRatio) + "X"}
                                                    {tokenMultipler(elementLast.userInvestRatio) !== 2 ?
                                                        <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title={getMultiplierIf(elementLast.totalInvest, elementLast.userInvest)} aria-hidden="true"></i></i>
                                                        : null}
                                                </th>
                                                :
                                                elementLast.userInvest !== null && !this.state.auctionDetails.auctionSoldOut ?
                                                    <th align="center" valign="middle">None
                                                    {<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title={getMultiplierIf(elementLast.totalInvest, elementLast.userInvest)} aria-hidden="true"></i></i>}
                                                    </th> :
                                                    <th align="center" valign="middle" className="yellow-Color">None
                                                        <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title={getMultiplierIf(elementLast.totalInvest, elementLast.userInvest, true)} aria-hidden="true"></i></i>
                                                    </th>
                                            }
                                            <th align="center" valign="middle">
                                                {tokenGet(elementLast.userInvestRatio, elementLast.tokenGet) !== null ?
                                                    <div className="tDataPopover ani-1">{Number(tokenGet(elementLast.userInvestRatio, elementLast.tokenGet)).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                                                    : null}
                                                {tokenGet(elementLast.userInvestRatio, elementLast.tokenGet) !== null
                                                    ? tokenGet(elementLast.userInvestRatio, elementLast.tokenGet).toFixed(2)
                                                    : "-"}
                                            </th>
                                            <th align="center" valign="middle">
                                                {tokenGet(elementLast.userInvestRatio, elementLast.tokenGet) !== null ?
                                                    <div className="tDataPopover ani-1">${Number((tokenGet(elementLast.userInvestRatio, elementLast.tokenGet) * elementLast.cost)).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                                                    : null}
                                                {tokenGet(elementLast.userInvestRatio, elementLast.tokenGet) !== null
                                                    ? "$" + (tokenGet(elementLast.userInvestRatio, elementLast.tokenGet) * elementLast.cost).toFixed(2)
                                                    : "-"}
                                            </th>
                                            <th align="center" valign="middle" className="advanceDiscount">
                                                {elementLast.discount}
                                            </th>

                                        </tr>
                                    }
                                    {UserInvestment}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="container-Grid npShowSM">
                        <div className="ji-ATable01">
                            <table width="100%" border="1" bordercolor="#000000" cellSpacing="0" cellPadding="5">
                                {elementSelected === null ? null :
                                    <tbody>
                                        <tr className="jiT-text01">
                                            <td colSpan="2" align="center" valign="middle" className="jiT-GreenBR">GROUP DISCOUNT</td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">Day</td>
                                            <td align="center" className="jiT-grayback01 Day" valign="middle">
                                                <a className="calcyppLink01 n-collapsed" href="javascript:void(0)" data-toggle="n-collapse" data-target="#calcyppLinkContent" aria-expanded="false" aria-controls="calcyppLinkContent">
                                                    {elementSelected.auctionDayId}
                                                </a>
                                                <div id="calcyppLinkContent" className="autoClose n-collapse" aria-expanded="false" style={{ height: "0px" }}>
                                                    {
                                                        this.state.userInvestMent.length !== 0 ?
                                                            <div className="calcyppContent02">
                                                                {
                                                                    this.state.userInvestMent.map((ele, key) => {
                                                                        return <a href="javascript:void(0);" onClick={() => this.onSelectedDayChange(key)}>{ele.auctionDayId}</a>
                                                                    })
                                                                }
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">  Daily JNTR <br />
                Supply<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Following day supply equals+/- the % invested of the daily goal" aria-hidden="true"></i></i></td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                {Number(Number(elementSelected.totalSupply).toFixed(2)).toLocaleString()}
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle"> Daily Total <br />
                Investment<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Calculated in USD" aria-hidden="true"></i></i></td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                ${(elementSelected.totalInvest).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLEMAINDATA)}
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">Cost per <br />
                JNTR<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="USD cost per JNTR in Auction" aria-hidden="true"></i></i></td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                ${(elementSelected.tokenCost.toFixed(4)).toLocaleString()}
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">JNTR Market <br />
                Value<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="USD value per JNTR  calculated by the reserve" aria-hidden="true"></i></i></td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                ${elementSelected.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4) :
                                                    elementSelected.marketCost.toFixed(4)}
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">Group Discount<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Percentage discount obtained over the market price" aria-hidden="true"></i></i></td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                {
                                                    elementSelected.totalInvest !== 0 ? ((elementSelected.totalInvest / (elementSelected.totalSupply * (elementSelected.isOpen ? this.state.auctionDetails.currentJNTRMarketValue :
                                                        elementSelected.marketCost)) - 1) * 100).toFixed(2) : 0
                                                }
                                                %
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">Auction Status</td>
                                            <td className="jiT-grayback01" align="center" valign="middle">
                                                {elementSelected.isOpen ? this.props.isNewAuctionStaring ?
                                                    <div className="jiT-timertxt">
                                                        <img src={loader} />
                                                    </div>
                                                    :
                                                    <div className="jiT-timertxt">
                                                        <span className="hours1">00</span>:<span className="minutes1">00</span>:<span className="seconds1">00</span>
                                                    </div>
                                                    :
                                                    'Auction Closed'}
                                            </td>
                                            {/* <div className="jiT-timertxt"><span>05</span>:<span>45</span>:<span>37</span></div> */}
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td colSpan="2" align="center" valign="middle" className="jiT-greenback02">
                                                <a href="javascript:void(0);"><span>Your Investment</span></a><a href="javascript:void(0);" id="addContribution" className="ji-btn02 ani-1" onClick={() => this.props.openPopup('.tokens-Popup02')}>Invest Now</a>
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td colSpan="2" align="center" valign="middle" className="jiT-GreenBR">YOUR DISCOUNT</td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">Your % of Daily<br />
                Contribution<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Percentage to total daily investment" aria-hidden="true"></i></i></td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                {elementSelected.userInvestRatio !== null
                                                    ? elementSelected.userInvestRatio.toFixed(2) + "%"
                                                    : "-"}
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">JNTR You Won<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Personal JNTR distribution" aria-hidden="true"></i></i></td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                {elementSelected.tokenGet !== null ?
                                                    <div className="tDataPopover ani-1">
                                                        {(elementSelected.auctionDayId === this.state.userInvestMent[this.state.userInvestMent.length - 1].auctionDayId && elementSelected.userInvestRatio !== null) ?
                                                            Number((elementSelected.totalSupply * elementSelected.userInvestRatio) / 100).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)
                                                            :
                                                            Number(elementSelected.tokenGet).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)
                                                        }
                                                    </div>
                                                    : null}
                                                {elementSelected.tokenGet !== null ?
                                                    (elementSelected.auctionDayId === this.state.userInvestMent[this.state.userInvestMent.length - 1].auctionDayId && elementSelected.userInvestRatio !== null) ?
                                                        Number((elementSelected.totalSupply * elementSelected.userInvestRatio) / 100).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLEMAINDATA)
                                                        :
                                                        Number(elementSelected.tokenGet).toFixed(2).toLocaleString()
                                                    : "-"}
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">Individual Bonus<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Max 2X" aria-hidden="true"></i></i></td>
                                            {tokenMultipler(elementSelected.userInvestRatio) !== null
                                                ?
                                                <td align="center" valign="middle"> {tokenMultipler(elementSelected.userInvestRatio) + "X"}
                                                    {tokenMultipler(elementSelected.userInvestRatio) !== 2 ?
                                                        <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title={getMultiplierIf(elementSelected.totalInvest, elementSelected.userInvest)} aria-hidden="true"></i></i>
                                                        : null
                                                    }
                                                </td>
                                                :
                                                elementSelected.userInvest !== null ?
                                                    <td align="center" valign="middle" className="yellow-Color">
                                                        None &nbsp;
                            <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title={getMultiplierIf(elementSelected.totalInvest, elementSelected.userInvest)} aria-hidden="true"></i></i>
                                                    </td> :
                                                    (elementSelected.auctionDayId === this.state.userInvestMent[this.state.userInvestMent.length - 1].auctionDayId && !this.state.auctionDetails.auctionSoldOut) ?
                                                        <td align="center" valign="middle" className="yellow-Color">None
                                    <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title={getMultiplierIf(elementSelected.totalInvest, elementSelected.userInvest, true)} aria-hidden="true"></i></i>
                                                        </td> :
                                                        <td align="center" valign="middle">-</td>

                                            }
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">Total JNTR You Own</td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                {tokenGet(elementSelected.userInvestRatio, elementSelected.tokenGet) !== null ?
                                                    <div className="tDataPopover ani-1">{Number(tokenGet(elementSelected.userInvestRatio, elementSelected.tokenGet)).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                                                    : null}
                                                {tokenGet(elementSelected.userInvestRatio, elementSelected.tokenGet) !== null
                                                    ? tokenGet(elementSelected.userInvestRatio, elementSelected.tokenGet).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                                    : "-"}
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">Your Total Value<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Total JNTR value in your connected wallet" aria-hidden="true"></i></i></td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                {tokenGet(elementSelected.userInvestRatio, elementSelected.tokenGet) !== null ?
                                                    <div className="tDataPopover ani-1">${Number((tokenGet(elementSelected.userInvestRatio, elementSelected.tokenGet) * elementSelected.cost)).toLocaleString(undefined, DECIMALS.ADVANCEVIEWTABLE)}</div>
                                                    : null}
                                                {tokenGet(elementSelected.userInvestRatio, elementSelected.tokenGet) !== null
                                                    ? "$" + (tokenGet(elementSelected.userInvestRatio, elementSelected.tokenGet) * elementSelected.cost).toFixed(2) : "-"}
                                            </td>
                                        </tr>
                                        <tr className="jiT-text01">
                                            <td align="center" valign="middle">Total Discount</td>
                                            <td align="center" className="jiT-grayback01" valign="middle">
                                                {elementSelected.discount}
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>

                    <div className="jiCal-Container">
                        <div className="jiCal-Mbox">

                            <div className="jiCal-Subbox ani-1 active">
                                <div> LIVE NOW!<span>APR </span> <span>2020</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>MAY </span> <span>2020</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>JUN </span> <span>2020</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>JUL </span> <span>2020</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>AUG </span> <span>2020</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>SEP </span> <span>2020</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>OCT </span> <span>2020</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>NOV </span> <span>2020</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>DEC </span> <span>2020</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>JAN </span> <span>2021</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>FEB </span> <span>2021</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>MAR </span> <span>2021</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1 ">
                                <div> Coming Soon<span>APR </span> <span>2021</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>MAY </span> <span>2021</span> </div>
                            </div>
                            <div className="jiCal-Subbox ani-1">
                                <div> Coming Soon <span>JUN </span> <span>2021</span> </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )



    }





}

export default AdvanceView;
