window.Apex = {
    chart: {
        foreColor: '#ccc',
        toolbar: {
            show: false
        },
    },
    stroke: {
        width: 3
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        theme: 'dark'
    },
    grid: {
        borderColor: "#535A6C",
        xaxis: {
            lines: {
                show: true
            }
        }
    }
};

var spark1 = {
    chart: {
        id: 'spark1',
        group: 'sparks',
        type: 'line',
        height: 40,
        width: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
    }],
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 0
    },
    grid: {
        padding: {
            top: 0,
            bottom: 0,
            left: 0
        }
    },
    colors: ['#fff'],
    tooltip: {
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}

var spark2 = {
    chart: {
        id: 'spark2',
        group: 'sparks',
        type: 'line',
        height: 40,
        width: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
    }],
    stroke: {
        curve: 'smooth'
    },
    grid: {
        padding: {
            top: 0,
            bottom: 0,
            left: 0
        }
    },
    markers: {
        size: 0
    },
    colors: ['#fff'],
    tooltip: {
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}

var spark3 = {
    chart: {
        id: 'spark3',
        group: 'sparks',
        type: 'line',
        height: 40,
        width: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
    }],
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 0
    },
    grid: {
        padding: {
            top: 0,
            bottom: 0,
            left: 0
        }
    },
    colors: ['#fff'],
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}


var spark4 = {
    chart: {
        id: 'spark4',
        group: 'sparks',
        type: 'line',
        height: 40,
        width: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
    }],
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 0
    },
    grid: {
        padding: {
            top: 0,
            bottom: 0,
            left: 0
        }
    },
    colors: ['#fff'],
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}


new ApexCharts(document.querySelector("#spark1"), spark1).render();
new ApexCharts(document.querySelector("#spark2"), spark2).render();
new ApexCharts(document.querySelector("#spark3"), spark3).render();
new ApexCharts(document.querySelector("#spark4"), spark4).render();



var optionsCircle4 = {
    chart: {
        type: 'radialBar',
        width: '300px',
        height: '350px'
    },
    plotOptions: {
        radialBar: {
            size: undefined,
            inverseOrder: true,
            hollow: {
                margin: 2,
                size: '30%',
                background: 'transparent',

            },
            track: {
                show: false,
            },
            startAngle: -180,
            endAngle: 180

        },
    },
    stroke: {
        lineCap: 'round'
    },
    colors: ['#00597b', '#acd99e'],
    series: [71, 63],
    labels: ['June', 'May'],
    legend: {
        show: false,
        floating: true,
        position: 'right',
        offsetX: 70,
        offsetY: 240
    },
}
var chartCircle4 = new ApexCharts(document.querySelector('#radialBarBottom'), optionsCircle4);
chartCircle4.render();





Apex.grid = {
    padding: {
        right: 0,
        left: 0
    }
}

Apex.dataLabels = {
    enabled: false
}

var randomizeArray = function (arg) {
    var array = arg.slice();
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
var colorPalette = ['#37BC9B', '#2196f3', '#00597b', '#acd99e', '#967adc']
var optionDonut = {
    chart: {
        type: 'donut',
        width: '270px',
        height: '270px'
    },
    dataLabels: {
        enabled: false,
    },
    plotOptions: {
        pie: {
            donut: {
                size: '75%',
            },
            offsetY: 20,
        },
        stroke: {
            colors: undefined
        }
    },
    colors: colorPalette,
    series: [21, 23, 19, 14, 6],
    labels: ['Clothing', 'Food Products', 'Electronics', 'Kitchen Utility', 'Gardening'],
    legend: {
        show: false,
        position: 'left',
        offsetY: 80
    }
}

var donut = new ApexCharts(
    document.querySelector("#donut"),
    optionDonut
)
donut.render();







//['#37BC9B', '#2196f3', '#00597b', '#acd99e', '#967adc']
var optionsBar = {
    chart: {
        height: 380,
        type: 'bar',
        stacked: true,
    },

    plotOptions: {
        bar: {
            columnWidth: '30%',
            horizontal: false,
        },
    },
    stroke: {
        show: false,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    series: [{
        name: 'PRODUCT A',
        data: [14, 25, 21, 17, 12, 13, 11, 19]
    }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27, 33, 12]
    }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14, 15, 13]
    }],
    xaxis: {
        categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
    },
    fill: {
        colors: ['#37BC9B', '#967adc', '#00597b', '#acd99e', '#967adc'],
        opacity: 1
    },

}
var chartBar = new ApexCharts(
    document.querySelector("#barchart"),
    optionsBar
);
chartBar.render();






var optionsLine = {
    chart: {
        height: 385,
        type: 'line',
        zoom: {
            enabled: false
        },
        dropShadow: {
            enabled: false,
            top: 3,
            left: 2,
            blur: 4,
            opacity: 1,
        }
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    colors: ['#37BC9B', '#2196f3', '#00597b', '#acd99e', '#967adc'],
    series: [{
        name: "Music",
        data: [1, 15, 26, 20, 33, 27]
    },
    {
        name: "Photos",
        data: [3, 33, 21, 42, 19, 32]
    },
    {
        name: "Files",
        data: [0, 39, 52, 11, 29, 43]
    }
    ],
    title: {
        text: 'Media',
        align: 'left',
        offsetY: 25,
        offsetX: 20
    },
    subtitle: {
        text: 'Statistics',
        offsetY: 55,
        offsetX: 20
    },
    markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
            size: 9
        }
    },
    grid: {
        show: true
    },
    labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
    xaxis: {
        tooltip: {
            enabled: false
        }
    },
    legend: {

        position: 'top',
        horizontalAlign: 'right',
        offsetY: -20
    }
}
var chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
chartLine.render();





var latlong = {};
latlong["AD"] = {
    "latitude": 42.5,
    "longitude": 1.5
};
latlong["AE"] = {
    "latitude": 24,
    "longitude": 54
};
latlong["AF"] = {
    "latitude": 33,
    "longitude": 65
};
latlong["AG"] = {
    "latitude": 17.05,
    "longitude": -61.8
};
latlong["AI"] = {
    "latitude": 18.25,
    "longitude": -63.1667
};


var mapData = [{
    "code": "AF",
    "name": "Afghanistan",
    "value": 32358260,
    "color": "#eea638"
}, {
    "code": "AI",
    "name": "Albania",
    "value": 3215988,
    "color": "#d8854f"
}, {
    "code": "AG",
    "name": "Algeria",
    "value": 35980193,
    "color": "#de4c4f"
}, {
    "code": "AE",
    "name": "Angola",
    "value": 19618432,
    "color": "#de4c4f"
}];


var map;
var minBulletSize = 3;
var maxBulletSize = 70;
var min = Infinity;
var max = -Infinity;

AmCharts.theme = AmCharts.themes.black;

// get min and max values
for (var i = 0; i < mapData.length; i++) {
    var value = mapData[i].value;
    if (value < min) {
        min = value;
    }
    if (value > max) {
        max = value;
    }
}

// build map
AmCharts.ready(function () {
    map = new AmCharts.AmMap();
    map.projection = "winkel3";

    map.addTitle("Title", 14);
    map.addTitle("Subtitle", 11);
    map.areasSettings = {
        unlistedAreasColor: "#FFFFFF",
        unlistedAreasAlpha: 0.1
    };
    map.imagesSettings = {
        balloonText: "<span style='font-size:14px;'><b>[[title]]</b>: [[value]]</span>",
        alpha: 0.9
    }

    var dataProvider = {
        mapVar: AmCharts.maps.worldLow,
        images: []
    }

    // create circle for each country

    // it's better to use circle square to show difference between values, not a radius
    var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
    var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

    // create circle for each country
    for (var i = 0; i < mapData.length; i++) {
        var dataItem = mapData[i];
        var value = dataItem.value;
        // calculate size of a bubble
        var square = (value - min) / (max - min) * (maxSquare - minSquare) + minSquare;
        if (square < minSquare) {
            square = minSquare;
        }
        var size = Math.sqrt(square / (Math.PI * 2));
        var id = dataItem.code;

        dataProvider.images.push({
            type: "circle",
            width: 10,
            height: 10,
            color: dataItem.color,
            longitude: latlong[id].longitude,
            latitude: latlong[id].latitude,
            title: dataItem.name,
            value: value
        });
    }



    // the following code uses circle radius to show the difference
    /*
    for (var i = 0; i < mapData.length; i++) {
        var dataItem = mapData[i];
        var value = dataItem.value;
        // calculate size of a bubble
        var size = (value - min) / (max - min) * (maxBulletSize - minBulletSize) + minBulletSize;
        if (size < minBulletSize) {
            size = minBulletSize;
        }
        var id = dataItem.code;

        dataProvider.images.push({
            type: "circle",
            width: size,
            height: size,
            color: dataItem.color,
            longitude: latlong[id].longitude,
            latitude: latlong[id].latitude,
            title: dataItem.name,
            value: value
        });
    }*/



    map.dataProvider = dataProvider;

    map.write("mapChartdiv");
});