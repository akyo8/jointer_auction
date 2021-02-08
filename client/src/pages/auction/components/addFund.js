
import React, { Component } from "react";
import { Link } from 'react-router-dom';

// import logo from '../../../assets/auction/images/logo.png';
import close_btn from '../../../assets/auction/images/close-btn.png'

import token_icon05 from '../../../assets/auction/images/token-icon05.png';
import token_icon06 from '../../../assets/auction/images/token-icon06.png';
import token_icon07 from '../../../assets/auction/images/token-icon07.png';
import ssc_png from '../../../assets/auction/images/ss-c.png';


const $ = window.$;
const jQuery = window.jQuery;

class AddFund extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        $("#addFund .tab-Link02").hover(function () {
            $(".tab-Link02").removeClass("active")
            $(this).addClass("active")
            $(".tab-Content02").hide();
            $("#" + $(this).attr("data-id")).show();
        });
    }

    render() {
        return (
            <div className="tokens-Popup05" id="addFund">
                <div className="container-Grid addfund-container">
                    <div className="jiTitle03">Add fund to your wallet</div>
                    <div className="tab-Nav">
                        <a href="javascript:void(0)" className="tab-Link02 ani-1 active" data-id="tab-4">Debit / Credit Card</a>
                        <a href="javascript:void(0)" className="tab-Link02 ani-1 hideMobile" data-id="tab-5">USA Banking Wiring</a>
                        <a href="javascript:void(0)" className="tab-Link02 ani-1 hideMobile" data-id="tab-6">International Bank Wiring</a>
                    </div>
                    <div className="tab-Content02" id="tab-4">
                        <div className="token-Box">
                            <div className="token-Box02 ani-1">
                                <div className="img-Box">
                                    <img src={token_icon05} alt="" className="img-fluid" />
                                    <div className="title-Name">Wyre</div>
                                </div>
                                <a href="https://www.sendwyre.com" target="_blank" className="faux-Link"></a>
                            </div>
                            <div className="token-Box02 ani-1">
                                <div className="img-Box">
                                    <img src={token_icon06} alt="" className="img-fluid" />
                                    <div className="title-Name">Coinswitch</div>
                                </div>
                                <a href="https://coinswitch.co" target="_blank" className="faux-Link"></a>
                            </div>
                            <div className="token-Box02 ani-1">
                                <div className="img-Box">
                                    <img src={token_icon07} alt="" className="img-fluid" />
                                    <div className="title-Name">Coinmama</div>
                                </div>
                                <a href="https://www.coinmama.com" target="_blank" className="faux-Link"></a>
                            </div>
                        </div>
                    </div>
                    <div className="tab-Nav showMobile">
                        <a href="javascript:void(0)" className="tab-Link02 ani-1 showMobile" data-id="tab-5">USA Banking Wiring</a>
                    </div>
                    <div className="tab-Content02" id="tab-5">
                        <div className="token-Box">
                            <div className="token-Box02 ani-1">
                                <div className="img-Box">
                                    <div className="coming-Soon">Coming <br />Soon</div>
                                </div>
                                <a href="javascript:void(0)" className="faux-Link"></a>
                            </div>
                        </div>
                    </div>
                    <div className="tab-Nav showMobile">
                        <a href="javascript:void(0)" className="tab-Link02 ani-1 showMobile" data-id="tab-6">International Bank Wiring</a>
                    </div>
                    <div className="tab-Content02" id="tab-6">
                        <div className="token-Box">
                            <div className="token-Box02 ani-1">
                                <div className="img-Box">
                                    <img src={ssc_png} alt="" className="img-fluid" />
                                    <div className="title-Name">SS & C</div>
                                </div>
                                <a href="javascript:void(0)" className="faux-Link"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="javascript:void(0)" onClick={() => { this.props.closePopUp(".tokens-Popup05") }} className="close-Icon"><img src={close_btn} alt="" /></a>
            </div>

        );
    }
}

export default AddFund;
