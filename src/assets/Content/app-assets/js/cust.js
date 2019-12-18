Morris.Line({
        element: "weekly-activity-chart",
        data: [{
            day: Date.parse("2016-12-05"),
            Running: 100,
            Walking: 40,
            Cycling: 62
        }, {
            day: Date.parse("2016-12-06"),
            Running: 150,
            Walking: 200,
            Cycling: 120
        }, {
            day: Date.parse("2016-12-07"),
            Running: 200,
            Walking: 105,
            Cycling: 70
        }, {
            day: Date.parse("2016-12-08"),
            Running: 125,
            Walking: 150,
            Cycling: 75
        }, {
            day: Date.parse("2016-12-09"),
            Running: 150,
            Walking: 275,
            Cycling: 100
        }, {
            day: Date.parse("2016-12-10"),
            Running: 200,
            Walking: 325,
            Cycling: 80
        }, {
            day: Date.parse("2016-12-11"),
            Running: 260,
            Walking: 130,
            Cycling: 90
        }],
        xkey: "day",
        xLabels: ["day"],
        ykeys: ["Running", "Walking", "Cycling"],
        labels: ["Running", "Walking", "Cycling"],
        resize: !0,
        smooth: !0,
        pointSize: 3,
        pointStrokeColors: ["#967ADC", "#37BC9B", "#F6BB42"],
        gridLineColor: "#e3e3e3",
        behaveLikeLine: !0,
        numLines: 6,
        gridtextSize: 14,
        lineWidth: 3,
        hideHover: "auto",
        lineColors: ["#967ADC", "#37BC9B", "#F6BB42"],
        xLabelFormat: function(t) {
            return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][t.getDay()]
        }
    });
	
	
