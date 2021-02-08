import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import ContractData from '../../../ContractData'
import logo from '../../../assets/jntr_note/images/footer-logo.png';
import close_btn from '../../../assets/jntr_note/images/close-btn.png';
import DECIMALS from '../../../decimalConstant'
import * as notification from '../../../components/notification';


const $ = window.$;
const jQuery = window.jQuery;

class JNTRValueInfo extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    intitSideBars = async () => {
    }

    componentDidMount = async () => {
    }

    render() {
        return (
            <div className="token-Block">
                <div className="container-Full">
                    <div className="Title01 wow fadeInDown" data-wow-delay="0.3s">JNTR</div>
                    <p className="wow fadeInLeft" data-wow-delay="0.5s">JNTR is a liquidity bridge designed as a transfer of value between JNTR/ETN, JNTR/STOCK, and assets on the Ethereum network.</p>
                    <div className="token-Wrap">
                        <div className="token-Box wow fadeInUp" data-wow-delay="0.3s">
                            <div className="token-Box01">
                                <div className="token-Title"><span className="icon-Box icon01"></span><strong>JNTR Value</strong></div>
                                <ul>
                                    <li><span>JNTR's starting face value is $0.01 USD.</span></li>
                                    <li><span>Changes based on market demand.</span></li>
                                    <li><span>Jointer contributes 10% of all funds raised to support the Liquidity Reserves.</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="token-Box wow fadeInUp" data-wow-delay="0.4s">
                            <div className="token-Box01">
                                <div className="token-Title"><span className="icon-Box icon02"></span><strong>JNTR Minting</strong></div>
                                <ul>
                                    <li><span>Jointer will pre-mint $15M worth of JNTR.</span></li>
                                    <li><span>Ongoing minting is based on the ongoing daily auction results.</span></li>
                                    <li><span>Day 1 of the auction Jointer will mint 50,000 JNTR tokens.</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="token-Box wow fadeInUp" data-wow-delay="0.5s">
                            <div className="token-Box01">
                                <div className="token-Title"><span className="icon-Box icon03"></span><strong>Trading</strong></div>
                                <ul>
                                    <li><span>JNTR can be purchased every day using Jointer’s auction program, exchanges, or from Jointer’s reserve.</span></li>
                                    <li><span>Reserve provides liquidity using circuit breakers on Bancor.</span></li>
                                    <li><span>JNTR can be converted to JNTR/ETN or JNTR/STOCK tokens at any time.</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="token-Box wow fadeInUp" data-wow-delay="0.6s">
                            <div className="token-Box01">
                                <div className="token-Title"><span className="icon-Box icon04"></span><strong>Regulation</strong></div>
                                <ul>
                                    <li><span>JNTR complies with US Reg D 506(c) and Internationally Reg S. </span></li>
                                    <li><span>Jointer created a patent-pending Declaration of Authorized Rights in addition to a traditional whitelist. </span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JNTRValueInfo;