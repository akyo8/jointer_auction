var iframe = $('#vimeo-player')[0];
var player = $(iframe);
CurrentChartIndex = 0;
var chartsData = [{
    Index1Val: []
    , Index2Val: []
}, {
    Index1Val: [0, 5, 2, 10, 5, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 5, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 12, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 5, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 12, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 12, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 5, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15]
    , Index2Val: [0, 5, 5, 4, 2, 3, 5, 5, 1, 5, 5, 4, 2, 1, 5, 4, 4, 5, 5, 2, 3, 3, 5, 5, 2, 4, 5, 5, 2, 4, 2, 5, 5, 3, 5, 1, 3, 3, 4, 5, 4, 5, 3, 4, 2, 5, 2, 2, 4, 2, 5, 4, 4, 3, 4, 5, 5, 5, 4, 1, 2, 3, 3, 4, 4, 2, 4, 1, 5, 2, 1, 3, 1, 1, 2, 4, 4, 3, 1, 1, 1, 5, 2, 1, 3, 5, 1, 2, 5, 3, 1, 1, 1, 1, 4, 1, 4, 4, 1, 4]
}, {
    Index1Val: [0, 5, 2, 10, 5, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 5, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 12, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 5, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 12, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 12, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15, 12, 14, 10, 5, 20, 15, 18, 25, 10, 15, 20, 25, 18, 15]
    , Index2Val: [0, 5, 5, 4, 2, 3, 5, 5, 1, 5, 5, 4, 2, 1, 5, 4, 4, 5, 5, 2, 3, 3, 5, 5, 2, 4, 5, 5, 2, 4, 2, 5, 5, 3, 5, 1, 3, 3, 4, 5, 4, 5, 3, 4, 2, 5, 2, 2, 4, 2, 5, 4, 4, 3, 4, 5, 5, 5, 4, 1, 2, 3, 3, 4, 4, 2, 4, 1, 5, 2, 1, 3, 1, 1, 2, 4, 4, 3, 1, 1, 1, 5, 2, 1, 3, 5, 1, 2, 5, 3, 1, 1, 1, 1, 4, 1, 4, 4, 1, 4]
}];
_XValues = [];
var _min;
var _max;
var _unit;
var IsindexDataloaded = false;

function createChart(id, chartData) {
    $(id).kendoChart({
        legend: {
            position: "bottom"
        }
        , chartArea: {
            border: {
                width: 0
            }
            ,
        }
        , seriesDefaults: {
            type: "line"
            , style: "normal"
            ,
        }
        , series: [{
            color: "#fff"
            , data: chartData['Index1Val']
            , markers: {
                visible: false
            }
            ,
        }, {
            color: "#faba37"
            , data: chartData['Index2Val']
            , markers: {
                visible: false
            }
            ,
        }]
        , categoryAxis: {
            categories: _XValues
            , majorUnit: 12
            , majorGridLines: {
                visible: false
            }
            , line: {
                visible: false
            }
            , visible: true
            , color: "white"
            ,
        }
        , valueAxis: {
            min: _min
            , max: _max
            , majorUnit: _unit
            , name: "value"
            , labels: {
                format: "{0}%"
                , color: "white"
                ,
            }
            , line: {
                visible: true
                , color: "#252525"
                ,
            }
            , majorGridLines: {
                visible: true
                , color: "#252525"
                ,
            }
            , axisCrossingValue: -10
        }
        , tooltip: {
            visible: true
            , format: "{#,0}"
            , template: "#= category #: \n #= value#%"
        }
        , render: function (e) {
            e.sender.options.categoryAxis.labels.step = 12;
        }
    });
    var chart = $(id).data("kendoChart");
    chart.refresh();
}

function dataBound(e) {
    var chart = $("#chart1").data("kendoChart");
    chart.options.categoryAxis.labels.step = 12;
}
var ChartsCount = 3;

function InitCharts() {
    for (var i = 1; i <= ChartsCount; i++) {
        $("#chart" + i).css("fill-opacity", "0");
        $("#chart" + i).css("background-color", "rgba(44,44,44,0)");
        var widthHeight = getWidthAndHeight();
        $("#chart" + i).css({
            width: widthHeight[0]
            , height: widthHeight[1]
            , display: "block"
        });
        createChart("#chart" + i, chartsData[i - 1]);
    }
    $("a[class='iCarouselNav']").unbind("click");
    $("a[class='iCarouselNav']").attr('title', 'coming soon');
    InvestmentFldBlur();
}

function SetChartsData() {
    var IndexDemo1 = ["-43.75", "-49.94", "-45.66", "-40.56", "-37.40", "-37.39", "-32.75", "-30.49", "-28.01", "-29.43", "-25.38", "-24.06", "-26.87", "-24.78", "-20.36", "-19.18", "-25.81", "-29.81", "-24.98", "-28.54", "-22.28", "-19.42", "-19.60", "-14.35", "-12.41", "-9.61", "-9.71", "-7.13", "-8.39", "-10.06", "-11.99", "-16.99", "-22.95", "-14.65", "-15.08", "-14.35", "-10.62", "-6.99", "-4.08", "-4.80", "-10.76", "-7.23", "-6.06", "-4.21", "-1.89", "-3.83", "-3.55", "-2.87", "2.03", "3.15", "6.87", "8.80", "11.06", "9.39", "14.80", "11.21", "14.52", "19.63", "22.98", "25.88", "21.40", "26.63", "27.51", "28.30", "31.00", "33.50", "31.48", "36.44", "34.32", "37.44", "40.81", "40.22", "35.87", "43.32", "40.83", "42.03", "43.52", "40.50", "43.28", "34.31", "30.76", "41.61", "41.68", "39.20", "32.14", "31.59", "40.27", "40.65", "42.81", "42.94", "48.03", "47.85", "47.67", "44.80", "49.75", "52.47", "55.20", "60.97", "60.91", "62.37", "65.04", "68.24", "68.33", "71.58", "75.38", "80.31", "82.08", "92.31", "84.82", "79.85", "80.34", "84.24", "85.13", "91.80", "97.60", "98.45", "84.68", "87.98", "70.72"];
    var IndexDemo2 = ["1.55", "3.07", "4.70", "6.38", "8.07", "9.92", "11.63", "13.38", "15.31", "17.16", "19.01", "20.95", "22.81", "24.41", "26.40", "28.39", "30.49", "32.61", "34.66", "36.81", "39.07", "41.43", "43.77", "45.97", "48.45", "50.82", "53.20", "55.36", "57.63", "60.31", "62.72", "64.83", "67.47", "70.32", "73.04", "75.90", "78.89", "81.84", "84.62", "87.76", "90.76", "93.78", "96.88", "99.95", "103.03", "106.30", "109.66", "113.22", "116.51", "119.99", "123.58", "126.29", "129.97", "133.52", "137.25", "140.91", "144.78", "148.77", "153.00", "157.30", "161.42", "165.55", "170.07", "174.41", "178.53", "183.27", "187.80", "192.11", "196.61", "201.39", "206.30", "211.51", "216.49", "221.49", "226.96", "230.65", "234.06", "239.50", "244.73", "250.28", "255.89", "261.37", "267.19", "273.17", "279.18", "285.62", "291.79", "297.99", "303.96", "310.82", "317.40", "323.82", "330.65", "337.28", "344.32", "351.56", "358.83", "366.31", "373.49", "381.11", "388.96", "396.49", "404.48", "412.70", "419.37", "427.68", "435.80", "444.43", "453.31", "462.21", "471.77", "480.92", "490.10", "499.83", "509.01", "518.39", "528.35", "538.28", "548.55", "559.12"];
    _min = Number(IndexDemo1[0]);
    _max = _min;
    IndexDemo1.forEach(function (element) {
        chartsData[0]['Index1Val'].push(Number(element).toFixed(2));
        if (Number(element) < _min) _min = Number(element);
        if (Number(element) > _max) _max = Number(element);
    });
    IndexDemo2.forEach(function (element) {
        chartsData[0]['Index2Val'].push(Number(element).toFixed(2));
        if (Number(element) < _min) _min = Number(element);
        if (Number(element) > _max) _max = Number(element);
    });
    var CurrYear = 2009;
    var Month = 1;
    for (i = 1; i < 121; i++) {
        _XValues.push(CurrYear + "-" + Month.toString());
        if (i % 12 == 0) {
            CurrYear = CurrYear + 1;
            Month = 0;
        }
        Month++
    }
    _min = _min - 1;
    _max = _max + 1;
    $("div[data-id='div-index1-avrg']").text("+6.6%");
    $("div[data-id='div-index2-avrg']").text("+20.20%");
    IsindexDataloaded = true;
    InitCharts();
}
$(document).bind("kendo:skinChange", createChart);
$(window).on("resize", function (event) {
    for (var i = 1; i <= ChartsCount; i++) {
        var chartDiv = $("#chart" + i);
        var chart = chartDiv.data("kendoChart");
        if (typeof (chart) != 'undefined' && chart != null) {
            chart.options.transitions = false;
            chartDiv.css({
                display: "none"
            });
            var widthHeight = getWidthAndHeight();
            chartDiv.css({
                width: widthHeight[0]
                , height: widthHeight[1]
                , display: "block"
            });
            chart.redraw();
        }
    }
});

function getWidthAndHeight() {
    var widthWindow = $(window).innerWidth();
    var chartWidth, chartHeight;
    if (widthWindow >= 1367 && widthWindow <= 1600) {
        chartWidth = 600;
        chartHeight = 280;
    }
    else if (widthWindow >= 1200 && widthWindow <= 1366) {
        chartWidth = 560;
        chartHeight = 320;
    }
    else if (widthWindow >= 993 && widthWindow <= 1199) {
        chartWidth = 430;
        chartHeight = 242;
    }
    else if (widthWindow >= 768 && widthWindow <= 992) {
        chartWidth = 668;
        chartHeight = 190;
    }
    else if (widthWindow >= 577 && widthWindow <= 767) {
        chartWidth = 368;
        chartHeight = 128;
    }
    else if (widthWindow >= 320 && widthWindow <= 576) {
        chartWidth = 250;
        chartHeight = 150;

    }
    return [chartWidth, chartHeight];
}

function GetFinancialIndexs(SucessFunc) {
    var Url = JointerWebAPi + 'UtilsApi/GetFinancialIndex?IndexType=1';
    ajaxHelper(Url, 'GET').done(function (data) {
        if (data != null && IsindexDataloaded == false) {
            _min = Number(data[0].index_cahange);
            _max = Number(data[0].index_cahange);
            data.forEach(function (element) {
                if (element.index_type == 1) {
                    chartsData[0]['Index1Val'].push(Number(element.index_potential_profit * 100).toFixed(2));
                    _XValues.push(element.index_date);
                }
                else {
                    chartsData[0]['Index2Val'].push(Number(element.index_potential_profit * 100).toFixed(2));
                }
                if (Number(element.index_potential_profit) < _min) _min = element.index_potential_profit;
                if (Number(element.index_potential_profit) > _max) _max = element.index_potential_profit;
            });
            _min = Math.round(Number(_min * 100) - 1);
            _max = Math.round(Number(_max * 100) + 1);
            $("div[data-id='div-index1-avrg']").text("+6.6%");
            $("div[data-id='div-index2-avrg']").text("+20.20%");
            IsindexDataloaded = true;
            SucessFunc();
        }
    });
}
var Investment = ClearNumberAnotations($("input[data-id='txt-investment']").val());
var CurrentIndexProfitPrc = null;
var CulcProfitChoosenMonth;

function SetProfitCulculator() {
    var InvestmentTxt = $("input[data-id='txt-investment']");
    InvestmentTxt.focus(function () {
        Investment = ClearNumberAnotations($(this).val());
        $(this).val('');
    });
    InvestmentTxt.blur(InvestmentFldBlur);
    InvestmentTxt.on('keydown', function (e) {
        if (e.which == 13 || e.which == 9) {
            e.preventDefault();
            $("input[data-id='txt-investment-out']").focus();
        }
    });
    var DropDpwnDiv = $("div[data-id='div-culc-profit-month-dropdown']");
    for (i = 1; i < 121; i++) DropDpwnDiv.append('<a class="CursorPointer" data-type="a-months-dropDown" Months=' + i.toString() + ' >' + i.toString() + ' Months</a>');
    $("a[data-type='a-months-dropDown']").on('click', MonthsDropDownClick);
}

function MonthsDropDownClick() {
    $("a[data-id='a-culc-profits-months']").text($(this).text());
    $("a[data-id='a-culc-profits-months']").attr('MValue', $(this).attr('Months'))
    $("a[data-id='a-culc-profits-months']").click();
    InvestmentFldBlur();
}

function InvestmentFldBlur() {
    var NewInvest = ClearNumberAnotations($("input[data-id='txt-investment']").val());
    if (isNaN(NewInvest) || Number(NewInvest) == 0) {
        $("input[data-id='txt-investment']").val(Investment);
    }
    NewInvest = Number(ClearNumberAnotations($("input[data-id='txt-investment']").val()));
    $("input[data-id='txt-investment']").val(SetNumFormat(NewInvest, '$'));
    var ProfitSplitPrc;
    var PotentialProfitprc = 0;
    $("div[data-type='div-profit-split']").addClass('calcValue01');
    $("div[data-type='div-profit-split']").removeClass('calcValue03');
    if (NewInvest < 25000) {
        ProfitSplitPrc = 0.25;
        $("div[data-id='div-profit-split-active']").css('left', '0%');
        $("div[data-id='div-profit-split-25']").removeClass('calcValue01');
        $("div[data-id='div-profit-split-25']").addClass('calcValue03');
    }
    else if (NewInvest >= 25000 && NewInvest < 100000) {
        ProfitSplitPrc = 0.50;
        $("div[data-id='div-profit-split-active']").css('left', '20%');
        $("div[data-id='div-profit-split-50']").removeClass('calcValue01');
        $("div[data-id='div-profit-split-50']").addClass('calcValue03');
    }
    else if (NewInvest >= 100000 && NewInvest < 1000000) {
        ProfitSplitPrc = 0.75;
        $("div[data-id='div-profit-split-active']").css('left', '40%');
        $("div[data-id='div-profit-split-75']").removeClass('calcValue01');
        $("div[data-id='div-profit-split-75']").addClass('calcValue03');
    }
    else if (NewInvest >= 1000000 && NewInvest < 10000000) {
        ProfitSplitPrc = 0.80;
        $("div[data-id='div-profit-split-active']").css('left', '60%');
        $("div[data-id='div-profit-split-80']").removeClass('calcValue01');
        $("div[data-id='div-profit-split-80']").addClass('calcValue03');
    }
    else if (NewInvest >= 10000000) {
        ProfitSplitPrc = 0.90;
        $("div[data-id='div-profit-split-active']").css('left', '80%');
        $("div[data-id='div-profit-split-90']").removeClass('calcValue01');
        $("div[data-id='div-profit-split-90']").addClass('calcValue03');
    }
    CulcProfitChoosenMonth = Number($("a[data-id='a-culc-profits-months']").attr('MValue')) - 1;
    CurrentIndexProfitPrc = Number(chartsData[CurrentChartIndex].Index2Val[CulcProfitChoosenMonth]) / 100;
    PotentialProfitprc = CurrentIndexProfitPrc * ProfitSplitPrc;
    PotentialProfitprc = SetNumFormat(Number(PotentialProfitprc * 100).toFixed(2), '%', false);
    $("div[data-id='div-potential-profit-prc']").text(PotentialProfitprc);
}