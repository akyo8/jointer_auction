
import iziToast from "izitoast";

var msgPos = "topRight";

export const successMsg = (id,msg) => {
    iziToast.success({ id :id ,position: msgPos, message: msg });
}

export const errorMsg = (id,msg) => {
    iziToast.error({id :id , position: msgPos, message: msg });
}

export const warningMsg = (id,msg) => {
    iziToast.warning({ id :id , position: msgPos, message: msg });
}

export const Msg = {
    ALREADY_LOGGED_IN: "You are already logged in",
    USER_DENIED_ACCOUNT_AUTHORIZATION: "Wallet Integration Denied",
    USER_REGISTERATION_INFORM: "Your wallet address is not registered yet please register first",
    USER_WALLET_FOUND: "Wallet Logged In Successfully!",
    USER_EMAIL_REGISTRATION_SUCCESS: "Registeration Successful",
    USER_LOGIN_SUCCESS: "Login Successful",
    USER_LOGIN_NOT_REGISTERED: "You are not registered yet please register first",
    INSUFFICIENT_FUNDS: "Insufficient Funds For This Request",
    TOKEN_TRANSFER_APPROVE: "Token Transfer Approved.Now you can send order.",
    TRANSACTION_REJECTED: "Transaction Rejected",
    WALLET_ADDRESS_WHITELISTING_FROM_INVALID_ADDRESS: "You have to whitelist new wallet from main wallet!",
    WALLET_ADDRESS_WHITELISTED: "Your wallet is successfully added to whitelist!",
    WALLET_ADDRESS_WHITELISTED_REJECTED: "Your wallet is not added to whitelist!",
    UNLOCK_TOKEN_SUCCESS: "Token unlocked successfully!",
    UNLOCK_TOKEN_FAILED: "Error while unlocking your tokens!",
    UNLOCK_TOKEN_DENIED: "You could not unlock your JNTR!",
    CANCEL_INVESTMENT_SUCCESS: "Investment canceled successfully!",
    CANCEL_INVESTMENT_FAILED: "Error while canceling your investment!",
    CANCEL_INVESTMENT_DENIED: "You could not cancel your investment!",
}