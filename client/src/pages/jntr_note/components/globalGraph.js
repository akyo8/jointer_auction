
import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import ContractData from '../../../ContractData'
import logo from '../../../assets/jntr_note/images/footer-logo.png';
import close_btn from '../../../assets/jntr_note/images/close-btn.png';
import DECIMALS from '../../../decimalConstant'
import * as notification from '../../../components/notification';


const $ = window.$;
const jQuery = window.jQuery;

class GlobalGraph extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    intitSideBars = async () => {

    }

    componentDidMount = async () => {
        // this.intitSideBars();
        $(document).ready(function () {
            setTimeout(function () {
                // window.SetChartsData();
            }, 3000)

            // window.SetProfitCulculator();
        })

    }



    render() {
        return (
            <div className="global-Chart wow fadeInLeft" data-wow-delay="0.5s">
                <div className="wrapper">
                    <div className="multiFamilybox" data-aos="fade-left" data-aos-delay="400">
                        {/* <!--<div className="headingTitle">Multifamily National Avg.<span>vs</span>S&P 500</div>--> */}
                        <div className="subTitlebox">
                            <div className="chart-Titlebox">
                                <div className="amount-Box">
                                    <div className="amt-Text">$1.027623 <span>+$128.04[1.38%]</span></div>
                                </div>
                                <div className="duration-Box">
                                    <ul>
                                        <li><a href="javscript:void(0);">mtd</a></li>
                                        <li><a href="javscript:void(0);">qtd</a></li>
                                        <li><a href="javscript:void(0);">ytd</a></li>
                                        <li><a href="javscript:void(0);">1d</a></li>
                                        <li><a href="javscript:void(0);">1w</a></li>
                                        <li><a href="javscript:void(0);">1m</a></li>
                                        <li className="active"><a href="javscript:void(0);">all</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="map-box note-Bg">
                                <div id="chart1"></div>
                            </div>
                        </div>
                    </div>
                    <div className="chart-Detail">
                        <ul>
                            <li>Market Cap <span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Market Capitalization in USD" aria-hidden="true"></i></span>
                                <span className="amount-Text">$162.5 B</span>
                            </li>
                            <li>Volume [24 Hours] <span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="24 hour trading volume in USD" aria-hidden="true"></i></span>
                                <span className="amount-Text">$15.8 B</span>
                            </li>
                            <li>Circulating Supply <span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Total JNTR supply" aria-hidden="true"></i></span>
                                <span className="amount-Text">$17.8 B</span>
                            </li>
                            <li>All-Time High <span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Highest JNTR price in USD" aria-hidden="true"></i></span>
                                <span className="amount-Text">$20,089</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default GlobalGraph;
