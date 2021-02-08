import * as CommonAction from './CommonActions'
import CONSTANT from '../constant'

const baseUrl = CONSTANT.API_URL;

export function fetchUserTxHistory(address) {
    const route = CONSTANT.API_URL + '/jntrNote/getTxHistory/' + address
    CommonAction.SEND_GET_REQUEST(route, "FETCH_USER_REDEMPTION_TX");
}

export function updateTxHistory(txData) {
    const route = CONSTANT.API_URL + '/jntrNote/updateTxHistory';
    CommonAction.SEND_POST_REQUEST(route, { "txData": txData }, "UPDATE_REDEMPTION_TX_HISTORY");
}
