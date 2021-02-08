import React,{Component} from 'react';


const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

class Web3Provider extends Component {

    constructor(props) {
        super(props);
        this.props.fetchAccounts();
        this.props.fetchNetwork();
        this.interval = null;
        this.networkInterval = null;
    }


    componentDidMount() {
        this.props.fetchAccounts();
        this.props.fetchNetwork();
        this.initPoll();
        this.initNetworkPoll();
    }

    initPoll() {
        if (!this.interval) {
          this.interval = setInterval(this.props.fetchAccounts, ONE_SECOND);
        }
    }

    initNetworkPoll() {
        if (!this.networkInterval) {
          this.networkInterval = setInterval(this.props.fetchNetwork, ONE_MINUTE);
        }
    }


    render() {
        return null;
    }
}