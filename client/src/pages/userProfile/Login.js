import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import SimpleReactValidator from 'simple-react-validator';

import * as AuctionActions from '../../actions/AuctionActions'
import AuctionStores from '../../stores/AuctionStores'
import * as notification from '../../helpers/notificationHelper'
import wowjs from 'wowjs'
const $ = window.$;
const jQuery = window.jQuery;

class Login extends Component {

    constructor() {
        super()
        this.state = {
            loading: true,
            redirectToHome: false,
            redirectToEmailVerification: false
        }
    }

    componentWillMount() {
        this.validator = new SimpleReactValidator();
        AuctionStores.on("USER_EMAIL_LOGIN", this.loginResponse.bind(this));
    }

    componentWillUnmount() {
        AuctionStores.removeListener("USER_EMAIL_LOGIN", this.loginResponse.bind(this));
    }

    componentDidMount = async () => {
        setTimeout(function () {
            this.setState({
                loading: false
            }, async () => {
                await this.initialScript();
            })
        }.bind(this), 1000);
    }

    initialScript = async () => {

        // Script Start
        $(document).ready(function () {
            // izi modal script

            $("#privacy, #terms, #cockies").iziModal({
                headerColor: '#110828',
                background: '#fff',
                width: 900,
                icon: 'icon-settings_system_daydream',
                overlayClose: true,
                fullscreen: false,
                openFullscreen: false,
                borderBottom: true,
            });
            // End of izi modal script    

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

            setTimeout(function () {
                new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
            }, 1000)
        })
        // Script End
    }

    loginResponse() {
        const res = AuctionStores.isUserLoggedIn();
        console.log("Login response : ", res);
        console.log(res)
        if (res === false) {
            notification.successMsg(notification.Msg.USER_LOGIN_NOT_REGISTERED)
            setTimeout(function () {
                this.setState({ redirectToEmailVerification: true })
            }.bind(this), 3000)
        } else if (res === true) {
            // notification.successMsg(notification.Msg.USER_LOGIN_SUCCESS)
            setTimeout(function () {
                this.setState({ redirectToHome: true })
            }.bind(this), 3000)
        }
    }

    loginUser() {
        const emailID = $('#emailIDLogin').val().trim();
        const walletAddress = window.ethereum.selectedAddress;
        if ($('#check01').is(":checked") && $('#check02').is(":checked") && (this.validator.check(emailID, 'required|email')) && walletAddress !== '' && walletAddress !== null && walletAddress !== undefined) {
            AuctionActions.userLogin(emailID, walletAddress);
        } else if (!(this.validator.check(emailID, 'required|email'))) {
            notification.warningMsg("Email is invalid")
        } else if (!($('#check01').is(":checked")) && !($('#check02').is(":checked"))) {
            notification.warningMsg("Please agree to the Jointer User Agreement, Privacy Policy, and Cookie Policy.")
            notification.warningMsg("Please agree to the Purchase Agreement")
        } else if (!($('#check01').is(":checked"))) {
            notification.warningMsg("Please agree to the Jointer User Agreement, Privacy Policy, and Cookie Policy.")
        } else if (!($('#check02').is(":checked"))) {
            notification.warningMsg("Please agree to the Purchase Agreement")
        }
    }

    render() {

        if (this.state.redirectToHome)
            return (<Redirect to="/profile" />)

        if (this.state.redirectToEmailVerification)
            return (<Redirect to="/email-verification" />)

        if (this.state.loading)
            return (<LoadingOverlay active={this.state.loading} spinner text='Loading...'></LoadingOverlay>)

        return (
            <div className="bodyBG01">
                <main id="main">
                    {/* ======================= HEADER START ===================== */}
                    <header className="header">
                        <div className="logo">
                            <Link to="/"><img src="images/logo.png" alt="" /></Link>
                        </div>
                        <nav className="rgdev green-btn clearfix">
                            <ul className="mobile-sub rgdev-list">
                                <li className="rgdev-item">
                                    <a className="ani-1 langBox" href="javascript:void(0);" data-toggle="n-collapse" data-target="#langBox" aria-expanded="false" aria-controls="langBox"><img src="images/eng-icon.png" alt="" /></a>
                                </li>
                            </ul>
                            <div id="langBox" className="autoClose n-collapse">
                                <div className="langBoxContainer clearfix">
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);" className="active">
                                            <div className="lanIconbox"><i className="lanicon01"></i></div> English </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon02"></i></div> 中文繁體 </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon03"></i></div> Tiếng Việt </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon04"></i></div> العربية </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon05"></i></div> Deutsch </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon06"></i></div> Pусский </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon07"></i></div> Español </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon08"></i></div> <span style={{ "unicodeBidi": "bidi-override" }} > תירבע</span> </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon09"></i></div> BAHASA INDONESIA </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon010"></i></div> Türkçe </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon011"></i></div> Português </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon012"></i></div> हिन्दी </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon013"></i></div> Français </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon014"></i></div> 한국어 </a>
                                    </div>
                                    <div className="lanbox01">
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon015"></i></div> 日本語 </a>
                                    </div>
                                    <div className="lanbox01 ani-1" >
                                        <a href="javascript:void(0);">
                                            <div className="lanIconbox"><i className="lanicon015 translateLanguage"></i></div>
                                            <div id="google_translate_element"></div></a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <div className="rgdev-item mobile-Item02">
                            <a className="ani-1 langBox" href="javascript:void(0);" data-toggle="n-collapse" data-target="#langBox" aria-expanded="false" aria-controls="langBox"><img src="images/eng-icon.png" alt="" /></a>
                        </div>
                    </header>
                    {/* ======================= HEADER END ===================== */}
                    {/* ======================= REGISTER START ===================== */}
                    <div className="user-Bg">
                        <div className="user-smallBlock wow fadeInUp" data-wow-delay="0.3s">
                            <div className="user-smallBox">
                                <div className="Title01">Login to Your Account</div>
                                <div className="input-Bx">
                                    <span className="icon-Box"><i className="fas fa-envelope"></i></span>
                                    <input type="email" id="emailIDLogin" placeholder="your@email.com" />
                                </div>
                                <a href="javascript:void(0)" className="btn btn-large ani-1" onClick={() => this.loginUser()}>Agree and Login</a>
                                <div className="check-Wrap">
                                    <div className="text-Wrap">
                                        <div className="md-checkbox">
                                            <input type="checkbox" id="check02" />
                                            <label htmlFor="check02">
                                                <p>I agree to the <a href="javascript:void(0);">Purchase Agreement</a></p>
                                            </label>

                                        </div>

                                    </div>
                                    <div className="text-Wrap">
                                        <div className="md-checkbox">
                                            <input type="checkbox" id="check01" />
                                            <label htmlFor="check01">
                                                <p>I agree to the Jointer <a href="javascript:void(0);">User Agreement</a>, <a href="javascript:void(0);">Privacy Policy</a>, and <a href="javascript:void(0);">Cookie Policy</a>.</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkbox-Wrap02">
                                <div style={{ marginTop: "10px", fontSize: "12px" }}>
                                    <Link to="/">
                                        <label htmlFor="check03">Go Back</label>
                                    </Link>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <Link to="/email-verification">
                                        <label htmlFor="check03">Forget Email</label>
                                    </Link>
                                </div>
                                <div className="md-checkbox">
                                    <input type="checkbox" id="check03" />
                                    <label htmlFor="check03">Stay Logged In</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ======================= REGISTER END ===================== */}

                    {/* ======================= FOOTER START ===================== */}
                    <footer className="footer">
                        <div className="footer-Block">
                            <div className="footer-left">
                                <div className="footer-logo"> <a href="javascript:void(0)" target="_blank"><img src="images/logo.png" alt="" /></a>
                                    <span className="f-Link">
                                        <a href="javascript:void(0);" className="ani-1">CONTACT US</a>
                                    </span> </div>
                                <p><span>© JOINTER 2016-2020 </span> <a href="javascript:void(0);" className="ani-1">Privacy Policy</a> |
            <a href="javascript:void(0);" className="ani-1">Term of Use</a> |
            <a href="javascript:void(0);" className="ani-1">Cookie Policy</a> </p>
                                <p>Jointer presents a safe and more profitable alternative to Commercial Real Estate syndication and investment. </p>
                            </div>
                        </div>
                    </footer>
                    {/* ======================= FOOTER END ===================== */}
                    {/* izi modal content   */}

                    <div id="privacy" style={{ "display": "none", "dataIziModalTitle": "Terms of Use" }}>
                        <div className="privacyCotainer">
                            Coming Soon
    </div>
                    </div>
                    <div id="terms" style={{ "display": "none", "dataIziModalTitle": "Terms of Use" }}>
                        <div className="privacyCotainer">
                            Coming Soon
    </div>
                    </div>
                    <div id="cockies" style={{ "display": "none", "dataIziModalTitle": "Terms of Use" }}>
                        <div className="privacyCotainer">

                            <h2>EDGE196, LLC<br />COOKIE POLICY<br />
                                Last Updated: January 1, 2020</h2>

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

                    {/* </div> */}
                </main>
            </div >
        )
    }
}

export default Login;