
import React, { PureComponent } from "react";
import ContractData from '../../../ContractData'
import DECIMALS from '../../../decimalConstant'

import Slider from "react-slick";
import * as notification from '../../../components/notification';
import StorageStore from '../../../stores/StorageStore'

import close_btn from '../../../assets/auction/images/close-btn-02.png'
import loader from '../../../assets/auction/images/loader.svg'
import csI_01 from '../../../assets/auction/images/csI-01.png'
import csI_02 from '../../../assets/auction/images/csI-02.png'
import csI_03 from '../../../assets/auction/images/csI-03.png'
import csI_04 from '../../../assets/auction/images/csI-04.png'
import csI_05 from '../../../assets/auction/images/csI-05.png'
import csI_06 from '../../../assets/auction/images/csI-06.png'
import shield_Icon02 from '../../../assets/auction/images/shield-Icon02.png';

const $ = window.$;
const jQuery = window.jQuery;

const INVEST_LOAD_KEY = "INVEST_LOAD";
const INVEST_TX_KEY = "INVEST_TXHASH";

class InvestMent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tranLoader: false,
            isBtnClick: false,
            web3Provider: this.props.web3Provider,
            auctionDetails: this.props.auctionDetails,
            totalBalance: this.props.totalBalance,
            etherBalance: this.props.etherBalance,
            etherPrice: this.props.etherPrice,
            fundCollectorInstance: null,
            contributionFundEth: 0.00,
            contributionValue: 0.00,
            txHash: null,
            todayCon: 0,
            txSuccessButton: false,
            erros: {
                fundError: false,
                contrbuterError: false,
                jntrError: false
            }

        }

    }


    contribute() {

        const { fundCollectorInstance, web3Provider, contributionFundEth, isBtnClick } = this.state;

        if (web3Provider.isLogin && !isBtnClick) {
            $('.addCotr-BTN').addClass('disable-btn');
            const input = "0x7465737400000000000000000000000000000000000000000000000000000000";
            this.setState({ isBtnClick: true })
            let value = 0
            try {
                value = web3Provider.web3.utils.toWei(contributionFundEth.toString()).toFixed(0)
            } catch (e) {
                value = (contributionFundEth * 10 ** 18).toFixed(0);
            }
            notification.successMsg("Approve Transaction From Your Metamask");
            fundCollectorInstance.methods.contributeWithEther(input, input, 0, input, input).send({ from: web3Provider.accounts[0], gasPrice: web3Provider.web3.utils.toWei("6", "gwei"), value: value })
                .on('transactionHash', (hash) => {
                    $('.addCotr-BTN').removeClass('disable-btn');
                    StorageStore.setStrorage(INVEST_LOAD_KEY, "1");
                    StorageStore.setStrorage(INVEST_TX_KEY, hash);
                    this.setState({
                        txHash: "https://ropsten.etherscan.io/tx/" + hash,
                        tranLoader: true
                    });
                    notification.successMsg("Your transaction submitted successfully");
                }).on('receipt', (receipt) => {
                    this.setState({ txSuccessButton: true, tranLoader: false, isBtnClick: false });
                    StorageStore.setStrorage(INVEST_LOAD_KEY, "0");
                    this.props.refreshData();
                    if (receipt.status) {
                        notification.successMsg("Your investment was successful");
                    } else {
                        notification.errorMsg("Your investment failed, please try again");
                    }
                }).on("error", (error) => {
                    $('.addCotr-BTN').removeClass('disable-btn');
                    StorageStore.setStrorage(INVEST_LOAD_KEY, "0");
                    this.setState({ tranLoader: false, isBtnClick: false });
                    if (error.message.includes("User denied transaction signature")) {
                        notification.errorMsg(notification.Msg.TRANSACTION_REJECTED)
                    } else {
                        notification.errorMsg("Your investment failed, please try again")
                    }
                })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.totalBalance !== nextProps.totalBalance) {
            this.setState({ totalBalance: nextProps.totalBalance }, () => {
                this.updatePopupDataBeforeOpen();
            });
        }

        if (this.state.todayCon !== nextProps.todayCon) {
            console.log("HERE_INVESTMENT_CON")
            if (this.state.isBtnClick) {
                var waitTxComplete = setInterval(function () {
                    if (!this.state.isBtnClick) {
                        clearInterval(waitTxComplete);
                        this.setState({
                            todayCon: nextProps.todayCon,
                            auctionDetails: nextProps.auctionDetails,
                            contributionValue: nextProps.auctionDetails.remainingAvailableInvestment,
                            contributionFundEth: nextProps.auctionDetails.remainingAvailableInvestment / this.state.etherPrice
                        }, () => {
                            this.initCircle();
                            this.generalFunctionValueChange(nextProps.auctionDetails.remainingAvailableInvestment);
                        });
                    }
                }.bind(this), 2000);
            } else {
                this.setState({
                    todayCon: nextProps.todayCon,
                    auctionDetails: nextProps.auctionDetails,
                    contributionValue: nextProps.auctionDetails.remainingAvailableInvestment,
                    contributionFundEth: nextProps.auctionDetails.remainingAvailableInvestment / this.state.etherPrice
                }, () => {
                    this.initCircle();
                    this.generalFunctionValueChange(nextProps.auctionDetails.remainingAvailableInvestment);
                });
            }
        }

        if (this.props.accounts !== nextProps.accounts) {
            console.log("HERE_INVESTMENT_ACCOUNT");
            this.initInstance(nextProps.web3Provider);
            this.updatePopupDataBeforeOpen();

        }

        if (this.state.etherPrice !== nextProps.etherPrice) {
            this.setState({
                etherPrice: nextProps.etherPrice,
                contributionFundEth: Number(nextProps.auctionDetails.remainingAvailableInvestment).toFixed(2) / nextProps.etherPrice
            });
        }

        if (this.props.isPopUpOpen !== nextProps.isPopUpOpen) {
            this.setState({
                txSuccessButton: false
            }, () => {
                this.updatePopupDataBeforeOpen();
            })
        }
    }

    initInstance(web3Provider) {
        if (web3Provider.isLogin && !this.props.auctionStop) {

            const fundCollectorInstance = new web3Provider.web3.eth.Contract(
                ContractData.FundCollectorAbi,
                ContractData.FundCollectorAddress
            );
            this.setState({
                web3Provider: web3Provider,
                fundCollectorInstance: fundCollectorInstance
            }, () => {
                this.checkPendingTrans();
            });
        }
    }

    checkPendingTrans() {
        let is_on = StorageStore.getStorage(INVEST_LOAD_KEY);
        console.log("is_on", is_on);

        if (Number(is_on) === 1) {
            let counter = 0;
            this.setState({ tranLoader: true });

            var checkTx = setInterval(() => {
                this.state.web3Provider.web3.eth.getTransactionReceipt(StorageStore.getStorage(INVEST_TX_KEY), (error, data) => {
                    if (data !== null && data.status) {
                        clearInterval(checkTx);
                        StorageStore.setStrorage(INVEST_LOAD_KEY, "0");
                        this.setState({ tranLoader: false });
                    }
                    if (data !== null && !data.status) {
                        clearInterval(checkTx);
                        StorageStore.setStrorage(INVEST_LOAD_KEY, "0");
                        this.setState({ tranLoader: false });
                    }
                    if (counter === 5) {
                        clearInterval(checkTx);
                        StorageStore.setStrorage(INVEST_LOAD_KEY, "0");
                        this.setState({ tranLoader: false });
                    }
                    counter++;
                })
            }, 1000)
        }
    }

    initCircle() {
        $("#test-circle").empty();
        // console.log("contribution", this.state.auctionDetails.todayContribution)
        let percent = Number(this.state.auctionDetails.todayContribution) == 0 ? 0 : Math.floor(Number(Number(this.state.auctionDetails.todayContribution) / Number(this.state.auctionDetails.maxContributionAllowed) * 100).toFixed(2));
        $("#test-circle").circliful({
            animation: 1,
            animationStep: 5,
            foregroundBorderWidth: 6,
            backgroundBorderWidth: 6,
            backgroundColor: '#2d2d2d',
            foregroundColor: '#95c608',
            percent: this.state.auctionDetails.auctionSoldOut ? 100 : percent,
            textSize: 28,
            textStyle: 'font-size: 12px; color:#fff;',
            textColor: '#fff',
        });
    }

    updatePopupDataBeforeOpen() {
        this.setState({
            contributionValue: this.state.auctionDetails.remainingAvailableInvestment,
            contributionFundEth: this.state.auctionDetails.remainingAvailableInvestment / this.state.etherPrice
        }, () => {
            this.generalFunctionValueChange(this.state.auctionDetails.remainingAvailableInvestment);
        });
    }

    componentDidMount() {
        this.initCircle();
    }

    generalFunctionValueChange(newValue) {
        if (!isNaN(newValue)) {
            var contributionValue = newValue;
            const { erros, auctionDetails, totalBalance, web3Provider } = this.state;
            erros.fundError = Number(contributionValue) > Number(totalBalance);
            erros.contrbuterError = Number(contributionValue) > Number(auctionDetails.remainingAvailableInvestment);
            let contributionFundEth = Number(contributionValue) / this.props.etherPrice;

            if (erros.contrbuterError) {
                let temp = auctionDetails.remainingAvailableInvestment;
                contributionValue = temp;
                contributionFundEth = Number(auctionDetails.remainingAvailableInvestment) / this.props.etherPrice;
            }
            if (erros.fundError) {
                var totalBalanceCal = ((totalBalance / this.props.etherPrice) - 0.01) > 0 ? ((totalBalance / this.props.etherPrice) - 0.01) * this.props.etherPrice : 0
                contributionValue = totalBalanceCal;
                contributionFundEth = Number(totalBalanceCal) / this.props.etherPrice;
            }
            if (newValue[0] === "0" && newValue[1] === "0" && newValue.length > 1 && !newValue.includes(".")) {
                contributionValue = "0." + newValue.slice(1, newValue.length)
            }
            if (newValue === "" || contributionValue === 0 || contributionValue === "0" || web3Provider.web3.utils.toWei((contributionValue).toString()) === "0") {
                $('.popUpBtnDis').addClass("disable-btn");
            } else {
                $('.popUpBtnDis').removeClass("disable-btn");
            }
            this.setState({
                isBtnClick: false, erros: erros, contributionValue: contributionValue, contributionFundEth: contributionFundEth
            }, () => {
                this.forceUpdate();
            })
        }
    }

    contributionValueChange(e) {
        this.generalFunctionValueChange(e.target.value);
    }

    investMax(e) {
        this.setState({
            contributionValue: this.state.auctionDetails.remainingAvailableInvestment
        })
    }

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 600,
            slidesToShow: 6,
            slidesToScroll: 6,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }
        return (

            <div className="tokens-Popup02">
                <div className="contribution-Container clearfix">
                    <a href="javascript:void(0)" onClick={() => this.props.closePopUp('.tokens-Popup02')} className="close-Icon" ><img src={close_btn} alt="" /></a>
                    <div className="jrInvMBox">
                        <div className="jrInvBox01">
                            {/* <div className="contrSlider"> */}
                            <Slider className="contrSlider" {...settings}>


                                <div> <div className="ctr-box">
                                    <i className="cointype"><img src={csI_01} width="68" height="68" alt="" /></i>
                                    <div className="ctr-value">

                                        <a href="javascript:void(0)" className="add-funds" onClick={() => this.props.openPopup(".tokens-Popup05")} >
                                            ${this.state.totalBalance.toLocaleString(undefined, DECIMALS.ETHER_PRICE)}  <i className="fas fa-plus-square"></i>
                                        </a>
                                    </div>
                                    <div className="ctr-value">
                                        [{this.props.etherBalance.toFixed(4)} ETH]
                                                </div>
                                </div> </div>

                                <div className="dis-Coin">
                                    <div className="ctr-box">
                                        <i className="cointype"><img src={csI_02} width="68" height="68" alt="" /></i>
                                        <div className="ctr-value">$0   <a href="javascript:void(0)" className="add-funds"><i className="fas fa-plus-square"></i></a></div>
                                    </div>
                                </div>

                                <div className="dis-Coin"> <div className="ctr-box">
                                    <i className="cointype"><img src={csI_03} width="68" height="68" alt="" /></i>
                                    <div className="ctr-value">$0  <a href="javascript:void(0)" className="add-funds"><i className="fas fa-plus-square"></i></a></div>
                                </div> </div>

                                <div className="dis-Coin"> <div className="ctr-box">
                                    <i className="cointype"><img src={csI_04} width="68" height="68" alt="" /></i>
                                    <div className="ctr-value">$0 <a href="javascript:void(0)" className="add-funds"><i className="fas fa-plus-square"></i></a></div>
                                </div> </div>

                                <div className="dis-Coin"> <div className="ctr-box">
                                    <i className="cointype"><img src={csI_05} width="68" height="68" alt="" /></i>
                                    <div className="ctr-value">$0 <a href="javascript:void(0)" className="add-funds"><i className="fas fa-plus-square"></i></a></div>
                                </div> </div>

                                <div className="dis-Coin"> <div className="ctr-box">
                                    <i className="cointype"><img src={csI_06} width="68" height="68" alt="" /></i>
                                    <div className="ctr-value">$0  <a href="javascript:void(0)" className="add-funds"><i className="fas fa-plus-square"></i></a></div>
                                </div> </div>


                            </Slider>
                            {/* </div> */}
                            <div className="contrTextbox">
                                <span className="contr-Text">Your Investment <br />
                                    <div className="invMax-Box">
                                        <div className="md-checkbox">
                                            <input type="checkbox" id="check03" onChange={(e) => this.investMax(e)} />
                                            <label htmlFor="check03">Invest Max</label>
                                        </div>

                                    </div></span>
                                <span>
                                    {
                                        ((this.state.auctionDetails.yesterdayContribution + 1) - this.state.auctionDetails.todayContribution) > 0 ?
                                            <div className="boostGText01">If you wish to boost the Group Discount above 50%, invest at least <span>${((this.state.auctionDetails.yesterdayContribution + 1) - this.state.auctionDetails.todayContribution).toLocaleString(undefined, DECIMALS.MARKETVALUE)}</span></div>
                                            : null
                                    }

                                    <input type="text" id="contribution" value={this.state.contributionValue} onChange={(e) => this.contributionValueChange(e)} disabled={this.state.auctionDetails.auctionSoldOut} />
                                    <i className="contrDisplay">[{this.state.contributionFundEth.toFixed(4)} ETH]</i>

                                    <div className="invInfo-Box01">
                                        You might win today
                                    <i className="orange-Color">&nbsp;{(this.state.contributionValue !== "" && this.state.contributionValue !== 0) ? Number((this.state.contributionValue / (this.state.auctionDetails.todayContribution + this.state.contributionValue)) * this.state.auctionDetails.todaySupply).toLocaleString(undefined, DECIMALS.FOURDECIMALPLACE) : 0}&nbsp;JNTR</i> |
                                    <i className="orange-Color">{(this.state.contributionValue !== "" && this.state.contributionValue !== 0) ? Number(((((this.state.contributionValue / (this.state.auctionDetails.todayContribution + this.state.contributionValue)) * this.state.auctionDetails.todaySupply)) * this.state.auctionDetails.currentJNTRMarketValue) / ((((this.state.contributionValue / (this.state.auctionDetails.todayContribution + this.state.contributionValue)) * this.state.auctionDetails.todaySupply)) * (((this.state.auctionDetails.todayContribution + this.state.contributionValue) / this.state.auctionDetails.todaySupply))) * 100).toLocaleString(undefined, DECIMALS.TWODECIMALPLACE) : 0}% ROI</i>


                                    </div>

                                    <span className="small-Text" style={{ display: "none" }}>
                                        <i className="fas fa-info-circle" ></i>You currently own $5,000 JNTR, therefore your investment power is limited at 1:1 to $5,000. In order to increase your investment power please go to a <b className="orange-text" style={{ "fontWeight": "300 !important" }}>secondary market</b> to purchase more JNTR
                                            </span>
                                    {this.state.erros.contrbuterError ?
                                        <span className="small-Text red-Color">
                                            <i className="fas fa-times-circle"></i>Please choose an investment amount that is equal or below today's remaining available Auction investment
                                                </span>
                                        : null}

                                    {this.state.erros.fundError ?
                                        <span className="small-Text red-Color">
                                            <i className="fas fa-times-circle"></i>Your balance is too low, please <a href="javascript:void(0)" className="jrInvLink investNow" onClick={() => this.props.openPopup('.tokens-Popup05')}>add more funds</a>  to your wallet
                                                </span>
                                        : null}
                                </span>
                            </div>
                        </div>
                        <div className="jrInvBox02">
                            <div className="jrInvTitle01">Today's Auction Investment</div>
                            <div id="test-circle"></div>
                            {this.state.auctionDetails.auctionSoldOut ?
                                <div className="jrInvTitle02" style={{ color: "red", fontWeight: "bold", fontSize: "17px" }}>
                                    Today's Auction Sold Out!
                            </div>
                                :
                                <div className="jrInvTitle02">
                                    Remaining Available Investment
                                        <span>${(Number(this.state.auctionDetails.remainingAvailableInvestment).toFixed(2)).toLocaleString()}</span>
                                </div>
                            }

                        </div>

                    </div>
                    {this.state.tranLoader ?
                        <div style={{ textAlign: "right" }}>
                            <div className="addCotr-BTN ani-1"><img src={loader} alt="" /> Transaction pending until the next block</div>
                            <a href="javascript:void(0)" target="_blank" className="orange-Color" style={{ marginTop: "10px", display: "inline-block", float: "left" }}></a>
                            <div className="txHowToAdd">
                                <div className="ycp-TTFix01 ">
                                    <div className="investText01">


                                        How to add JNTR to your wallet
                                <i className="help-circle no-ani">
                                            <i className="fas fa-question-circle" aria-hidden="true"></i>

                                            <div className="htjinwall-popup no-ani view_right">
                                                <ul className="list-Text">
                                                    <li><i>1.</i>Click to copy the smart contract address
                                                    <span className="input-Bx02 no-ani npCopyFix" onClick={() => this.props.copyText('#contractAddressINV01')} >
                                                            <input type="text" value="0xdd902f73e59e03e3ec1131dc9c57a5e49cb19cb8" id="contractAddressINV01" className="no-ani" />
                                                            <a href="javascript:void(0);" className="copy-Btn"><i className="fas fa-copy"></i></a>
                                                        </span>

                                                    </li>
                                                    <li><i>2.</i>Paste the address in the "Token Contract Address" field in the "Custom Token" section of your wallet
                                                    </li>
                                                    <li><i>3.</i> Click "next then "add token" to confirm </li>
                                                </ul>
                                            </div>
                                        </i>

                                    </div>
                                </div>
                                <a href={this.state.txHash} target="_blank" className="pl_Link statusLink01" style={{ color: "#fff", display: "inline-block" }}>
                                    <i className="fab fa-ethereum"></i> Check transaction status
                                </a>
                            </div>
                        </div>
                        : this.state.auctionDetails.auctionSoldOut ?
                            this.state.txSuccessButton ?
                                < div >
                                    <a href="javascript:void(0)" className="addCotr-BTN ani-1"><i className="far fa-check-circle"></i>&nbsp;Your Investment Was Successful</a>

                                    <div className="ycp-TTFix01 no-ani ycpTTFix01">
                                        <div className="investText01">
                                            <img src={shield_Icon02} />  How to add JNTR to your wallet
                                <i className="help-circle no-ani">
                                                <i className="fas fa-question-circle" aria-hidden="true"></i>

                                                <div className="htjinwall-popup no-ani">
                                                    <ul className="list-Text">
                                                        <li><i>1.</i>Click to copy the smart contract address

                                                    <span className="input-Bx02 no-ani npCopyFix" onClick={() => this.props.copyText('#contractAddress02')} >
                                                                <input type="text" value="0xdd902f73e59e03e3ec1131dc9c57a5e49cb19cb8" id="contractAddress02" className="no-ani" />
                                                                <a href="javascript:void(0);" className="copy-Btn"><i className="fas fa-copy"></i></a>
                                                            </span></li>
                                                        <li><i>2.</i>Paste the address in the "Token Contract Address" field in the "Custom Token" section of your wallet

                                                    </li>
                                                        <li><i>3.</i> Click "next then "add token" to confirm  </li>
                                                    </ul>
                                                </div>
                                            </i>
                                        </div>
                                        <a href={this.state.txHash} target="_blank" className="pl_Link statusLink01" style={{ color: "#fff", display: "inline-block" }}>
                                            <i className="fab fa-ethereum"></i> Check transaction status
                                        </a>
                                    </div>
                                    <div className="timer-Box">
                                        <p>Next Auction Start In</p>
                                        <div id="timer">
                                            <div className="hours"><span>0</span><span>0</span></div>
                                            <div className="minutes"><span>0</span><span>0</span></div>
                                            <div className="seconds"><span>0</span><span>0</span></div>
                                        </div>
                                    </div>
                                </div>
                                :
                                < div >
                                    <a href="javascript:void(0)" onClick={() => this.props.openPopup(".liquidity-Popup")} className="Cnow-btn ani-1 Wallet-btn np-BtnFix01" id="addContribution02">Buy More JNTR From Secondary Market</a>

                                    <div className="ycp-TTFix01 no-ani ycpTTFix01">
                                        <div className="investText01">
                                            <img src={shield_Icon02} />  How to add JNTR to your wallet
                                <i className="help-circle no-ani">
                                                <i className="fas fa-question-circle" aria-hidden="true"></i>

                                                <div className="htjinwall-popup no-ani">
                                                    <ul className="list-Text">
                                                        <li><i>1.</i>Click to copy the smart contract address

                                                    <span className="input-Bx02 no-ani npCopyFix" onClick={() => this.props.copyText('#contractAddress02')} >
                                                                <input type="text" value="0xdd902f73e59e03e3ec1131dc9c57a5e49cb19cb8" id="contractAddress02" className="no-ani" />
                                                                <a href="javascript:void(0);" className="copy-Btn"><i className="fas fa-copy"></i></a>
                                                            </span></li>
                                                        <li><i>2.</i>Paste the address in the "Token Contract Address" field in the "Custom Token" section of your wallet

                                                    </li>
                                                        <li><i>3.</i> Click "next then "add token" to confirm  </li>
                                                    </ul>
                                                </div>
                                            </i>
                                        </div>
                                    </div>
                                    <div className="timer-Box">
                                        <p>Next Auction Start In</p>
                                        <div id="timer">
                                            <div className="hours"><span>0</span><span>0</span></div>
                                            <div className="minutes"><span>0</span><span>0</span></div>
                                            <div className="seconds"><span>0</span><span>0</span></div>
                                        </div>
                                    </div>
                                </div>
                            : this.state.txSuccessButton ?
                                < div >
                                    <a href="javascript:void(0)" className="addCotr-BTN ani-1" onClick={() => { this.contribute() }}><i className="far fa-check-circle"></i>&nbsp;Your Investment Was Successful, Invest More</a>

                                    <div className="ycp-TTFix01 no-ani ycpTTFix01">
                                        <div className="investText01">
                                            <img src={shield_Icon02} />  How to add JNTR to your wallet
                                <i className="help-circle no-ani">
                                                <i className="fas fa-question-circle" aria-hidden="true"></i>

                                                <div className="htjinwall-popup no-ani">
                                                    <ul className="list-Text">
                                                        <li><i>1.</i>Click to copy the smart contract address

                                                    <span className="input-Bx02 no-ani npCopyFix" onClick={() => this.props.copyText('#contractAddress02')} >
                                                                <input type="text" value="0xdd902f73e59e03e3ec1131dc9c57a5e49cb19cb8" id="contractAddress02" className="no-ani" />
                                                                <a href="javascript:void(0);" className="copy-Btn"><i className="fas fa-copy"></i></a>
                                                            </span></li>
                                                        <li><i>2.</i>Paste the address in the "Token Contract Address" field in the "Custom Token" section of your wallet

                                                    </li>
                                                        <li><i>3.</i> Click "next then "add token" to confirm  </li>
                                                    </ul>
                                                </div>
                                            </i>
                                        </div>
                                        <a href={this.state.txHash} target="_blank" className="pl_Link statusLink01" style={{ color: "#fff", display: "inline-block" }}>
                                            <i className="fab fa-ethereum"></i> Check transaction status
                                        </a>
                                    </div>
                                    <div className="timer-Box">
                                        <p>Next Auction Start In</p>
                                        <div id="timer">
                                            <div className="hours"><span>0</span><span>0</span></div>
                                            <div className="minutes"><span>0</span><span>0</span></div>
                                            <div className="seconds"><span>0</span><span>0</span></div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <a href="javascript:void(0)" className="addCotr-BTN ani-1 popUpBtnDis" onClick={() => { this.contribute() }}>Invest Now</a>
                                    <div className="investText01" >
                                        <span className="pl_Link02" onClick={() => this.props.openPopup('.tokens-Popup04')}>
                                            <img src={shield_Icon02} /> 90% of your investment will be automatically protected with downside protection
                                        <i className="help-circle" >
                                                <i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="" aria-hidden="true">
                                                </i>
                                            </i>
                                        </span>
                                    </div>
                                    <div className="timer-Box">
                                        <p>Current Auction Ends In</p>
                                        <div id="timer">
                                            <div className="hours"><span>0</span><span>0</span></div>
                                            <div className="minutes"><span>0</span><span>0</span></div>
                                            <div className="seconds"><span>0</span><span>0</span></div>
                                        </div>
                                    </div>
                                </div>
                    }

                </div>

            </div >


        )



    }





}

export default InvestMent;
