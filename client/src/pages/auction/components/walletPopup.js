
import React, { PureComponent } from "react";
import ContractData from '../../../ContractData'
import DECIMALS from '../../../decimalConstant'

import * as notification from '../../../components/notification';
import StorageStore from '../../../stores/StorageStore'

const $ = window.$;
const jQuery = window.jQuery;

class WalletPopup extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentWillReceiveProps(nextProps) {

        if (this.props.accounts !== nextProps.accounts) {
            console.log("HERE_INVESTMENT_ACCOUNT")
            this.initInstance(nextProps.web3Provider);
        }

    }

    render() {

        return (
            // <!--======================= WALLET POPUP START =====================--> 
            <div className="main-Popup wallet-Popup">
                <div className="container-Grid">
                    <div className="wallet-popupBlock">
                        {/* <div className="search-Bx"> <a href="javascript:void(0);"><span className="icon-Box"><i className="fas fa-search"></i></span></a>
                            <input type="text" placeholder="Search wallet by Name dsdsds" /> </div> */}

                        <div className="jiTitle03">Connect Your Wallet</div>

                        <div className="wallet-boxWrap">
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box"> <img src="images/wallet-icon01.png" alt="" className="img-fluid" />
                                    <div className="title-Name">MetaMask</div>
                                </div>
                                {
                                    this.props.web3Provider.metaMaskInstalled ?
                                        <a href="javascript:void(0);" className="faux-Link" onClick={() => this.props.connectMetamask(true)}></a>
                                        :
                                        <a href="https://metamask.io" target="_blank" className="faux-Link"></a>
                                }
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon03.png" alt="" className="img-fluid" />
                                    <div className="title-Name">Guarda</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon02.png" alt="" className="img-fluid" />
                                    <div className="title-Name">MyEtherWallet</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon04.png" alt="" className="img-fluid" />
                                    <div className="title-Name">Mist</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon05.png" alt="" className="img-fluid" />
                                    <div className="title-Name">Exodus</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon06.png" alt="" className="img-fluid" />
                                    <div className="title-Name">Atomic</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon07.png" alt="" className="img-fluid" />
                                    <div className="title-Name">Jaxx</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon08.png" alt="" className="img-fluid" />
                                    <div className="title-Name">Ethaddress</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon09.png" alt="" className="img-fluid" />
                                    <div className="title-Name">TrustWallet</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon10.png" alt="" className="img-fluid" />
                                    <div className="title-Name">Coinomi</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon11.png" alt="" className="img-fluid" />
                                    <div className="title-Name">Bread Wallet</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                            <div className="wallet-Bx ani-1">
                                <div className="img-Box disableCBTN"> <img src="images/wallet-icon12.png" alt="" className="img-fluid" />
                                    <div className="title-Name">imToken Wallet</div>
                                </div>
                                <a href="javascript:void(0);" className="faux-Link"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="javascript:void(0);" onClick={() => { this.props.closePopUp(".wallet-Popup") }} className="close-Icon ani-1"><img src="images/close-btn.png" alt="" /></a>
            </div>
            // <!--======================= WALLET POPUP END =====================--> 
        )
    }
}

export default WalletPopup;
