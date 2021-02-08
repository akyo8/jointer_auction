
import React, { PureComponent } from "react";
import ContractData from '../../../ContractData'
import * as notification from '../../../components/notification';
import StorageStore from '../../../stores/StorageStore'
import DECIMALS from '../../../decimalConstant'

import close_btn from '../../../assets/auction/images/close-btn.png'
import loader from '../../../assets/auction/images/loader.svg'
import auctionStores from "../../../stores/AuctionStores";
import * as AuctionActions from "../../../actions/AuctionActions";
const $ = window.$;
const jQuery = window.jQuery;

const UNLOCK_LOAD_KEY = "UNLOCK_LOAD";
const UNLOCK_TX_KEY = "UNLOCK_TX";

class DownSideProtection extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tranLoader: false,
            web3Provider: this.props.web3Provider,
            downSideProtectionInstance: null,
            lockedTokens: 0,
            unLockBlock: true,
            txHashDownSide: null,
            currentJNTRMarketValue: 0,
            userCalROI: 0,
            totalUserInvestment: 0
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.accounts !== nextProps.accounts) {
            this.initInstance(nextProps.web3Provider);
        }
        if (this.state.todayCon !== nextProps.todayCon) {
            this.calucalteLockFund();
        }
        if (this.state.currentJNTRMarketValue !== nextProps.currentJNTRMarketValue) {
            this.setState({
                currentJNTRMarketValue: nextProps.currentJNTRMarketValue
            })
        }
    }

    initInstance(web3Provider) {
        if (web3Provider.isLogin && !this.props.auctionStop) {
            const downSideProtectionInstance = new web3Provider.web3.eth.Contract(
                ContractData.DownsideProtectionAbi,
                ContractData.DownsideProtectionAddress
            );
            this.setState({
                web3Provider: web3Provider,
                downSideProtectionInstance: downSideProtectionInstance
            }, () => {
                this.checkPendingTrans();
                setInterval(function () {
                    this.calucalteLockFund();
                }.bind(this), 60000)
            });
        }
    }

    calucalteLockFund() {
        const { web3Provider, downSideProtectionInstance } = this.state;
        if (web3Provider.isLogin && downSideProtectionInstance !== null) {
            downSideProtectionInstance.methods.lockedTokens(web3Provider.accounts[0]).call({}, (error, lockedTokens) => {
                downSideProtectionInstance.methods.unLockBlock(web3Provider.accounts[0]).call({}, (error, unLockBlock) => {
                    this.setState({
                        lockedTokens: web3Provider.web3.utils.fromWei(lockedTokens),
                        unLockBlock: unLockBlock
                    }, () => {
                        this.calculateROI();
                        this.forceUpdate();
                    })
                })
            })
        }
    }

    calculateROI() {
        var totalInvestmentLocked = (auctionStores.getUserTotalInvestmentDownside() * 0.90);
        var totalValue = (this.state.lockedTokens * this.state.currentJNTRMarketValue);
        this.setState({
            totalUserInvestment: (auctionStores.getUserTotalInvestmentDownside() * 0.90),
            userCalROI: (totalValue / totalInvestmentLocked)
        })

    }

    checkPendingTrans() {
        let is_on = StorageStore.getStorage(UNLOCK_LOAD_KEY);
        let counter = 0;
        if (Number(is_on) === 1) {
            this.setState({ tranLoader: true });
            var checkTx = setInterval(() => {
                this.state.web3Provider.web3.eth.getTransactionReceipt(StorageStore.getStorage(UNLOCK_TX_KEY), (error, data) => {
                    if (data !== null && data.status) {
                        clearInterval(checkTx);
                        StorageStore.setStrorage(UNLOCK_LOAD_KEY, "0");
                        this.setState({ tranLoader: false });
                    } else if (data !== null && !data.status) {
                        clearInterval(checkTx);
                        StorageStore.setStrorage(UNLOCK_LOAD_KEY, "0");
                        this.setState({ tranLoader: false });
                    } else if (counter === 5) {
                        clearInterval(checkTx);
                        StorageStore.setStrorage(UNLOCK_LOAD_KEY, "0");
                        this.setState({ tranLoader: false });
                    } else {
                        clearInterval(checkTx);
                        this.setState({ tranLoader: false });
                    }
                })
            }, 1000)
        }
    }

    unLockTokens() {
        if (!this.state.unLockBlock) {
            const { web3Provider, downSideProtectionInstance } = this.state;
            downSideProtectionInstance.methods.unLockTokens().send({ from: web3Provider.accounts[0], gasPrice: web3Provider.web3.utils.toWei("1", "gwei"), gasLimit: 800000 })
                .on('transactionHash', (hash) => {
                    StorageStore.setStrorage(UNLOCK_LOAD_KEY, "1");
                    StorageStore.setStrorage(UNLOCK_TX_KEY, hash);
                    this.setState({
                        txHashDownSide: "https://ropsten.etherscan.io/tx/" + hash,
                        tranLoader: true
                    });
                }).on('receipt', (receipt) => {
                    StorageStore.setStrorage(UNLOCK_LOAD_KEY, "0");
                    this.setState({ tranLoader: false });
                    this.calucalteLockFund();
                    this.props.refreshData();
                    if (receipt.status) {
                        AuctionActions.clearUserInvestmentDownside(this.state.web3Provider.accounts[0]);
                        notification.successMsg(notification.Msg.UNLOCK_TOKEN_SUCCESS)
                    } else {
                        notification.errorMsg(notification.Msg.UNLOCK_TOKEN_FAILED)
                    }
                }).on("error", (error) => {
                    StorageStore.setStrorage(UNLOCK_LOAD_KEY, "0");
                    this.setState({ tranLoader: false });
                    if (error.message.includes("User denied transaction signature")) {
                        notification.errorMsg(notification.Msg.TRANSACTION_REJECTED)
                    } else {
                        notification.errorMsg("Tranascation Failed")
                    }
                })
        } else {
            notification.warningMsg(notification.Msg.UNLOCK_TOKEN_DENIED);
        }
    }

    cancelInvestment() {
        if (!this.state.unLockBlock) {
            const { web3Provider, downSideProtectionInstance } = this.state;
            downSideProtectionInstance.methods.cancelInvestment().send({ from: web3Provider.accounts[0], gasPrice: web3Provider.web3.utils.toWei("1", "gwei"), gasLimit: 800000 })
                .on('transactionHash', (hash) => {
                    StorageStore.setStrorage(UNLOCK_LOAD_KEY, "1");
                    StorageStore.setStrorage(UNLOCK_TX_KEY, hash);
                    this.props.closePopUp('.tokens-Popup04Cancel')
                    this.setState({
                        txHashDownSide: "https://ropsten.etherscan.io/tx/" + hash,
                        tranLoader: true
                    });
                }).on('receipt', (receipt) => {
                    StorageStore.setStrorage(UNLOCK_LOAD_KEY, "0");
                    this.setState({ tranLoader: false });
                    this.calucalteLockFund();
                    this.props.refreshData();
                    if (receipt.status) {
                        AuctionActions.clearUserInvestmentDownside(this.state.web3Provider.accounts[0]);
                        notification.successMsg(notification.Msg.CANCEL_INVESTMENT_SUCCESS)
                    } else {
                        notification.errorMsg(notification.Msg.CANCEL_INVESTMENT_FAILED)
                    }
                }).on("error", (error) => {
                    StorageStore.setStrorage(UNLOCK_LOAD_KEY, "0");
                    this.setState({ tranLoader: false });
                    if (error.message.includes("User denied transaction signature")) {
                        notification.errorMsg(notification.Msg.TRANSACTION_REJECTED)
                    } else {
                        notification.errorMsg("Tranascation Failed")
                    }
                })
        } else {
            notification.warningMsg(notification.Msg.CANCEL_INVESTMENT_DENIED);
        }
    }

    render() {

        return (
            <div>
                <div className="tokens-Popup04" >
                    <a href="javascript:void(0)" onClick={() => this.props.closePopUp('.tokens-Popup04')} className="close-Icon">
                        <img src={close_btn} alt="" /></a>
                    <div className="popup4-Container" id="popShow01">
                        <div className="jiTitle03">Your Investment Automatically Includes <span className="yellow-Color">90% Downside Protection</span> </div>
                        <div className="popup4-subbox">
                            <div className="pp4-Subbox01"><i>1</i>90% of the investment along with 90% of the JNTR will be locked on an escrow smart contract. The remaining 10% of JNTR will be immediately released to the investor wallet </div>
                            <div className="pp4-Subbox01"><i>2</i>After one year, 90% of the investment will automatically release to Jointer and the 90% of the JNTR will release to investor <span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="right" data-pt-title="During that year both Jointer and investor are not allowed to access the locked funds or JNTR" aria-hidden="true"></i></span></div>
                            <div className="pp4-Subbox01"><i>3</i>At any time before the year ends the investor has the option to unlock the 90% JNTR or to cancel investment and received 90% of the fund back
                            <span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="left" data-pt-title="Cancelling investment will return to investor the same currency invested. For example, if investor invested 1 ETH (at the time equal to $200), after cancellation investor will receive 0.9 ETH (which is the 90% fund protected in the escrow contract)" aria-hidden="true"></i></span></div>
                        </div>
                        {this.state.web3Provider.isLogin && Number(this.state.lockedTokens) > 0 ?
                            this.state.tranLoader ?
                                <div className="tPopup-btnbar">
                                    <img src={loader} alt="" />
                                    <br /><br />
                                    <div className="jiTitle03">Transaction pending until the next block</div>
                                    <a href={this.state.txHashDownSide} target="_blank" className="pl_Link statusLink01" style={{ color: "#fff", display: "inline-block" }}>
                                        Check transaction status
                                    </a>
                                </div>
                                :
                                <div>
                                    <div className="clearfix">
                                        <div className="jiTitle03">Are you sure you want to unlock the <span className="yellow-Color">{Number(this.state.lockedTokens).toLocaleString(undefined, DECIMALS.TOKENSUPPLY)}</span> JNTR you already own?</div>
                                        <div className="tPopup-btnbar">
                                            <a href="javascript:void(0)" className="tPopup-btn01 ani-1" onClick={() => this.unLockTokens()}>Unlock my JNTR</a>
                                            <a href="javascript:void(0)" className="tPopup-btn03 ani-1" onClick={() => this.props.openPopup('.tokens-Popup04Cancel')}>Cancel my investment</a>
                                        </div>
                                    </div>
                                    <div className="timer-Box dSPTimerFix01">
                                        <p> The next distribution for new JNTR will be completed within </p>
                                        <div className="jiT-timertxt" style={{ margin: "0 auto" }}>
                                            <span className="hoursTokenAllot">00</span>:<span className="minutesTokenAllot">00</span>:<span className="secondsTokenAllot">00</span>
                                        </div>
                                    </div>
                                </div>
                            : <div>
                                <div className="jiTitle03">You Have <span className="orange-Color">0</span> JNTR to Unlock</div>

                                {this.state.web3Provider.isLogin ?
                                    <a href="javascript:void(0)" onClick={() => { this.props.closePopUp(".tokens-Popup04"); this.props.openPopup(".tokens-Popup02"); }} className="Cnow-btn ani-1 investNow" id="addContribution02">INVEST NOW</a>
                                    : <a href="javascript:void(0)" onClick={() => { this.props.closePopUp(".tokens-Popup04"); this.props.openPopup(".wallet-Popup"); }} className="Cnow-btn iyw-mainB ani-1 investNow" id="addContribution02">

                                        <div className="iyw-btn01">
                                            <span><i className="fab fa-ethereum"></i></span> INTEGRATE YOUR WALLET</div> INVEST NOW</a>}


                                <div className="timer-Box dSPTimerFix01">
                                    <p> The next distribution for new JNTR will be completed within </p>
                                    <div className="jiT-timertxt" style={{ margin: "0 auto" }}>
                                        <span className="hoursTokenAllot">00</span>:<span className="minutesTokenAllot">00</span>:<span className="secondsTokenAllot">00</span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="tokens-Popup04Cancel" >
                    <a href="javascript:void(0)" onClick={() => this.props.closePopUp('.tokens-Popup04Cancel')} className="close-Icon">
                        <img src={close_btn} alt="" /></a>
                    <div className="popup4-Container" id="popShow01">


                        <div className="jiTitle03" style={{ letterSpacing: "-1px" }}>
                            <p> The ROI on your <span className="yellow-Color">{Number(this.state.lockedTokens).toLocaleString(undefined, DECIMALS.TWODECIMALPLACE)}</span> JNTR has grown by <span className="yellow-Color">{(this.state.userCalROI * 100).toFixed(2)}%</span> since you invested, </p>
                            <p> are you sure you want to cancel 90% of your investment and receive <span className="yellow-Color">${Number(this.state.totalUserInvestment).toLocaleString(undefined, DECIMALS.TWODECIMALPLACE)}</span>?</p>
                            <p>  This cannot be undone and 90% of your JNTR will be lost.</p>
                        </div>


                        <div className="tPopup-btnbar">
                            <a href="javascript:void(0)" className="tPopup-btn01 ani-1" onClick={() => this.props.closePopUp('.tokens-Popup04Cancel')}>No, I want to keep my JNTR</a>
                            <a href="javascript:void(0)" className="tPopup-btn03 ani-1" onClick={() => this.cancelInvestment()}>Yes, cancel my investment</a>
                        </div>

                        <div className="tPopupSmallText01">

                            <i className="fas fa-info-circle"></i> Canceling your investment will return to you the same currency invested. For example, if you invested 1 ETH (at the time equal to $200), after cancellation you will receive 0.9 ETH (which is the 90% protected in the contract)
                        </div>

                    </div>
                </div>
            </div>


        )



    }





}

export default DownSideProtection;
