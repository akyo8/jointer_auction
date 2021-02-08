import * as CommonAction from './CommonActions'
import CONSTANT from '../constant'

const baseUrl = CONSTANT.API_URL;

export function fetchCurrenciesPrices() {
    const route = CONSTANT.API_URL + '/auction/getCurrencyPrice'
    CommonAction.SEND_GET_REQUEST(route, "FETCH_CURRENCIES_PRICES");
}

export function fetchAuctionDetails() {
    const route = CONSTANT.API_URL + '/auction/getAuctionDetails'
    CommonAction.SEND_GET_REQUEST(route, "FETCH_AUCTION_DETAILS");
}

export function checkAddressRegistered(address) {
    const route = CONSTANT.API_URL + '/whiteList/findUserByAddress/' + (address).toLowerCase()
    CommonAction.SEND_GET_REQUEST(route, "CHECK_ADDRESS_REGISTERED");
}

export function getAddressInvestMent(address) {
    const route = CONSTANT.API_URL + '/auction/getUserInvestMent/' + (address).toLowerCase()
    CommonAction.SEND_GET_REQUEST(route, "CHECK_ADDRESS_INVESTMENT");
}

export function userRegister(email, countryCode, phone, address) {
    const route = CONSTANT.API_URL + '/whiteList/addUser'
    CommonAction.SEND_POST_REQUEST(route, { "email": email, "countryCode": countryCode, "phone": phone, "address": (address).toLowerCase() }, "USER_EMAIL_REGISTRATION");
}

export function userLogin(email, address) {
    const route = CONSTANT.API_URL + '/whiteList/findUserByEmail';
    CommonAction.SEND_POST_REQUEST(route, { "email": (email).toLowerCase(), "address": (address).toLowerCase() }, "USER_EMAIL_LOGIN");
}

export function updateWalletList(email, address) {
    const route = CONSTANT.API_URL + '/whiteList/updateWalletList';
    CommonAction.SEND_POST_REQUEST(route, { "email": (email).toLowerCase(), "address": (address).toLowerCase() }, "USER_WALLET_WHITELIST_UPDATE");
}

export function clearUserInvestmentDownside(address) {
    const route = CONSTANT.API_URL + '/auction/clearDownsideUserInvestment';
    CommonAction.SEND_POST_REQUEST(route, { "address": (address).toLowerCase() }, "CLEAR_DOWNSIDE_INVESTMENT");
}
