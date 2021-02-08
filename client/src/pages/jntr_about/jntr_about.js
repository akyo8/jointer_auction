import React, { PureComponent } from "react";

import wowjs from 'wowjs';
import moment from 'moment';
import DECIMALS from '../../decimalConstant';
import { PrePath } from '../../constant'
 
 

// import '../../assets/jntr_note/css/boilerplate.css';
// import '../../assets/jntr_note/css/protip.min02.css';
// import '../../assets/jntr_note/css/animate.css';
// import '../../assets/jntr_note/css/jointer-style.css';
// import '../../assets/jntr_about/css/style-a.css'; 


const $ = window.$;
const Window = window;
const jQuery = window.jQuery;
const NERWORK_ID = 3;


export default class JNTRAbout extends PureComponent {


    constructor(props) {
        super(props); 
    }

   

    componentWillMount() {
      
        require('../../assets/jntr_about/css/jointer-about-style.css');
        require('../../assets/jntr_about/css/jointer-about-responsive.css'); 

    }

    componentWillUnmount() {
 
    }

    componentDidMount() {

      this.showWowAnimation();
      this.loadScript( PrePath + "/js/custom_2.js", function () {});

      $('.circle01, .circle02, .circle03, .circle04').circleProgress({
        value: 0.60,
        fill: {
          color: '#faba37'
        },
        emptyFill: '#50575b',
        size: 180.0,
        thickness: 9,
        animation: {
          duration: 6000,
          easing: 'circleProgressEasing'
        },
  
      });

      $(window).scroll(function () {
        var scroll;
        $(window).width() > 767 && ($(window).scrollTop() >= 100 ? $(".headerTopWrap").addClass("active") : $(
          ".headerTopWrap").removeClass("active"))
      })
 
    }
    showWowAnimation = async () => {
      var wow = new wowjs.WOW(
          {
              boxClass: 'wow',      // default
              animateClass: 'animated', // default
              offset: 0,          // default
              mobile: false,       // default
              live: true        // default      
          }
      )
      wow.init();
  }
  
  loadScript(src, callback) {
    var s,
      r,
      t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function () {

      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        callback();
      }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }
 

    render() {
 

        return (
            <main id="main" className="jntr_about">
  
    <div className="headerTopWrap wow fadeInDown">
      <div className="Logo-Text"> 
      <a href="javascript:void(0);" className="sitelogo clearfix" title="Jointer">
          <img src={PrePath + "/images/jntr_about/logo.png"} alt="" /></a> 
      <span className="award-text">
        <img src={PrePath + "/images/jntr_about/award-icon.png"}
            alt="" /><span>Award Winning Company</span></span> </div>
      <div className="header-Rightbox">
        <nav className="rgdev green-btn clearfix">
          <ul className="mobile-sub rgdev-list">
            <li className="rgdev-item"><a href="http://auction.jointer.io/" target="_blank" title="LIVE AUCTION"
                className="investnow-Btn ani-1">Live Auction</a></li>
          </ul>
          <div className="rgdev-mobile"><span className="icon-bar"></span> <span className="icon-bar"></span><span
              className="icon-bar"></span></div>
          <div className="rgdev-text">Navigation</div>
        </nav>

      </div>
    </div>

    <div className="jntr-About-block">
      <div className="wrapper">
        <div className="sectionhead04 wow fadeInDown" data-wow="fade-down" data-wow-delay="100">ABOUT US</div>
        <div className="about-Titletext wow fadeInUp" data-wow="fade-up" data-wow-delay="100">Jointer is passionately developed by a team
          dedicated towards universal inclusion into commercial real estate by making the industry more profitable, more
          liquid, more efficient, and less risky for all.</div>
        <div className="about-Text wow fadeInUp" data-wow="fade-up" data-wow-delay="100">The team's background includes a $400B+ combined
          market cap worth of business experience based in Silicon Valley. Alongside the team is a prestigious advisory
          group includes Nobel Prize Winners, the previous Chairman of the SEC, the previous Vice Chairman of the
          NASDAQ, founder of Visa, the previous Chief Economist of the U.S. Department of State, Founder of CIS, the CFO
          of Yahoo, the co-creator of Bitcoin’s prototype and other luminaries.</div>
        <div className="investor-Ring wow zoomIn">
          <div className=" investor-ring01">
            <div className="circle01"><span>250%</span></div>
            InvestorS ROI since launch
          </div>
          <div className="investor-ring01">
            <div className="circle02"><span>$6B</span></div>
            In Available Opportunities
          </div>
          <div className="investor-ring01">
            <div className="circle03"><span>$2.5MM</span></div>
            TOTAL INVESTMENT TO DATE
          </div>
          <div className="investor-ring01">
            <div className="circle04"><span>250k+</span></div>
            Global Community MEMBERS
          </div>
        </div>
      </div>
    </div>
    <div className="background-Block">
      <div className="wrapper">
        <div className="sectionhead04 wow fadeInDown" data-wow="fade-down" data-wow-delay="100">Background</div>
        <div className="background-Text wow fadeInUp" data-wow="fade-up" data-wow-delay="100">Jointer is a multi-award winning company
          established in 2017. In addition to Draper Venture Network inclusion, Jointer is a multi-award winning
          company, including a $1,000,000 “Best Startup in the World” prize in 2018 during a worldwide competition
          between 4,000 startups and 196 countries, winner of the Disruptive Startup Award at Stanford University in
          2019 by a panel of Google, SoftBank, Bain Capital, Thomson Reuters, Stanford Angels, BMW, Andreessen, NEA, and
          other top VC Funds, first place for the Disruptor Daily “Blockchain in Real Estate” Disruptor Award, and the
          most promising venture from the Carnegie Mellon University US-China Innovation and Entrepreneurship
          Association.</div>
      </div>
    </div>
    <div className="award-Box">
      <div className="wrapper">
        <div className="sectionhead04 wow fadeInDown" data-wow="fade-down" data-wow-delay="100">Award Winning Company</div>
        <div className="award-Boxwrap">
          <div className="award-Box01 wow fadeInLeft" data-wow="fade-right" data-wow-delay="200">
            <div className="award-List">
              <div className="award-List01">
                <div className="award-Icon">
                  <p><span className="yellow-Color">#1 Place</span> Best Fintech Startup</p>
                </div>
                <div className="award-Text">
                  <strong>$1,000,000</strong> prize winner during the worldwide EDGE 196 competition between 4,000
                  startups and 196 countries
                </div>
              </div>
              <div className="award-List01">
                <div className="award-Icon">
                  <p>Stanford University Award</p>
                </div>
                <div className="award-Text">
                  The Disruptive Startup Award at Stanford University in 2019 by a panel of Google, SoftBank, Bain
                  Capital, Andreessen
                </div>
              </div>
              <div className="award-List01">
                <div className="award-Icon">
                  <p><span className="yellow-Color">#1 Place</span> Blockchain Disruptor Award</p>
                </div>
                <div className="award-Text">
                  Winner of the Disruptor Daily “Blockchain in Real Estate”
                </div>
              </div>
              <div className="award-List01">
                <div className="award-Icon">
                  <p>Most Promising Venture</p>
                </div>
                <div className="award-Text">
                  The Carnegie Mellon University U.S.-China Innovation and Entrepreneurship Association
                </div>
              </div>
            </div>
          </div>
          <div className="award-Box01 wow fadeInRight" data-wow="fade-left" data-wow-delay="200">
            <div className="img-Box"> <img src={PrePath + "/images/jntr_about/award.jpg"} alt="" /> </div>
          </div>
        </div>
      </div>
    </div>
    <div className="Tokenomics">
      <div className="wrapper">
        <div className="sectionhead04 wow fadeInDown" data-wow="fade-down" data-wow-delay="200">Our Solutions</div>
        <div className="tokenomics-Box">
          <div className="tokenomics-Box01 wow fadeInUp" data-wow="fade-up" data-wow-delay="200">
            <div className="icon-Box"> <img src={PrePath + "/images/jntr_about/jointer-swap.png"} alt="" /> </div>
            <div className="text-Box">
              <div className="text-Title01">Digital Liquidity Bridge</div>
              <div className="text-Title02">JNTR</div>
            </div>
            <ul className="list-Box">
              <li><span>Offered for purchase daily via auction as an open-ended fund</span></li>
              <li><span>Immediate liquidity on Jointer's Reserve</span></li>
              <li><span>Swappable to JNTR/ETN or JNTR/STOCK at any time</span></li>
            </ul>
          </div>
          <div className="tokenomics-Box01 wow fadeInUp" data-wow="fade-up" data-wow-delay="300">
            <div className="icon-Box"> <img src={PrePath + "/images/jntr_about/jointer-etn.png"}  alt="" /> </div>
            <div className="text-Box">
              <div className="text-Title01">Digital Exchange-Traded Note</div>
              <div className="text-Title02">JNTR/ETN</div>
            </div>
            <ul className="list-Box">
              <li><span>ETN value follows the Dow Jones Global Select REIT Index with 2X leverage</span></li>
              <li><span>Convertible to JNTR or JNTR/STOCK at any time</span></li>
              <li><span>Jointer will honor ETN current market value based on index changes</span></li>
            </ul>
          </div>
          <div className="tokenomics-Box01 wow fadeInUp" data-wow="fade-up" data-wow-delay="400">
            <div className="icon-Box"> <img src={PrePath + "/images/jntr_about/jointer-stock.png"} alt="" /> </div>
            <div className="text-Box">
              <div className="text-Title01">Digital Preferred Equity </div>
              <div className="text-Title02">JNTR/STOCK</div>
            </div>
            <ul className="list-Box">
              <li><span>Gains value based on Jointer's valuation</span></li>
              <li><span>Secondary market liquidity</span></li>
              <li><span>Convertible to JNTR or JNTR/ETN at any time</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="our-Vision">
      <div className="wrapper">
        <div className="img-Box wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
          <img src={PrePath + "/images/jntr_about/vision-img.png"} alt="" />
        </div>
        <div className="sectionhead04" data-wow="fade-down" data-wow-delay="100">Our Vision</div>
        <div className="vision-Text" data-wow="fade-left" data-wow-delay="100">Jointer strives to simplify the commercial
          real estate industry so that every investor, even one with zero knowledge or experience, will have the
          opportunity to syndicate funds and invest in this historically lucrative asset class.</div>
      </div>
    </div>

    <div className="our-Dna">
      <div className="wrapper">
        <div className="sectionhead04 wow fadeInDown" data-wow="fade-down" data-wow-delay="100">Our DNA</div>
        <div className="dna-Box">
          <div className="dna-Box01">
            <a href="javascript:void(0);" className="wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
              <img src={PrePath + "/images/jntr_about/dna-01.png"} alt="" /></a>
          </div>
          <div className="dna-Box01">
            <a href="javascript:void(0);" className="wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
              <img src={PrePath + "/images/jntr_about/dna-02.png"}  alt="" /></a>
          </div>
          <div className="dna-Box01">
            <a href="javascript:void(0);" className="wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
              <img src={PrePath + "/images/jntr_about/dna-03.png"} alt="" /></a>
          </div>
          <div className="dna-Box01">
            <a href="javascript:void(0);" className="wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
              <img src={PrePath + "/images/jntr_about/dna-04.png"} alt="" /></a>
          </div>
          <div className="dna-Box01">
            <a href="javascript:void(0);" className="wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
              <img src={PrePath + "/images/jntr_about/dna-05.png"}  alt="" /></a>
          </div>
          <div className="dna-Box01">
            <a href="javascript:void(0);" className="wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
              <img src={PrePath + "/images/jntr_about/dna-06.png"}  alt="" /></a>
          </div>
          <div className="dna-Box01">
            <a href="javascript:void(0);" className="wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
              <img src={PrePath + "/images/jntr_about/dna-07.png"} alt="" /></a>
          </div>
          <div className="dna-Box01">
            <a href="javascript:void(0);" className="wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
              <img src={PrePath + "/images/jntr_about/dna-08.png"} alt="" /></a>
          </div>
          <div className="dna-Box01">
            <a href="javascript:void(0);" className="wow zoomIn" data-wow="zoom-in" data-wow-delay="100">
              <img src={PrePath + "/images/jntr_about/dna-09.png"} alt="" /></a>
          </div>
        </div>
      </div>
    </div>


    <div className="partner-network">
      <div className="wrapper">
        <div className="sectionhead04 wow fadeInDown" data-wow="fade-down" data-wow-delay="100">Partner Network</div>
        <div className="partner-Box">

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-01.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-02.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-03.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-04.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-05.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-06.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-07.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-08.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-09.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-010.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-011.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-012.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-013.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-014.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-015.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-016.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-017.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-018.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-019.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-020.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-021.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-022.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-023.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-024.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-025.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-026.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-027.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-028.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-029.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-030.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-031.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-032.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-033.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-034.png"} alt="" /> </a> </div>

          <div className="partner-Box01 wow zoomIn" data-wow="zoom-in" data-wow-delay="200"> <a href="javascript:void(0);"
              className="ani-1"> <img src={PrePath + "/images/jntr_about/paR-logo-035.png"} alt="" /> </a> </div>




        </div>
        <div className="partner-Btn"> <a href="javascript:void(0);" className="ani-1">Become a Partner</a> </div>
      </div>
    </div>





    <section id="team-Block">
      <div className="advisor-team-Box">
        <div className="wrapper">
          <div className="sectionhead04 wow fadeInUp" data-wow="fade-up" data-wow-delay="100">Meet the Jointer Team</div>
          <div className="s20TeamContainer clearfix" id="our_advisor"> </div>
        </div>
      </div>
      <div className="previous-advisor-team-Box">
        <div className="wrapper">
          <div className="s20TeamContainer clearfix" id="previous_advisor">
            <div className="s20Teambox01 clearfix" data-102500-start="opacity:0; transform: scale(1.3) translate(0px, 0px);"
              data-103500-start="opacity:1; transform: scale(1) translate(0px, 0px);">
              <div className="s20ttextbox02">PREVIOUS Advisors</div>
            </div>

            <div className="s20Teambox01 clearfix" data-104500-start="opacity:0; transform: scale(1.3) translate(0px, 0px);"
              data-105500-start="opacity:1; transform: scale(1) translate(0px, 0px);">
              <div className="s20tImgbox ani-5">
                <div className="s20RotaterBox"><a href="https://www.linkedin.com" target="_blank" className="teamLinkIcon"></a>
                  <div className="teamImgNPbox"><img src={PrePath + "/images/jntr_about/legal_advisors01.jpg"} alt="" /></div>
                </div>
                <div className="afterLogo"><img src={PrePath + "/images/jntr_about/t5-ss-V2.png"} /> </div>
              </div>
              <div className="s20ttextbox"> <span>Chris Cox</span>
                Former Chairman of the U.S.
                Securities and Exchange Comission [SEC] former U.S. Congress Member </div>
            </div>

            <div className="s20Teambox01 clearfix" data-103000-start="opacity:0; transform: scale(1.3) translate(0px, 0px);"
              data-104000-start="opacity:1; transform: scale(1) translate(0px, 0px);">
              <div className="s20tImgbox ani-5">
                <div className="s20RotaterBox"><a href="javascript:void(0);" target="_blank" className="teamLinkIcon"></a>
                  <div className="teamImgNPbox"><img src={PrePath + "/images/jntr_about/advisors01.jpg"} alt="" /></div>
                </div>
                <div className="afterLogo"><img src={PrePath + "/images/jntr_about/advisors001_logo.png"} /> </div>
              </div>
              <div className="s20ttextbox"> <span>Professor Eric S. Maskin</span>Harvard University Nobel Memorial Prize in
                Economics Mechanism Design Expert </div>
            </div>
            <div className="s20Teambox01 clearfix" data-103500-start="opacity:0; transform: scale(1.3) translate(0px, 0px);"
              data-104500-start="opacity:1; transform: scale(1) translate(0px, 0px);">
              <div className="s20tImgbox ani-5">
                <div className="s20RotaterBox"><a href="javascript:void(0);" target="_blank" className="teamLinkIcon"></a>
                  <div className="teamImgNPbox"><img src={PrePath + "/images/jntr_about/pre-advisors01.jpg"} alt="" /></div>
                </div>
                <div className="afterLogo"><img src={PrePath + "/images/jntr_about/advisors001_logo.png"} /> </div>
              </div>
              <div className="s20ttextbox"> <span>Professor Alvin E. Roth</span>Stanford University Nobel Memorial Prize in
                Economics Market Design expert</div>
            </div>
            {/* <!-- <div className="s20Teambox01 clearfix" data-104500-start="opacity:0; transform: scale(1.3) translate(0px, 0px);"
              data-105500-start="opacity:1; transform: scale(1) translate(0px, 0px);">
              <div className="s20tImgbox ani-5">
                <div className="s20RotaterBox"><a href="https://www.linkedin.com" target="_blank" className="teamLinkIcon"></a>
                  <div className="teamImgNPbox"><img src="images/legal_advisors01.jpg" alt="" /></div>
                </div>
                <div className="afterLogo"><img src="images/t5-ss-V2.png" /> </div>
              </div>
              <div className="s20ttextbox"> <span>Chris Cox</span>
                Former Chairman of the U.S.
                Securities and Exchange Comission [SEC] former U.S. Congress Member </div>
            </div> --> */}

            <div className="s20Teambox01 clearfix"  >
              <div className="s20tImgbox ani-5">
                <div className="s20RotaterBox"><a href="https://www.linkedin.com/in/daniel-p-ahn-7283967/" target="_blank"
                    className="teamLinkIcon"></a>
                  <div className="teamImgNPbox"><img
                      src="https://www.elementzero.network/api/private/mainSite/teamMember/None/team-05.png" alt="" />
                  </div>
                </div>
                <div className="afterLogo"><img
                    src="https://www.elementzero.network/api/private/mainSite/teamMember/7/t5-ss.png" /> </div>
              </div>
              <div className="s20ttextbox"> <span>Daniel P. Ahn PhD</span>Chief Economist<br />
                U.S. Department of State </div>
            </div>


            <div className="s20Teambox01 clearfix" >
              <div className="s20tImgbox ani-5">
                <div className="s20RotaterBox"><a href="javascript:void(0);" target="_blank" className="teamLinkIcon"></a>
                  <div className="teamImgNPbox"><img src={PrePath + "/images/jntr_about/charles.jpg"} alt="" /></div>
                </div>
                <div className="afterLogo"><img src={PrePath + "/images/jntr_about/02-teamLogo.png"} /> </div>
              </div>
              <div className="s20ttextbox"> <span> Charles Dobens</span>Founder of Multifamily Investing Academy</div>
            </div>
          </div>
        </div>
      </div>
      <div className="management-team-Box wow fadeInDown" data-wow="fade-down" data-wow-delay="200">
        <div className="wrapper">
          <div className="s20TeamContainer clearfix npSMfix01" id="managment"> </div>
        </div>
      </div>
      <div className="rd-team-Box wow fadeInDown" data-wow="fade-down" data-wow-delay="200">
        <div className="wrapper">
          <div className="s20Container02 npPFix01">
            <div className="s20TeamContainer clearfix" id="r_d"> </div>
          </div>
        </div>
      </div>
      <div className="operation-team-Box wow fadeInDown" data-wow="fade-down" data-wow-delay="200">
        <div className="wrapper">
          <div className="s20TeamContainer clearfix " id="operations"> </div>
        </div>
      </div>
    </section>


    <div className="recent-News">
      <div className="wrapper">
        <div className="sectionhead04 wow fadeInUp" data-wow="fade-up" data-wow-delay="100">Recent News</div>
        <div className="news-Wrap">
          <div className="news-Box wow fadeInUp" data-wow="fade-up" data-wow-delay="100">
            <div className="news-Box01">
              <img src={PrePath + "/images/jntr_about/blopimg01.jpg"} alt="" />
              <div className="news-Title">Aenean vel elit turpis porta</div>
              <div className="news-Share"><a href="javascript:void(0);">
                <img src={PrePath + "/images/jntr_about/share-icon.png"} alt="" /></a></div>
              <a href="javascript:void(0);" className="faux-link"></a>
            </div>
          </div>
          <div className="news-Box wow fadeInUp" data-wow="fade-up" data-wow-delay="100">
            <div className="news-Box01">
              <img src={PrePath + "/images/jntr_about/blopimg02.jpg"} alt="" />
              <div className="news-Title">Phasellus quis mattis dui. Nunc rutrum ornare</div>
              <div className="news-Share"><a href="javascript:void(0);">
                <img src={PrePath + "/images/jntr_about/share-icon.png"} alt="" /></a></div>
              <a href="javascript:void(0);" className="faux-link"></a>
            </div>
          </div>
          <div className="news-Box wow fadeInUp" data-wow="fade-up" data-wow-delay="100">
            <div className="news-Box01">
              <img src={PrePath + "/images/jntr_about/blopimg03.jpg"} alt="" />
              <div className="news-Title">Donec non ex id liber</div>
              <div className="news-Share"><a href="javascript:void(0);">
                <img src={PrePath + "/images/jntr_about/share-icon.png"} alt="" /></a></div>
              <a href="javascript:void(0);" className="faux-link"></a>
            </div>
          </div>
          <div className="news-Box wow fadeInUp" data-wow="fade-up" data-wow-delay="100">
            <div className="news-Box01">
              <img src={PrePath + "/images/jntr_about/blopimg01.jpg"} alt="" />
              <div className="news-Title">Phasellus quis mattis dui. Nunc rutrum ornare</div>
              <div className="news-Share"><a href="javascript:void(0);">
                <img src={PrePath + "/images/jntr_about/share-icon.png"} alt="" /></a></div>
              <a href="javascript:void(0);" className="faux-link"></a>
            </div>
          </div>
          <div className="news-Box wow fadeInUp" data-wow="fade-up" data-wow-delay="100">
            <div className="news-Box01">
              <img src={PrePath + "/images/jntr_about/blopimg02.jpg"} alt="" />
              <div className="news-Title">Cras sodales lectus tellus</div>
              <div className="news-Share"><a href="javascript:void(0);">
                <img src={PrePath + "/images/jntr_about/share-icon.png"} alt="" /></a></div>
              <a href="javascript:void(0);" className="faux-link"></a>
            </div>
          </div>
          <div className="news-Box wow fadeInUp" data-wow="fade-up" data-wow-delay="100">
            <div className="news-Box01">
              <img src={PrePath + "/images/jntr_about/blopimg03.jpg"} alt="" />
              <div className="news-Title">Phasellus quis mattis dui. Nunc rutrum ornare</div>
              <div className="news-Share"><a href="javascript:void(0);">
                <img src={PrePath + "/images/jntr_about/share-icon.png"} alt="" /></a></div>
              <a href="javascript:void(0);" className="faux-link"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
{/* 
    <!--======================= COMMUNITY BLOCK START =====================--> */}
    <div className="community-Block">
      <div className="wrapper">
        <div className="community-Wrap">
          <div className="channels-Box" data-wow="fade-right" data-wow-delay="200">
            <div className="channels-Title">Community Channels</div>
            <div className="channels-Text">Jointer social networks (total of 250.000 members)</div>
            <ul className="social-Icons">
              <li><a href="javascript:void(0);" className="social-icon-01 ani-1">
                <img src={PrePath + "/images/jntr_about/social-icon01.png"} alt="" /></a></li>
              <li><a href="javascript:void(0);" className="social-icon-02 ani-1">
                <img src={PrePath + "/images/jntr_about/social-icon02.png"} alt="" /></a></li>
              <li><a href="javascript:void(0);" className="social-icon-03 ani-1">
                <img src={PrePath + "/images/jntr_about/social-icon03.png"} alt="" /></a></li>
              <li><a href="javascript:void(0);" className="social-icon-05 ani-1">
                <img src={PrePath + "/images/jntr_about/social-icon05.png"} alt="" /></a></li>
              <li><a href="javascript:void(0);" className="social-icon-06 ani-1">
                <img src={PrePath + "/images/jntr_about/social-icon06.png"} alt="" /></a></li>
            </ul>
          </div>
          <div className="auction-Box">
            <div className="live-auctionBbox aos-init" data-wow="fade-left" data-wow-delay="200">
              <a href="http://auction.jointer.io/" target="_blank" className="liveauction-Btn ani-1">LIVE AUCTION</a>
              <p><span className="icon-Box"><img src={PrePath + "/images/jntr_about/shield-smallicon.png"} alt="" /></span>90% of your investment will
                be automatically protected with downside protection <span><i
                    className="fas cust-fas fa-question-circle protip" data-pt-gravity="top"
                    data-pt-title="How much you will invest in USD"></i></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* <!--======================= COMMUNITY BLOCK END =====================-->

    <!--======================= FOOTER START =====================--> */}
    <footer className="footer">
      <div className="footer-Block">
        <div className="footer-left">
          <div className="footer-logo"> <a href="https://www.jointer.io/demo/edge-investment/" target="_blank"><img
                src="images/logo.png" alt="" /></a>
            <span className="f-Link">
              <a href="javascript:void(0);" className="ani-1">About</a>
              <a href="javascript:void(0);" className="ani-1">How It Works</a>
              <a href="javascript:void(0);" className="ani-1">Contact Us</a>
              <a href="javascript:void(0);" className="ani-1 yellow-Color">invest in us</a>
            </span> </div>
          <p><span>© JOINTER 2016-2020 </span> <a href="javascript:void(0);" onClick="openModal01();"
              className="ani-1">Privacy Policy</a> |
            <a href="javascript:void(0);" onClick="openModal02();" className="ani-1">Term of Use</a> |
            <a href="javascript:void(0);" onClick="openModal03();" className="ani-1">Cookie Policy</a> </p>
          <p>Blockchain solutions for commercial real estate, providing increased liquidity, improved returns, and
            minimized risk</p>
        </div>
        <div className="footer-right">
          <ul className="social-Icons">
            <h5>Follow Our Network</h5>
            <li><a href="javascript:void(0);" className="social-icon-01 ani-1">
              <img src={PrePath + "/images/jntr_about/social-icon01.png"} alt="" /></a></li>
            <li><a href="javascript:void(0);" className="social-icon-02 ani-1">
              <img src={PrePath + "/images/jntr_about/social-icon02.png"}
                  alt="" /></a></li>
            <li><a href="javascript:void(0);" className="social-icon-03 ani-1">
              <img src={PrePath + "/images/jntr_about/social-icon03.png"}
                  alt="" /></a></li>
            <li><a href="javascript:void(0);" className="social-icon-04 ani-1">
              <img src={PrePath + "/images/jntr_about/social-icon04.png"}
                  alt="" /></a></li>
            <li><a href="javascript:void(0);" className="social-icon-05 ani-1">
              <img src={PrePath + "/images/jntr_about/social-icon05.png"}
                  alt="" /></a></li>
            <li><a href="javascript:void(0);" className="social-icon-06 ani-1">
              <img src={PrePath + "/images/jntr_about/social-icon06.png"}
                  alt="" /></a></li>
          </ul>
        </div>
      </div>
    </footer>
     
    <a className="CursorPointer" id="totop">TOP</a>
   

            
            </main>
        )
    }
}