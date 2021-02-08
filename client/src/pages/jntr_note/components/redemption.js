import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import ContractData from '../../../ContractData'
import { PrePath } from '../../../constant'

import DECIMALS from '../../../decimalConstant'
import * as notification from '../../../components/notification';
import TokenList from './tokenList';

import StorageStore from '../../../stores/StorageStore'

const $ = window.$;
const jQuery = window.jQuery;

const REDEEM_LOAD_KEY = "REDEEM_LOAD";
const REDEEM_TX_KEY = "REDEEM_TXHASH";

class Redemption extends PureComponent {

    constructor(props) {
        super(props);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.state = {
            tranLoader: false,
            web3Provider: this.props.web3Provider,
            accounts: this.props.web3Provider.accounts,
            selectedSentCurrency: null,
            selectedReceiveCurrency: null,
            redeemAmount: 0,
            returnAmount: 0,
            showTx: null,
            auctionDetails: null,
            whichButton: 0,
            approveDone: 0,
            txLink: null,
            showLedger: false,
            currencyPrice: {}
        }
    }

    componentDidMount = async () => {
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.accounts !== nextProps.accounts) {
            this.initInstance(nextProps.web3Provider);
        }
        if (this.state.auctionDetails !== nextProps.auctionDetails) {
            var currencyPrice = this.state.currencyPrice;
            currencyPrice["JNTR"] = nextProps.auctionDetails.currentJNTRMarketValue;
            this.setState({
                auctionDetails: nextProps.auctionDetails,
                currencyPrice: currencyPrice
            })
        }
        if (this.state.web3Provider !== nextProps.web3Provider) {
            this.setState({
                web3Provider: nextProps.web3Provider,
                accounts: nextProps.web3Provider.accounts
            })
        }
        if (this.state.totalBalance !== nextProps.totalBalance) {
            this.setState({ totalBalance: nextProps.totalBalance })
        }
        if (this.state.etherBalance !== nextProps.etherBalance) {
            this.setState({ etherBalance: nextProps.etherBalance })
        }
        if (this.state.etherPrice !== nextProps.etherPrice) {
            var currencyPrice = this.state.currencyPrice;
            currencyPrice["Ethereum"] = nextProps.etherPrice;
            this.setState({ currencyPrice: currencyPrice })
        }
    }

    initInstance(web3Provider) {
        if (web3Provider.isLogin && !this.props.auctionStop) {
            const redemptionInstance = new web3Provider.web3.eth.Contract(
                ContractData.RedemptionAbi,
                ContractData.RedemptionAddress
            );
            const JNTRTokenInstance = new web3Provider.web3.eth.Contract(
                ContractData.JNTRTokenAbi,
                ContractData.JNTRTokenAddress
            );
            this.setState({
                web3Provider: web3Provider,
                redemptionInstance: redemptionInstance,
                JNTRTokenInstance: JNTRTokenInstance
            }, () => {
                this.checkPendingTrans();
            });
        }
    }

    checkPendingTrans() {
        let is_on = StorageStore.getStorage(REDEEM_LOAD_KEY);
        console.log("is_on", is_on);

        if (Number(is_on) === 1) {
            let counter = 0;
            this.setState({ tranLoader: true });

            var checkTx = setInterval(() => {
                this.state.web3Provider.web3.eth.getTransactionReceipt(StorageStore.getStorage(REDEEM_TX_KEY), (error, data) => {
                    if (data !== null && data.status) {
                        clearInterval(checkTx);
                        StorageStore.setStrorage(REDEEM_LOAD_KEY, "0");
                        this.setState({ tranLoader: false });
                    }
                    if (data !== null && !data.status) {
                        clearInterval(checkTx);
                        StorageStore.setStrorage(REDEEM_LOAD_KEY, "0");
                        this.setState({ tranLoader: false });
                    }
                    if (counter === 5) {
                        clearInterval(checkTx);
                        StorageStore.setStrorage(REDEEM_LOAD_KEY, "0");
                        this.setState({ tranLoader: false });
                    }
                    counter++;
                })
            }, 1000)
        }
    }

    approveTransfer() {
        var redeemAmount = this.state.redeemAmount;
        if (redeemAmount === undefined || redeemAmount === '' || redeemAmount === null || redeemAmount === 0) {
            notification.warningMsg("Enter Valid Redeem Amount!");
            return
        }
        const { web3Provider, accounts, JNTRTokenInstance } = this.state;

        if (web3Provider.isLogin) {

            this.setState({ isApproving: true, disableInputs: true }, () => {
                JNTRTokenInstance.methods.balanceOf(accounts[0]).call().then((balance) => {
                    var userBalance = Number(web3Provider.web3.utils.fromWei(balance));
                    alert(userBalance)
                    if (redeemAmount > userBalance) {
                        notification.errorMsg(notification.Msg.INSUFFICIENT_FUNDS)
                        this.setState({ isApproving: false, disableInputs: false })
                        return 0
                    }

                    JNTRTokenInstance.methods.approve("0x546B072287eb122B292CA6EF4a03cb0D6010593E", web3Provider.web3.utils.toWei((redeemAmount).toString(), "ether")).estimateGas({ from: accounts[0] }).then((estimateGas) => {
                        JNTRTokenInstance.methods.approve("0x546B072287eb122B292CA6EF4a03cb0D6010593E", web3Provider.web3.utils.toWei((redeemAmount).toString(), "ether")).send({
                            from: accounts[0], gasPrice: web3Provider.web3.utils.toWei("21", "gwei"), gas: estimateGas + 10000
                        }).on('transactionHash', (hash) => {
                            notification.successMsg("Your Transaction Submitted Successfully");
                        }).on('receipt', (receipt) => {
                            if (receipt.status) {
                                notification.successMsg(notification.Msg.TOKEN_TRANSFER_APPROVE)
                                this.setState({ isApproving: false, approveDone: 2 })
                            }
                        }).on("error", (error) => {
                            if (error.message.includes("User denied transaction signature")) {
                                this.setState({ isApproving: false, disableInputs: false })
                                notification.errorMsg(notification.Msg.TRANSACTION_REJECTED)
                            }
                        })
                    }).catch((e) => {
                        console.log(e);
                    })
                }).catch((e) => {
                    console.log(e);
                })

            })
        } else {
            notification.warningMsg("Connect Metamask!");
        }

    }

    redeemTokens() {
        var selectedSentCurrency = this.state.selectedSentCurrency;
        var selectedReceiveCurrency = this.state.selectedReceiveCurrency;
        var redeemAmount = this.state.redeemAmount;
        if (selectedSentCurrency === null) {
            notification.warningMsg("Select Sent Currency!")
        } else if (selectedReceiveCurrency === null) {
            notification.warningMsg("Select Receive Currency!")
        } else if (redeemAmount === 0) {
            notification.warningMsg("Enter Valid Redeem Amount!")
        } else {

            const { redemptionInstance, web3Provider } = this.state;
            this.setState({ txHash: null })
            if (web3Provider.isLogin) {

                redemptionInstance.methods.redemption(TokenList.tokenPair[selectedSentCurrency][selectedReceiveCurrency], web3Provider.web3.utils.toWei(redeemAmount)).send({ from: web3Provider.accounts[0], gasPrice: web3Provider.web3.utils.toWei("6", "gwei") })
                    .on('transactionHash', (hash) => {
                        StorageStore.setStrorage(REDEEM_LOAD_KEY, "1");
                        StorageStore.setStrorage(REDEEM_TX_KEY, hash);
                        this.setState({
                            showLedger: true,
                            txHash: hash,
                            isShowTxPending: true,
                            txSentTime: new Date().toUTCString(),
                        });
                        notification.successMsg("Your transaction submitted successfully");
                    }).on('receipt', (receipt) => {
                        console.log("---------------------receipt-start----------------");
                        console.log(receipt);
                        console.log("---------------------receipt-end----------------");
                        this.setState({});
                        StorageStore.setStrorage(REDEEM_LOAD_KEY, "0");
                        if (receipt.status) {
                            /*
                            
                            Redemption Event Data

                            0: "0xD368b98d03855835E2923Dc000b3f9c2EBF1b27b"
                            1: "3000000000000000000"
                            2: "57555757912865340"
                            3: false
                            fromPool: false
                            returnAmount: "57555757912865340"
                            _amount: "3000000000000000000"
                            _token: "0xD368b98d03855835E2923Dc000b3f9c2EBF1b27b"

                            */
                            notification.successMsg("Your redemption was successful");
                            this.setState({
                                isShowTxPending: false,
                                txReceiceTime: new Date().toUTCString(),
                                returnAmount: Number(web3Provider.web3.utils.fromWei(receipt.events.Redemption.returnValues.returnAmount)).toFixed(4)
                            })
                        } else {
                            notification.errorMsg("Your redemption failed, please try again");
                        }
                    }).on("error", (error) => {
                        StorageStore.setStrorage(REDEEM_LOAD_KEY, "0");
                        this.setState({ tranLoader: false, isBtnClick: false });
                        if (error.message.includes("User denied transaction signature")) {
                            notification.errorMsg(notification.Msg.TRANSACTION_REJECTED)
                        } else {
                            notification.errorMsg("Your redemption failed, please try again")
                        }
                    })
            } else {
                notification.warningMsg("Connect Metamask!");
            }
        }
    }

    openCurrencyPopup(classCurrency) {
        $(classCurrency).show();
        $("html").addClass("no-Scroll");
    }

    changeCurrency(currecy, id) {
        if (id === 1) {
            this.setState({
                selectedSentCurrency: currecy
            }, () => {
                $(".redeemSentCurrency").hide();
                $("html").removeClass("no-Scroll");
            })
        } else if (id === 2) {
            this.setState({
                selectedReceiveCurrency: currecy
            }, () => {
                $(".redeemReceiveCurrency").hide();
                $("html").removeClass("no-Scroll");
            })
        }
    }

    changeRedeemAmount(e) {
        this.setState({
            redeemAmount: e.target.value,
            returnAmount: (this.state.selectedSentCurrency)
        })
    }

    render() {

        let showTx = this.state.showTx;
        let userTxsUI = []
        if (showTx !== null && Object.keys(showTx).length !== 0)
            for (let x in showTx) {
                userTxsUI.push(LedgerBox(this.txLink, showTx[x], this))
            }

        else
            if (this.state.ispendingTx === false) {
                userTxsUI.push(<div style={{ textAlign: "center", color: "white" }}><h1>No Other Transactions Available</h1></div>)
            }

        return (
            <div>
                <div className="redeem">
                    <div className="container-Full">
                        <div className="Title01 wow fadeInDown" data-wow-delay="0.3s">Liquidity 24/7 </div>
                        <div className="liquidity-Wrap">
                            <div className="swap-Wrap wow fadeInLeft" data-wow-delay="0.3s">
                                <div className="Title02">Redeem JNTR from Reserve <span><i className="fas cust-fas pop011 fa-question-circle"></i></span>
                                    <div className="daily-distribution ani-1" tabIndex="-1">
                                        <div className="distribution-Title01">Redemption from Jointer's Liquidity Reserves</div>
                                        <div className="distribution-Wrap">
                                            <div className="distribution-Box">
                                                <div className="distribution-Title02">Side Reserve Distribution</div>
                                                <p>The Side Reserve receives 90% of Jointer’s allocated reserve amount automatically. These funds are not directly withdrawn by investors, rather this reserve communicates directly with the Main Reserve. Any funds not redeemed will compound, allowing for greater redemption fulfillment.</p>
                                            </div>
                                            <div className="distribution-Box">
                                                <div className="distribution-Title02">Main Reserve Replenishment</div>
                                                <p>Since JNTR’s price derives from the Main Reserve and investors redeem from this reserve, it is important for the Main Reserve to not crash and maintain liquidity. Therefore, the Main Reserve will be replenished on a 1:1 asset ratio by the Side Reserve when funds are available.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swap-Box reserve-Bx">
                                    <div className="swap-Input">
                                        <div className="swap-Title">
                                            <div className="swap-Text">Redeem</div>
                                            <div className="swap-Amt">
                                                <input type="text" id="input03" value={this.state.redeemAmount} onChange={(e) => this.changeRedeemAmount(e)} />
                                            </div>
                                            <div className="cur-Text">JNTR</div>
                                        </div>
                                        <div className="swap-Title">
                                            <div className="swap-Text">Receive</div>
                                            <div className="swap-Amt">
                                                <input type="text" value={this.state.returnAmount} readOnly />
                                            </div>
                                            <div className="cur-Text">ETH</div>
                                        </div>
                                    </div>
                                    <div className="coin-Box">
                                        <div className="coin-Box01">
                                            <div className="swap-Coin ani-1"><div className="overlay-Bg">Change Assets <i className="fa fa-caret-down" aria-hidden="true"></i></div> <img src={PrePath + "/images/jntr_note/jntrnote-icon.png"} alt="" className="ani-1" /> </div>
                                            <div className="redeem-Text"> Current Price: <span>0.00000194 ETH <span className="green-Color">(+8.73%)</span></span> </div>
                                            <a href="javascript:void(0);" className="faux-Link" onClick={() => { this.openCurrencyPopup(".redeemSentCurrency") }}></a>
                                        </div>
                                        <div className="swap-Icon">
                                            <a href="javascript:void(0);" className="faux-Link ani-1"></a>
                                        </div>
                                        <div className="coin-Box01">
                                            <div className="swap-Coin ani-1"><div className="overlay-Bg">Change Assets <i className="fa fa-caret-down" aria-hidden="true"></i></div> <img src={PrePath + "/images/jntr_note/ethcoin-icon.png"} alt="" className="ani-1" /> </div>
                                            <div className="redeem-Text"> Price Slippage: <span>0%</span> </div>
                                            <a href="javascript:void(0);" className="faux-Link" onClick={() => { this.openCurrencyPopup(".redeemReceiveCurrency") }}></a>
                                        </div>
                                    </div>
                                </div>
                                {TokenList.Contraints[this.state.selectedSentCurrency].requireApprove && this.state.approveDone !== 2 ?
                                    this.state.isApproving ?
                                        (
                                            <div className="swap-Btn"> <a href="javascript:void(0);" className="btn btn-large ani-1 disable-btn">approving...</a> </div>
                                        )
                                        :
                                        (
                                            <div className="swap-Btn"> <a href="javascript:void(0);" className="btn btn-large ani-1" onClick={() => this.approveTransfer()}>approve</a> </div>
                                        )
                                    :
                                    (
                                        <div className="swap-Btn"> <a href="javascript:void(0);" className="btn btn-large ani-1" onClick={() => this.redeemTokens()}>redeem</a> </div>
                                    )
                                }
                                <div className="swap-Textlink">
                                    <div className="swap-Link01">Powered by <a href="javascript:void(0);">Bancor</a></div>
                                </div>
                            </div>
                            <div className="swap-Wrap wow fadeInRight" data-wow-delay="0.3s">
                                <div className="Title02">Swap JNTR with SmartSwap <span><i className="fas cust-fas fa-question-circle protip" data-pt-gravity="top" data-pt-title="Free P2C Swap with no slippage"></i></span></div>
                                <div className="swap-Box">
                                    <div className="swap-Input">
                                        <div className="swap-Title">
                                            <div className="swap-Text">Send</div>
                                            <div className="swap-Amt"><span className="currecy">$</span>
                                                <input type="text" id="input04" value="$1,000" />
                                            </div>
                                        </div>
                                        <div className="swap-Title">
                                            <div className="swap-Text">Receive</div>
                                            <div className="swap-Amt"><span className="currecy">$</span>
                                                <input type="text" value="$1,000" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="coin-Box">
                                        <div className="coin-Box01">
                                            <div className="swap-Coin ani-1"><div className="overlay-Bg">Change Assets <i className="fa fa-caret-down" aria-hidden="true"></i></div> <img src={PrePath + "/images/jntr_note/jntrstock-icon.png"} alt="" className="ani-1" /> </div>
                                            <div className="total-Amt"> <span>~ ~</span> 0.1 JNTR/STOCK </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="swap-Icon">
                                            <a href="javascript:void(0);" className="faux-Link ani-1"></a>
                                        </div>
                                        <div className="coin-Box01">
                                            <div className="swap-Coin ani-1"><div className="overlay-Bg">Change Assets <i className="fa fa-caret-down" aria-hidden="true"></i></div> <img src={PrePath + "/images/jntr_note/ezocoin-icon.png"} alt="" className="ani-1" /> </div>
                                            <div className="total-Amt"> <span>~ ~</span> 3.202 EZO </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="swap-Btn">
                                    <a href="javascript:void(0);" id="lrlock-btn" className="btn btn-large ani-1">Swap</a>
                                </div>
                                <div className="swap-Textlink">
                                    <div className="swap-Link01">Powered by <a href="javascript:void(0);">ElementZero SmartSwap</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--======================= REDEEM END =====================--> */}
                {/* <!--======================= HISTORY START =====================--> */}
                <div className="transaction-History">
                    <div className="container-Full">
                        <div className="Title01 wow fadeInDown" data-wow-delay="0.3s">History</div>
                        {this.state.showLedger ? showLedger(this) : null}
                        {this.state.showHistory ? userTxsUI : null}
                    </div>
                </div>

                {/* <!--======================= HISTORY END =====================--> */}
                {/* <!--======================= TOKENLIST POPUP START =====================--> */}
                <GetPopUp
                    classNM="main-Popup wallet-Popup redeemSentCurrency"
                    item={TokenList.tokens}
                    itemNumber={1}
                    changeCurrency={this.changeCurrency}
                />

                <GetPopUp
                    classNM="main-Popup wallet-Popup redeemReceiveCurrency"
                    item={TokenList.tokens}
                    itemNumber={2}
                    changeCurrency={this.changeCurrency}
                />

                {/* <!--======================= TOKENLIST POPUP END =====================--> */}
                {/* <!--======================= UNLOCK POPUP END =====================--> */}
                <div className="unlock-Popup unlock-Popup02">
                    <a href="javascript:void(0);" className="close-Icon"><img src={PrePath + "/images/jntr_note/close-btn.png"} alt="" /></a>
                    <div className="container-Grid">
                        <div className="Title01">
                            <p>Are you sure you want to unlock your <span className="yellow-Color">1,000</span> JNTR?</p>

                        </div>
                        <div className="addWall_BTN">
                            <a href="javascript:void(0);" className="uc-btn01">Go to SmartSwap</a>
                            <a href="javascript:void(0);" className="uc-btn02">Redeem my JNTR</a>
                        </div>
                    </div>
                </div>
                {/* <!--======================= UNLOCK POPUP END =====================--> */}
            </div>
        );
    }
}

export default Redemption;

function showLedger(_this) {
    if (_this.state.isShowTxPending && _this.state.tokenReceive === 2) {
        return null
    }
    return (
        <div className="transaction-histroryWrap">
            <div className="transaction-histroryBox wow fadeInLeft" data-wow-delay="0.3s">
                <div className="Title02">Send</div>
                <div className="trasaction-Amt">{_this.state.redeemAmount + " " + _this.state.selectedSentCurrency} <span>($266.9356)</span></div>
                <div className="trasaction-Date">{_this.state.txSentTime}</div>
                <div className="trasaction-Box">
                    <div className="trasaction-Status"><span className="icon-Box"><i className="fas fa-check-circle"></i></span>Transaction Submitted</div>
                    <div className="trans-Id">{_this.state.txHash}</div>
                    <a href={"https://ropsten.etherscan.io/tx/" + _this.state.txHash} target="_blank" className="view-Trans ani-1">View Transaction</a>
                </div>
            </div>
            <div className="arrow-Box wow fadeIn" data-wow-delay="0.5s"></div>
            {_this.state.isShowTxPending ?
                (
                    <div className="transaction-histroryBox wow fadeInUp" data-wow-delay="0.3s">
                        <div className="Title02 pending">Pending</div>
                        {/* <div className="trasaction-Amt">1.2507 JNTR <span>($166.9356)</span></div> */}
                        <div className="trasaction-Box">
                            <div className="trasaction-Status pending-Text">Pending <span className="pending-loader"><img src={PrePath + "/images/jntr_note/loader2.gif"} alt="" /></span></div>
                        </div>
                        <p><a href="javascript:void(0);" className="ani-1">Cancel and redeem the pending to your wallet</a></p>
                    </div>
                )
                :
                (
                    <div className="transaction-histroryBox wow fadeInRight" data-wow-delay="0.3s">
                        <div className="Title02 green-Color">Received</div>
                        <div className="trasaction-Amt">{_this.state.returnAmount} JNTR <span>($100)</span></div>
                        <div className="trasaction-Date">{_this.state.txReceiceTime}</div>
                        <div className="trasaction-Box">
                            <div className="trasaction-Status"><span className="icon-Box"><i className="fas fa-check-circle"></i></span>Funds wired to your wallet</div>
                            <div className="trans-Id">{_this.state.txHash}</div>
                            <a href={"https://ropsten.etherscan.io/tx/" + _this.state.hash} target="_blank" className="view-Trans ani-1">View Transaction</a>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

function LedgerBox(txLink, element, _this) {
    return (
        <div className="transaction-histroryWrap">
            <div className="transaction-histroryBox wow fadeInLeft" data-wow-delay="0.3s">
                <div className="Title02">Send</div>
                <div className="trasaction-Amt">2 JNTR <span>($266.9356)</span></div>
                <div className="trasaction-Date">Feb 2.2019,9:21am PST</div>
                <div className="trasaction-Box">
                    <div className="trasaction-Status"><span className="icon-Box"><i className="fas fa-check-circle"></i></span>Transaction Submitted</div>
                    <div className="trans-Id">X0456C19d5A61AeA886E6D657EsEF8849565</div>
                    <a href="javascript:void(0);" className="view-Trans ani-1">View Transaction</a>
                </div>
            </div>
            <div className="arrow-Box wow fadeIn" data-wow-delay="0.5s"></div>
            <div className="transaction-histroryBox wow fadeInRight" data-wow-delay="0.3s">
                <div className="Title02 green-Color">Received</div>
                <div className="trasaction-Amt">1 JNTR <span>($100)</span></div>
                <div className="trasaction-Date">Feb 2.2019,9:21am PST</div>
                <div className="trasaction-Box">
                    <div className="trasaction-Status"><span className="icon-Box"><i className="fas fa-check-circle"></i></span>Funds wired to your wallet</div>
                    <div className="trans-Id">X0456C19d5A61AeA886E6D657EsEF8849565</div>
                    <a href="javascript:void(0);" className="view-Trans ani-1">View Transaction</a>
                </div>
            </div>
            <div className="transaction-histroryBox wow fadeInUp" data-wow-delay="0.3s">
                <div className="Title02 pending">Pending</div>
                <div className="trasaction-Amt">1.2507 JNTR <span>($166.9356)</span></div>
                <div className="trasaction-Box">
                    <div className="trasaction-Status pending-Text">Pending <span className="pending-loader"><img src={PrePath + "/images/jntr_note/loader2.gif"} alt="" /></span></div>
                </div>
                <p><a href="javascript:void(0);" className="ani-1">Cancel and redeem the pending to your wallet</a></p>
            </div>
        </div>
    )
}

function GetPopUp(props) {
    return (
        <div className={props.classNM}>
            <div className="container-Full">
                <div className="wallet-popupBlock">
                    <div className="wallet-boxWrap">
                        {
                            props.item.map((element, key) => {
                                return (
                                    <div className="wallet-Bx ani-1">
                                        <div className={props.itemNumber === 1 ? element.sentAllow ? "img-Box" : "img-Box disableCBTN" : element.receiveAllow ? "img-Box" : "img-Box disableCBTN"}> <img src={PrePath + element.src} alt="" className="img-fluid" />
                                            <div className="title-Name">{element.name}</div>
                                        </div>
                                        <a href="javascript:void(0);" className="faux-Link" onClick={() => props.changeCurrency(element.name, props.itemNumber)}></a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <a href="javascript:void(0);" className="close-Icon"><img src={PrePath + "/images/jntr_note/close-btn.png"} alt="" /></a>
        </div>
    );
}