import React, { PureComponent } from "react";
import wowjs from 'wowjs';
import moment from 'moment';
import DECIMALS from '../../decimalConstant';
import { PrePath } from '../../constant'

import *  as AuctionActions from "../../actions/AuctionActions";
import AuctionStores from '../../stores/AuctionStores';
import metaMaskStore from '../../components/metaMask';
import * as notification from '../../components/notification';
 

import '../../assets/jntr_note/css/boilerplate.css';
import '../../assets/jntr_note/css/protip.min02.css';
import '../../assets/jntr_note/css/animate.css';
import '../../assets/jntr_note/css/jointer-style.css';
import '../../assets/jntr_note/css/jointer-responsive.css';
import GlobalGraph from "./components/globalGraph";
import JNTRBaseLineData from "./components/jntrBaseLineData";
import Redemption from "./components/redemption";
import Footer from "./components/footer";
import Header from "./components/header";
import JNTRValueInfo from "./components/jntrValueInfo";


const $ = window.$;
const Window = window;
const jQuery = window.jQuery;
const NERWORK_ID = 3;


export default class JNTRNote extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            currencyPrice: {},
            web3Provider: {
                web3: null,
                metaMaskInstalled: false,
                isLogin: false,
                netWorkId: 0,
                accounts: []
            },
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
        AuctionStores.on("FETCH_AUCTION_DETAILS", this.fetchedAuctionDetails.bind(this));
        AuctionStores.on("FETCH_CURRENCIES_PRICES", this.fetchedCurrenciesPrices.bind(this));
    }

    componentWillUnmount() {
        AuctionStores.removeListener("FETCH_CURRENCIES_PRICES", this.fetchedCurrenciesPrices.bind(this));
        AuctionStores.removeListener("FETCH_AUCTION_DETAILS", this.fetchedAuctionDetails.bind(this));
        metaMaskStore.removeListener("META_MASK_CONNECTED", this.metaMaskConnected.bind(this))
        metaMaskStore.removeListener("META_MASK_ADDRESS_CHANGED", this.metaAddressChange.bind(this))
        metaMaskStore.removeListener("META_MASK_NETWORK_CHANGED", this.metaNetwrokChange.bind(this))
    }

    componentDidMount() {
        metaMaskStore.checkWeb3(false);
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

    metaNetwrokChange() {
        this.setState({ web3Provider: metaMaskStore.getWeb3() }, () => {
            if (this.state.web3Provider.netWorkId !== NERWORK_ID) {
                notification.errorMsg("We are running on Ropsten please select Ropsten");
                this.setState({ auctionStop: true })
            }
        });
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
        var percentage = ((auctionDetails['todayContribution'] / auctionDetails['maxContributionAllowed']) * 170);
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
            console.log("AuctionDetails after set : ", this.state.auctionDetails)
            this.forceUpdate();
        })

    }

    fetchedCurrenciesPrices() {
        this.setState({ currencyPrice: AuctionStores.getFetchedCurrenciesPrice() }, () => {
            this.calculateFund();
        });
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

    render() {

        // const { web3Provider } = this.state;

        return (
            <main id="main" className="jntr_Page">

                <div className="dwnPro-shild npShowMD ani-1"><a href="javascript:void(0);" className="ani-1 faux-Link popup04"></a></div>
                <div className="dwnPro-shild npShowSM ani-1"><a href="javascript:void(0);" className="popup04"><span>90% Downside Protection <strong>UNLOCK YOUR TOKENS</strong></span></a></div>

                {/* <!--======================= HEADER START =====================--> */}
                <Header></Header>
                {/* <!--======================= HEADER END =====================--> */}
                <div className="main">
                    {/* <!--======================= TOKEN SALE START =====================-->  */}
                    <div className="tokensale-Block hasShield">
                        <div className="container-Full">
                            <div className="tokensale-Wrap">
                                <GlobalGraph></GlobalGraph>
                                <JNTRBaseLineData
                                    todayCon={this.state.auctionDetails.todayContribution}
                                    auctionDetails={this.state.auctionDetails}
                                ></JNTRBaseLineData>
                            </div>
                        </div>
                    </div>
                    {/* <!--======================= TOKEN SALE END =====================-->   */}
                    {/* <!--======================= TOKEN BLOCK START =====================-->   */}
                    <JNTRValueInfo></JNTRValueInfo>
                    {/* <!--======================= TOKEN BLOCK END =====================-->           */}
                    {/* <!--======================= REDEEM START =====================-->  */}
                    <Redemption
                        etherPrice={this.state.etherPrice}
                        totalBalance={this.state.totalBalance}
                        etherBalance={this.state.etherBalance}
                        currencyPrice={this.state.currencyPrice}
                        web3Provider={this.state.web3Provider}
                        auctionDetails={this.state.auctionDetails}
                    ></Redemption>
                    {/* <!--======================= FOOTER START =====================--> */}
                    <Footer></Footer>
                    {/* <!--======================= FOOTER END =====================--> */}
                    {/* <!-- izi modal content  --> */}
                    <div id="privacy" style={{ display: "none" }} data-izimodal-title="Terms of Use">
                        <div className="privacyCotainer">
                            Coming Soon
    </div>
                    </div>
                    <div id="terms" style={{ display: "none" }} data-izimodal-title="Terms of Use">
                        <div className="privacyCotainer">
                            Coming Soon
    </div>
                    </div>
                    <div id="cockies" style={{ display: "none" }} data-izimodal-title="Terms of Use">
                        <div className="privacyCotainer">
                            <h2>EDGE196, LLC<br />COOKIE POLICY<br />Last Updated: January 1, 2020</h2>
                            <p>This cookie policy (“Policy”) describes how EDGE196, LLC, a Delaware Limited Liability Company (together with its US Fund, Cayman Fund, Master Feeder and other affiliates, (the “Company”) uses technologies known as cookies, pixels, beacons, device information and local storage to deliver and understand your use of Company Services, including insights into member behavior, so we can improve our communications, products and services. We also use these technologies for security purposes and measurement. Third parties (e.g. developers) that you interact with as you use the Service may also use these technologies for a variety of purposes. We aim to be transparent about how these technologies are useful to you, others and us. Because cookies are used to provide you with the Service, disabling them may prevent you from using the Service.</p>
                            <p>Like most similar websites, the website located at www.edge196.com (the “Site”) uses cookies. By using the Site and agreeing to this policy, you consent to our use of cookies in accordance with the terms of this policy. All collection and processing of personal information is done in accordance with our Privacy Policy.</p>
                            <h2>Cookies</h2>
                            <p>Cookies are small files that are placed on your browser or device by the website or app you’re using. Pixel tags (also called clear GIFs, web beacons, or pixels) are small blocks of code on a webpage or app that allow us to do things like read and place cookies and transmit information to us or our partners. The resulting connection can include information such as a device’s IP address, the time a person viewed the pixel, an identifier associated with the browser or device and the type of browser being used.</p>
                            <p>Cookies may be either “persistent” cookies or “session” cookies. A persistent cookie consists of a text file sent that allows a website or app to store and retrieve data on a person’s computer, mobile phone or other devices. Some examples include device or HTML5 local storage and caching. A session cookie, on the other hand, will expire at the end of the user session, when the web browser is closed.</p>
                            <p>We may place or use these technologies when you interact with our Services, whether or not you are logged in. For example, when you visit our website(s) or use our applications, we may place or read cookies or receive information from your devices. We may also place cookies through a pixel on a partner’s site or through developer’s applications.</p>
                            <h2>Why we use Cookies</h2>
                            <p>We use Cookies for a variety of reasons. We use them to improve our Service, to make the ads you see more relevant to you, to count how many visitors we receive to a page, to help you sign up for our services, to protect your data, or to remember your advertising settings.</p>
                            <p>While specific names of the cookies and similar technologies that we use may change from time to time as we improve and update our Service, they fall into the below categories of use:</p>
                            <h2>Authentication</h2>
                            <p>These technologies tell us when you are logged in so we can show you your dashboard, cards, transactions and other information about your account. They also give us information about your use of the Service that we use for a variety of reasons, including making your member experience better.</p>
                            <h2>Security</h2>
                            <p>These technologies help us detect potential or real abuse, Account compromises, multiple logins, and other activity. They help us determine if the browser you’re using is new and give us information about active sessions related to your account. These technologies can also help us detect abuse and violations of terms and policies that are in place to protect us and our members, for example, attempting to determine activity is automated or human - initiated.
</p>
                            <h2>Features</h2>
                            <p>These technologies can help make your use of the Service smoother and easier by remembering the information you provided and allowing us to tailor your experience. For example, we may be able to store certain preferences or show you relevant information about your value exchanges or otherwise learn when you have interacted with something on the Service.
Advertising</p>
                            <p>These technologies are used to help us display advertisements on other platforms or on our own that may be relevant to you.</p>
                            <h2>Analytics</h2>
                            <p>We may also use the technologies for general research and to understand how members are using the Service and / or third - party applications.
</p>
                            <h2>Cookie Consent</h2>
                            <p>We use cookies to store your preferences in relation to the use of cookies more generally. If you delete this cookie, your preferences will not be remembered by the site.</p>
                            <h2>Use of Cookies on Mobile Devices</h2>
                            <p>Many mobile devices contain browsers, not unlike browsers for computers. When applicable, we will use cookies in the same way we do if you are using the Service via your computer. If you consume the Service on devices that use local storage, Software Development Kits (SDKs) or Advanced Programming Interfaces (APIs), we will use these technologies to accomplish the same purposes.</p>
                            <p>We will use information about your device in ways consistent with the above and to improve the Service. We will collect and use the information on transactions including payment information any applicable account, credit or debit card number and other card information, and other account and authentication information relating to any transactions.</p>
                            <p>As on the web, we also may use these technologies to store an identifier or other information on your device. We describe how we use these technologies and the information we received through their use above.</p>
                            <h2>Reading Cookies</h2>
                            <p>Web browsers send any cookies for a particular web domain to the website each time a device with those cookies accesses content served from that domain. This means that any EDGE196.com cookie will be sent to us when any page is accessed at EDGE196.com by that device. It also means that these cookies are sent to us when someone accesses a third-party website or application that integrates or uses our Service.</p>
                            <p>We may work with partners so that we can place or read cookies on your browsers or devices when you visit third-party services. This allows us to do things like read and reference cookies from more than one device or browser that you use, on and off of our Service, so we can provide you with consistent service across all of your devices and improve and understand your experience.</p>
                            <h2>Third Party Cookies</h2>
                            <p>We sometimes use third parties in connection with the Service, including analytics providers, advertising networks, and developers of applications that you can access through our platform. They may use a pixel to collect information about your device so that they or we can identify you. If you authorize an application on our platform, their developers may also use cookies, pixels or similar technologies (like local storage or information from your device), to help provide you with relevant services. For example, a developer or platform partner may use cookies, software developer kits (SDKs) or similar technologies to customize your experience while you’re using their app. Developers or our partners also may use these technologies to help share information with us, like how you use their website or application.</p>
                            <p>Those developing on our Platform may collect information when you view or use them, including information about you and your device or browser. They may do this using cookies or similar technologies. We require developers to be transparent about what they collect and how they use the information. To learn more about the information they collect or receive, please review their privacy policies.</p>
                            <h2>Control of Cookie Settings</h2>
                            <p>Your browser or device may offer settings related to these technologies, including how to delete or block them. For more information about whether these settings are available, what they do, and how they work, visit your browser or device's help material. If you disable certain settings, we may not be able to recognize or respond to browser or device information, and that may interfere with your use of the Service or certain features of the Service. </p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}