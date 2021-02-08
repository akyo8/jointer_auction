import React from "react";
import { Helmet } from "react-helmet";

import * as CONSTANT from '../../Constant';

const $ = window.$;

export default class JointerAuctionLayout extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: true
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render() {
        const child = this.state.loading ? <h6>loading</h6> : this.props.children;
        return (
            <div>
                <Helmet>
                    <title>Jointer Investment</title>
                    <link
                        href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
                        rel="stylesheet" />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/boilerplate.css?v=1.4"} />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/protip.min02.css?v=1.4"} />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/animate.css?v=1.4"} />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/jquery.mCustomScrollbar.css?v=1.4"} />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/user-style.css?v=1.4"} />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/user-responsive.css?v=1.4"} />
                </Helmet>
                {child}
            </div>
        )
    }
}