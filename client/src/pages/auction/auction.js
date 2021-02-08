
import React, { PureComponent } from "react";
import wowjs from 'wowjs';
import moment from 'moment';
import DECIMALS from '../../decimalConstant';

import metaMaskStore from '../../components/metaMask'
import odometer from 'odometer';



import *  as AuctionActions from '../../actions/AuctionActions';
import * as notification from '../../components/notification';
import AuctionStores from '../../stores/AuctionStores';
import { PrePath, WS_URL } from '../../constant'
import Header from './components/header';
import InvestMent from './components/investMent';
import AddFund from './components/addFund';
import Footer from './components/footer';
import SideBar from './components/sideBar';
import DownSideProtection from './components/downSideProtection';
import Liquadity from './components/liquadity';
import HowWork from './components/howWork';
import WalletPopup from "./components/walletPopup";
import AdvanceView from './components/advanceView';

import '../../assets/auction/css/boilerplate.css';
import '../../assets/auction/css/animate.css';
import '../../assets/auction/css/odometer-theme.css';
import '../../assets/auction/css/jquery.circliful.css';
import '../../assets/auction/css/jquery.mCustomScrollbar.css';
// import '../../assets/auction/css/protip.min02.css';
import '../../assets/auction/css/user-style.css';
import '../../assets/auction/css/user-responsive.css';
import '../../assets/auction/css/protip.min02.css';
import shield_Icon02 from '../../assets/auction/images/shield-Icon02.png';
import loader from '../../assets/auction/images/loader.svg';




import auctionStores from "../../stores/AuctionStores";
import drop_arrow from '../../assets/auction/images/drop-arrow.png';


const $ = window.$;
const Window = window;
const jQuery = window.jQuery;
const NERWORK_ID = 3;


export default class JointerAuction extends PureComponent {


    constructor(props) {
        super(props);
        this.openPopup = this.openPopup.bind(this);
        this.updateGroupDiscount = this.updateGroupDiscount.bind(this);
        this.copyText = this.copyText.bind(this);
        this.reconnectWebSocket = this.reconnectWebSocket.bind(this);
        this.state = {
            ws: null,
            wserr: 0,
            web3Provider: {
                web3: null,
                metaMaskInstalled: false,
                isLogin: false,
                netWorkId: 0,
                accounts: []
            },
            isNewAuctionStaring: false,
            auctionStop: false,
            totalBalance: 0,
            etherPrice: 0,
            etherBalance: 0,
            currencyPrice: {},
            userInvestMent: [],
            groupBonusMain: 0.00,
            isPopUpOpen: 0,
            userLastInvestmentData: null,
            auctionDetails: {
                baseLinePrice: 0.01,
                todaySupply: 0,
                todayContribution: 0,
                yesterdaySupply: 0,
                yesterdayContribution: 0,
                totalContribution: 0,
                EndDate: null,
                maxContributionAllowed: 0,
                percentageProgress: 0,
                currentJNTRMarketValue: 0,
                auctionSoldOut: false,
                sinceLaunch: 100,
                remainingAvailableInvestment: 0,

            }
        }
    }



    componentWillMount() {
        AuctionActions.fetchAuctionDetails()
        metaMaskStore.on("META_MASK_CONNECTED", this.metaMaskConnected.bind(this))
        metaMaskStore.on("META_MASK_ADDRESS_CHANGED", this.metaAddressChange.bind(this))
        metaMaskStore.on("META_MASK_NETWORK_CHANGED", this.metaNetwrokChange.bind(this))

        AuctionStores.on("FETCH_CURRENCIES_PRICES", this.fetchedCurrenciesPrices.bind(this));
        AuctionStores.on("FETCH_AUCTION_DETAILS", this.fetchedAuctionDetails.bind(this));
        // AuctionStores.on("CHECK_ADDRESS_INVESTMENT", this.addressInvestMentResponse.bind(this));
        // AuctionStores.on("CHECK_ADDRESS_REGISTERED", this.addressRegisteredResponse.bind(this));

    }

    componentWillUnmount() {
        // this.state.ws.onclose();
        AuctionStores.removeListener("FETCH_CURRENCIES_PRICES", this.fetchedCurrenciesPrices.bind(this));
        AuctionStores.removeListener("FETCH_AUCTION_DETAILS", this.fetchedAuctionDetails.bind(this));
        metaMaskStore.removeListener("META_MASK_CONNECTED", this.metaMaskConnected.bind(this))
        metaMaskStore.removeListener("META_MASK_ADDRESS_CHANGED", this.metaAddressChange.bind(this))
        metaMaskStore.removeListener("META_MASK_NETWORK_CHANGED", this.metaNetwrokChange.bind(this))
        // AuctionStores.removeListener("CHECK_ADDRESS_INVESTMENT", this.addressInvestMentResponse.bind(this));
        // AuctionStores.removeListener("CHECK_ADDRESS_REGISTERED", this.addressRegisteredResponse.bind(this));
    }

    updateGroupDiscount(newGroupDiscount) {
        this.setState({
            userLastInvestmentData: newGroupDiscount,
            //     // groupBonusMain: newGroupDiscount !== undefined ? newGroupDiscount.groupBonus !== 0 ? (100 - newGroupDiscount.groupBonus).toFixed(2) : "-∞.00" : "-∞.00"
            groupBonusMain: newGroupDiscount !== undefined ? ((newGroupDiscount.tokenCost.toFixed(4)) / (newGroupDiscount.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4) : newGroupDiscount.marketCost.toFixed(4))) !== 0 ? (((((newGroupDiscount.tokenCost.toFixed(4)) / (newGroupDiscount.isOpen ? Number(this.state.auctionDetails.currentJNTRMarketValue).toFixed(4) : newGroupDiscount.marketCost.toFixed(4))) - 1) * 100).toFixed(2)) : "-∞.00" : "-∞.00"
        })
    }


    componentDidMount() {
        this.loadDynamicScript(false, `${PrePath}/js/bs-collaps.js`, 'BsCollapse');
        metaMaskStore.checkWeb3(false);
        this.showWowAnimation();
        (function ($) {
            $(window).resize(function () {
                if ($(this).width() > 768) {
                    $(".liquidity-Popup, .tokens-Popup01, .tokens-Popup05, .wallet-Popup, .how-Popup, .whatIs-JNTR").mCustomScrollbar(); //apply scrollbar with your options 
                } else {
                    $(".liquidity-Popup, .tokens-Popup01, .tokens-Popup05, .wallet-Popup").mCustomScrollbar("destroy"); //destroy scrollbar 
                }
            }).trigger("resize");
        })(jQuery);

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 50) {
                $(".header").addClass("fixed");
            } else {
                $(".header").removeClass("fixed");
            }
        });

        this.loadDynamicScript(() => {
            $(".protipNp").each(function () {
                var title = $(this).attr("data-pt-title")
                var html = "<div class='mmProtip ani-1' >" + title + "</div>"
                $(this).append(html)
            })
            $.protip();
        }, `${PrePath}/js/protip.min.js`, 'protip');

        setTimeout(() => {
            new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
        }, 1500)

        setInterval(() => {
            this.updateEtherBalance();
        }, 5000)

        this.reconnectWebSocket();
    }

    reconnectWebSocket() {
        var ws = new WebSocket(WS_URL);
        this.setState({
            ws: ws
        }, () => {
            if (ws.readyState === 0 && this.state.wserr === 2) {
                var connectInterVal = setInterval(function () {
                    if (ws.readyState === 1 && this.state.wserr !== 1) {
                        notification.successMsg("Internet Connection Reestablished!");
                        clearInterval(connectInterVal);
                        AuctionActions.fetchAuctionDetails();
                        this.setState({
                            wserr: 0,
                            isNewAuctionStaring: false
                        })
                    } else if (ws.readyState === 3) {
                        clearInterval(connectInterVal);
                    }
                }.bind(this), 1000);
            }
            this.connectWebSocket();
        })
    }

    connectWebSocket = () => {

        var missed_heartbeats;
        var heartbeat_interval = null;
        var ws = this.state.ws;

        // websocket onopen event listener
        this.state.ws.onopen = () => {
            if (heartbeat_interval === null) {
                missed_heartbeats = 0;
                heartbeat_interval = setInterval(function () {
                    try {
                        missed_heartbeats++;
                        if (missed_heartbeats >= 3)
                            throw new Error("Too many missed heartbeats.");
                    } catch (e) {
                        clearInterval(heartbeat_interval);
                        heartbeat_interval = null;
                        // console.warn("Closing connection. Reason: " + e.message);
                        this.setState({
                            wserr: 2
                        }, () => {
                            ws.close();
                            notification.warningMsg("It's seems like your internet disconnected!")
                        })
                    }
                }.bind(this), 5000);
            }
        };

        // websocket onclose event listener
        this.state.ws.onclose = () => {
            setTimeout(() => {
                this.reconnectWebSocket();
            }, 20000)
        }

        // websocket onerror event listener
        this.state.ws.onerror = err => {
            notification.warningMsg("Still internet connection fail!");
            // console.error(
            //     "Socket encountered error: ",
            //     err.message,
            //     "Closing socket"
            // );
            this.state.ws.close();
        };

        this.state.ws.onmessage = evt => {
            let action = evt.data;
            console.log("event msg", action)
            if (action === "FUND_ADDED" || action === "AUCTION_ENDED") {
                AuctionActions.fetchAuctionDetails();

                if (action === "AUCTION_ENDED")
                    this.setState({ isNewAuctionStaring: false }, () => {
                        this.forceUpdate();
                    })

            } else if (action === "CURRENCY_UPDATE") {
                AuctionActions.fetchCurrenciesPrices();
            } else if (action === "heartbeat_msg") {
                missed_heartbeats = 0;
            }
        };
    };

    updateEtherBalance = async () => {
        let { web3Provider } = this.state;
        if (this.state.etherPrice !== 0 && this.state.web3Provider.isLogin) {
            web3Provider.web3.eth.getBalance(this.state.web3Provider.accounts[0], (err, accountBalance) => {
                if (this.state.etherBalance !== Number(web3Provider.web3.utils.fromWei(accountBalance))) {
                    let totalBalance = Number(web3Provider.web3.utils.fromWei(accountBalance)) * Number(this.state.etherPrice);
                    this.setState({
                        totalBalance: totalBalance,
                        etherBalance: Number(web3Provider.web3.utils.fromWei(accountBalance)),
                    });
                }
            })
        }
    }

    metaMaskConnected() {
        this.setState({ web3Provider: metaMaskStore.getWeb3() }, () => {
            AuctionActions.fetchCurrenciesPrices();
        });
    }

    metaAddressChange() {
        this.setState({ web3Provider: metaMaskStore.getWeb3() }, () => {
            AuctionActions.fetchCurrenciesPrices();
        });
    }

    fetchedCurrenciesPrices() {
        this.setState({ currencyPrice: auctionStores.getFetchedCurrenciesPrice() }, () => {
            this.calculateFund();
        });
    }

    metaNetwrokChange() {
        this.setState({ web3Provider: metaMaskStore.getWeb3() }, () => {
            if (this.state.web3Provider.netWorkId !== NERWORK_ID) {
                notification.errorMsg("We are running on Ropsten please select Ropsten");
                this.setState({ auctionStop: true })
            }
        });

    }

    refreshData() {
        // AuctionActions.fetchCurrenciesPrices();
        // AuctionActions.fetchAuctionDetails();
    }

    fetchedAuctionDetails() {
        var fetchedAuctionDetails = AuctionStores.getFetchedAuctionDetails();
        console.log("AuctionDetails Fetched : ", fetchedAuctionDetails);

        const { auctionDetails } = this.state;

        auctionDetails['todaySupply'] = (fetchedAuctionDetails._todaySupply / 10 ** 18);
        auctionDetails['todayContribution'] = Number(fetchedAuctionDetails._todayContribution) / 10 ** 6;
        auctionDetails['yesterdaySupply'] = Number(fetchedAuctionDetails._yesterdaySupply) / 10 ** 18;
        auctionDetails['yesterdayContribution'] = Number(fetchedAuctionDetails._yesterdayContribution) / 10 ** 6;
        auctionDetails['maxContributionAllowed'] = (Number(fetchedAuctionDetails._maxContributionAllowed) / 10 ** 6);
        auctionDetails['totalContribution'] = Number(fetchedAuctionDetails._totalContribution) / 10 ** 6;
        auctionDetails['remainingAvailableInvestment'] = (auctionDetails['maxContributionAllowed'] - auctionDetails['todayContribution']) > 0.0001 ? (auctionDetails['maxContributionAllowed'] - auctionDetails['todayContribution']) : 0;
        auctionDetails['EndDate'] = fetchedAuctionDetails.EndDate;
        var percentage = ((auctionDetails['todayContribution'] / auctionDetails['maxContributionAllowed']) * 150);
        auctionDetails['percentageProgress'] = percentage.toFixed(2);
        auctionDetails['currentJNTRMarketValue'] = fetchedAuctionDetails.currentMarketPrice;
        auctionDetails['sinceLaunch'] = auctionDetails['currentJNTRMarketValue'] / this.state.auctionDetails.baseLinePrice.toFixed(2);
        auctionDetails['auctionSoldOut'] = Number(auctionDetails['remainingAvailableInvestment'].toFixed(2)) === 0 ? true : false;
        // auctionDetails['todaySupply'] = auctionDetails['percentageProgress'] > 100 ? auctionDetails['percentageProgress'] * auctionDetails['todaySupply'] / 100 : auctionDetails['todaySupply'];

        auctionDetails['todaySupply'] = auctionDetails['todayContribution'] > auctionDetails['yesterdayContribution'] ? ((auctionDetails['todayContribution'] / auctionDetails['yesterdayContribution']) * auctionDetails['todaySupply'] * 2) : auctionDetails['todaySupply']

        console.log("remainingAvailableInvestment", auctionDetails['remainingAvailableInvestment'])
        console.log("AuctionDetails change : ", auctionDetails)

        let tokenCost = (auctionDetails['todayContribution'] / auctionDetails['todaySupply']).toFixed(4)
        let groupBonusMain = auctionDetails['todayContribution'] > 0 ? ((tokenCost / auctionDetails['currentJNTRMarketValue'] - 1) * 100).toFixed(2) : 0;

        this.setState({
            auctionDetails: auctionDetails,
            groupBonusMain: groupBonusMain,
            isNewAuctionStaring: fetchedAuctionDetails.isAuctionEnding
        }, () => {
            this.updateTotalContribution()
            console.log("AuctionDetails after set : ", this.state.auctionDetails)
            this.forceUpdate();
        })

        if (auctionDetails['auctionSoldOut']) {
            auctionDetails['percentageProgress'] = 150;
            setTimeout(() => {
                this.SoldOutCircul();
            }, 1000)

        }


    }

    updateTotalContribution() {

        function decimalCheck(value) {
            if (Math.floor(value) === value) return 0;
            return value.toString().split(".")[1].length || 0;
        }

        var el = document.querySelector('.counter');
        var od = new odometer({
            el: el,
            value: 0,
            auto: false,
            duration: 20000,
            // Any option (other than auto and selector) can be passed in here
            format: '(,ddd).ddd',
            // theme: 'train-station',
            // animation: 'count',
        });

        if (decimalCheck(this.state.auctionDetails.totalContribution) === 1) {
            od.update("1" + (this.state.auctionDetails.totalContribution) + "01")
        } else if (((((this.state.auctionDetails.totalContribution).toFixed(3).toString()).split("."))[1]).charAt("2") === "0") {
            od.update("1" + (Number(this.state.auctionDetails.totalContribution) + 0.001))
        } else {
            od.update("1" + (this.state.auctionDetails.totalContribution))
        }
        setInterval(() => {
            this.updateDateTimer();
        }, 1000)

    }

    calculateFund() {
        let { web3Provider, currencyPrice } = this.state;
        if (web3Provider.isLogin && currencyPrice != null) {
            let price = currencyPrice["0x0000000000000000000000000000000000000000"];
            let etherPrice = web3Provider.web3.utils.fromWei(price.toString(), "mwei");
            web3Provider.web3.eth.getBalance(this.state.web3Provider.accounts[0], (err, accountBalance) => {
                let totalBalance = Number(web3Provider.web3.utils.fromWei(accountBalance)) * Number(etherPrice);
                this.setState({
                    totalBalance: totalBalance,
                    etherBalance: Number(web3Provider.web3.utils.fromWei(accountBalance)),
                    etherPrice: Number(etherPrice)
                }, () => {
                    this.forceUpdate();
                });
            })
        }
    }

    showWowAnimation = async () => {
        var wow = new wowjs.WOW(
            {
                boxClass: 'wow',      // default
                animateClass: 'animated', // default
                offset: 0,          // default
                mobile: true,       // default
                live: true        // default      
            }
        )
        wow.init();
    }

    loadDynamicScript(callback, src, idName) {
        const existingScript = document.getElementById('scriptId');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = src;
            script.id = idName;
            document.body.appendChild(script);

            script.onload = () => {
                if (callback) callback();
            };
        }

        if (existingScript && callback) callback();
    };

    connectMetamask(status) {
        metaMaskStore.connectMetamask(status);
        $('.wallet-Popup').fadeOut();
        $("html").removeClass("NP-ScrollFix01");
    }

    openPopup(popup) {
        if (popup === ".tokens-Popup02" || popup === ".wallet-Popup") {
            if (this.state.web3Provider.isLogin) {
                this.setState({
                    isPopUpOpen: this.state.isPopUpOpen + 1
                }, () => {
                    $(".tokens-Popup02").fadeIn();
                    this.disableScroll(".tokens-Popup02");
                })
            } else {
                $(".wallet-Popup").fadeIn();
                this.disableScroll(".wallet-Popup");
            }
        } else {
            $(popup).fadeIn();
            this.disableScroll(popup);
        }
    }

    disableScroll(popup) {
        $(popup).bind('mousewheel DOMMouseScroll', function (e) {
            var scrollTo = null;

            if (e.type == 'mousewheel') {
                scrollTo = (e.originalEvent.wheelDelta * -1);
            }
            else if (e.type == 'DOMMouseScroll') {
                scrollTo = 40 * e.originalEvent.detail;
            }

            if (scrollTo) {
                e.preventDefault();
                $(this).scrollTop(scrollTo + $(this).scrollTop());
            }
        });
    }

    closePopUp(popup) {
        $(popup).fadeOut();
    };

    updateDateTimer = async () => {
        var input = "25 Jun 2020 00:00:00",
            m, endTime = moment.utc(this.state.auctionDetails.EndDate).local().format();
        endTime = Date.parse(endTime) / 1e3;
        var now = new Date,
            timeLeft = endTime - (now = Date.parse(now) / 1e3),
            days = Math.floor(timeLeft / 86400),
            hours = Math.floor((timeLeft - 86400 * days) / 3600),
            minutes = Math.floor((timeLeft - 86400 * days - 3600 * hours) / 60),
            seconds = Math.floor(timeLeft - 86400 * days - 3600 * hours - 60 * minutes);
        if (timeLeft < 0) {
            hours = "00";
            minutes = "00";
            seconds = "00";
        }

        if (timeLeft === 0) {
            this.setState({ isNewAuctionStaring: true }, () => {
                this.forceUpdate();
            })
        }

        $(".hours1").html((hours).toString().length === 1 ? ("0" + hours) : (hours));
        $(".minutes1").html((minutes).toString().length === 1 ? ("0" + minutes) : (minutes));
        $(".seconds1").html((seconds).toString().length === 1 ? ("0" + seconds) : (seconds));

        if (hours = hours < "10" ? "<span>0</span><span>" + hours + "</span>" : "<span>" + (hours = hours.toString())[0] + "</span><span>" + hours[1] + "</span>", minutes = minutes < "10" ? "<span>0</span><span>" + minutes + "</span>" : "<span>" + (minutes = minutes.toString())[0] + "</span><span>" + minutes[1] + "</span>", seconds = seconds < "10" ? "<span>0</span><span>" + seconds + "</span>" : "<span>" + (seconds = seconds.toString())[0] + "</span><span>" + seconds[1] + "</span>", Number(days) < 0 && (days = "<span>0</span><span>0</span>", hours = "<span>0</span><span>0</span>", minutes = "<span>0</span><span>0</span>", seconds = "<span>0</span><span>0</span>"), 1 == (days = days.toString()).length) days = "<span>0</span><span>" + days + "</span>";
        else {
            let tmpDays = days;
            days = "";
            if (tmpDays > 0) {
                for (let x = 0; x < tmpDays.length; x++) days += "<span>" + tmpDays[x] + "</span>"
            } else {
                days = "<span>0</span><span>0</span>";
                hours = "<span>0</span><span>0</span>";
                minutes = "<span>0</span><span>0</span>";
                seconds = "<span>0</span><span>0</span>";
            }

        }
        $(".days").html(days); $(".hours").html(hours); $(".minutes").html(minutes); $(".seconds").html(seconds);
        this.updateTokenAllotTimer();
    }

    updateTokenAllotTimer = async () => {
        var input = "25 Jun 2020 00:00:00",
            m, endTime = moment.utc(this.state.auctionDetails.EndDate).add(10, 'minutes').local().format();
        endTime = Date.parse(endTime) / 1e3;
        var now = new Date,
            timeLeft = endTime - (now = Date.parse(now) / 1e3),
            days = Math.floor(timeLeft / 86400),
            hours = Math.floor((timeLeft - 86400 * days) / 3600),
            minutes = Math.floor((timeLeft - 86400 * days - 3600 * hours) / 60),
            seconds = Math.floor(timeLeft - 86400 * days - 3600 * hours - 60 * minutes);
        if (timeLeft < 0) {
            hours = "00";
            minutes = "00";
            seconds = "00";
        }

        if (timeLeft === 0) {
            this.setState({ isNewAuctionStaring: true }, () => {
                this.forceUpdate();
            })
        }

        $(".hoursTokenAllot").html((hours).toString().length === 1 ? ("0" + hours) : (hours));
        $(".minutesTokenAllot").html((minutes).toString().length === 1 ? ("0" + minutes) : (minutes));
        $(".secondsTokenAllot").html((seconds).toString().length === 1 ? ("0" + seconds) : (seconds));

        // if (hours = hours < "10" ? "<span>0</span><span>" + hours + "</span>" : "<span>" + (hours = hours.toString())[0] + "</span><span>" + hours[1] + "</span>", minutes = minutes < "10" ? "<span>0</span><span>" + minutes + "</span>" : "<span>" + (minutes = minutes.toString())[0] + "</span><span>" + minutes[1] + "</span>", seconds = seconds < "10" ? "<span>0</span><span>" + seconds + "</span>" : "<span>" + (seconds = seconds.toString())[0] + "</span><span>" + seconds[1] + "</span>", Number(days) < 0 && (days = "<span>0</span><span>0</span>", hours = "<span>0</span><span>0</span>", minutes = "<span>0</span><span>0</span>", seconds = "<span>0</span><span>0</span>"), 1 == (days = days.toString()).length) days = "<span>0</span><span>" + days + "</span>";
        // else {
        //     let tmpDays = days;
        //     days = "";
        //     if (tmpDays > 0) {
        //         for (let x = 0; x < tmpDays.length; x++) days += "<span>" + tmpDays[x] + "</span>"
        //     } else {
        //         days = "<span>0</span><span>0</span>";
        //         hours = "<span>0</span><span>0</span>";
        //         minutes = "<span>0</span><span>0</span>";
        //         seconds = "<span>0</span><span>0</span>";
        //     }

        // }
        // $(".hoursTokenAllot").html(hours); $(".minutesTokenAllot").html(minutes); $(".secondsTokenAllot").html(seconds);
    }

    SoldOutCircul() {
        $("#test-circle02").empty();
        $("#test-circle02").circliful({
            animation: 1,
            animationStep: 5,
            foregroundBorderWidth: 6,
            backgroundBorderWidth: 6,
            backgroundColor: '#2d2d2d',
            foregroundColor: '#95c608',
            percent: 100,
            textSize: 28,
            textStyle: 'font-size: 12px; color:#fff;',
            textColor: '#fff',
        });
    }

    copyText(id) {
        $(id).select();
        document.execCommand("copy");
        notification.successMsg("Address copied successfully!")
    }

    render() {

        const { auctionDetails, totalBalance, web3Provider, isNewAuctionStaring } = this.state;
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

        function getROI(token, currentJNTRMarketValue, currentJNTRAuctionCost) {
            return (token * currentJNTRMarketValue) / (token * currentJNTRAuctionCost) * 100;
        }

        return (
            <main id="main" className="auctionMainPage">


                <div className="videoBG">
                    <div className="fsbg_container">
                        <div className="fsbg_sad"></div>

                        <div className="stars"></div>
                        <div className="twinkling"></div>
                        <div className="clouds"></div>
                    </div>
                </div>

                <div className="main">

                    <div className={`dwnPro-shild ani-1 ${web3Provider.isLogin ? '' : 'noSignin '}`} >
                        <a href="javascript:void(0)" onClick={() => this.openPopup('.tokens-Popup04')} className="ani-1 faux-Link popup04">
                            <span>90% Downside Protection <strong>UNLOCK YOUR TOKENS</strong></span>
                        </a>
                    </div>
                    <Header
                        web3Provider={this.state.web3Provider}
                        openPopup={this.openPopup}
                        totalBalance={totalBalance}
                        etherBalance={this.state.etherBalance}
                    ></Header>
                    <section className="mainBanner">
                        <div className="container-Grid">

                            <div className="error-Msg"><label><a href="https://medium.com/jointer/jointer-auction-testnet-simulation-1f1204fa1c30" style={{ color: "#f81e23" }} target="_blank">We are running on Ethereum Testnet (Ropsten)</a></label></div>


                            <div className="container-Grid  wow fadeInUp" data-wow-delay="0.5s">
                                <div className="jiTitle02">total investment to date</div>
                                <div className="counter">

                                </div>
                                <div className="jiPricemainbox   wow fadeInUp" data-wow-delay="0.8s">
                                    <div className="jipBox01">JNTR Baseline Price<span>${auctionDetails.baseLinePrice}</span></div>
                                    <div className="jipBox01">Current JNTR Market Value<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Help Text Here" aria-hidden="true"></i></i><span>${auctionDetails.currentJNTRMarketValue.toLocaleString(undefined, DECIMALS.MARKETVALUE)}</span></div>
                                    <div className="jipBox01">JNTR ROI Since Launch<span className="green-Color">+{(auctionDetails.sinceLaunch * 100).toLocaleString(undefined, DECIMALS.JNTRROISINCELAUNCH)}% <i>({Number(this.state.auctionDetails.sinceLaunch).toFixed(2)}x)</i></span></div>
                                </div>
                            </div>
                            <div className="container-Grid  wow fadeInUp" data-wow-delay="0.5s">
                                {this.state.auctionDetails.auctionSoldOut ?
                                    <div className="clearfix" onLoad={() => this.SoldOutCircul()}>
                                        <div className="jntrAucSoldMboxv2">
                                            <div className="jntrAucSoldbox01v2"> TODAY'S AUCTION SOLD OUT !</div>
                                            <div className="jntrAucSoldbox02v2"><div id="test-circle02"></div></div>
                                            <div className="jntrAucSoldbox03v2"> <a href="javascript:void(0);" className=" " onClick={() => this.openPopup(".liquidity-Popup")}>Buy More JNTR From Secondary Market <i className="fas fa-angle-double-right"></i></a> </div>
                                        </div>
                                        {isNewAuctionStaring ?
                                            <div className="timer-Box">
                                                <p> New Auction Starting Soon</p>
                                                <img src={loader} style={{ margin: '0 auto' }}></img>

                                            </div>
                                            :
                                            <div className="timer-Box">
                                                <p> Next Auction Start In </p>
                                                <div id="timer">
                                                    <div className="hours"><span>0</span><span>0</span></div>
                                                    <div className="minutes"><span>0</span><span>0</span></div>
                                                    <div className="seconds"><span>0</span><span>0</span></div>
                                                </div>
                                            </div>
                                        }
                                        {/* <div className="timer-Box">
                                            <p> {isNewAuctionStaring ? 'New Auction Starting' : 'Next Auction Start In'}</p>
                                            <div id="timer">
                                                <div className="hours"><span>0</span><span>0</span></div>
                                                <div className="minutes"><span>0</span><span>0</span></div>
                                                <div className="seconds"><span>0</span><span>0</span></div>
                                            </div>
                                        </div> */}
                                    </div>
                                    :
                                    <div>
                                        {this.state.web3Provider.isLogin ?
                                            <a href="javascript:void(0)" onClick={() => this.openPopup(".tokens-Popup02")} className="Cnow-btn ani-1 investNow" id="addContribution02">INVEST NOW</a>
                                            : <a href="javascript:void(0)" onClick={() => this.openPopup(".wallet-Popup")} className="Cnow-btn iyw-mainB ani-1 investNow" id="addContribution02">

                                                <div className="iyw-btn01">
                                                    <span><i className="fab fa-ethereum"></i></span> INTEGRATE YOUR WALLET</div> INVEST NOW</a>}

                                        <div className="investText01" >
                                            <span className="pl_Link02" onClick={() => this.openPopup('.tokens-Popup04')}>
                                                <img src={shield_Icon02} /> 90% of your investment will be automatically protected with downside protection
                                                <i className="help-circle" >
                                                    <i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="" aria-hidden="true">
                                                    </i>
                                                </i>
                                            </span>
                                        </div>

                                        {isNewAuctionStaring ?
                                            <div className="timer-Box">
                                                <p> New Auction Starting Soon</p>
                                                <img src={loader} style={{ margin: '0 auto' }}></img>

                                            </div>
                                            :
                                            <div className="timer-Box">
                                                <p> Current Auction Ends In </p>
                                                <div id="timer">
                                                    <div className="hours"><span>0</span><span>0</span></div>
                                                    <div className="minutes"><span>0</span><span>0</span></div>
                                                    <div className="seconds"><span>0</span><span>0</span></div>
                                                </div>
                                            </div>
                                        }

                                        {/* <div className="timer-Box">
                                            <p> {isNewAuctionStaring ? 'New Auction Starting' : 'Next Auction Start In'}</p>
                                            <div id="timer">
                                                <div className="hours"><span>0</span><span>0</span></div>
                                                <div className="minutes"><span>0</span><span>0</span></div>
                                                <div className="seconds"><span>0</span><span>0</span></div>
                                            </div>
                                        </div> */}
                                    </div>
                                }
                            </div>



                        </div>
                    </section>

                    <div className="container-Grid">
                        <div className="jipgb-title01  wow fadeInLeft" data-wow-delay="0.2s">Reach the Daily Goal to Earn a Group Bonus<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Allows all investors to benefit by increasing released supply" aria-hidden="true"></i></i></div>
                        <div className="progress-Box wow fadeInLeft" data-wow-delay="0.5s">
                            <div className="progress-Bg">
                                <div className="jointer-progress">  <span>  &nbsp; {/*Today goal is ${auctionDetails.yesterdayContribution.toLocaleString(undefined, DECIMALS.CURRECNY_PRICE)} */} </span>
                                    <div className="text-Wrap">
                                        <div className="text-Title"> 0 % </div>
                                        <div className="text-Title orange-Color"> Today’s goal is ${auctionDetails.yesterdayContribution.toLocaleString(undefined, DECIMALS.CURRECNY_PRICE)}</div>
                                        <div className="text-Title"></div>
                                    </div>

                                    <div className="jp-ornbox ani-1" style={{ width: `${auctionDetails.percentageProgress > 100 ? 100 : (auctionDetails.percentageProgress)}%`, borderRadius: `${auctionDetails.percentageProgress > 100 ? '25px 0px 0px 25px' : '0px 25px 25px 0px !important'}`, border: `${auctionDetails.percentageProgress > 0 ? '1px solid #ffdd22' : 'none'}` }}>
                                        <div className="perc-Box" style={{ display: `${auctionDetails.percentageProgress > 100 ? 'none' : 'flex'}` }}>{(auctionDetails.percentageProgress * 100 / 150).toFixed(2)}% <span>({auctionDetails.todaySupply.toLocaleString(undefined, DECIMALS.TOKENSUPPLY)} JNTR)</span> <span className="icon-Box">
                                            <img src={drop_arrow} alt="" /></span> </div>
                                    </div>

                                </div>
                                <div className="jointer-bonus-progress">
                                    <div className="joboProgressTxt">
                                        {
                                            ((this.state.auctionDetails.yesterdayContribution + 1) - this.state.auctionDetails.todayContribution) > 0 ?

                                                <span>
                                                    If you wish to boost the Group Discount above 50%, invest at least <span>${((this.state.auctionDetails.yesterdayContribution + 1) - this.state.auctionDetails.todayContribution).toLocaleString(undefined, DECIMALS.MARKETVALUE)}</span> </span>

                                                : null}
                                    </div>
                                    <div className="jbp-bar" style={{ width: `${auctionDetails.percentageProgress >= 150 ? '100' : auctionDetails.percentageProgress > 100 ? Number(auctionDetails.percentageProgress - 100) : 0}%` }}>
                                        <div className="perc-Box" style={{ display: `${auctionDetails.percentageProgress > 100 ? 'flex' : 'none'}` }}> {(auctionDetails.percentageProgress * 100 / 150).toFixed(2)}% <span>({auctionDetails.todaySupply.toLocaleString(undefined, DECIMALS.TOKENSUPPLY)} JNTR)</span> <span className="icon-Box">
                                            <img src={drop_arrow} alt="" /></span> </div>
                                    </div>
                                    <div className="text-Wrap">
                                        <div className="text-Title green-Color"> Group Bonus </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-Title">100% </div>
                        </div>
                    </div>

                    <div className="container-Grid">
                        <div className="ji-tokeninfoBox">
                            <div className="ji-tiSubbox01 wow zoomIn" data-wow-delay="0.1s">Today's JNTR Supply<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="If the Group Bonus is achieved, the Today's 
JNTR Supply can increase up to 150%" aria-hidden="true"></i></i>  <span> {auctionDetails.todaySupply.toLocaleString(undefined, DECIMALS.TOKENSUPPLY)} </span></div>

                            <div className="ji-tiSubbox01 wow zoomIn" data-wow-delay="0.3s">Today Total Investment<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="The 20.22% Group Discount reduce your JNTR cost from $1.47 to $1.176" aria-hidden="true"></i></i> <span>$  {auctionDetails.todayContribution.toLocaleString(undefined, DECIMALS.CURRECNY_PRICE)} </span></div>


                            <div className="ji-tiSubbox01 wow zoomIn" data-wow-delay="0.5s">Current JNTR Auction Cost  <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Live Auction USD cost per JNTR" aria-hidden="true"></i></i> <span>
                                ${auctionDetails.todayContribution !== 0 ? (auctionDetails.todayContribution / auctionDetails.todaySupply).toLocaleString(undefined, DECIMALS.TOKENSUPPLY) : 0}
                            </span></div>


                            <div className="ji-tiSubbox01 wow zoomIn" data-wow-delay="0.9s">
                                Group Discount<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="The 20.22% Group Discount reduce 
your JNTR cost from $1.47 to $1.176" aria-hidden="true"></i></i>
                                <span className="green-Color">
                                    {/* {((Number(Number(((Number(this.state.auctionDetails.todayContribution) / Number(this.state.auctionDetails.todaySupply)) - this.state.auctionDetails.currentJNTRMarketValue) / (Number(this.state.auctionDetails.todayContribution) / Number(this.state.auctionDetails.todaySupply)) * 100).toFixed(0))).toLocaleString() + '.00')}% */}
                                    {this.state.groupBonusMain}%
                                </span>
                            </div>

                            <div className="ji-tiSubbox01 wow zoomIn" data-wow-delay="0.7s">
                                Your Total Investment Today
                                <span className="white-text">
                                    ${
                                        this.state.userLastInvestmentData !== null && this.state.userLastInvestmentData !== undefined ?
                                            this.state.userLastInvestmentData.userInvest !== null ?
                                                Number(this.state.userLastInvestmentData.userInvest).toLocaleString(undefined, DECIMALS.TWODECIMALPLACE)
                                                : 0
                                            : 0
                                    }
                                </span>
                            </div>

                            <div className="ji-tiSubbox01 wow zoomIn" data-wow-delay="0.7s">JNTR | ROI You  Might Win Today<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top left" data-pt-title="The total is an estimate and the final total can vary before the end of the auction based on total group investment" aria-hidden="true"></i></i>
                                <span className="white-text npSmTextFix01">
                                    {
                                        this.state.userLastInvestmentData !== null && this.state.userLastInvestmentData !== undefined ?
                                            tokenGet(this.state.userLastInvestmentData.userInvestRatio, this.state.userLastInvestmentData.tokenGet) !== null
                                                ? Number(tokenGet(this.state.userLastInvestmentData.userInvestRatio, this.state.userLastInvestmentData.tokenGet)).toLocaleString(undefined, DECIMALS.TWODECIMALPLACE)
                                                : 0
                                            : 0
                                    }
                                    <i>
                                        (

                                            {
                                            this.state.userLastInvestmentData !== null && this.state.userLastInvestmentData !== undefined ?
                                                tokenGet(this.state.userLastInvestmentData.userInvestRatio, this.state.userLastInvestmentData.tokenGet) !== null
                                                    ? Number(getROI(tokenGet(this.state.userLastInvestmentData.userInvestRatio, this.state.userLastInvestmentData.tokenGet), auctionDetails.currentJNTRMarketValue, (auctionDetails.todayContribution !== 0 ? (auctionDetails.todayContribution / auctionDetails.todaySupply) : 0))).toLocaleString(undefined, DECIMALS.FOURDECIMALPLACE)
                                                    : 0
                                                : 0
                                        }

                                        % ROI)
                                    </i>
                                </span>
                            </div>



                        </div>
                    </div>





                    <AdvanceView
                        web3Provider={this.state.web3Provider}
                        accounts={this.state.web3Provider.accounts[0]}
                        openPopup={this.openPopup}
                        todayCon={this.state.auctionDetails.todayContribution}
                        auctionDetails={this.state.auctionDetails}
                        closePopUp={this.closePopUp}
                        refreshData={this.refreshData}
                        auctionStop={this.state.auctionStop}
                        updateGroupDisc={this.updateGroupDiscount}
                        isNewAuctionStaring={this.state.isNewAuctionStaring}
                    ></AdvanceView>


                    <InvestMent
                        web3Provider={this.state.web3Provider}
                        accounts={this.state.web3Provider.accounts[0]}
                        etherPrice={this.state.etherPrice}
                        todayCon={this.state.auctionDetails.todayContribution}
                        auctionDetails={this.state.auctionDetails}
                        closePopUp={this.closePopUp}
                        openPopup={this.openPopup}
                        totalBalance={this.state.totalBalance}
                        etherBalance={this.state.etherBalance}
                        refreshData={this.refreshData}
                        auctionStop={this.state.auctionStop}
                        copyText={this.copyText}
                        isPopUpOpen={this.state.isPopUpOpen}
                    ></InvestMent>

                    <DownSideProtection
                        web3Provider={this.state.web3Provider}
                        accounts={this.state.web3Provider.accounts[0]}
                        todayCon={this.state.auctionDetails.todayContribution}
                        currentJNTRMarketValue={this.state.auctionDetails.currentJNTRMarketValue}
                        closePopUp={this.closePopUp}
                        refreshData={this.refreshData}
                        openPopup={this.openPopup}
                        auctionStop={this.state.auctionStop}
                    >

                    </DownSideProtection>
                    <AddFund closePopUp={this.closePopUp}></AddFund>
                    <Liquadity closePopUp={this.closePopUp}></Liquadity>
                    <HowWork closePopUp={this.closePopUp} isLogin={this.state.web3Provider.isLogin} openPopup={this.openPopup}></HowWork>
                    <WalletPopup connectMetamask={this.connectMetamask} closePopUp={this.closePopUp} openPopup={this.openPopup} web3Provider={this.state.web3Provider}></WalletPopup>
                    <Footer
                        openPopup={this.openPopup}
                    />
                    <SideBar
                        web3Provider={this.state.web3Provider}
                        openPopup={this.openPopup}
                        todayCon={this.state.auctionDetails.todayContribution}
                        auctionDetails={this.state.auctionDetails}
                        accounts={this.state.web3Provider.accounts[0]}
                        auctionStop={this.state.auctionStop}
                        copyText={this.copyText}
                    />
                </div>
            </main>
        )
    }

}