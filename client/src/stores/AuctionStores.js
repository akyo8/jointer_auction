import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class AuctionStores extends EventEmitter {

    constructor() {
        super();
        this.fetchedCurrenciesPrice = null;
        this.auctionDetails = null;
        this.userDetails = null;
        this.userLoggedIn = null;
        this.userProfile = null;
        this.userInvestDetails = [];
        this.userTotalInvestmentDownside = 0;
    }

    setFetchedCurrenciesPrice(respCode, respData) {
        console.log(respData)
        if (respCode === 1) {
            this.fetchedCurrenciesPrice = respData.data;
        }
        this.emit("FETCH_CURRENCIES_PRICES");
    }

    checkAddressRegisteredResponse(respCode, respData) {
        console.log(respData);
        if (respCode === 1) {
            if (respData.resp_code === 1) {
                this.userDetails = respData.data;
            }
        }
        this.emit("CHECK_ADDRESS_REGISTERED");
    }

    setInvestMentDetails(respCode, respData) {
        if (respCode === 1) {
            if (respData.resp_code === 1) {
                this.userInvestDetails = respData.data;
                this.userTotalInvestmentDownside = respData.totalInvestMent;
            }
        }
        this.emit("CHECK_ADDRESS_INVESTMENT");
    }

    setRegisterUserResponse(respCode, respData) {
        if (respCode === 1) {
            if (respData.resp_code === 1) {
                this.userDetails = respData.data;
                this.userLoggedIn = respData.data.logInStatus;
                this.userProfile = respData.data.userProfile;
            }
        }
        this.emit("USER_EMAIL_REGISTRATION");
    }

    setLoginUserResponse(respCode, respData, fromLogin) {
        console.log(respData);
        if (respCode === 1) {
            if (respData.resp_code === 1) {
                this.userLoggedIn = respData.data.logInStatus;
                this.userProfile = respData.data.userProfile;
            }
        }
        if (fromLogin)
            this.emit("USER_EMAIL_LOGIN");
        else
            this.emit("USER_WALLET_WHITELIST_UPDATE");
    }

    setAuctionDetails(respCode, respData) {
        console.log(respData)
        if (respCode === 1) {
            if (respData.resp_code === 1) {
                this.auctionDetails = respData.data;
            }
        }
        this.emit("FETCH_AUCTION_DETAILS");
    }

    getFetchedCurrenciesPrice() {
        return this.fetchedCurrenciesPrice;
    }

    getFetchedAuctionDetails() {
        return this.auctionDetails;
    }

    getUserDetails() {
        return this.userDetails;
    }

    getUserInvestDetails() {
        return this.userInvestDetails;
    }

    getUserTotalInvestmentDownside() {
        return this.userTotalInvestmentDownside;
    }

    getUserProfile() {
        return this.userProfile;
    }

    isUserLoggedIn() {
        return this.userLoggedIn;
    }

    handleActions(action) {
        switch (action.type) {
            case "FETCH_CURRENCIES_PRICES": {
                this.setFetchedCurrenciesPrice(action.resp_code, action.data)
                break;
            }

            case "CHECK_ADDRESS_REGISTERED": {
                this.checkAddressRegisteredResponse(action.resp_code, action.data)
                break;
            }

            case "USER_EMAIL_REGISTRATION": {
                this.setRegisterUserResponse(action.resp_code, action.data)
                break;
            }

            case "USER_EMAIL_LOGIN": {
                this.setLoginUserResponse(action.resp_code, action.data, true)
            }

            case "USER_PROFILE_FETCHED": {
                // this.setLoginUserResponse(action.resp_code, action.data)
            }

            case "USER_WALLET_WHITELIST_UPDATE": {
                this.setLoginUserResponse(action.resp_code, action.data, false)
            }

            case "FETCH_AUCTION_DETAILS": {
                this.setAuctionDetails(action.resp_code, action.data)
            }

            case "CHECK_ADDRESS_INVESTMENT": {
                this.setInvestMentDetails(action.resp_code, action.data)
            }

            default: {
            }
        }
    }
}
const auctionStores = new AuctionStores();
dispatcher.register(auctionStores.handleActions.bind(auctionStores));

export default auctionStores;