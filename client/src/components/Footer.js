import React, { Component } from "react";

const $ = window.$;

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    openPopUpFooter(){
        console.log("Called inside ");
    }

    componentDidMount(){
        this.setState({
            loading: false
        })
    }

    render() {
        console.log(this.props)
        if(this.state.loading)
            return (<h4>Loading</h4>)
        return (
            <div>
                {/* <footer className="footer">
                    <div className="footer-Block">
                        <div className="footer-left">
                            <div className="footer-logo"> <a href="javascript:void(0);"><img src="images/footer-logo.png" alt="" /></a> <span className="f-Link"> <a href="javascript:void(0);" className="ani-1">add opportunities</a> <a href="javascript:void(0);" className="ani-1">HOW IT WORKS</a> <a href="javascript:void(0);" className="ani-1">Contact Us</a> <a href="javascript:void(0);" className="ani-1 yellow-Color">Invest Us</a> </span> </div>
                            <p><span>© JOINTER 2016-2019</span> <a href="javascript:void(0);" className="ani-1">Privacy Policy</a> | <a href="javascript:void(0);" className="ani-1">Term of Use</a> | <a href="javascript:void(0);" className="ani-1">Cookie Policy</a> </p>
                            <p>Blockchain solutions for commercial real estate, providing increased liquidity, improved returns, and minimized risk</p>
                        </div>
                        <div className="footer-right">
                            <ul className="social-Icons">
                                <h5>Follow Our Network</h5>
                                <li><a href="javascript:void(0);" className="social-icon-01 ani-1"><img src="images/social-icon01.png" alt="" /></a></li>
                                <li><a href="javascript:void(0);" className="social-icon-02 ani-1"><img src="images/social-icon02.png" alt="" /></a></li>
                                <li><a href="javascript:void(0);" className="social-icon-03 ani-1"><img src="images/social-icon03.png" alt="" /></a></li>
                                <li><a href="javascript:void(0);" className="social-icon-04 ani-1"><img src="images/social-icon04.png" alt="" /></a></li>
                                <li><a href="javascript:void(0);" className="social-icon-05 ani-1"><img src="images/social-icon05.png" alt="" /></a></li>
                                <li><a href="javascript:void(0);" className="social-icon-06 ani-1"><img src="images/social-icon06.png" alt="" /></a></li>
                            </ul>
                            <p>Do you have a website? <a href="javascript:void(0);" className="ani-1">click here</a> to add your website to our network </p>
                            <p>with 115,000+ comercial investors & professional members.</p>
                        </div>
                    </div>
                </footer>
                <div className="Btns">
                    <a href="javascript:void(0);" className="ycpBTN">Your Current Performance &nbsp;&nbsp;<i className="fas fa-caret-square-up ani-1"></i></a>
                    <a href="javascript:void(0);" className="jiBonusBTN">Unlock 2 Bonuses by Reaching Goals &nbsp;&nbsp;<i className="fas fa-caret-square-up ani-1"></i></a>
                </div>

                <section className="ycpSection">
                    <div className="ycpContainer">
                        <div className="ycpBox" id="ycpOBox">
                            <div className="ycpMainbox">
                                <div className="ycpsubbox01 ycpIcon01">Total Investment<span>$275,000</span></div>
                                <div className="ycpsubbox01 ycpIcon02">Total Notes Won<span>5,000</span></div>
                                <div className="ycpsubbox01 ycpIcon03">Total Notes’ Value <span className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Help Text Here" aria-hidden="true"></i></span><span>$500,000</span></div>
                                <div className="ycpsubbox01 ycpIcon04">Total ROI<span>181.81%</span></div>
                                <div className="ycpsubbox01"><a href="javascript:void(0)" onClick={()=>this.openPopUpFooter()}>Invest Now 1</a></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="jiBonus-Section">
                    <div id="jiBonus-Box">
                        <div className="container-Grid">
                            <div className="jiBonus-Box">
                                <div className="jiB-Box01">
                                    <div className="jiB-Subbox jiB-icon01"> <span>Group</span> Higher investment than yesterday will trigger further supply. The more invested, the greater the discount
                    <div className="jiB-socialBox"> <span>Share to Grow the Discount</span>
                                            <div>
                                                <ul className="social-Icons">
                                                    <li><a href="javascript:void(0);" className="social-icon-01 ani-1"><img src="images/social-icon01.png" alt="" /></a></li>
                                                    <li><a href="javascript:void(0);" className="social-icon-02 ani-1"><img src="images/social-icon02.png" alt="" /></a></li>
                                                    <li><a href="javascript:void(0);" className="social-icon-03 ani-1"><img src="images/social-icon03.png" alt="" /></a></li>
                                                    <li><a href="javascript:void(0);" className="social-icon-07 ani-1 popup03"><img src="images/social-icon07.png" alt="" /></a></li>
                                                </ul>
                                            </div> </div>
                                    </div>
                                </div>
                                <div className="jiB-Box01">
                                    <div className="jiB-Subbox jiB-icon02"> <span>Individually</span> Earn based on your percentage to the group.<br />
                                        The more you invest the greater your personal multiplier
                    <div className="multiplier-Box">
                                            <span><i className="fas fa-question-circle"></i></span>
                                            <div className="multiplier-Box01" tabIndex="-1">
                                                <div className="jiTitle03">Your Current Individual Multiplier</div>
                                                <div className="popup03-Title01"><span>1.5X (40%)</span> <a href="javascript:void(0);" className="ji-btn02 ani-1 popup01" style={{ "display": "inline-block" }}>Add Contribution</a></div>
                                                <div className="jiB-table01 hideMobile">
                                                    <table width="100%" border="1" bordercolor="#000000" cellSpacing="0" cellPadding="5">
                                                        <tbody>
                                                            <tr>
                                                                <th align="left" valign="middle" scope="row">% of Daily Contribution</th>
                                                                <td align="center" valign="middle">&gt;25%</td>
                                                                <td align="center" valign="middle">&gt;50%</td>
                                                                <td align="center" valign="middle">&gt;75%</td>
                                                                <td align="center" valign="middle">&gt;95%</td>
                                                            </tr>
                                                            <tr>
                                                                <th align="left" valign="middle" scope="row">Multiplier Bonus</th>
                                                                <td align="center" valign="middle">1.25X</td>
                                                                <td align="center" valign="middle">1.5X</td>
                                                                <td align="center" valign="middle">1.75X</td>
                                                                <td align="center" valign="middle">2X</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="jiB-table01 showMobile">
                                                    <table width="100%" border="1" bordercolor="#000000" cellSpacing="0" cellPadding="5">
                                                        <tbody>
                                                            <tr>
                                                                <th align="left" valign="middle" scope="row">% of Daily Contribution</th>
                                                                <th align="left" valign="middle" scope="row">Multiplier Bonus</th>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" valign="middle">&gt;25%</td>
                                                                <td align="center" valign="middle">1.25X</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" valign="middle">&gt;50%</td>
                                                                <td align="center" valign="middle">1.5X</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" valign="middle">&gt;75%</td>
                                                                <td align="center" valign="middle">1.75X</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" valign="middle">&gt;95%</td>
                                                                <td align="center" valign="middle">2X</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div><br />

                                        <strong className="cont-Text">Invest <strong className="orange-text">$35,000</strong> today for a chance at <strong className="orange-text">1.5x</strong></strong><br />
                                        <a href="javascript:void(0);" className="ji-btn02 ani-1 popup01" id="addContribution03" onClick={this.props.openPopUp} style={{ display: "inline-block" }}>Invest Now</a> </div>
                                </div>
                                <a href="javascript:void(0);" className="down-Scroll"><i className="fas fa-angle-down"></i></a>
                            </div>
                            <div className="jiAuc-mainbox" id="auction-Detail">
                                <div className="jiAuc-subbox">
                                    <div className="jiAucs-Title01">Simulate today's Auction<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Total investments by the group" aria-hidden="true"></i></i></div>
                                    <div className="jiAucs-Title02">
                                        <input type="text" defaultValue="$300,000" />
                                    </div>
                                    <div className="jiAucs-Title03">Total Group Investment</div>
                                    <div className="jiAucs-Title04"><span style={{ width: "40%" }}>Total Supply:</span><span>204,010 Notes</span></div>
                                </div>
                                <div className="jiAuc-subbox">
                                    <div className="jiAucs-Title01">Simulate Your Individual Bonus<i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Your investments compared to the group's investments" aria-hidden="true"></i></i></div>
                                    <div className="jiAucs-Title02">
                                        <input type="text" defaultValue="$42,315.35" />
                                    </div>
                                    <div className="jiAucs-Title03">Your Investment</div>
                                    <div className="jiAucs-Title04"><span>Notes you Won:</span><span>27,063</span></div>
                                    <div className="jiAucs-Title04"><span>Multiplier Bonus:</span><span>1.25x</span></div>
                                    <div className="jiAucs-Title04"><span>Total Notes for you:</span><span>33,828.75</span></div>
                                </div>
                                <div className="jiAuc-subbox">
                                    <div className="jiAucs-Title01">Your Potential Discount <i className="help-circle"><i className="fas fa-question-circle protip" data-pt-position="top" data-pt-title="Based on simulating the group and individual bonuses" aria-hidden="true"></i></i></div>
                                    <div className="jiAucs-Title02-2 green-Color"> -27.9%</div>
                                    <div className="jiAucs-Title03">[Based on forecast of $1.276]</div>
                                    <a href="javascript:void(0);" className="ji-btn01 ani-1" id="addContribution04" onClick={this.props.openPopUp}>Invest Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>
        )
    }
}

export default Footer;