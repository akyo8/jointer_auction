import React, { PureComponent } from "react";
import { Redirect, Link } from "react-router-dom";
// import { getWeb3, checkWeb3 } from "../getWeb3";
import LoadingOverlay from 'react-loading-overlay'

import '../../assets/auction/css/email_verification_css/boilerplate.css';
import '../../assets/auction/css/email_verification_css/animate.css';
import '../../assets/auction/css/email_verification_css/protip.min02.css';
import '../../assets/auction/css/email_verification_css/user-style.css';
import '../../assets/auction/css/email_verification_css/user-responsive.css';

import * as AuctionActions from '../../actions/AuctionActions'
import AuctionStores from '../../stores/AuctionStores'

import * as ContractData from '../../ContractData';

import * as notification from '../../helpers/notificationHelper'

import wowjs from 'wowjs'

const $ = window.$;
const jQuery = window.jQuery;

class Profile extends PureComponent {

    constructor(props) {
        super(props);
        this.connectToMetamask = this.connectToMetamask.bind(this);

        this.state = {
            web3: null,
            accounts: null,
            contract: null,
            loading: true,
            redirectToLogin: false,
            redirectToEmailVerification: false,
            // userProfile: null,
            userProfile: {
                details: {
                    first_name: "ABCD",
                    last_name: "WXYZ",
                    middle_name: "GHIJ",
                    country: "US"
                },
                wallets: ["0x00000000000000000000000000000000000"],
                unapprovedWallets: ["0x00000000000000000000000000000000001"],
                email: "test@123.com",
                phone: "1231231230",
                kycId: "1234"
            }
        }
    }

    componentWillMount() {
        AuctionStores.on("USER_WALLET_WHITELIST_UPDATE", this.updateComponent.bind(this));
    }

    componentWillUnmount() {
        AuctionStores.removeListener("USER_WALLET_WHITELIST_UPDATE", this.updateComponent.bind(this));
    }

    componentDidMount = async () => {

        // await this.connectToMetamask();

        // await this.updateComponent();

        this.setState({
            loading: false
        }, async () => {
            await this.initialScript();
        })
    }

    updateComponent = async () => {
        const res = AuctionStores.isUserLoggedIn();
        if (res) {
            var userProfile = AuctionStores.getUserProfile()
            if (userProfile.kycStatus !== null && userProfile.kycStatus === "completed") {
                $('.kycStatus').removeClass("pending");
                setTimeout(function () {
                    this.setState({
                        userProfile: userProfile,
                        loading: false
                    }, async () => {
                        await this.initialScript();
                    })
                }.bind(this), 1000);
            } else {
                notification.successMsg("We will sent kyc verification link to your email and contact number")
                this.setState({
                    redirectToLogin: true
                })
            }
        } else {
            this.setState({
                redirectToLogin: true
            })
        }
    }

    connectToMetamask = async () => {
        // try {
        //     getWeb3(false, (response, error) => {
        //         const web3 = response;
        //         if (response !== null) {
        //             web3.eth.net.getId().then(async (resp) => {
        //                 this.setState({ networkId: resp })
        //                 const whiteListInstance = new web3.eth.Contract(ContractData.WhiteListAbi, ContractData.WhiteListAddress);
        //                 web3.eth.getAccounts().then((resp) => {
        //                     this.setState({
        //                         web3: web3,
        //                         accounts: resp,
        //                         whiteListInstance: whiteListInstance
        //                     }, async () => {

        //                     })
        //                 }).catch(() => { })
        //             })
        //         }
        //     })
        // } catch (error) {
        //     if (error.code === 4001) {
        //         notification.errorMsg(notification.Msg.USER_DENIED_ACCOUNT_AUTHORIZATION);
        //     }
        //     console.error(error);
        // }
    }

    initialScript = async () => {

        // Script Start
        var Country = [{ "name": "Israel", "dial_code": "+972", "code": "IL" }, { "name": "Afghanistan", "dial_code": "+93", "code": "AF" }, { "name": "Albania", "dial_code": "+355", "code": "AL" }, { "name": "Algeria", "dial_code": "+213", "code": "DZ" }, { "name": "AmericanSamoa", "dial_code": "+1 684", "code": "AS" }, { "name": "Andorra", "dial_code": "+376", "code": "AD" }, { "name": "Angola", "dial_code": "+244", "code": "AO" }, { "name": "Anguilla", "dial_code": "+1 264", "code": "AI" }, { "name": "Antigua and Barbuda", "dial_code": "+1268", "code": "AG" }, { "name": "Argentina", "dial_code": "+54", "code": "AR" }, { "name": "Armenia", "dial_code": "+374", "code": "AM" }, { "name": "Aruba", "dial_code": "+297", "code": "AW" }, { "name": "Australia", "dial_code": "+61", "code": "AU" }, { "name": "Austria", "dial_code": "+43", "code": "AT" }, { "name": "Azerbaijan", "dial_code": "+994", "code": "AZ" }, { "name": "Bahamas", "dial_code": "+1 242", "code": "BS" }, { "name": "Bahrain", "dial_code": "+973", "code": "BH" }, { "name": "Bangladesh", "dial_code": "+880", "code": "BD" }, { "name": "Barbados", "dial_code": "+1 246", "code": "BB" }, { "name": "Belarus", "dial_code": "+375", "code": "BY" }, { "name": "Belgium", "dial_code": "+32", "code": "BE" }, { "name": "Belize", "dial_code": "+501", "code": "BZ" }, { "name": "Benin", "dial_code": "+229", "code": "BJ" }, { "name": "Bermuda", "dial_code": "+1 441", "code": "BM" }, { "name": "Bhutan", "dial_code": "+975", "code": "BT" }, { "name": "Bosnia and Herzegovina", "dial_code": "+387", "code": "BA" }, { "name": "Botswana", "dial_code": "+267", "code": "BW" }, { "name": "Brazil", "dial_code": "+55", "code": "BR" }, { "name": "Bulgaria", "dial_code": "+359", "code": "BG" }, { "name": "Burkina Faso", "dial_code": "+226", "code": "BF" }, { "name": "Burundi", "dial_code": "+257", "code": "BI" }, { "name": "Cambodia", "dial_code": "+855", "code": "KH" }, { "name": "Cameroon", "dial_code": "+237", "code": "CM" }, { "name": "Canada", "dial_code": "+1", "code": "CA" }, { "name": "Cape Verde", "dial_code": "+238", "code": "CV" }, { "name": "Cayman Islands", "dial_code": "+ 345", "code": "KY" }, { "name": "Central African Republic", "dial_code": "+236", "code": "CF" }, { "name": "Chad", "dial_code": "+235", "code": "TD" }, { "name": "Chile", "dial_code": "+56", "code": "CL" }, { "name": "China", "dial_code": "+86", "code": "CN" }, { "name": "Colombia", "dial_code": "+57", "code": "CO" }, { "name": "Comoros", "dial_code": "+269", "code": "KM" }, { "name": "Congo", "dial_code": "+242", "code": "CG" }, { "name": "Cook Islands", "dial_code": "+682", "code": "CK" }, { "name": "Costa Rica", "dial_code": "+506", "code": "CR" }, { "name": "Croatia", "dial_code": "+385", "code": "HR" }, { "name": "Cuba", "dial_code": "+53", "code": "CU" }, { "name": "Cyprus", "dial_code": "+537", "code": "CY" }, { "name": "Czech Republic", "dial_code": "+420", "code": "CZ" }, { "name": "Denmark", "dial_code": "+45", "code": "DK" }, { "name": "Djibouti", "dial_code": "+253", "code": "DJ" }, { "name": "Dominica", "dial_code": "+1 767", "code": "DM" }, { "name": "Dominican Republic", "dial_code": "+1 849", "code": "DO" }, { "name": "Ecuador", "dial_code": "+593", "code": "EC" }, { "name": "Egypt", "dial_code": "+20", "code": "EG" }, { "name": "El Salvador", "dial_code": "+503", "code": "SV" }, { "name": "Equatorial Guinea", "dial_code": "+240", "code": "GQ" }, { "name": "Eritrea", "dial_code": "+291", "code": "ER" }, { "name": "Estonia", "dial_code": "+372", "code": "EE" }, { "name": "Ethiopia", "dial_code": "+251", "code": "ET" }, { "name": "Faroe Islands", "dial_code": "+298", "code": "FO" }, { "name": "Fiji", "dial_code": "+679", "code": "FJ" }, { "name": "Finland", "dial_code": "+358", "code": "FI" }, { "name": "France", "dial_code": "+33", "code": "FR" }, { "name": "French Polynesia", "dial_code": "+689", "code": "PF" }, { "name": "Gabon", "dial_code": "+241", "code": "GA" }, { "name": "Gambia", "dial_code": "+220", "code": "GM" }, { "name": "Georgia", "dial_code": "+995", "code": "GE" }, { "name": "Germany", "dial_code": "+49", "code": "DE" }, { "name": "Ghana", "dial_code": "+233", "code": "GH" }, { "name": "Gibraltar", "dial_code": "+350", "code": "GI" }, { "name": "Greece", "dial_code": "+30", "code": "GR" }, { "name": "Greenland", "dial_code": "+299", "code": "GL" }, { "name": "Grenada", "dial_code": "+1 473", "code": "GD" }, { "name": "Guam", "dial_code": "+1 671", "code": "GU" }, { "name": "Guatemala", "dial_code": "+502", "code": "GT" }, { "name": "Guinea", "dial_code": "+224", "code": "GN" }, { "name": "Guinea-Bissau", "dial_code": "+245", "code": "GW" }, { "name": "Guyana", "dial_code": "+595", "code": "GY" }, { "name": "Haiti", "dial_code": "+509", "code": "HT" }, { "name": "Honduras", "dial_code": "+504", "code": "HN" }, { "name": "Hungary", "dial_code": "+36", "code": "HU" }, { "name": "Iceland", "dial_code": "+354", "code": "IS" }, { "name": "India", "dial_code": "+91", "code": "IN" }, { "name": "Indonesia", "dial_code": "+62", "code": "ID" }, { "name": "Iraq", "dial_code": "+964", "code": "IQ" }, { "name": "Ireland", "dial_code": "+353", "code": "IE" }, { "name": "Israel", "dial_code": "+972", "code": "IL" }, { "name": "Italy", "dial_code": "+39", "code": "IT" }, { "name": "Jamaica", "dial_code": "+1 876", "code": "JM" }, { "name": "Japan", "dial_code": "+81", "code": "JP" }, { "name": "Jordan", "dial_code": "+962", "code": "JO" }, { "name": "Kazakhstan", "dial_code": "+7 7", "code": "KZ" }, { "name": "Kenya", "dial_code": "+254", "code": "KE" }, { "name": "Kiribati", "dial_code": "+686", "code": "KI" }, { "name": "Kuwait", "dial_code": "+965", "code": "KW" }, { "name": "Kyrgyzstan", "dial_code": "+996", "code": "KG" }, { "name": "Latvia", "dial_code": "+371", "code": "LV" }, { "name": "Lebanon", "dial_code": "+961", "code": "LB" }, { "name": "Lesotho", "dial_code": "+266", "code": "LS" }, { "name": "Liberia", "dial_code": "+231", "code": "LR" }, { "name": "Liechtenstein", "dial_code": "+423", "code": "LI" }, { "name": "Lithuania", "dial_code": "+370", "code": "LT" }, { "name": "Luxembourg", "dial_code": "+352", "code": "LU" }, { "name": "Madagascar", "dial_code": "+261", "code": "MG" }, { "name": "Malawi", "dial_code": "+265", "code": "MW" }, { "name": "Malaysia", "dial_code": "+60", "code": "MY" }, { "name": "Maldives", "dial_code": "+960", "code": "MV" }, { "name": "Mali", "dial_code": "+223", "code": "ML" }, { "name": "Malta", "dial_code": "+356", "code": "MT" }, { "name": "Marshall Islands", "dial_code": "+692", "code": "MH" }, { "name": "Martinique", "dial_code": "+596", "code": "MQ" }, { "name": "Mauritania", "dial_code": "+222", "code": "MR" }, { "name": "Mauritius", "dial_code": "+230", "code": "MU" }, { "name": "Mayotte", "dial_code": "+262", "code": "YT" }, { "name": "Mexico", "dial_code": "+52", "code": "MX" }, { "name": "Monaco", "dial_code": "+377", "code": "MC" }, { "name": "Mongolia", "dial_code": "+976", "code": "MN" }, { "name": "Montenegro", "dial_code": "+382", "code": "ME" }, { "name": "Montserrat", "dial_code": "+1664", "code": "MS" }, { "name": "Morocco", "dial_code": "+212", "code": "MA" }, { "name": "Myanmar", "dial_code": "+95", "code": "MM" }, { "name": "Namibia", "dial_code": "+264", "code": "NA" }, { "name": "Nauru", "dial_code": "+674", "code": "NR" }, { "name": "Nepal", "dial_code": "+977", "code": "NP" }, { "name": "Netherlands", "dial_code": "+31", "code": "NL" }, { "name": "Netherlands Antilles", "dial_code": "+599", "code": "AN" }, { "name": "New Caledonia", "dial_code": "+687", "code": "NC" }, { "name": "New Zealand", "dial_code": "+64", "code": "NZ" }, { "name": "Nicaragua", "dial_code": "+505", "code": "NI" }, { "name": "Niger", "dial_code": "+227", "code": "NE" }, { "name": "Nigeria", "dial_code": "+234", "code": "NG" }, { "name": "Niue", "dial_code": "+683", "code": "NU" }, { "name": "Norfolk Island", "dial_code": "+672", "code": "NF" }, { "name": "Northern Mariana Islands", "dial_code": "+1 670", "code": "MP" }, { "name": "Norway", "dial_code": "+47", "code": "NO" }, { "name": "Oman", "dial_code": "+968", "code": "OM" }, { "name": "Pakistan", "dial_code": "+92", "code": "PK" }, { "name": "Palau", "dial_code": "+680", "code": "PW" }, { "name": "Panama", "dial_code": "+507", "code": "PA" }, { "name": "Papua New Guinea", "dial_code": "+675", "code": "PG" }, { "name": "Paraguay", "dial_code": "+595", "code": "PY" }, { "name": "Peru", "dial_code": "+51", "code": "PE" }, { "name": "Philippines", "dial_code": "+63", "code": "PH" }, { "name": "Poland", "dial_code": "+48", "code": "PL" }, { "name": "Portugal", "dial_code": "+351", "code": "PT" }, { "name": "Puerto Rico", "dial_code": "+1 939", "code": "PR" }, { "name": "Qatar", "dial_code": "+974", "code": "QA" }, { "name": "Romania", "dial_code": "+40", "code": "RO" }, { "name": "Rwanda", "dial_code": "+250", "code": "RW" }, { "name": "Samoa", "dial_code": "+685", "code": "WS" }, { "name": "San Marino", "dial_code": "+378", "code": "SM" }, { "name": "Saudi Arabia", "dial_code": "+966", "code": "SA" }, { "name": "Senegal", "dial_code": "+221", "code": "SN" }, { "name": "Serbia", "dial_code": "+381", "code": "RS" }, { "name": "Seychelles", "dial_code": "+248", "code": "SC" }, { "name": "Sierra Leone", "dial_code": "+232", "code": "SL" }, { "name": "Singapore", "dial_code": "+65", "code": "SG" }, { "name": "Slovakia", "dial_code": "+421", "code": "SK" }, { "name": "Slovenia", "dial_code": "+386", "code": "SI" }, { "name": "Solomon Islands", "dial_code": "+677", "code": "SB" }, { "name": "South Africa", "dial_code": "+27", "code": "ZA" }, { "name": "South Georgia and the South Sandwich Islands", "dial_code": "+500", "code": "GS" }, { "name": "Spain", "dial_code": "+34", "code": "ES" }, { "name": "Sri Lanka", "dial_code": "+94", "code": "LK" }, { "name": "Sudan", "dial_code": "+249", "code": "SD" }, { "name": "Suriname", "dial_code": "+597", "code": "SR" }, { "name": "Swaziland", "dial_code": "+268", "code": "SZ" }, { "name": "Sweden", "dial_code": "+46", "code": "SE" }, { "name": "Switzerland", "dial_code": "+41", "code": "CH" }, { "name": "Tajikistan", "dial_code": "+992", "code": "TJ" }, { "name": "Thailand", "dial_code": "+66", "code": "TH" }, { "name": "Togo", "dial_code": "+228", "code": "TG" }, { "name": "Tokelau", "dial_code": "+690", "code": "TK" }, { "name": "Tonga", "dial_code": "+676", "code": "TO" }, { "name": "Trinidad and Tobago", "dial_code": "+1 868", "code": "TT" }, { "name": "Tunisia", "dial_code": "+216", "code": "TN" }, { "name": "Turkey", "dial_code": "+90", "code": "TR" }, { "name": "Turkmenistan", "dial_code": "+993", "code": "TM" }, { "name": "Turks and Caicos Islands", "dial_code": "+1 649", "code": "TC" }, { "name": "Tuvalu", "dial_code": "+688", "code": "TV" }, { "name": "Uganda", "dial_code": "+256", "code": "UG" }, { "name": "Ukraine", "dial_code": "+380", "code": "UA" }, { "name": "United Arab Emirates", "dial_code": "+971", "code": "AE" }, { "name": "United Kingdom", "dial_code": "+44", "code": "GB" }, { "name": "United States", "dial_code": "+1", "code": "US" }, { "name": "Uruguay", "dial_code": "+598", "code": "UY" }, { "name": "Uzbekistan", "dial_code": "+998", "code": "UZ" }, { "name": "Vanuatu", "dial_code": "+678", "code": "VU" }, { "name": "Wallis and Futuna", "dial_code": "+681", "code": "WF" }, { "name": "Yemen", "dial_code": "+967", "code": "YE" }, { "name": "Zambia", "dial_code": "+260", "code": "ZM" },
        { "name": "Zimbabwe", "dial_code": "+263", "code": "ZW" }, { "name": "Bolivia, Plurinational State of", "dial_code": "+591", "code": "BO" }, { "name": "Brunei Darussalam", "dial_code": "+673", "code": "BN" }, { "name": "Congo, The Democratic Republic of the", "dial_code": "+243", "code": "CD" }, { "name": "Cote d'Ivoire", "dial_code": "+225", "code": "CI" }, { "name": "Falkland Islands (Malvinas)", "dial_code": "+500", "code": "FK" }, { "name": "Guernsey", "dial_code": "+44", "code": "GG" }, { "name": "Holy See (Vatican City State)", "dial_code": "+379", "code": "VA" }, { "name": "Hong Kong", "dial_code": "+852", "code": "HK" }, { "name": "Iran, Islamic Republic of", "dial_code": "+98", "code": "IR" }, { "name": "Isle of Man", "dial_code": "+44", "code": "IM" }, { "name": "Jersey", "dial_code": "+44", "code": "JE" }, { "name": "Korea, Democratic People's Republic of", "dial_code": "+850", "code": "KP" }, { "name": "Korea, Republic of", "dial_code": "+82", "code": "KR" }, { "name": "Lao People's Democratic Republic", "dial_code": "+856", "code": "LA" }, { "name": "Libyan Arab Jamahiriya", "dial_code": "+218", "code": "LY" }, { "name": "Macao", "dial_code": "+853", "code": "MO" }, { "name": "Macedonia, The Former Yugoslav Republic of", "dial_code": "+389", "code": "MK" }, { "name": "Micronesia, Federated States of", "dial_code": "+691", "code": "FM" }, { "name": "Moldova, Republic of", "dial_code": "+373", "code": "MD" }, { "name": "Mozambique", "dial_code": "+258", "code": "MZ" }, { "name": "Palestinian Territory, Occupied", "dial_code": "+970", "code": "PS" }, { "name": "Pitcairn", "dial_code": "+872", "code": "PN" }, { "name": "Russia", "dial_code": "+7", "code": "RU" }, { "name": "Saint Barthélemy", "dial_code": "+590", "code": "BL" }, { "name": "Saint Helena, Ascension and Tristan Da Cunha", "dial_code": "+290", "code": "SH" }, { "name": "Saint Kitts and Nevis", "dial_code": "+1 869", "code": "KN" }, { "name": "Saint Lucia", "dial_code": "+1 758", "code": "LC" }, { "name": "Saint Martin", "dial_code": "+590", "code": "MF" }, { "name": "Saint Vincent and the Grenadines", "dial_code": "+1 784", "code": "VC" }, { "name": "Sao Tome and Principe", "dial_code": "+239", "code": "ST" }, { "name": "Somalia", "dial_code": "+252", "code": "SO" }, { "name": "Syrian Arab Republic", "dial_code": "+963", "code": "SY" }, { "name": "Taiwan, Province of China", "dial_code": "+886", "code": "TW" }, { "name": "Tanzania, United Republic of", "dial_code": "+255", "code": "TZ" }, { "name": "Timor-Leste", "dial_code": "+670", "code": "TL" }, { "name": "Venezuela, Bolivarian Republic of", "dial_code": "+58", "code": "VE" }, { "name": "Viet Nam", "dial_code": "+84", "code": "VN" }, { "name": "Virgin Islands, British", "dial_code": "+1 284", "code": "VG" }, { "name": "Virgin Islands, U.S.", "dial_code": "+1 340", "code": "VI" }]


        function changeCountry(event) {
            $("#countryFlag").html('<img src="images/blank.gif" class="flag flag-' + $(event).attr("data-code") + '" alt="' + $(event).attr("data-country") + '" />');
            $("#countryCode").html($(event).attr("data-mobile"))
        }


        $(document).ready(function () {
            //  Coin Popup Script

            var html = '';
            for (let i = 0; i < Country.length; i++) {
                html += '<div class="joinpClist01 "><a href="javascript:void(0);" onClick="changeCountry(this)" data-code="' + Country[i].code.toLowerCase() + '" data-country="' + Country[i].name + '" data-mobile="' + Country[i].dial_code + '" class="clearfix"> <span><img src="images/blank.gif" class="flag flag-' + Country[i].code.toLowerCase() + '" alt="' + Country[i].name + '" /></span><span>' + Country[i].name + '</span></a></div>'
            }
            $("#countryCodeList").html(html)

            $(".openPopup").click(function () {
                $(".User-CoinPopup").addClass("Open");
            });
            $(".ucp-CloseBTN").click(function () {
                $(".User-CoinPopup").removeClass("Open");
            });
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
            var wow = new wowjs.WOW({
                boxClass: 'wow', // default
                animateClass: 'animated', // default
                offset: 0, // default
                mobile: true, // default
                live: true // default      
            })
            wow.init();
            $(".add-Credit").click(function () {
                $(".tokens-Popup02").show();
                $("html").addClass("no-Scroll");
            });
            $(".close-Icon").click(function () {
                $(".tokens-Popup02").hide();
                $("html").removeClass("no-Scroll");
            });
            $(".dlt-confirmation").click(function () {
                $(".tokens-Popup03").show();
                $("html").addClass("no-Scroll");
            });
            $(".close-Icon, .CancelBTN").click(function () {
                $(".tokens-Popup03").hide();
                $("html").removeClass("no-Scroll");
            });
            $(".add_WalBTN").click(function () {
                $(".tokens-Popup04").show();
                $("html").addClass("no-Scroll");
            });
            $(".close-Icon").click(function () {
                $(".tokens-Popup04").hide();
                $("html").removeClass("no-Scroll");
            });

            $(".um-UnlockLink").click(function () {
                $(".unlock-Popup").show();
                $("html").addClass("no-Scroll");
            });
            $(".close-Icon, .unlock-Popup .uc-btn02").click(function () {
                $(".unlock-Popup").hide();
                $("html").removeClass("no-Scroll");
            });


            $(".metaimg-Box").click(function () {
                $(".wallet-Popup").show();
                $("html").addClass("no-Scroll");
            });
            $(".close-Icon").click(function () {
                $(".wallet-Popup").hide();
                $("html").removeClass("no-Scroll");
            });
            $(".edit-Email").click(function () {
                $(".change-Email").show();
                $("html").addClass("no-Scroll");
            });
            $(".close-Icon02").click(function () {
                $(".change-Email").hide();
                $("html").removeClass("no-Scroll");
            });

            $(".edit-Phone").click(function () {
                $(".change-phone").show();
                $("html").addClass("no-Scroll");
            });
            $(".close-Icon02").click(function () {
                $(".change-phone").hide();
                $("html").removeClass("no-Scroll");
            });

            $(".AprWalLink").click(function () {
                $(".linkNewWallet").show();
                $("html").addClass("no-Scroll");
            });
            $(".close-Icon02").click(function () {
                $(".linkNewWallet").hide();
                $("html").removeClass("no-Scroll");
            });


            $(".change-Mailbtn").click(function () {
                $(".verify-Code").show();
                $("html").addClass("no-Scroll");
            });
            $(".close-Icon02").click(function () {
                $(".verify-Code").hide();
                $("html").removeClass("no-Scroll");
            });
            $(".tab-Link").click(function () {
                $(".tab-Link").removeClass("active")
                $(this).addClass("active")
                $(".tab-Content").hide();
                $("#" + $(this).attr("data-id")).fadeIn("slow");
            });
            setTimeout(function () {
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en'
                }, 'google_translate_element');
            }, 1000)
            // Custom Protip Function
            $(".protipNp").each(function () {
                var title = $(this).attr("data-pt-title")
                var html = "<div class='mmProtip ani-1' >" + title + " </div>"
                $(this).append(html)
            })
            $.protip();
            (function ($) {
                $(window).resize(function () {
                    if ($(this).width() > 768) {
                        $(".tokens-Popup02, .joinpsCmenu02Scroller")
                            .mCustomScrollbar(); //apply scrollbar with your options 
                    } else {
                        $(".tokens-Popup02").mCustomScrollbar("destroy"); //destroy scrollbar 
                    }
                }).trigger("resize");
            })(jQuery);
        });
        function openModal01() {
            $("#privacy").iziModal('open');
        }
        function openModal02() {
            $("#terms").iziModal('open');
        }
        function openModal03() {
            $("#cockies").iziModal('open');
        }
        // Script End
    }

    whiteListAddress(key) {
        const { web3, whiteListInstance, accounts } = this.state;
        const walletAddressNew = this.state.userProfile.unapprovedWallets[key];
        const userEmail = this.state.userProfile.email;
        if ((accounts[0]).toLowerCase() !== this.state.userProfile.wallets[0]) {
            notification.warningMsg(notification.Msg.WALLET_ADDRESS_WHITELISTING_FROM_INVALID_ADDRESS)
        } else {
            whiteListInstance.methods.addMoreWallets(walletAddressNew).send({ from: accounts[0], gasPrice: web3.utils.toWei("1", "gwei"), gasLimit: 800000 })
                .on('transactionHash', (hash) => {
                    this.setState({

                    });
                }).on('receipt', (receipt) => {
                    AuctionActions.updateWalletList(userEmail, walletAddressNew);
                    if (receipt.status) {
                        notification.successMsg(notification.Msg.WALLET_ADDRESS_WHITELISTED)
                    }
                }).on("error", (error) => {
                    if (error.message.includes("User denied transaction signature")) {
                        notification.errorMsg(notification.Msg.WALLET_ADDRESS_WHITELISTED_REJECTED)
                    }
                })
        }
    }

    render() {

        if (this.state.redirectToLogin)
            return (<Redirect to="/login" />)

        if (this.state.redirectToEmailVerification)
            return (<Redirect to="/email-verification" />)

        if (this.state.loading)
            return (<LoadingOverlay active={this.state.loading} spinner text='Loading...'></LoadingOverlay>)

        return (
            <main id="main" className="bodyBG01 userManagement">
                <div className="auc-Btnmobile showMobile">

                    <a href="javascript:void(0);" target="_blank">Go to the live auction</a>
                    <div id="um-timer02">
                        <div className="hours"><span>0</span><span>1</span></div>
                        <div className="minutes"><span>3</span><span>2</span></div>
                        <div className="seconds"><span>4</span><span>7</span></div>
                    </div>


                </div>
                {/* <!--======================= HEADER START =====================--> */}
                <header className="header">
                    <div className="logo">
                        <a href="javascript:void(0);"><img src="images/logo.png" alt="" /></a>
                    </div>
                    <div className="auc-Btn ani-1 hideMobile">
                        <span>Go to the live auction</span>
                        <div id="um-timer02">
                            <div className="hours"><span>0</span><span>1</span></div>
                            <div className="minutes"><span>3</span><span>2</span></div>
                            <div className="seconds"><span>4</span><span>7</span></div>
                        </div>
                    </div>
                    <nav className="rgdev green-btn clearfix">
                        <ul className="mobile-sub rgdev-list">
                            <li className="rgdev-item"><a title="SUPPORT" className="user-Menu n-collapsed" href="javascript:void(0);"
                                data-toggle="n-collapse" data-target="#userBox" aria-expanded="false"
                                aria-controls="userBox"><span className="user-Icon"><i
                                    className="fas fa-user-circle"></i></span><span className="user-Status"><img
                                        src="images/blue-dot.png" alt="" /></span></a> <span id="userBox"
                                            className="autoClose n-collapse" aria-expanded="false">
                                    <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                        className="fas fa-home"></i></span>Home</a>
                                    <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                        className="fas fa-user"></i></span>Profile</a>
                                    <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                        className="fas fa-globe-americas"></i></span>Network</a>
                                    <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                        className="fas fa-envelope"></i></span>Message</a>
                                    <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                        className="fas fa-bell"></i></span>Notification</a>
                                </span> </li>
                            <li className="rgdev-item">
                                <a className="ani-1 langBox" href="javascript:void(0);" data-toggle="n-collapse"
                                    data-target="#langBox" aria-expanded="false" aria-controls="langBox"><img
                                        src="images/eng-icon.png" alt="" /></a>
                            </li>
                        </ul>
                        <div id="langBox" className="autoClose n-collapse">
                            <div className="langBoxContainer clearfix">
                                <div className="lanbox01">
                                    <a href="javascript:void(0);" className="active">
                                        <div className="lanIconbox"><i className="lanicon01"></i></div> English
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon02"></i></div> 中文繁體
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon03"></i></div> Tiếng Việt
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon04"></i></div> العربية
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon05"></i></div> Deutsch
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon06"></i></div> Pусский
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon07"></i></div> Español
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon08"></i></div> <span
                                            style={{ unicodeBidi: "bidi-override" }}>תירבע</span>
                                    </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon09"></i></div> BAHASA INDONESIA
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon010"></i></div> Türkçe
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon011"></i></div> Português
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon012"></i></div> हिन्दी
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon013"></i></div> Français
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon014"></i></div> 한국어
                            </a>
                                </div>
                                <div className="lanbox01">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon015"></i></div> 日本語
                            </a>
                                </div>
                                <div className="lanbox01 ani-1">
                                    <a href="javascript:void(0);">
                                        <div className="lanIconbox"><i className="lanicon015 translateLanguage"></i></div>
                                        <div id="google_translate_element"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <!--
        <div className="rgdev-mobile"><span className="icon-bar"></span> <span className="icon-bar"></span><span className="icon-bar"></span></div>
        <div className="rgdev-text">Navigation</div>        
--> */}
                    </nav>
                    <div className="rgdev-item mobile-Item01"><a title="SUPPORT" className="ani-1 user-Menu" href="javascript:void(0);"
                        data-toggle="n-collapse" data-target="#userBox1" aria-expanded="false" aria-controls="userBox"><span
                            className="user-Icon"><i className="fas fa-user-circle"></i></span><span className="user-Status"><img
                                src="images/blue-dot.png" alt="" /></span></a>
                        <span id="userBox1" className="autoClose n-collapse">
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                className="fas fa-home"></i></span>Home</a>
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                className="fas fa-user"></i></span>Profile</a>
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                className="fas fa-globe-americas"></i></span>Network</a>
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                className="fas fa-envelope"></i></span>Message</a>
                            <a href="javascript:void(0);" className="ani-1"><span className="icon-box"><i
                                className="fas fa-bell"></i></span>Notification</a>
                        </span>
                    </div>
                    <div className="rgdev-item mobile-Item02">
                        <a className="ani-1 langBox" href="javascript:void(0);" data-toggle="n-collapse" data-target="#langBox"
                            aria-expanded="false" aria-controls="langBox"><img src="images/eng-icon.png" alt="" /></a>
                    </div>
                </header>
                {/* <!--======================= HEADER END =====================--> */}
                <div className="main">
                    <div className="user-Bg01">
                        {/* <!--======================= USER INFO START =====================--> */}
                        <div className="user-titleBox">
                            <div className="container-Full">
                                <div className="user-titleWrap">
                                    <div className="kyc-Status">
                                        <ul className="wow fadeInDown" data-wow-delay="0.3s">
                                            <li><span className="circle-Bx"><i className="fas fa-check"></i></span>KYC</li>
                                            <li><span className="circle-Bx"><i className="fas fa-check"></i></span>AML</li>
                                            <li><span className="circle-Bx"><i className="fas fa-check"></i></span>ACCREDITATION</li>
                                        </ul>
                                    </div>
                                    <div className="login-Status wow fadeInDown" data-wow-delay="0.3s"> Last Login: May 26, 2019
                                01:53:27 UTC </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-Info">

                            <div className="container-Full">
                                <div className="user-infoBox">
                                    <div className="user-infoBox01 wow fadeInLeft" data-wow-delay="0.5s">
                                        <div className="Title02">Basic Information</div>
                                        <div className="input-Bx01 ani-1">
                                            <label>First Name:</label>
                                            <input type="text" value="John" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn"><i className="fas fa-edit"></i></a>
                                        </div>
                                        <div className="input-Bx01 ani-1">
                                            <label>Middle Name(s) <span className="sml_text">(if applicable)</span></label>
                                            <input type="text" value="" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn"><i className="fas fa-edit"></i></a>
                                        </div>
                                        <div className="input-Bx01 ani-1">
                                            <label>Last Name:</label>
                                            <input type="text" value=" Smith" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn"><i className="fas fa-edit"></i></a>
                                        </div>
                                        <div className="input-Bx01 ani-1">
                                            <label>Date of Birth:</label>
                                            <input type="text" value="September 26, 1976" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn"><i className="fas fa-edit"></i></a>
                                        </div>
                                        <div className="input-Bx01 ani-1">
                                            <label>Email:</label>
                                            <input type="text" value="your@email.com" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn edit-Email"><i
                                                className="fas fa-edit"></i></a>
                                        </div>
                                        <div className="input-Bx01 ani-1">
                                            <label>Phone Number:</label>
                                            <input type="text" value="+1-650-123-4567" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn edit-Phone"><i className="fas fa-edit"></i></a>
                                        </div>
                                        <div className="input-Bx01 ani-1">
                                            <label>Address:</label>
                                            <input type="text" value="27 Colmore Row" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn"><i className="fas fa-edit"></i></a>
                                        </div>
                                        <div className="input-Bx01 ani-1">
                                            <label>Postal Code:</label>
                                            <input type="text" value="B3 2EW" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn"><i className="fas fa-edit"></i></a>
                                        </div>
                                        <div className="input-Bx01 ani-1">
                                            <label>City:</label>
                                            <input type="text" value="Birmingham" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn"><i className="fas fa-edit"></i></a>
                                        </div>
                                        <div className="input-Bx01 ani-1">
                                            <label>Country / Region:</label>
                                            <input type="text" value="England" className="ani-1" />
                                            <a href="javascript:void(0);" className="edit-Btn"><i className="fas fa-edit"></i></a>
                                        </div>
                                        {/* <!-- <div className="input-Bx01 ani-1">
                                                    <label>Accreditation ID:</label>
                                                    <input type="text" value="1234567890" disabled className="ani-1">
                                </div>
                                                    <div className="input-Bx01 ani-1">
                                                        <label>KYC/AML ID:</label>
                                                        <input type="text" value="T2201234567890" disabled className="ani-1">
                                </div> --> */}
                                    </div>
                                    <div className="user-infoBox02 wow fadeInRight" data-wow-delay="0.5s">

                                        <div className="User-CoinPopup ani-1">
                                            <a href="javascript:void(0);" className="ucp-CloseBTN"> <i className="fas fa-caret-right"></i> </a>
                                            <div className="ucp-Title01">
                                                Available to use in auction: <span className="help-circle"><i
                                                    className="fas fa-question-circle protip" data-pt-position="top"
                                                    data-pt-title="Coins not listed below are not supported by Jointer. 
                                            Go to SmartSwap for eligible coins" aria-hidden="true" style={{ color: "#fff" }}></i></span>
                                            </div>
                                            <div className="ucp-Title02">
                                                <span>$10,045.37 ETH</span>
                                                <span>$5,000 EZO</span>
                                                <span>$1,000 USDT</span>
                                                <span>$ 1,000 GUST</span>
                                                <span className="greenText">$17,045.37</span>
                                            </div>
                                            <a href="javascript:void(0);" className="add-Credit ani-1">Add Funds</a>
                                        </div>




                                        <div className="Title02">Currently Active Wallet
                                </div>
                                        <div className="metamask-Wrap">
                                            <div className="metamask-Box">
                                                <div className="metamask-Box01">
                                                    <img src="images/metamask-icon.png" alt="" className="img-fluid" />
                                                    <div className="title-Name">MetaMask</div>
                                                    <a href="javascript:void(0);" className="faux-Link metaimg-Box"></a>
                                                </div>
                                                {/* <!-- <a href="javascript:void(0);" className="btn btn-large ani-1 connected">CONNECTED</a>
                                                <p><a href="javascript:void(0);">Disconnect</a></p> --> */}
                                            </div>
                                            <div className="metamask-Detail">
                                                <div className="Title03">Total funds available: <span className="help-circle"><i
                                                    className="fas fa-question-circle protip" data-pt-position="top left"
                                                    data-pt-title="This includes only currencies accepted by Jointer"
                                                    aria-hidden="true"></i></span> </div>
                                                <div className="total-Amt np-greenC">
                                                    <a href="javascript:void(0);" className="openPopup">$17,045.37</a></div>
                                                <a href="javascript:void(0);" className="add-Credit ani-1">Add Funds</a>
                                                <div className="sub-Amt">0 JNTR/ETN <span>($0)</span> <span className="help-circle"><i
                                                    className="fas fa-question-circle protip" data-pt-position="top left"
                                                    data-pt-title="Help Text Here" aria-hidden="true"></i></span></div>
                                                <div className="sub-Amt">0 JNTR/STOCK <span>($0)</span> <span className="help-circle"><i
                                                    className="fas fa-question-circle protip" data-pt-position="top left"
                                                    data-pt-title="Help Text Here" aria-hidden="true"></i></span></div>
                                                <div className="sub-Amt">1,000 Available JNTR<span>($100)</span></div>
                                                <div className="sub-Amt">9,000 Locked JNTR<span>($900)</span>
                                                    <a className="um-UnlockLink" href="javascript:void(0);"><span className="icon-Box"><i
                                                        className="fas fa-lock"></i></span>UNLOCK</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="metamask-title01">Currently Active Wallet:</div>
                                        <div className="legder-Wallet02 wow fadeInUp" data-wow-delay="0.3s">
                                            <div className="Title03">Wallet #1</div>
                                            <div className="wallet-Id-2"> <a className="wallet-Id01 active" href="javascript:void(0)"
                                                data-toggle="n-collapse" data-target="#wallet-Id02" aria-expanded="true"
                                                aria-controls="wallet-Id02">0x084374b068Eb3db504178b4909eDC26D01226a80</a>
                                                <div id="wallet-Id02" className="autoClose n-collapse" aria-expanded="false">
                                                    <div className="wallet-Id02"> <a
                                                        href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80</a>
                                                        <a href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80
                                                </a> <a
                                                            href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80
                                                </a> <a
                                                            href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80
                                                </a> <a
                                                            href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80
                                                </a> </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="metamask-SepLine"></div>
                                        <div className="metamask-title01">Approved Wallet Address: </div>
                                        <div className="AprWalBox">
                                            <span>Wallet #1</span>
                                            <span> <a href="javascript:void(0);" className="edit-Btn"><i
                                                className="fas fa-edit"></i></a> </span>
                                            <span>0xA3c097FC1aFEFc849f512F9cfDe1d3967223dD21</span>
                                            <span> <a href="javascript:void(0);" className="edit-Btn  dlt-confirmation"><i
                                                className="fas fa-trash-alt"></i></a> </span>
                                        </div>
                                        <div className="AprWalBox">
                                            <span>Wallet #2</span>
                                            <span> <a href="javascript:void(0);" className="edit-Btn"><i
                                                className="fas fa-edit"></i></a> </span>
                                            <span>0xA3c097FC1aFEFc849f512F9cfDe1d3967223dD21</span>
                                            <span> <a href="javascript:void(0);" className="edit-Btn  dlt-confirmation"><i
                                                className="fas fa-trash-alt"></i></a> </span>
                                        </div>
                                        <div className="AprWalBox">
                                            <span>Wallet #3</span>
                                            <span> <a href="javascript:void(0);" className="edit-Btn"><i
                                                className="fas fa-edit"></i></a> </span>
                                            <span>0xA3c097FC1aFEFc849f512F9cfDe1d3967223dD21</span>
                                            <span> <a href="javascript:void(0);" className="edit-Btn  dlt-confirmation"><i
                                                className="fas fa-trash-alt"></i></a> </span>
                                        </div>
                                        <a href="javascript:void(0)" className="AprWalLink"><i className="fas fa-plus-square"></i> Link
                                    more wallets </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--======================= USER INFO END =====================--> */}
                        {/* <!--======================= Edge HOLDING START =====================--> */}
                        <div className="edge-Holding">
                            <div className="container-Full">
                                <div className="Title02 wow fadeInDown" data-wow-delay="0.3s">Your Jointer Holdings</div>
                                <div className="edge-holdingBlock">
                                    <div className="edge-Coins">
                                        <div className="edge-Coin wow fadeInUp" data-wow-delay="0.3s">
                                            <div className="img-Box">
                                                <img src="images/jntr-note.png" alt="" />
                                            </div>
                                            <div className="text-Caption">
                                                <div className="Title02">JNTR</div>
                                                <div className="coins-Status">
                                                    <div className="coin-Available">
                                                        <p>Available</p>
                                                        <div className="coin-Amt">10,000 <span>[$100]</span></div>
                                                    </div>
                                                    <div className="coin-Locked">
                                                        <p>Locked <span className="help-circle"><i
                                                            className="fas fa-question-circle protip" data-pt-position="top"
                                                            data-pt-title="Jointer's downside protection applies to 90% of all JNTR investments"
                                                            aria-hidden="true" style={{ color: "#fff" }}></i></span></p>
                                                        <div className="coin-Amt">50,000 <span>[$500]</span></div>
                                                        <a href="javascript:void(0);"><span className="icon-Box"><i
                                                            className="fas fa-lock"></i></span>UNLOCK</a>
                                                    </div>
                                                </div>
                                                <ul className="btn-Wrap">
                                                    <li><a href="javascript:void(0);" className="buy-Btn ani-1">Buy</a></li>
                                                    <li><a href="javascript:void(0);" className="sell-Btn ani-1">Sell</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="edge-Coin wow fadeInUp" data-wow-delay="0.5s">
                                            <div className="img-Box">
                                                <img src="images/jntr-etn.png" alt="" />
                                            </div>
                                            <div className="text-Caption">
                                                <div className="Title02">JNTR/ETN</div>
                                                <div className="coins-Status">
                                                    <div className="coin-Available">
                                                        <p>Available</p>
                                                        <div className="coin-Amt">10,000 <span>[$100]</span></div>
                                                    </div>
                                                </div>
                                                <ul className="btn-Wrap">
                                                    <li><a href="javascript:void(0);" className="buy-Btn ani-1">Buy</a></li>
                                                    <li><a href="javascript:void(0);" className="sell-Btn ani-1">Sell</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="edge-Coin wow fadeInUp" data-wow-delay="0.7s">
                                            <div className="img-Box">
                                                <img src="images/jntr-equity.png" alt="" />
                                            </div>
                                            <div className="text-Caption">
                                                <div className="Title02">JNTR/EQUITY</div>
                                                <div className="coins-Status">
                                                    <div className="coin-Available">
                                                        <p>Available</p>
                                                        <div className="coin-Amt">10,000 <span>[$1,000,000]</span></div>
                                                    </div>
                                                </div>
                                                <ul className="btn-Wrap">
                                                    <li><a href="javascript:void(0);" className="buy-Btn ani-1">Buy</a></li>
                                                    <li><a href="javascript:void(0);" className="sell-Btn ani-1">Sell</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--======================= Edge HOLDING END =====================--> */}
                        {/* <!--======================= LEDGER START =====================--> */}
                        <div className="ledger-Block">
                            <div className="container-Full">
                                <div className="Title02 wow fadeInDown" data-wow-delay="0.3s">Ledger</div>
                                <div className="legder-Wallet wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="Title03">Kyle's - MetaMask <span><a href="javascript:void(0);" className="edit-Btn"><i
                                        className="fas fa-edit"></i></a></span></div>
                                    <div className="wallet-Id"> <a className="wallet-Id01 active" href="javascript:void(0)"
                                        data-toggle="n-collapse" data-target="#wallet-Id01" aria-expanded="true"
                                        aria-controls="wallet-Id01">0x084374b068Eb3db504178b4909eDC26D01226a80</a>
                                        <div id="wallet-Id01" className="autoClose n-collapse" aria-expanded="false">
                                            <div className="wallet-Id02"> <a
                                                href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80</a> <a
                                                    href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80 </a>
                                                <a href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80 </a> <a
                                                    href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80 </a>
                                                <a href="javascript:void(0);">0x084374b068Eb3db504178b4909eDC26D01226a80 </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper ledger-Table npWrapperFix01 clearfix">
                                <div className="container-Full">
                                    <div className="responsivetable02 clearfix npShowMD ">
                                        <div className="his-Table">
                                            <table className="comparetable cV2 cV3 clearfix wow fadeInRight" data-wow-delay="0.5s">
                                                <tbody>
                                                    <tr>
                                                        <th align="left" valign="middle">Date</th>
                                                        <th align="center" valign="middle">Transaction</th>
                                                        <th align="center" valign="middle">Sent</th>
                                                        <th align="center" valign="middle">Received</th>
                                                        <th align="center" valign="middle">Receipt Value</th>
                                                        <th align="center" valign="middle">Status</th>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" className="date-Txt">Aug 15, 2019</td>
                                                        <td align="center">JNTR Auction Oct 3</td>
                                                        <td align="center">10 ETH</td>
                                                        <td align="center">100000000.234242 JNTR</td>
                                                        <td align="center">$3000</td>
                                                        <td align="center"><strong className="blue-Color">COMPLETED</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" className="date-Txt">Aug 16, 2019</td>
                                                        <td align="center">JNTR-JNTR/ETN SmartSwap</td>
                                                        <td align="center">100 JNTR</td>
                                                        <td align="center">100 JNTR/ETN</td>
                                                        <td align="center">$10</td>
                                                        <td align="center"><strong className="blue-Color">COMPLETED</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" className="date-Txt">Aug 17, 2019</td>
                                                        <td align="center">JNTR-JNTR/EQUITY SmartSwap</td>
                                                        <td align="center">100 JNTR  </td>
                                                        <td align="center">100 JNTR/EQUITY</td>
                                                        <td align="center">$10</td>
                                                        <td align="center"><strong className="blue-Color">COMPLETED</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" className="date-Txt">Aug 18, 2019</td>
                                                        <td align="center">JNTR Auction Oct 4</td>
                                                        <td align="center">100 EZO</td>
                                                        <td align="center">100000000.234242 JNTR</td>
                                                        <td align="center">$10,000</td>
                                                        <td align="center"><strong className="blue-Color">COMPLETED</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" className="date-Txt">Aug 19, 2019</td>
                                                        <td align="center">JNTR/ETN-JNTR SmartSwap</td>
                                                        <td align="center">100 JNTR/ETN</td>
                                                        <td align="center">100 JNTR</td>
                                                        <td align="center">$10</td>
                                                        <td align="center"><strong className="red-Color">PENDING</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" className="date-Txt">Aug 20, 2019</td>
                                                        <td align="center">JNTR Auction Oct 5</td>
                                                        <td align="center">10 ETH</td>
                                                        <td align="center">-</td>
                                                        <td align="center">-</td>
                                                        <td align="center"><strong className="red-Color">PENDING</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper ledger-Table npWrapperFix01 clearfix">
                                <div className="container-Full">
                                    <div className="responsivetable02 clearfix npShowSM">
                                        <table className="comparetable cV2 cV3 clearfix wow fadeInLeft" data-wow-delay="0.3s">
                                            <tbody>
                                                <tr className="border-Top">
                                                    <th align="left" valign="middle">Date</th>
                                                    <td align="left" className="date-Txt">Aug 15, 2019</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Transaction </th>
                                                    <td align="left">EDGE Auction Oct 3</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Sent</th>
                                                    <td align="left">10 ETH</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Received</th>
                                                    <td align="left">100000000.234242 EDGE </td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Receipt Value</th>
                                                    <td align="left">$3000</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Status</th>
                                                    <td align="left" className="blue-Color"><strong>COMPLETED</strong></td>
                                                </tr>
                                                <tr className="border-Top">
                                                    <th align="left" valign="middle">Date</th>
                                                    <td align="left" className="date-Txt">Aug 16, 2019</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Transaction </th>
                                                    <td align="left">EDGE-EDGE/ETN SmartSwap</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Sent</th>
                                                    <td align="left">100 EDGE</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Received</th>
                                                    <td align="left">100 EDGE/ETN</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Receipt Value</th>
                                                    <td align="left">$10</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Status</th>
                                                    <td align="left" className="blue-Color"><strong>COMPLETED</strong></td>
                                                </tr>
                                                <tr className="border-Top">
                                                    <th align="left" valign="middle">Date</th>
                                                    <td align="left" className="date-Txt">Aug 17, 2019</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Transaction </th>
                                                    <td align="left">EDGE-EDGE/EQUITY SmartSwap</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Sent</th>
                                                    <td align="left">100 EDGE</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Received</th>
                                                    <td align="left">100 EDGE/EQUITY</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Receipt Value</th>
                                                    <td align="left">$10</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Status</th>
                                                    <td align="left" className="blue-Color"><strong>COMPLETED</strong></td>
                                                </tr>
                                                <tr className="border-Top">
                                                    <th align="left" valign="middle">Date</th>
                                                    <td align="left">Aug 18, 2019</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Transaction </th>
                                                    <td align="left">EDGE Aucti on Oct 4</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Sent</th>
                                                    <td align="left">100 EZO</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Received</th>
                                                    <td align="left">100000000.234242 EDGE</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Receipt Value</th>
                                                    <td align="left">$10,000</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Status</th>
                                                    <td align="left" className="blue-Color"><strong>COMPLETED</strong></td>
                                                </tr>
                                                <tr className="border-Top">
                                                    <th align="left" valign="middle">Date</th>
                                                    <td align="left" className="date-Txt">Aug 19, 2019</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Transaction </th>
                                                    <td align="left">EDGE/ETN-EDGE SmartSwap</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Sent</th>
                                                    <td align="left">100 EDGE/ETN</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Received</th>
                                                    <td align="left">100 EDGE</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Receipt Value</th>
                                                    <td align="left">$10</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Status</th>
                                                    <td align="left" className="red-Color"><strong>PENDING</strong></td>
                                                </tr>
                                                <tr className="border-Top">
                                                    <th align="left" valign="middle">Date</th>
                                                    <td align="left" className="date-Txt">Aug 20, 2019</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Transaction </th>
                                                    <td align="left">EDGE Auction Oct 5</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Sent</th>
                                                    <td align="left">10 ETH</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Received</th>
                                                    <td align="left">-</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Receipt Value</th>
                                                    <td align="left">-</td>
                                                </tr>
                                                <tr>
                                                    <th align="center" valign="middle">Status</th>
                                                    <td align="left" className="red-Color"><strong>PENDING</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--======================= LEDGER END =====================--> */}
                        {/* <!--======================= TOKEN POPUP START =====================--> */}
                        <div className="tokens-Popup02">
                            <div className="container-Grid addfund-container">
                                <div className="Title01">Add fund to your wallet</div>
                                <div className="tab-Nav">
                                    <a href="javascript:void(0);" className="tab-Link ani-1 active" data-id="tab-1">Debit / Credit
                                Card</a>
                                    <a href="javascript:void(0);" className="tab-Link ani-1 hideMobile" data-id="tab-2">USA Banking
                                Wiring</a>
                                    <a href="javascript:void(0);" className="tab-Link ani-1 hideMobile"
                                        data-id="tab-3">International Bank Wiring</a>
                                </div>
                                <div className="tab-Content" id="tab-1">
                                    <div className="token-Box">
                                        <div className="token-Box02 ani-1">
                                            <div className="img-Box">
                                                <img src="images/token-icon06.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Coinswitch</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="token-Box02 ani-1">
                                            <div className="img-Box">
                                                <img src="images/token-icon07.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Coinmama</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-Nav">
                                    <a href="javascript:void(0);" className="tab-Link ani-1 showMobile" data-id="tab-2">USA Banking
                                Wiring</a>
                                </div>
                                <div className="tab-Content" id="tab-2">
                                    <div className="token-Box">
                                        <div className="token-Box02 ani-1">
                                            <div className="img-Box">
                                                <img src="images/token-icon05.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Wyre</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-Nav">
                                    <a href="javascript:void(0);" className="tab-Link ani-1 showMobile"
                                        data-id="tab-3">International Bank Wiring</a>
                                </div>
                                <div className="tab-Content" id="tab-3">
                                    <div className="token-Box">
                                        <div className="token-Box02 ani-1">
                                            <div className="img-Box">
                                                <img src="images/ss-c.png" alt="" className="img-fluid" />
                                                <div className="title-Name">SS & C</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="token-Box02 ani-1">
                                            <div className="img-Box">
                                                <img src="images/trust-token.png" alt="" className="img-fluid" />
                                                <div className="title-Name">TrustToken</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:void(0);" className="close-Icon"></a>
                        </div>
                        {/* <!--======================= TOKEN POPUP END =====================--> */}
                        {/* <!--======================= DeleteConfirmation POPUP END =====================--> */}
                        <div className="tokens-Popup03">
                            <div className="container-Grid addfund-container ">
                                <div className="Title01">Are you sure you want to remove this wallet from your account?</div>
                                <div className="delConfBTNBOX">
                                    <a href="javascript:void(0)" className="delConBTN ani-1">Yes</a>
                                    <a href="javascript:void(0)" className="delConBTN CancelBTN ani-1">Cancel</a>
                                </div>
                            </div>
                            <a href="javascript:void(0);" className="close-Icon"></a>
                        </div>
                        {/* <!--======================= DeleteConfirmation POPUP END =====================--> */}
                        {/* <!--======================= WALLET POPUP START =====================--> */}
                        <div className="main-Popup wallet-Popup">
                            <div className="container-Grid">
                                <div className="wallet-popupBlock">
                                    <div className="search-Mbx">
                                        <div className="search-Bx"> <a href="javascript:void(0);"><span className="icon-Box"><i
                                            className="fas fa-search"></i></span></a>
                                            <input type="text" placeholder="Search wallet by Name" /> </div>
                                        <div className="search-btn-bx"> <a href="javascript:void(0);" className="add_WalBTN"> <i
                                            className="fas fa-plus-square"></i> Add wallet address manually </a> </div>
                                    </div>
                                    <div className="wallet-boxWrap">
                                        <div className="wallet-Bx ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon01.png" alt="" className="img-fluid" />
                                                <div className="title-Name">MetaMask</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon02.png" alt="" className="img-fluid" />
                                                <div className="title-Name">MyEtherWallet</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon03.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Guarda</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon04.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Mist</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon05.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Exodus</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon06.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Atomic</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon07.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Jaxx</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon08.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Ethaddress</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon09.png" alt="" className="img-fluid" />
                                                <div className="title-Name">TrustWallet</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon10.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Coinomi</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon11.png" alt="" className="img-fluid" />
                                                <div className="title-Name">Bread Wallet</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                        <div className="wallet-Bx coming-Soon ani-1">
                                            <div className="img-Box"> <img src="images/wallet-icon12.png" alt="" className="img-fluid" />
                                                <div className="title-Name">imToken Wallet</div>
                                            </div>
                                            <a href="javascript:void(0);" className="faux-Link"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:void(0);" className="close-Icon"></a>
                        </div>
                        {/* <!--======================= WALLET POPUP END =====================--> */}
                        {/* <!--======================= CHANGE EMAIL POPUP START =====================--> */}
                        <div className="main-Popup change-Email">
                            <div className="user-smallBlock">
                                <div className="user-smallBox">
                                    <div className="Title01">Your New Email</div>
                                    <div className="input-Bx"> <span className="icon-Box"><i className="fas fa-envelope"></i></span>
                                        <input type="email" placeholder="New Email" /> </div> <a href="javascript:void(0);"
                                            className="btn btn-large ani-1 change-Mailbtn">CHANGE YOUR EMAIL</a> <a
                                                href="javascript:void(0);" className="close-Icon02"></a>
                                </div>
                            </div>
                        </div>
                        {/* <!--======================= CHANGE EMAIL POPUP END =====================--> */}

                        {/* <!--======================= Link New Wallet POPUP START =====================--> */}
                        <div className="main-Popup linkNewWallet">
                            <div className="user-smallBlock">
                                <div className="user-smallBox">
                                    <div className="Title01">Link New Wallet Address  </div>
                                    <div className="input-Bx">
                                        <input type="email" placeholder="New Wallet Address" />
                                    </div>

                                    <div className="addWall_BTN">
                                        <a href="javascript:void(0);" className="uc-btn03">LINK THIS WALLET TO MY ACCOUNT</a>
                                        <a href="javascript:void(0);" className="uc-btn04">LINK THIS WALLET TO MY ACCOUNT AND GO TO THE LIVE AUCTION</a>


                                    </div>

                                    <a href="javascript:void(0);" className="close-Icon02"></a>
                                </div>
                            </div>
                        </div>
                        {/* <!--======================= Link New Wallet POPUP END =====================--> */}







                        {/* <!--======================= VERIFY POPUP START =====================--> */}
                        <div className="main-Popup verify-Code">
                            <div className="user-smallBlock">
                                <div className="user-smallBox">
                                    <div className="Title01">Verify Your Code</div>
                                    <p>We sent a verification code to your phone and email. Please verify so we can proceed with
                                the change.</p>
                                    <div className="input-Bx">
                                        <span className="icon-Box"><i className="fas fa-mobile-alt"></i></span>
                                        <input type="text" placeholder="Enter 6 Digit SMS Code" />
                                    </div> <a href="javascript:void(0);" className="btn btn-large ani-1 change-Mailbtn">VERIFY</a>
                                    <a href="javascript:void(0);" className="close-Icon02"></a>
                                </div>
                            </div>
                        </div>
                        {/* <!--======================= VERIFY POPUP END =====================--> */}

                        {/* <!--======================= CHANGE PHONE POPUP START =====================--> */}
                        <div className="main-Popup change-phone">
                            <div className="user-smallBlock">
                                <div className="user-smallBox">
                                    <div className="Title01">Your New Phone Number</div>
                                    <div className="input-Bx">
                                        {/* <!-- <input type="phone" placeholder="New Phone Number">  --> */}

                                        <div className="joinpsDropdown npdrFix01 clearfix">
                                            <div className="joinpsCmenu" role="button" id="countryFlag" data-toggle="n-collapse" data-target="#joinpsMenuList" aria-expanded="false"
                                                aria-controls="joinpsMenuList"><img src="images/blank.gif" className="flag flag-us" alt="USA" /> </div>
                                            <div className="joinpsCtextbox clearfix"> <span id="countryCode">+1</span><span>
                                                <input type="text" />
                                            </span> </div>
                                        </div>

                                        <div className="autoClose n-collapse" id="joinpsMenuList">
                                            <div className="joinpsCmenu02Scroller  no-ani" > <div className="joinpsCmenu02Container" id="countryCodeList"> </div>
                                            </div></div>

                                    </div>
                                    <a href="javascript:void(0);"
                                        className="btn btn-large ani-1">CHANGE YOUR PHONE NUMBER</a>
                                    <a href="javascript:void(0);" className="close-Icon02"></a>
                                </div>
                            </div>
                        </div>
                        {/* <!--======================= CHANGE PHONE POPUP END =====================--> */}



                    </div>
                    {/* <!--======================= FOOTER START =====================--> */}
                    <footer className="footer">
                        <div className="footer-Block">
                            <div className="footer-left">
                                <div className="footer-logo"> <a href="javascript:void(0)" target="_blank"><img
                                    src="images/logo.png" alt="" /></a>
                                    <span className="f-Link">
                                        <a href="javascript:void(0);" className="ani-1">CONTACT US</a>
                                    </span> </div>
                                <p><span>© JOINTER 2016-2020 </span> <a href="javascript:void(0);" className="ani-1">Privacy
                                Policy</a> |
                            <a href="javascript:void(0);" className="ani-1">Term of Use</a> |
                            <a href="javascript:void(0);" className="ani-1">Cookie Policy</a> </p>
                                <p>Jointer presents a safe and more profitable alternative to Commercial Real Estate syndication
                            and investment. </p>
                            </div>
                            <div className="footer-right">
                                <ul className="social-Icons">
                                    <h5>Follow Our Network</h5>
                                    <li><a href="javascript:void(0);" className="social-icon-01 ani-1"><img
                                        src="images/social-icon01.png" alt="" /></a></li>
                                    <li><a href="javascript:void(0);" className="social-icon-02 ani-1"><img
                                        src="images/social-icon02.png" alt="" /></a></li>
                                    <li><a href="javascript:void(0);" className="social-icon-03 ani-1"><img
                                        src="images/social-icon03.png" alt="" /></a></li>
                                    <li><a href="javascript:void(0);" className="social-icon-04 ani-1"><img
                                        src="images/social-icon04.png" alt="" /></a></li>
                                    <li><a href="javascript:void(0);" className="social-icon-05 ani-1"><img
                                        src="images/social-icon05.png" alt="" /></a></li>
                                    <li><a href="javascript:void(0);" className="social-icon-06 ani-1"><img
                                        src="images/social-icon06.png" alt="" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                    {/* <!--======================= FOOTER END =====================--> */}
                    {/* <!--======================= ADD WALLET POPUP =====================--> */}
                    <div className="tokens-Popup04">
                        <div className="container-Grid addfund-container">
                            <div className="addWall_msg"><i className="fas fa-check"></i> Wallet address added successfully</div>
                            <div className="Title01">Add Wallet Address Manually</div>
                            <div className="addWall_input"> <input type="text" value="Type here a wallet address" className="ani-1" />
                            </div>
                            <div className="addWall_BTN"> <a href="javascript:void(0);" className="btn btn-large ani-1 connected">ADD
                            NEW WALLET MANUALLY</a> </div>
                        </div>
                        <a href="javascript:void(0);" className="close-Icon"></a>
                    </div>
                    {/* <!--======================= ADD WALLET POPUP END =====================--> */}

                    {/* <!--======================= Unlock Jointer Popup =====================--> */}
                    <div className="unlock-Popup">
                        <div className="container-Grid addfund-container">


                            <div className="Title01">Are you sure you want to unlock <span>50,000</span> JNTR?</div>


                            <div className="addWall_BTN">
                                <a href="javascript:void(0);" className="uc-btn01">Yes</a>
                                <a href="javascript:void(0);" className="uc-btn02">Cancel</a>


                            </div>
                        </div>
                        <a href="javascript:void(0);" className="close-Icon"></a>
                    </div>
                    {/* <!--======================= Unlock Jointer POPUP END =====================--> */}


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
                            <h2>EDGE196, LLC<br />COOKIE POLICY<br />
                        Last Updated: January 1, 2020</h2>
                            <p>This cookie policy (“Policy”) describes how EDGE196, LLC, a Delaware Limited Liability Company
                            (together with its US Fund, Cayman Fund, Master Feeder and other affiliates, (the “Company”)
                            uses technologies known as cookies, pixels, beacons, device information and local storage to
                            deliver and understand your use of Company Services, including insights into member behavior, so
                            we can improve our communications, products and services. We also use these technologies for
                            security purposes and measurement. Third parties (e.g. developers) that you interact with as you
                            use the Service may also use these technologies for a variety of purposes. We aim to be
                            transparent about how these technologies are useful to you, others and us. Because cookies are
                        used to provide you with the Service, disabling them may prevent you from using the Service.</p>
                            <p>Like most similar websites, the website located at www.edge196.com (the “Site”) uses cookies. By
                            using the Site and agreeing to this policy, you consent to our use of cookies in accordance with
                            the terms of this policy. All collection and processing of personal information is done in
                        accordance with our Privacy Policy.</p>
                            <h2>Cookies</h2>
                            <p>Cookies are small files that are placed on your browser or device by the website or app you’re
                            using. Pixel tags (also called clear GIFs, web beacons, or pixels) are small blocks of code on a
                            webpage or app that allow us to do things like read and place cookies and transmit information
                            to us or our partners. The resulting connection can include information such as a device’s IP
                            address, the time a person viewed the pixel, an identifier associated with the browser or device
                        and the type of browser being used.</p>
                            <p>Cookies may be either “persistent” cookies or “session” cookies. A persistent cookie consists of
                            a text file sent that allows a website or app to store and retrieve data on a person’s computer,
                            mobile phone or other devices. Some examples include device or HTML5 local storage and caching.
                            A session cookie, on the other hand, will expire at the end of the user session, when the web
                        browser is closed.</p>
                            <p>We may place or use these technologies when you interact with our Services, whether or not you
                            are logged in. For example, when you visit our website(s) or use our applications, we may place
                            or read cookies or receive information from your devices. We may also place cookies through a
                        pixel on a partner’s site or through developer’s applications.</p>
                            <h2>Why we use Cookies</h2>
                            <p>We use Cookies for a variety of reasons. We use them to improve our Service, to make the ads you
                            see more relevant to you, to count how many visitors we receive to a page, to help you sign up
                        for our services, to protect your data, or to remember your advertising settings.</p>
                            <p>While specific names of the cookies and similar technologies that we use may change from time to
                        time as we improve and update our Service, they fall into the below categories of use:</p>
                            <h2>Authentication</h2>
                            <p>These technologies tell us when you are logged in so we can show you your dashboard, cards,
                            transactions and other information about your account. They also give us information about your
                            use of the Service that we use for a variety of reasons, including making your member experience
                        better.</p>
                            <h2>Security</h2>
                            <p>These technologies help us detect potential or real abuse, Account compromises, multiple logins,
                            and other activity. They help us determine if the browser you’re using is new and give us
                            information about active sessions related to your account. These technologies can also help us
                            detect abuse and violations of terms and policies that are in place to protect us and our
                            members, for example, attempting to determine activity is automated or human - initiated.
                    </p>
                            <h2>Features</h2>
                            <p>These technologies can help make your use of the Service smoother and easier by remembering the
                            information you provided and allowing us to tailor your experience. For example, we may be able
                            to store certain preferences or show you relevant information about your value exchanges or
                            otherwise learn when you have interacted with something on the Service.
                        Advertising</p>
                            <p>These technologies are used to help us display advertisements on other platforms or on our own
                        that may be relevant to you.</p>
                            <h2>Analytics</h2>
                            <p>We may also use the technologies for general research and to understand how members are using the
                            Service and / or third - party applications.
                    </p>
                            <h2>Cookie Consent</h2>
                            <p>We use cookies to store your preferences in relation to the use of cookies more generally. If you
                        delete this cookie, your preferences will not be remembered by the site.</p>
                            <h2>Use of Cookies on Mobile Devices</h2>
                            <p>Many mobile devices contain browsers, not unlike browsers for computers. When applicable, we will
                            use cookies in the same way we do if you are using the Service via your computer. If you consume
                            the Service on devices that use local storage, Software Development Kits (SDKs) or Advanced
                            Programming Interfaces (APIs), we will use these technologies to accomplish the same purposes.
                    </p>
                            <p>We will use information about your device in ways consistent with the above and to improve the
                            Service. We will collect and use the information on transactions including payment information
                            any applicable account, credit or debit card number and other card information, and other
                        account and authentication information relating to any transactions.</p>
                            <p>As on the web, we also may use these technologies to store an identifier or other information on
                            your device. We describe how we use these technologies and the information we received through
                        their use above.</p>
                            <h2>Reading Cookies</h2>
                            <p>Web browsers send any cookies for a particular web domain to the website each time a device with
                            those cookies accesses content served from that domain. This means that any EDGE196.com cookie
                            will be sent to us when any page is accessed at EDGE196.com by that device. It also means that
                            these cookies are sent to us when someone accesses a third-party website or application that
                        integrates or uses our Service.</p>
                            <p>We may work with partners so that we can place or read cookies on your browsers or devices when
                            you visit third-party services. This allows us to do things like read and reference cookies from
                            more than one device or browser that you use, on and off of our Service, so we can provide you
                            with consistent service across all of your devices and improve and understand your experience.
                    </p>
                            <h2>Third Party Cookies</h2>
                            <p>We sometimes use third parties in connection with the Service, including analytics providers,
                            advertising networks, and developers of applications that you can access through our platform.
                            They may use a pixel to collect information about your device so that they or we can identify
                            you. If you authorize an application on our platform, their developers may also use cookies,
                            pixels or similar technologies (like local storage or information from your device), to help
                            provide you with relevant services. For example, a developer or platform partner may use
                            cookies, software developer kits (SDKs) or similar technologies to customize your experience
                            while you’re using their app. Developers or our partners also may use these technologies to help
                        share information with us, like how you use their website or application.</p>
                            <p>Those developing on our Platform may collect information when you view or use them, including
                            information about you and your device or browser. They may do this using cookies or similar
                            technologies. We require developers to be transparent about what they collect and how they use
                            the information. To learn more about the information they collect or receive, please review
                        their privacy policies.</p>
                            <h2>Control of Cookie Settings</h2>
                            <p>Your browser or device may offer settings related to these technologies, including how to delete
                            or block them. For more information about whether these settings are available, what they do,
                            and how they work, visit your browser or device's help material. If you disable certain
                            settings, we may not be able to recognize or respond to browser or device information, and that
                        may interfere with your use of the Service or certain features of the Service. </p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Profile;