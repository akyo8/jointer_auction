import React from "react";
import { Helmet } from "react-helmet";

import * as CONSTANT from '../../Constant';

export default class ProfileLayout extends React.Component {

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
                    <title>Jointer - User</title>
                    {/* ======================= Fonts ===================== */}
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous" />
                    {/* ======================= CSS ===================== */}
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/email_verification_css/boilerplate.css?v=1.4"} />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/email_verification_css/protip.min02.css?v=1.4"} />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/izimodal/1.5.1/css/iziModal.min.css" rel="stylesheet" type="text/css" />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/email_verification_css/animate.css?v=1.4"} />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/email_verification_css/user-style.css?v=1.4"} />
                    <link rel="stylesheet" type="text/css" href={CONSTANT.PrePath + "/css/email_verification_css/user-responsive.css?v=1.4"} />
                </Helmet>
                {child}
            </div>
        )
    }
}