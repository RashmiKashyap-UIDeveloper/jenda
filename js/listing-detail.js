//SKUs Dropdown with logos
function formatsku(sku) {
    if (!sku.id) {
        return sku.text;
    }
    var $sku = $(
        '<span class="d-flex align-items-center "><span class="images img-wrapper border rounded "><img  class="img-fluid " src="' + sku.image + '" /> </span>' + sku.text + '</span>'
    );
    return $sku;
};

$(document).ready(function () {
    var selectData_sku = [];
    //filter by brand dropdown--------
    $.ajax({
        url: "https://run.mocky.io/v3/470bd601-2530-4502-a327-77d99c7722ee"
    }).then(function (data) {
        $(data).each(function (i) {
            data.sort((a, b) => a.text.localeCompare(b.text))
            selectData_sku.push({ id: data[i].id, text: data[i].text, image: data[i].images });
            $.fn.select2.defaults.set('closeOnSelect', false);
        });

        $('#sku').select2({
            placeholder: "Select SKUs",
            data: selectData_sku,
            maximumSelectionLength: 4,
            templateResult: formatsku,
            templateSelection: formatsku,
            dropdownPosition: 'above'
        });
    });
    //---------------------------
});
//------------------


//Line Chart
var e = document.querySelectorAll(".mixed-widget-8-chart");
[].slice.call(e).map((function (e) {
    var t = parseInt(KTUtil.css(e, "height"));
    if (e) {
        var  //color set for maximum 11 series
            gray_300 = KTUtil.getCssVariableValue("--bs-gray-300"),
            gray_500 = KTUtil.getCssVariableValue("--bs-gray-500"),
            blue = KTUtil.getCssVariableValue("--bs-blue"),
            green = KTUtil.getCssVariableValue('--bs-success'),
            red = KTUtil.getCssVariableValue('--bs-lighter-danger'),
            purple = KTUtil.getCssVariableValue('--bs-purple'),
            orange = KTUtil.getCssVariableValue('--bs-lighter-orange'),
            cyan = KTUtil.getCssVariableValue('--bs-cyan'),
            gray_600 = KTUtil.getCssVariableValue('--bs-gray-600'),
            blue_100 = KTUtil.getCssVariableValue('--bs-blue-100'),
            blue_900 = KTUtil.getCssVariableValue('--bs-blue-900'),
            yellow = KTUtil.getCssVariableValue('--bs-lighter-warning'),

            //lightest shades
            light_blue = KTUtil.getCssVariableValue("--bs-light-blue"),
            light_green = KTUtil.getCssVariableValue('--bs-light-success'),
            light_red = KTUtil.getCssVariableValue('--bs-light-danger'),
            light_purple = KTUtil.getCssVariableValue('--bs-lightest-purple'),
            light_orange = KTUtil.getCssVariableValue('--bs-lightest-orange'),
            light_cyan = KTUtil.getCssVariableValue('--bs-lightest-cyan'),
            light_gray_500 = KTUtil.getCssVariableValue('--bs-lightest-gray-500'),
            light_blue_100 = KTUtil.getCssVariableValue('--bs-lightest-blue-100'),
            light_gray_600 = KTUtil.getCssVariableValue('--bs-lightest-gray-600'),
            light_blue_900 = KTUtil.getCssVariableValue('--bs-lightest-blue-900'),
            light_yellow = KTUtil.getCssVariableValue('--bs-lightest-warning')

        var linechart = new ApexCharts(e, {
            series: [
                {
                    name: "1800 Anejo (750ml)",
                    data: [30, 30, 85, 40, 40, 43, 53, 43, 41, 40, 68],
                }
            ],
            chart: {
                fontFamily: "inherit",
                type: "area",
                height: 300,
                toolbar: {
                    show: false
                },
            },
            plotOptions: {},
            legend: {
                show: true,
                showForSingleSeries: true,
                markers: {
                    radius: 12,
                    fillColors: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                },
                height: 48,
            },
            dataLabels: {
                enabled: false,
                textAnchor: 'end',
                offsetX: -10,
                formatter: function (val, opt) {
                    var lastIndex = opt.w.globals.series[0].length - 1;
                    if (opt.dataPointIndex === lastIndex) {
                        return opt.w.globals.seriesNames[opt.seriesIndex];
                    }
                    return '';
                },
                style: {
                    fontSize: '10px',
                },
                background: {
                    enabled: true,
                    padding: 10,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: '#fff',
                    opacity: 0.9,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: .4,
                    opacityTo: 0,
                    stops: [20, 120, 120, 120]
                }
            },
            stroke: {
                curve: "smooth",
                show: true,
                width: 3,
                colors: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
            },
            xaxis: {
                categories: ["11/1/23", "11/2/23", "11/3/23", "11/4/23", "11/5/23", "11/6/23", "11/7/23", "11/8/23", "11/9/23", "11/10/23", "11/11/23"],

                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tickPlacement: 'on',
                tickAmount: 5,
                labels: {
                    show: !0,
                    // rotate: 0,
                    // hideOverlappingLabels: false,
                    style: {
                        colors: gray_500,
                        fontSize: "11px"
                    }
                },
                crosshairs: {
                    position: "front",
                    stroke: {
                        color: gray_500,
                        width: 1,
                        dashArray: 3
                    }
                },
                tooltip: {
                    enabled: true,
                    formatter: void 0,
                    offsetY: 0,
                    style: {
                        fontSize: "11px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                min: 0,
                max: 100,
                title: {
                    text: '',
                    style: {
                        color: gray_500,
                        fontSize: "12px",
                        fontWeight: 400,
                    },
                },
                labels: {
                    style: {
                        colors: gray_500,
                        fontSize: "11px"
                    },
                    formatter: function (e) {
                        if (e !== null && e !== undefined) {
                            return '$' + e.toFixed(2);
                        }
                        return e;
                    },
                    offsetX: -10,
                }
            },
            states: {
                normal: {
                    filter: {
                        type: "none",
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: "none",
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: !1,
                    filter: {
                        type: "none",
                        value: 0
                    }
                }
            },
            tooltip: {
                style: {
                    fontSize: "12px"
                }
            },
            colors: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
            grid: {
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                borderColor: gray_300,
                strokeDashArray: 4,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            markers: {
                colors: [light_green, light_blue, light_red, light_purple, light_gray_500, light_orange, light_cyan, light_blue_100, light_blue_900, light_gray_600, light_yellow],
                strokeColor: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                strokeWidth: 3
            }
        })
        $('#sku').select2().on('select2:select', function (e) {
            var select_val = $(e.params.data.element).text()
            //    console.log(select_val)
            $('#apply-sku').click(function () {
                linechart.appendSeries(
                    {
                        name: `${select_val}`,
                        data: [20, 50, 65, 30, 20, 23, 33, 43, 51, 70, 78]
                    })
            });
        });

        linechart.render()
    }
}))

//Availiability Status Heat Map
var e = document.querySelectorAll("#chart");
[].slice.call(e).map((function (e) {
    var t = parseInt(KTUtil.css(e, "height"));
    if (e) {
        var gray_300 = KTUtil.getCssVariableValue("--bs-gray-300"),
            gray_500 = KTUtil.getCssVariableValue("--bs-gray-500"),
            green = KTUtil.getCssVariableValue('--bs-success'),
            red = KTUtil.getCssVariableValue('--bs-lighter-danger'),
            light_green = KTUtil.getCssVariableValue('--bs-light-success'),
            light_red = KTUtil.getCssVariableValue('--bs-light-danger')
        var stockChart = new ApexCharts(e, {
            series: [{
                name: `1800 Anejo (750ml)`,
                data: [0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0]
            }
            ],
            chart: {
                fontFamily: "inherit",
                height: 220,
                type: 'heatmap',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                heatmap: {
                    radius: 0,
                    enableShades: false,
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 0,
                            name: 'Available & In Stock',
                            color: green
                        },
                        {
                            from: 1,
                            to: 1,
                            name: 'Unavailable',
                            color: red,
                        },
                        ],
                    },

                }
            },
            legend: {
                show: true,
                position: 'bottom',
                showForSingleSeries: true,
                markers: {
                    radius: 12,
                    fillColors: [green, red],
                },
                //height: 48,
            },

            dataLabels: {
                enabled: false,
            },

            stroke: {
                width: 0.2,
            },
            xaxis: {
                categories: ["11/1/23", "11/2/23", "11/3/23", "11/4/23", "11/5/23", "11/6/23", "11/7/23", "11/8/23", "11/9/23", "11/10/23", "11/11/23"],
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tickPlacement: 'on',
                // tickAmount: 3,
                labels: {
                    show: true,
                    rotate: 0,
                    hideOverlappingLabels: false,
                    style: {
                        colors: gray_500,
                        fontSize: "11px"
                    }
                },

                tooltip: {
                    enabled: true,
                    formatter: void 0,
                    offsetY: 0,
                    style: {
                        fontSize: "11px"
                    }
                }
            },
            yaxis: {
                floating: true,
                labels: {
                    align: "left",
                    style: {
                        colors: ['#f1f1f1'],
                        fontSize: '10px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 500,
                        cssClass: 'apexcharts-yaxis-label-style',
                        offsetY: -50,
                    },
                    offsetX: 20,
                },

            },
            states: {
                normal: {
                    filter: {
                        type: "none",
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: "none",
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: "none",
                        value: 0
                    }
                }
            },
            tooltip: {
                style: {
                    fontSize: "12px",
                },
                y: {
                    formatter: function (val) {
                        return ''
                    },
                    title: {
                        formatter: function (seriesName) {
                            return ""
                        }
                    },
                }
            },
            colors: [green, red],
            grid: {
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    // left: 0
                },
                borderColor: gray_300,
                strokeDashArray: 4,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            markers: {
                colors: [light_green, light_red],
                strokeColor: [green, red],
                strokeWidth: 3
            }
        })


        $('#sku').select2().on('select2:select', function (e) {
            var select_val = $(e.params.data.element).text()
            //    console.log(select_val)
            $('#apply-sku').click(function () {
                stockChart.appendSeries({
                    name: `${select_val}`,
                    data: [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0]
                })
            });
        });
        stockChart.render()
    }
}))

var e = document.querySelectorAll("#chart2");
[].slice.call(e).map((function (e) {
    var t = parseInt(KTUtil.css(e, "height"));
    if (e) {
        var gray_300 = KTUtil.getCssVariableValue("--bs-gray-300"),
            gray_500 = KTUtil.getCssVariableValue("--bs-gray-500"),
            gray_900 = KTUtil.getCssVariableValue("--bs-gray-900"),
            blue = KTUtil.getCssVariableValue("--bs-blue"),
            light_blue = KTUtil.getCssVariableValue("--bs-light-blue")

        var percChart = new ApexCharts(e, {
            series: [{
                name: '1800 Anejo (750ml)',
                data: [12]
            }
            ],
            chart: {
                fontFamily: "inherit",
                height: 220,
                type: 'heatmap',
                toolbar: {
                    show: false
                },
                events: {
                    animationEnd: function (chartContext, options) {
                        var perc_value = $('.apexcharts-heatmap-series:only-child').find('.apexcharts-data-labels').text()
                        //console.log(perc_value)
                        $('.bg-perc .apexcharts-heatmap-series:only-child').find('rect').css('fill', 'rgba(68,158,221,' + perc_value + ')')
                    }
                }
            },

            plotOptions: {
                heatmap: {
                    enableShades: true,
                    shadeIntensity: 1,
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 0,
                            name: 'Overall Percentage in Stock',
                            color: blue
                        },
                        ],
                    },
                }
            },

            legend: {
                show: true,
                position: 'bottom',
                showForSingleSeries: true,
                markers: {
                    radius: 12,
                    fillColors: [blue],
                },
                //height: 48,
            },

            dataLabels: {
                enabled: true,
                style: {
                    colors: [gray_900],
                    fontWeight: 600,
                    fontSize: 13,
                },
                formatter: function (e) {
                    return e + "%"
                }
            },

            stroke: {
                width: 0.2,
            },
            xaxis: {
                // categories: [["1/29/23-","1/29/23"]],
                categories: ["11/1/23-11/11/23"],
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tickPlacement: 'on',
                //   tickAmount: 1,

                labels: {
                    show: !0,
                    rotate: 0,
                    // hideOverlappingLabels: false,
                    style: {
                        colors: gray_500,
                        fontSize: "11px"
                    }
                },
                crosshairs: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                    formatter: void 0,
                    offsetY: 0,
                    style: {
                        fontSize: "11px"
                    }
                }
            },
            yaxis: {
                show: false,
            },
            states: {
                normal: {
                    filter: {
                        type: "none",
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: "none",
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: "none",
                        value: 0
                    }
                }
            },
            tooltip: {
                style: {
                    fontSize: "12px"
                },
                x: {
                    show: true,
                },
                y: {
                    formatter: function (e) {
                        return e + "%";
                    },
                    title: {
                        formatter: function (seriesName) {
                            return seriesName + " was in stock"
                        }
                    },
                }

            },
            colors: [blue],
            grid: {
                padding: {
                    top: 0,
                    right: -30,
                    bottom: 0,
                    left: 0
                },
                borderColor: gray_300,
                strokeDashArray: 4,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            markers: {
                colors: [light_blue],
                strokeColor: [blue],
                strokeWidth: 3
            }
        })

        $('#sku').select2().on('select2:select', function (e) {
            var select_val = $(e.params.data.element).text()
            //    console.log(select_val)
            $('#apply-sku').click(function () {
                percChart.appendSeries({
                    name: `${select_val}`,
                    data: [70]
                })
            });
        });
        $(document).ready(function () {
            var perc_value = $('.apexcharts-heatmap-series:only-child').find('.apexcharts-data-labels').text()
            // console.log(perc_value)
            $('.bg-perc .apexcharts-heatmap-series:only-child').find('rect').css('fill', 'rgba(68,158,221,' + perc_value + ')')
        })
        percChart.render()
    }

}))



//close Add Select Dropdown on click of apply btn
$('.close_dropdown').click(function () {
    $(this).closest('.dropdown-menu').prev('.btn').removeClass('show');
    $(this).closest('.dropdown-menu').removeClass('show')
    $(this).closest('.dropdown-menu').prev('.btn').attr('aria-expanded', 'false')
})

//disable apply button if sku is not selected
$('#sku').change(function () {
    if ($(this).val() == "") {
        // None of the options are selected
        $('#apply-sku').prop("disabled", true);
    } else {
        // At least one option is selected
        $('#apply-sku').prop("disabled", false);
    }
});

$(document).ready(function () {
    var perc = $('.perc').text();
    // console.log(perc)
    $('.perc-bg').css('background-color', 'rgba(68,158,221,' + perc + ')')
})



JDDatatable('/apis/neighbourhood_table.json', "neighbourhood_table", "");
JDDatatable('/apis/neighbourhood_table.json', "boundary_table", "");
var datatable_column_width;
function JDDatatable(api, id, table_name) {
    getTableData(api, function (tblInfo) {
        table = $("#" + id + "").DataTable({
            "dom": "<'row'<'col-sm-12 col-md-12 'i>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'p>>",
            buttons: [],
            paging: true,
            serverSide: true,
            pageLength: 10,
            searching: false,
            responsive: false,
            scrollX: true,
            // scrollY: "350px",
            "scrollCollapse": true,
            info: false,
            ordering: false,
            order: [
                [1, "asc"]
            ],
            select: {
                style: 'multi',
                selector: 'td:last-child input[type="checkbox"]',
                className: 'row-selected'
            },
            lengthMenu: [10, 15, 50, "All"],
            processing: true,
            language: {
                "infoFiltered": "",
                info: `Showing _START_ to _END_ of _TOTAL_ ${table_name}`,
                searchPlaceholder: "Type Report Name",
                search: "Search",
                paginate: {
                    next: '<i class="fas fa-chevron-right"></i>',
                    previous: '<i class="fas fa-chevron-left"></i>'
                },
                processing: '<div class="d-flex align-items-center justify-content-center"> <div class="loader">Loading...</div></div> '
            },
            ajax: function (data, callback, settings) {
                $.ajax({
                    url: api,
                    type: 'GET',
                    contentType: 'application/x-www-form-urlencoded',

                    data: {
                        "pagination[page]": 1, // pending
                        "pagination[pages]": data.start,
                        "pagination[perpage]": data.length,
                        "pagination[total]": "166",
                    },
                    success: function (data, textStatus, jQxhr) {
                        callback({
                            draw: data.draw,
                            data: data.data,
                            recordsTotal: data.recordsTotal,
                            recordsFiltered: data.recordsFiltered,
                        });
                        setTimeout(function () {
                            $('.table').closest('.content-card').prev('.skeleton-card').addClass('d-none')
                            $('.table').closest('.content-card').removeClass('d-none');
                            $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                        }, 5000);
                        // setTimeout(function () {
                        //     let loaderIcon = $('.circle-loader');
                        //     loaderIcon.addClass('failed');
                        //     $('.progress-heading').text('Loading Failed')
                        //     $(' .progress-message').html('Sorry, Something went wrong');
                        // }, 1000);
                    },
                    error: function (jqXhr, textStatus, errorThrown) { }
                });
            },
            columns: tblInfo.colArr,
            "headerCallback": datatable_column_width,
            "columnDefs": tblInfo.colDefArr,
            "drawCallback": function () {
                $('[data-bs-toggle="popover"]').popover();
                $('[data-bs-toggle="tooltip"]').tooltip();
                //toggle logos
                toggleImage();

                // line chart colors
                var  //color set for maximum 11 series
                    gray_300 = KTUtil.getCssVariableValue("--bs-gray-300"),
                    gray_500 = KTUtil.getCssVariableValue("--bs-gray-500"),
                    blue = KTUtil.getCssVariableValue("--bs-blue"),
                    green = KTUtil.getCssVariableValue('--bs-success'),
                    red = KTUtil.getCssVariableValue('--bs-lighter-danger'),
                    purple = KTUtil.getCssVariableValue('--bs-purple'),
                    orange = KTUtil.getCssVariableValue('--bs-lighter-orange'),
                    cyan = KTUtil.getCssVariableValue('--bs-cyan'),
                    gray_600 = KTUtil.getCssVariableValue('--bs-gray-600'),
                    blue_100 = KTUtil.getCssVariableValue('--bs-blue-100'),
                    blue_900 = KTUtil.getCssVariableValue('--bs-blue-900'),
                    yellow = KTUtil.getCssVariableValue('--bs-lighter-warning'),

                    //lightest shades
                    light_blue = KTUtil.getCssVariableValue("--bs-light-blue"),
                    light_green = KTUtil.getCssVariableValue('--bs-light-success'),
                    light_red = KTUtil.getCssVariableValue('--bs-light-danger'),
                    light_purple = KTUtil.getCssVariableValue('--bs-lightest-purple'),
                    light_orange = KTUtil.getCssVariableValue('--bs-lightest-orange'),
                    light_cyan = KTUtil.getCssVariableValue('--bs-lightest-cyan'),
                    light_gray_500 = KTUtil.getCssVariableValue('--bs-lightest-gray-500'),
                    light_blue_100 = KTUtil.getCssVariableValue('--bs-lightest-blue-100'),
                    light_gray_600 = KTUtil.getCssVariableValue('--bs-lightest-gray-600'),
                    light_blue_900 = KTUtil.getCssVariableValue('--bs-lightest-blue-900'),
                    light_yellow = KTUtil.getCssVariableValue('--bs-lightest-warning')

                // Function to generate unique data for each store
                function generateStoreData(storeName) {
                    return Array.from({ length: 11 }, () => Math.floor(Math.random() * 15));
                }
                //Nieghbourhood Average Price View========================================    
                // Function to update the line chart with the given series data
                function updateNeighbourhoodLineChart(allSeriesData) {
                    var neighbouhoodchart = new ApexCharts(document.querySelector(".mixed-widget-8-chart-neighbouhood"), {
                        series: allSeriesData,
                        chart: {
                            fontFamily: "inherit",
                            type: "area",
                            height: 400,
                            toolbar: {
                                show: false
                            },
                        },
                        plotOptions: {},
                        legend: {
                            show: true,
                            showForSingleSeries: true,
                            markers: {
                                radius: 12,
                                fillColors: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                            },
                            height: 48,
                        },
                        dataLabels: {
                            enabled: false,
                            textAnchor: 'end',
                            offsetX: -10,
                            formatter: function (val, opt) {
                                var lastIndex = opt.w.globals.series[0].length - 1;
                                if (opt.dataPointIndex === lastIndex) {
                                    return opt.w.globals.seriesNames[opt.seriesIndex];
                                }
                                return '';
                            },
                            style: {
                                fontSize: '10px',
                            },
                            background: {
                                enabled: true,
                                padding: 10,
                                borderRadius: 2,
                                borderWidth: 1,
                                borderColor: '#fff',
                                opacity: 0.9,
                            },
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                opacityFrom: .4,
                                opacityTo: 0,
                                stops: [20, 120, 120, 120]
                            }
                        },
                        stroke: {
                            curve: "smooth",
                            show: true,
                            width: 3,
                            colors: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                            dashArray: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                        },

                        xaxis: {
                            //for single date
                            categories: ["11/1/23", "11/2/23", "11/3/23", "11/4/23", "11/5/23", "11/6/23", "11/7/23", "11/8/23", "11/9/23", "11/10/23", "11/11/23"],
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {
                                show: false
                            },
                            tickPlacement: 'on',
                            // tickAmount: 3,
                            labels: {
                                show: !0,
                                // rotate: 0,
                                hideOverlappingLabels: false,
                                style: {
                                    colors: gray_500,
                                    fontSize: "11px"
                                }
                            },
                            crosshairs: {
                                position: "front",
                                stroke: {
                                    color: gray_500,
                                    width: 1,
                                    dashArray: 3
                                }
                            },
                            tooltip: {
                                enabled: true,
                                formatter: void 0,
                                offsetY: 0,
                                style: {
                                    fontSize: "11px"
                                }
                            }
                        },
                        yaxis: {
                            tickAmount: 5,
                            min: 0,
                            max: 20,
                            title: {
                                text: '',
                                style: {
                                    color: gray_500,
                                    fontSize: "12px",
                                    fontWeight: 400,
                                },
                            },
                            labels: {
                                style: {
                                    colors: gray_500,
                                    fontSize: "11px"
                                },
                                formatter: function (e) {
                                    if (e !== null && e !== undefined) {
                                        return '$' + e.toFixed(2);
                                    }
                                    return e;
                                },
                                offsetX: -10,
                            }
                        },
                        states: {
                            normal: {
                                filter: {
                                    type: "none",
                                    value: 0
                                }
                            },
                            hover: {
                                filter: {
                                    type: "none",
                                    value: 0
                                }
                            },
                            active: {
                                allowMultipleDataPointsSelection: !1,
                                filter: {
                                    type: "none",
                                    value: 0
                                }
                            }
                        },
                        tooltip: {
                            style: {
                                fontSize: "12px"
                            }
                        },
                        colors: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                        grid: {
                            padding: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            },
                            borderColor: gray_300,
                            strokeDashArray: 4,
                            yaxis: {
                                lines: {
                                    show: true
                                }
                            }
                        },
                        markers: {
                            colors: [light_green, light_blue, light_red, light_purple, light_gray_500, light_orange, light_cyan, light_blue_100, light_blue_900, light_gray_600, light_yellow],
                            strokeColor: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                            strokeWidth: 3
                        }
                    });
                    neighbouhoodchart.render();
                    neighbouhoodchart.updateSeries(allSeriesData);
                }

                // Call the function once on page load with the default series data
                $(document).ready(function () {
                    var defaultStoreData = [10, 10, 15, 10, 10, 13, 13, 13, 11, 10, 10];
                    var defaultSeriesData = [{
                        name: 'ABC Fine Wine & Spirits - 34th Blvd',
                        data: defaultStoreData,
                        // Customize the style of the default series with dashed line
                        stroke: {
                            width: [5, 7, 5],
                            dashArray: [0, 8, 5]
                        },
                    }];
                    updateNeighbourhoodLineChart(defaultSeriesData);
                });

                $('#neighbourhood_avg_price_content input[type="checkbox"]').change(function () {
                    // Find the closest label to the changed checkbox
                    var label = $(this).closest('span').find('label');

                    // Check if the checkbox is checked
                    if ($(this).is(':checked')) {
                        // If checked, set the label text to "Remove"
                        label.html('<span class="svg-icon svg-icon-primary svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path fill="black" d="M16,0A16,16,0,0,0,0,16V38A16,16,0,0,0,16,54H33.73a14.78,14.78,0,0,1-1.43-4H16A12,12,0,0,1,4,38V16A12,12,0,0,1,16,4H38A12,12,0,0,1,50,16V32.3a14.78,14.78,0,0,1,4,1.43V16A16,16,0,0,0,38,0Z"/><path fill="black" d="M29.84,33.56a2,2,0,0,0,2.74-.23l8.91-10a2,2,0,1,0-3-2.66l-7.66,8.59-8.18-6.52a2,2,0,0,0-2.6.1l-7.43,6.93a2,2,0,0,0,2.72,2.92L21.53,27Z"/><path fill="black" d="M43,45a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Z"/><path fill="black" d="M47,34A13,13,0,1,1,34,47,13,13,0,0,1,47,34Zm9,13a9,9,0,1,0-9,9A9,9,0,0,0,56,47Z"/></g></g></svg></span>');
                    } else {
                        // If not checked, set the label text to "Add"
                        label.html('<span class="svg-icon svg-icon-muted svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path fill="black" d="M16,0A16,16,0,0,0,0,16V38A16,16,0,0,0,16,54H33.73a14.78,14.78,0,0,1-1.43-4H16A12,12,0,0,1,4,38V16A12,12,0,0,1,16,4H38A12,12,0,0,1,50,16V32.3a14.78,14.78,0,0,1,4,1.43V16A16,16,0,0,0,38,0Z"/><path  fill="black"  d="M29.84,33.56a2,2,0,0,0,2.74-.23l8.91-10a2,2,0,1,0-3-2.66l-7.66,8.59-8.18-6.52a2,2,0,0,0-2.6.1l-7.43,6.93a2,2,0,0,0,2.72,2.92L21.53,27Z"/><path fill="black" d="M43,45a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Z"/><path fill="black" d="M45,51a2,2,0,0,0,4,0V43a2,2,0,0,0-4,0Z"/><path fill="black"  d="M47,34A13,13,0,1,1,34,47,13,13,0,0,1,47,34Zm9,13a9,9,0,1,0-9,9A9,9,0,0,0,56,47Z"/></g></g></svg></span>');
                    }

                    // Create an array to store selected store names
                    var selectedStores = [];
                    var selectedSeriesData = [];

                    // Always include the default series
                    var defaultStoreData = [10, 10, 15, 10, 10, 13, 13, 13, 11, 10, 10];
                    var defaultSeries = {
                        name: 'ABC Fine Wine & Spirits',
                        data: defaultStoreData,
                        stroke: {
                            dashArray: [8]
                        },
                    };

                    selectedSeriesData.push(defaultSeries);

                    // Loop through all checked checkboxes
                    $('#neighbourhood_avg_price_content input[type="checkbox"]').each(function () {
                        if ($(this).is(":checked")) {
                            // Get the text of the first column in the selected row
                            var storeName = $(this).closest('#neighbourhood_avg_price_content .row-selected').find('.storeName').text();

                            // Add the store name to the array
                            selectedStores.push(storeName);

                            // Generate unique data for each store
                            var storeData = generateStoreData(storeName);
                            var storeSeries = {
                                name: storeName,
                                data: storeData,
                                stroke: {
                                    dashArray: [8]
                                },
                            };
                            selectedSeriesData.push(storeSeries);
                        }
                    });

                    // Update the text to display selected store names
                    var displayedStoreNames = ['ABC Fine Wine & Spirits'].concat(selectedStores);
                    $('#neighbourhood_avg_price_content .stores-name').text(displayedStoreNames.join(', '));

                    // Update the line chart with the given series data
                    updateNeighbourhoodLineChart(selectedSeriesData);
                });
                //Nieghbourhood Average Price View========================================            


                //Boundary Average Price View========================================             
                // Function to update the line chart with the given series data
                function updateBoundaryLineChart(allSeriesData) {
                    var boundarychart = new ApexCharts(document.querySelector(".mixed-widget-8-chart-boundary"), {
                        series: allSeriesData,
                        chart: {
                            fontFamily: "inherit",
                            type: "area",
                            height: 400,
                            toolbar: {
                                show: false
                            },
                        },
                        plotOptions: {},
                        legend: {
                            show: true,
                            showForSingleSeries: true,
                            markers: {
                                radius: 12,
                                fillColors: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                            },
                            height: 48,
                        },
                        dataLabels: {
                            enabled: false,
                            textAnchor: 'end',
                            offsetX: -10,
                            formatter: function (val, opt) {
                                var lastIndex = opt.w.globals.series[0].length - 1;
                                if (opt.dataPointIndex === lastIndex) {
                                    return opt.w.globals.seriesNames[opt.seriesIndex];
                                }
                                return '';
                            },
                            style: {
                                fontSize: '10px',
                            },
                            background: {
                                enabled: true,
                                padding: 10,
                                borderRadius: 2,
                                borderWidth: 1,
                                borderColor: '#fff',
                                opacity: 0.9,
                            },
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                opacityFrom: .4,
                                opacityTo: 0,
                                stops: [20, 120, 120, 120]
                            }
                        },
                        stroke: {
                            curve: "smooth",
                            show: true,
                            width: 3,
                            colors: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                            dashArray: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
                        },
                        xaxis: {
                            //for single date
                            categories: ["11/1/23", "11/2/23", "11/3/23", "11/4/23", "11/5/23", "11/6/23", "11/7/23", "11/8/23", "11/9/23", "11/10/23", "11/11/23"],
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {
                                show: false
                            },
                            tickPlacement: 'on',
                            // tickAmount: 3,
                            labels: {
                                show: !0,
                                // rotate: 0,
                                hideOverlappingLabels: false,
                                style: {
                                    colors: gray_500,
                                    fontSize: "11px"
                                }
                            },
                            crosshairs: {
                                position: "front",
                                stroke: {
                                    color: gray_500,
                                    width: 1,
                                    dashArray: 3
                                }
                            },
                            tooltip: {
                                enabled: true,
                                formatter: void 0,
                                offsetY: 0,
                                style: {
                                    fontSize: "11px"
                                }
                            }
                        },
                        yaxis: {
                            tickAmount: 5,
                            min: 0,
                            max: 20,
                            title: {
                                text: '',
                                style: {
                                    color: gray_500,
                                    fontSize: "12px",
                                    fontWeight: 400,
                                },
                            },
                            labels: {
                                style: {
                                    colors: gray_500,
                                    fontSize: "11px"
                                },
                                formatter: function (e) {
                                    if (e !== null && e !== undefined) {
                                        return '$' + e.toFixed(2);
                                    }
                                    return e;
                                },
                                offsetX: -10,
                            }
                        },
                        states: {
                            normal: {
                                filter: {
                                    type: "none",
                                    value: 0
                                }
                            },
                            hover: {
                                filter: {
                                    type: "none",
                                    value: 0
                                }
                            },
                            active: {
                                allowMultipleDataPointsSelection: !1,
                                filter: {
                                    type: "none",
                                    value: 0
                                }
                            }
                        },
                        tooltip: {
                            style: {
                                fontSize: "12px"
                            }
                        },
                        colors: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                        grid: {
                            padding: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            },
                            borderColor: gray_300,
                            strokeDashArray: 4,
                            yaxis: {
                                lines: {
                                    show: true
                                }
                            }
                        },
                        markers: {
                            colors: [light_green, light_blue, light_red, light_purple, light_gray_500, light_orange, light_cyan, light_blue_100, light_blue_900, light_gray_600, light_yellow],
                            strokeColor: [green, blue, red, purple, gray_500, orange, cyan, blue_100, blue_900, gray_600, yellow],
                            strokeWidth: 3
                        }
                    });
                    boundarychart.render();
                    boundarychart.updateSeries(allSeriesData);
                }

                // Call the function once on page load with the default series data
                $(document).ready(function () {
                    var defaultStoreData = [10, 10, 15, 10, 10, 13, 13, 13, 11, 10, 10];
                    var defaultSeriesData = [{
                        name: 'ABC Fine Wine & Spirits - 34th Blvd',
                        data: defaultStoreData,
                        // Customize the style of the default series with dashed line
                        stroke: {
                            width: [5, 7, 5],
                            dashArray: [0, 8, 5]
                        },
                    }];
                    updateBoundaryLineChart(defaultSeriesData);
                });

                $('#boundary_avg_price_content input[type="checkbox"]').change(function () {
                    // Find the closest label to the changed checkbox
                    var label = $(this).closest('span').find('label');

                    // Check if the checkbox is checked
                    if ($(this).is(':checked')) {
                        // If checked, set the label text to "Remove"
                        label.html('<span class="svg-icon svg-icon-primary svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path fill="black" d="M16,0A16,16,0,0,0,0,16V38A16,16,0,0,0,16,54H33.73a14.78,14.78,0,0,1-1.43-4H16A12,12,0,0,1,4,38V16A12,12,0,0,1,16,4H38A12,12,0,0,1,50,16V32.3a14.78,14.78,0,0,1,4,1.43V16A16,16,0,0,0,38,0Z"/><path fill="black" d="M29.84,33.56a2,2,0,0,0,2.74-.23l8.91-10a2,2,0,1,0-3-2.66l-7.66,8.59-8.18-6.52a2,2,0,0,0-2.6.1l-7.43,6.93a2,2,0,0,0,2.72,2.92L21.53,27Z"/><path fill="black" d="M43,45a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Z"/><path fill="black" d="M47,34A13,13,0,1,1,34,47,13,13,0,0,1,47,34Zm9,13a9,9,0,1,0-9,9A9,9,0,0,0,56,47Z"/></g></g></svg></span>');
                    } else {
                        // If not checked, set the label text to "Add"
                        label.html('<span class="svg-icon svg-icon-muted svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path fill="black" d="M16,0A16,16,0,0,0,0,16V38A16,16,0,0,0,16,54H33.73a14.78,14.78,0,0,1-1.43-4H16A12,12,0,0,1,4,38V16A12,12,0,0,1,16,4H38A12,12,0,0,1,50,16V32.3a14.78,14.78,0,0,1,4,1.43V16A16,16,0,0,0,38,0Z"/><path  fill="black"  d="M29.84,33.56a2,2,0,0,0,2.74-.23l8.91-10a2,2,0,1,0-3-2.66l-7.66,8.59-8.18-6.52a2,2,0,0,0-2.6.1l-7.43,6.93a2,2,0,0,0,2.72,2.92L21.53,27Z"/><path fill="black" d="M43,45a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Z"/><path fill="black" d="M45,51a2,2,0,0,0,4,0V43a2,2,0,0,0-4,0Z"/><path fill="black"  d="M47,34A13,13,0,1,1,34,47,13,13,0,0,1,47,34Zm9,13a9,9,0,1,0-9,9A9,9,0,0,0,56,47Z"/></g></g></svg></span>');
                    }

                    // Create an array to store selected store names
                    var selectedStores = [];
                    var selectedSeriesData = [];

                    // Always include the default series
                    var defaultStoreData = [10, 10, 15, 10, 10, 13, 13, 13, 11, 10, 10];
                    var defaultSeries = {
                        name: 'ABC Fine Wine & Spirits',
                        data: defaultStoreData,
                    };

                    selectedSeriesData.push(defaultSeries);

                    // Loop through all checked checkboxes
                    $('#boundary_avg_price_content input[type="checkbox"]').each(function () {
                        if ($(this).is(":checked")) {
                            // Get the text of the first column in the selected row
                            var storeName = $(this).closest('#boundary_avg_price_content .row-selected').find('.storeName').text();

                            // Add the store name to the array
                            selectedStores.push(storeName);

                            // Generate unique data for each store
                            var storeData = generateStoreData(storeName);
                            var storeSeries = {
                                name: storeName,
                                data: storeData,
                            };
                            selectedSeriesData.push(storeSeries);


                        }
                    });

                    // Update the text to display selected store names
                    var displayedStoreNames = ['ABC Fine Wine & Spirits'].concat(selectedStores);
                    $('#boundary_avg_price_content .stores-name').text(displayedStoreNames.join(', '));

                    // Update the line chart with the given series data
                    updateBoundaryLineChart(selectedSeriesData);
                });
                //Boundary Average Price View========================================            
            }
        });
        table.on('responsive-display', function () {

        });
    });
}
//Toggle Datatable Images
const toggleImage = function () {
    let counter = "";
    if (counter >= 0) {
        $('.expand-image').remove();
    }
    if ($('table').find('td .img-wrapper').length > 0) {
        $('table').find('td .img-wrapper').closest('.dataTables_wrapper').find('table').addClass('toggle-image');
        $('.toggle-image').find('tr:first-child').find('th:first-child').prepend($('<span class="expand-image d-inline-flex align-items-center justify-content-center btn bg-gray-300 btn-color-gray-600 btn-active-primary p-0 w-18px h-18px rounded-circle me-2 position-relative start-0 top-n1px image-expanded"><i class="fas fa-minus cursor-pointer fs-9 lh-sm p-0"></i></span>').click(function () {
            $(this).toggleClass('image-expanded')
            var expandible = $(this).closest('.dataTables_wrapper').find('td .img-wrapper')
            if ($(this).hasClass('image-expanded')) {
                $(this).html('<i class="fas fa-minus cursor-pointer fs-9 lh-sm p-0"></i>');
                expandible.show();
                //show image on change of tab
                $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
                    let targetTab = $(e.target).attr('href');
                    let targetTabContent = $(targetTab);
                    $(targetTabContent).find('.expand-image').addClass('image-expanded')
                    $(targetTabContent).find('.expand-image').html('<i class="fas fa-minus cursor-pointer fs-9 lh-sm p-0"></i>');
                    $(targetTabContent).find('td .img-wrapper').show();
                });
            } else {
                $(this).html('<i class="fas fa-plus cursor-pointer fs-9 lh-sm p-0"></i>');
                expandible.hide();
                //hide image on change of tab
                $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
                    let targetTab = $(e.target).attr('href');
                    let targetTabContent = $(targetTab);
                    $(targetTabContent).find('.expand-image').toggleClass('image-expanded')
                    $(targetTabContent).find('.expand-image').html('<i class="fas fa-plus cursor-pointer fs-9 lh-sm p-0"></i>');
                    $(targetTabContent).find('td .img-wrapper').hide();
                });
            };
            counter++
            return false;
        }));
    }
}

// get headers data from API and create colDefArr for top section
function getTableData(apiUrl, callback) {
    $.getJSON(apiUrl, function (resp) {
        // console.log('d - ', data);
        var tblInfo = {};
        tblInfo.colDefArr = [];
        tblInfo.colArr = [];
        search = false;

        //custom header
        resp.header.forEach((element, index) => {
            if (element.image) {
                tblInfo.colDefArr.push({
                    title: `<span class="d-flex align-items-center flex-column text-center text-break lh-sm cursor-pointer text-hover-primary" data-bs-toggle='modal' data-bs-target='#view_data'><span class="thumb_bg img-wrapper rounded "><img src="${element.image}"alt="" class="img-fluid"></span>${element.name}</span>`,
                    targets: index,

                });

            } else {
                tblInfo.colDefArr.push({
                    title: element.name,
                    targets: index,
                });
            }
        });
        // get col keys
        for (const key in resp.data[0]) {
            tblInfo.colArr.push({
                data: key
            });
        }

        // console.log('d - ', colDefArr);
        callback(tblInfo);
    });
}

$('#neighbourhood_avg_price_checkbox').click(function () {
    if ($(this).prop('checked') == true) {
        $('.boundary_numb').addClass('d-none');
        $('#neighbourhood_avg_price_content').removeClass('d-none')
        $('#boundary_avg_price_content').addClass('d-none')
        $('.localized-avg-price-title').html('Avg Price (Neighbourhood) in each store for 1800 Anejo (750ml) at ABC Fine Wine & Spirits')
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust()
    }
});
$('#boundary_avg_price_checkbox').click(function () {
    if ($(this).prop('checked') == true) {
        $('.boundary_numb').removeClass('d-none');
    } else {
        $('.boundary_numb').addClass('d-none');
        $('#neighbourhood-avg-price').removeClass('d-none')
        $('#boundary-avg-price').addClass('d-none')
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust()
    }
});
$('#show_boundary_avg_price').click(function () {
    $('#neighbourhood_avg_price_content').addClass('d-none')
    $('#boundary_avg_price_content').removeClass('d-none')
    $('.localized-avg-price-title').html('Avg Price in each store at <span class="boundary_count">5.00 miles</span> Boundary for 1800 Anejo (750ml) at ABC Fine Wine & Spirits')
    if (newValue !== null) {
        // Update the content of the span with the new value
        var newValue = $('#floor2').val()
        $('.boundary_count').html(newValue);
    }
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust()

})

$("#edit-boundary").on("click", function () {
    if (newValue !== null) {
        // Update the content of the span with the new value
        var newValue = $('#floor').val()
        $('.boundary_count').text(newValue);
    }
});
$('#toggle-boundary-avg-price').click(function () {
    $('#neighbourhood_avg_price_content').addClass('d-none')
    $('#boundary_avg_price_content').removeClass('d-none')
    $('.localized-avg-price-title').html('Avg Price in each store at <span class="boundary_count">5.00 miles</span> Boundary for 1800 Anejo (750ml) at ABC Fine Wine & Spirits')
    if (newValue !== null) {
        // Update the content of the span with the new value
        var newValue = $('#floor').val()
        $('.boundary_count').html(newValue);
    }
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust()
})

$(document).ready(function () {
    var $popup = $('.skeleton-loader-popup');
    var statusChange = function (status) {
        var el = $('.circle-loader');
        el.removeClass();
        el.addClass('circle-loader');
        //el.addClass(status);
        el.closest('.skeleton-loader-popup').addClass(status);
    };
    setTimeout(function () {
        statusChange('success');

        if ($popup.hasClass('success')) {
            // $('.progress-text').text('Completed');
            setTimeout(function () {
                $('.sku-detail-section  .skeleton-card').addClass('d-none')
                $('.sku-detail-section  .content-card').removeClass('d-none');

                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
            }, 1000);

            setTimeout(function () {
                $('.price-history-section  .skeleton-card').addClass('d-none')
                $('.price-history-section  .content-card').removeClass('d-none');

                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
            }, 3000);

            setTimeout(function () {
                $('.neighbourhodd-price-section  .skeleton-card').addClass('d-none')
                $('.neighbourhodd-price-section  .content-card').removeClass('d-none');

                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
            }, 5000);
        } else {
            $popup.removeClass('d-none')
            let loaderIcon = $('.circle-loader');
            loaderIcon.addClass('failed');
            $('.progress-heading').text('Loading Failed');
            $('.progress-message').html('Sorry, Something went wrong');
        }
    }, 1000);
});