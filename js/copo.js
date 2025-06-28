var datatable_column_width;

//Summary Table Start
JDDatatable_summary_table('/apis/summary-table-pot.json', "summary_table", "");


function JDDatatable_summary_table(api, id, table_name) {
    table = $("#" + id + "").DataTable({
        "dom": "<'row'<'col-sm-12 col-md-12 text-end'>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'p>>",
        buttons: [],
        paging: true,
        serverSide: true,
        pageLength: 10,
        searching: false,
        responsive: false,
        scrollX: true,
        scrollY: "40vh",
        "scrollCollapse": true,
        info: false,
        ordering: false,
        order: [
            [1, "asc"]
        ],
        lengthMenu: [10, 15, 50, "All"],
        processing: false,
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
                    "pagination[page]": 1,
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

                    $(document).ready(function () {
                        // Call checkDataTableScroll after a delay
                        setTimeout(function () {
                            checkDataTableScroll('summary_table');
                        }, 1000); // Adjust the delay time as needed (e.g., 1000 milliseconds = 1 second)
                    });

                    $('.colored-cell.bg-lighter-success').parent('td').addClass('bg-lighter-success')
                    $('.colored-cell.bg-lighter-danger').parent('td').addClass('bg-lighter-danger')
                    $('.colored-cell.bg-secondary').parent('td').addClass('bg-secondary')

                    setTimeout(function () {
                        $('.summary-table-section .skeleton-card').addClass('d-none')
                        $('.summary-table-section .content-card').removeClass('d-none');
                        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                    }, 500);

                    $('[data-bs-toggle="tooltip"]').tooltip();

                },
                error: function (jqXhr, textStatus, errorThrown) { }
            });
        },

        "columns": [
            { "data": "state" },
            { "data": "pr_overall_ava" },
            { "data": "pr_vodka_ava" },
            { "data": "pr_vodka_spirit_dis" },
            { "data": "pr_vodka_spirit_total_uni" },
            { "data": "pr_vodka_spirit_report_uni" },
            { "data": "pr_american_ava" },
            { "data": "pr_american_spirit_dis" },
            { "data": "pr_american_spirit_total_uni" },
            { "data": "pr_american_spirit_report_uni" },
            { "data": "diageo_overall_ava" },
            { "data": "diageo_vodka_ava" },
            { "data": "diageo_vodka_spirit_dis" },
            { "data": "diageo_vodka_spirit_total_uni" },
            { "data": "diageo_vodka_spirit_report_uni" },
            { "data": "diageo_american_ava" },
            { "data": "diageo_american_spirit_dis" },
            { "data": "diageo_american_spirit_total_uni" },
            { "data": "diageo_american_spirit_report_uni" },
        ],

        "drawCallback": function () {
            toggleSubText();
            //Color Shades on the basis of percentage value
            $(".colored__perc_td tbody tr td").each(function () {
                //Blue Percentage Shades
                let perc_value = $(this).find('.perc').text()
                let percentage = $(this).find('.perc')
                $(percentage).closest('td').css('background-color', 'rgba(68,158,221,' + perc_value + ')')


                //yellow Percentage Shades
                let perc_value_yellow = $(this).find('.perc-yellow').text()
                let percentage_yellow = $(this).find('.perc-yellow')
                $(percentage_yellow).closest('td').css('background-color', 'rgba(252,240,193,' + perc_value_yellow + ')')


                //red Percentage Shades
                let perc_value_red = $(this).find('.perc-red').text()
                let percentage_red = $(this).find('.perc-red')
                $(percentage_red).closest('td').css('background-color', 'rgba(253,223,232,' + perc_value_red + ')')


                //dark yellow Percentage Shades
                let perc_value_dark_yellow = $(this).find('.perc-dark-yellow').text()
                let percentage_dark_yellow = $(this).find('.perc-dark-yellow')
                $(percentage_dark_yellow).closest('td').css('background-color', 'rgba(252,240,193,' + perc_value_dark_yellow + ')')


                //dark red Percentage Shades
                let perc_value_dark_red = $(this).find('.perc-dark-red').text()
                let percentage_dark_red = $(this).find('.perc-dark-red')
                $(percentage_dark_red).closest('td').css('background-color', 'rgba(253,223,232,' + perc_value_dark_red + ')')
            });

            //Clickable cells
            $('.td-link').closest('td').addClass('colored-cell-hover')

            //colors for column headings
            $('.bg-light-warning').closest('th').addClass('bg-light-warning text-gray-700');
            $('.bg-light-danger').closest('th').addClass('bg-light-danger text-gray-700');
            $('.bg-warning-200').closest('th').addClass('bg-warning-200  text-gray-700');
            $('.bg-danger-200').closest('th').addClass('bg-danger-200 text-gray-700');
            $('.bg-gray').closest('th').addClass('bg-gray');
            //colors for column cells
            // $('.bg-light-warning').closest('td').addClass('bg-light-warning ');
            // $('.bg-light-danger').closest('td').addClass('bg-light-danger');
            $('.bg-success-200').closest('td').addClass('bg-success-200');
            $('.bg-danger-200').closest('td').addClass('bg-danger-200');
            $('.bg-warning-200').closest('td').addClass('bg-warning-200');
            $('.bg-gray').closest('td').addClass('bg-gray');
            //Show Sub text in table on the basis of options selected in Report Configuration popup
            $('.apply').click(function () {
                //hide and show column sub text
                if ($("#parent-column-data-type-distribution").is(":checked")) {
                    $('.col-sub-text-distribution').show()
                } else {
                    $('.col-sub-text-distribution').hide();
                }

                if ($("#parent-column-data-type-total-universe").is(":checked")) {
                    $('.col-sub-text-tudp').show()
                } else {
                    $('.col-sub-text-tudp').hide()
                }

                if ($("#parent-column-data-type-report-universe").is(":checked")) {
                    $('.col-sub-text-rudp').show()
                } else {
                    $('.col-sub-text-rudp').hide()
                }

                if ($("#parent-column-data-type-accounts-surveyed").is(":checked")) {
                    $('.col-sub-text-accounts-surveyed').show()
                } else {
                    $('.col-sub-text-accounts-surveyed').hide()

                }

                if ($("#parent-column-data-type-overall-availability").is(":checked")) {
                    $('.col-sub-text-overall-availability').show()
                } else {
                    $('.col-sub-text-overall-availability').hide()

                }

                //hide and show row sub text
                if ($("#row-data-type-distribution").is(":checked")) {
                    $('.row-sub-text-distribution').show()
                } else {
                    $('.row-sub-text-distribution').hide()
                }

                if ($("#row-data-type-total-universe").is(":checked")) {
                    $('.row-sub-text-tudp').show()
                } else {
                    $('.row-sub-text-tudp').hide()
                }

                if ($("#row-data-type-report-universe").is(":checked")) {
                    $('.row-sub-text-rudp').show()
                } else {
                    $('.row-sub-text-rudp').hide()
                }

                if ($("#row-data-type-accounts-surveyed").is(":checked")) {
                    $('.row-sub-text-accounts-surveyed').show()
                } else {
                    $('.row-sub-text-accounts-surveyed').hide()
                }

                if ($("#row-data-type-overall-availability").is(":checked")) {
                    $('.row-sub-text-overall-availability').show()
                } else {
                    $('.row-sub-text-overall-availability').hide()
                }

                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
            })

            // Function to handle the view toggle
            function toggleView(expand) {
                if (!expand) {
                    $('.icon-view').slideUp();
                    $('.text-view, .col-sub-text').slideDown();
                } else {
                    $('.icon-view').slideDown();
                    $('.text-view, .col-sub-text').slideUp();
                }
                $($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw();; // Adjust column widths
            }

            // Initial state check
            toggleView($('#expand_view').is(":checked")); // Show expand view by default

            // Event handler for compact view
            $("#compact_view").click(function () {
                toggleView($(this).is(":checked"));
            });

            // Event handler for expand view
            $("#expand_view").click(function () {
                toggleView(!$(this).is(":checked"));
            });

            //Check Scrollbar
            checkDataTableScroll("summary_table");
            $(window).on('resize', function () {
                // Check the DataTable's scroll when the window is resized
                checkDataTableScroll("summary_table");
            });

            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                // Check the DataTable's scroll when the tab changes
                checkDataTableScroll("summary_table");

            });

            //Performance Over Time Start===================================

            //click table cell to show POT
            //Check Screen Size
            var isSmallScreen = window.innerWidth <= 1199;
            if (isSmallScreen) {
                $('.show_pot').click(function () {
                    $(this).closest('td').toggleClass('active');

                    setTimeout(function () {
                        var anyActive = $('.show_pot.active').length > 0; // Check for active class in .show_pot

                        if (anyActive) {
                            $('.summary-table-view').animate({
                                width: '100%'
                            }, 300);
                            $('.pot-view').removeClass('d-none').animate({
                                width: '100%'
                            }, 300).promise().done(function () {
                                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                            });
                        } else {
                            $('.pot-view').addClass('d-none');
                            $('.summary-table-view').animate({
                                width: '100%'
                            }, 300).promise().done(function () {
                                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                            });
                        }
                        $('.perf-summary').removeClass('d-none')
                        $('#slide-full-right').addClass('d-none')
                        $('#slide-full-left').addClass('d-none')
                    }, 500); // Delay to ensure the class toggle has settled
                });

            } else {
                $('.show_pot').click(function () {
                    $(this).closest('td').toggleClass('active');

                    setTimeout(function () {
                        var anyActive = $('.show_pot.active').length > 0; // Check for active class in .show_pot

                        if (anyActive) {
                            if ($('#slide-full-left').hasClass('active')) {
                                $('.summary-table-view').animate({
                                    width: '22%'
                                }, 300);

                                $('.pot-view').removeClass('d-none').animate({
                                    width: '78%'
                                }, 300).promise().done(function () {
                                    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                                });
                                $('#slide-full-right').addClass('d-none');
                                $('.toolbar-btn').addClass('d-none');
                                $('#slide-half-right').removeClass('d-none');
                            } else {
                                $('.pot-view').removeClass('d-none').animate({
                                    width: '40%'
                                }, 300);

                                $('.summary-table-view').animate({
                                    width: '60%'
                                }, 300).promise().done(function () {
                                    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                                });
                                $('#slide-full-right').removeClass('d-none');
                            }

                            $('#slide-half-left-top-btn').addClass('d-none');
                        } else {
                            if ($('#slide-half-right').hasClass('active')) {
                                $('#slide-full-left').removeClass('active');
                                $('.pot-view').addClass('d-none');
                                $('.summary-table-view').animate({
                                    width: '100%'
                                }, 300).promise().done(function () {
                                    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                                });
                                $('.toolbar-btn').removeClass('d-none');
                                $('#slide-full-right').addClass('d-none');
                                $('#slide-half-left-top-btn').addClass('d-none');
                                $('#slide-half-right').addClass('d-none');
                            } else {
                                $('.pot-view').addClass('d-none');
                                $('.summary-table-view').animate({
                                    width: '100%'
                                }, 300).promise().done(function () {
                                    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                                });
                                $('.toolbar-btn').removeClass('d-none');
                                $('#slide-full-right').addClass('d-none');
                                $('#slide-half-left-top-btn').addClass('d-none');
                                $('#slide-half-right').addClass('d-none');
                            }
                        }
                    }, 500); // Delay to ensure the class toggle has settled
                });

            }

            //Performance Over Time Chart
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


            $(document).ready(function () {
                var colors = ['#62B2FD', '#FFB44F', '#6C5EFF', red, blue, green,];

                //Generate Line Chart Data
                function generatePOTData() {
                    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
                }

                // Show Distribution Series as Dashed Line
                function applyDashArrayToDistributionSeries() {
                    $('[seriesName="Distribution"] path').attr('stroke-dasharray', '3');
                }

                var potChart;

                function updateNeighbourhoodLineChart(allSeriesData) {
                    if (potChart) {
                        potChart.updateSeries(allSeriesData);
                    } else {
                        potChart = new ApexCharts(document.querySelector(".pot-line-chart"), {
                            series: allSeriesData,
                            chart: {
                                fontFamily: "inherit",
                                type: "line",
                                height: 275,
                                padding: {
                                    bottom: 50
                                },
                                toolbar: {
                                    show: false
                                }
                            },
                            plotOptions: {},
                            legend: {
                                show: false,
                                showForSingleSeries: true,
                                fontSize: '14px',
                                fontWeight: 500,
                                labels: {
                                    useSeriesColors: true,
                                },
                                markers: {
                                    radius: 12,
                                    fillColors: colors,

                                },
                                position: 'bottom',
                                horizontalAlign: 'right',
                                offsetY: 8,
                                formatter: function (seriesName, opts) {
                                    return `<span>
                                <span class="bg-light min-h-30px d-inline-flex align-items-center p-4 py-1 rounded lh-sm ps-14 me-1">
                                <span class="me-2 custom-legend-marker position-relative" style="background-color: ${opts.w.globals.colors[opts.seriesIndex]}; width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 5px;"></span>
                                <span class="me-2">${seriesName}</span>
                                <span class="text-gray-600"> PR | Vodka | CA</span>
                                </span>
                                <button class="btn btn-light btn-icon min-w-40px min-h-30px mh-30px mw-40px" >
                                <span class="svg-icon svg-icon-muted svg-icon-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M15.4569 7.7975C15.435 7.74813 14.9056 6.57375 13.7287 5.39687C12.1606 3.82875 10.18 3 7.99999 3C5.81999 3 3.83937 3.82875 2.27124 5.39687C1.09437 6.57375 0.562494 7.75 0.543119 7.7975C0.51469 7.86144 0.5 7.93064 0.5 8.00062C0.5 8.0706 0.51469 8.1398 0.543119 8.20375C0.564994 8.25312 1.09437 9.42688 2.27124 10.6038C3.83937 12.1713 5.81999 13 7.99999 13C10.18 13 12.1606 12.1713 13.7287 10.6038C14.9056 9.42688 15.435 8.25312 15.4569 8.20375C15.4853 8.1398 15.5 8.0706 15.5 8.00062C15.5 7.93064 15.4853 7.86144 15.4569 7.7975ZM7.99999 12C6.07624 12 4.39562 11.3006 3.00437 9.92188C2.43352 9.35418 1.94786 8.70685 1.56249 8C1.94776 7.29309 2.43343 6.64574 3.00437 6.07812C4.39562 4.69938 6.07624 4 7.99999 4C9.92374 4 11.6044 4.69938 12.9956 6.07812C13.5676 6.6456 14.0543 7.29295 14.4406 8C13.99 8.84125 12.0269 12 7.99999 12ZM7.99999 5C7.40665 5 6.82663 5.17595 6.33328 5.50559C5.83994 5.83524 5.45542 6.30377 5.22836 6.85195C5.00129 7.40013 4.94188 8.00333 5.05764 8.58527C5.17339 9.16721 5.45912 9.70176 5.87867 10.1213C6.29823 10.5409 6.83278 10.8266 7.41472 10.9424C7.99667 11.0581 8.59987 10.9987 9.14804 10.7716C9.69622 10.5446 10.1648 10.1601 10.4944 9.66671C10.824 9.17336 11 8.59334 11 8C10.9992 7.2046 10.6828 6.44202 10.1204 5.87959C9.55797 5.31716 8.79539 5.00083 7.99999 5ZM7.99999 10C7.60443 10 7.21775 9.8827 6.88885 9.66294C6.55996 9.44318 6.30361 9.13082 6.15224 8.76537C6.00086 8.39991 5.96125 7.99778 6.03842 7.60982C6.11559 7.22186 6.30608 6.86549 6.58578 6.58579C6.86549 6.30608 7.22185 6.1156 7.60981 6.03843C7.99778 5.96126 8.39991 6.00087 8.76536 6.15224C9.13081 6.30362 9.44317 6.55996 9.66293 6.88886C9.8827 7.21776 9.99999 7.60444 9.99999 8C9.99999 8.53043 9.78928 9.03914 9.41421 9.41421C9.03913 9.78929 8.53043 10 7.99999 10Z" fill="#8A8A8A"></path>
                                    </svg>
                                </span>
                                </button>
                            </span>`;
                                },
                                //height: 80,
                            },

                            dataLabels: {
                                enabled: false,
                                textAnchor: 'end',
                                offsetX: -10,


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
                                type: "solid",
                            },
                            stroke: {
                                curve: "straight",
                                show: true,
                                width: 2,
                                colors: colors,
                            },

                            xaxis: {
                                categories: ["Jan", "Feb", "March", "April", "May", "June"],
                                axisBorder: {
                                    show: false
                                },
                                axisTicks: {
                                    show: false
                                },
                                tickPlacement: 'between',
                                // tickAmount: 3,
                                labels: {
                                    show: !0,
                                    // rotate: 0,
                                    // hideOverlappingLabels: false,
                                    style: {
                                        colors: '#8A8A8A',
                                        fontSize: "10px"
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

                            yaxis: [
                                {
                                    tickAmount: 5,
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
                                        formatter: function (value, opts) {
                                            if (typeof opts.seriesIndex !== 'undefined' && allSeriesData && allSeriesData[opts.seriesIndex]) {
                                                var seriesName = allSeriesData[opts.seriesIndex].name;
                                                if (seriesName === "Distribution") {
                                                    $(this).addClass('test')
                                                    return value.toFixed(0); // Format as number for "Distribution" series

                                                } else {
                                                    return value.toFixed(0) + '%'; // Format as percentage for other series
                                                }
                                            }
                                            return value.toFixed(0) + '%'; // Default to percentage formatting if series information is not available
                                        },
                                        style: {
                                            colors: '#B5B5B5',
                                            fontSize: "10px"
                                        },
                                        offsetX: -10,
                                    }
                                },
                                {
                                    show: false,
                                    tickAmount: 5,
                                    min: 0,
                                    opposite: true,
                                    title: {
                                        text: '',
                                        style: {
                                            color: gray_500,
                                            fontSize: "12px",
                                            fontWeight: 400,
                                        },
                                    },
                                    labels: {
                                        formatter: function (value, opts) {
                                            if (typeof opts.seriesIndex !== 'undefined' && allSeriesData && allSeriesData[opts.seriesIndex]) {
                                                var seriesName = allSeriesData[opts.seriesIndex].name;
                                                if (seriesName === "Distribution") {
                                                    $(this).addClass('test')

                                                    return value.toFixed(0); // Format as number for "Distribution" series
                                                } else {
                                                    return value.toFixed(0) + '%'; // Format as percentage for other series
                                                }
                                            }
                                            applyDashArrayToDistributionSeries()
                                            return value.toFixed(0); // Default to percentage formatting if series information is not available
                                        },
                                        style: {
                                            colors: '#6C5EFF',
                                            fontSize: "10px"
                                        },
                                        //offsetX: -10,
                                    }
                                }
                            ],

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
                            colors: colors,
                            grid: {
                                padding: {
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                },
                                borderColor: KTUtil.getCssVariableValue("--bs-gray-200"),
                                // strokeDashArray: 4,
                                yaxis: {
                                    lines: {
                                        show: true
                                    }
                                },
                                xaxis: {
                                    lines: {
                                        show: true
                                    }
                                }
                            },
                            markers: {
                                colors: [light_green, light_blue, light_red, light_purple, light_gray_500, light_orange, light_cyan, light_blue_100, light_blue_900, light_gray_600, light_yellow],
                                strokeColor: colors,
                                strokeWidth: 3
                            }
                        });

                        potChart.render();

                        $('.bar-graph-view').on('click', function () {
                            potChart.updateOptions({
                                chart: {
                                    type: "bar"
                                },
                                stroke: {
                                    //curve: "straight",
                                    show: true,
                                    width: 2,
                                    colors: 'transparent',
                                },
                            });
                        });
                        // Button click event to toggle chart type to line graph
                        $('.line-graph-view').on('click', function () {
                            potChart.updateOptions({
                                chart: {
                                    type: "line"
                                },
                                stroke: {
                                    curve: "straight",
                                    show: true,
                                    width: 2,
                                    colors: colors,
                                },
                            });
                        });
                    }

                }

                var allSeriesData = [];

                updateNeighbourhoodLineChart(allSeriesData);

                //On Table Cell Click Generate Line Chart Data
                $(document).on('click', '.show_pot', function () {
                    var buttonText = $(this).text().trim(); // Get the text of the button
                    var isActive = $(this).hasClass('active');
                    var $popup = $('.loader-popup');
                    $popup.removeClass('d-none');
                    $('.content-chart').addClass('d-none');
                    setTimeout(function () {
                        $popup.addClass('d-none');
                        $('.content-chart').removeClass('d-none');
                    }, 2000);
                    if (isActive) {
                        // Remove the series from allSeriesData based on the button text
                        var indexToRemove = allSeriesData.findIndex(function (series) {
                            return series.name === buttonText;
                        });
                        if (indexToRemove !== -1) {
                            allSeriesData.splice(indexToRemove, 1);
                        }

                        $(this).removeClass('active');
                    } else {
                        // Add a new series with the button text as the name
                        var newSeriesData = {
                            name: buttonText,
                            data: generatePOTData(buttonText),
                        };
                        allSeriesData.push(newSeriesData);
                        $(this).addClass('active');
                    }

                    updateNeighbourhoodLineChart(allSeriesData);
                    createCustomLegend(allSeriesData);

                    // Check if "Distribution" series is present in allSeriesData
                    var isDistribution = allSeriesData.some(function (series) {
                        return series.name === 'Distribution';
                    });

                    // Update yaxis configuration based on "Distribution" series presence
                    var yaxisConfig = [
                        {
                            tickAmount: 5,
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
                                formatter: function (value, opts) {
                                    if (typeof opts.seriesIndex !== 'undefined' && allSeriesData && allSeriesData[opts.seriesIndex]) {
                                        var seriesName = allSeriesData[opts.seriesIndex].name;
                                        if (seriesName === "Distribution") {
                                            $(this).addClass('test');
                                            return value.toFixed(0); // Format as number for "Distribution" series
                                        } else {
                                            return value.toFixed(0) + '%'; // Format as percentage for other series
                                        }
                                    }
                                    return value.toFixed(0) + '%'; // Default to percentage formatting if series information is not available
                                },
                                style: {
                                    colors: '#B5B5B5',
                                    fontSize: "10px"
                                },
                                offsetX: -10,
                            }
                        }
                    ];

                    if (isDistribution) {
                        yaxisConfig.push({
                            tickAmount: 5,
                            min: 0,
                            opposite: true,
                            title: {
                                text: '',
                                style: {
                                    color: gray_500,
                                    fontSize: "12px",
                                    fontWeight: 400,
                                },
                            },
                            labels: {
                                formatter: function (value, opts) {
                                    if (typeof opts.seriesIndex !== 'undefined' && allSeriesData && allSeriesData[opts.seriesIndex]) {
                                        var seriesName = allSeriesData[opts.seriesIndex].name;
                                        if (seriesName === "Distribution") {
                                            $(this).addClass('test');
                                            return value.toFixed(0); // Format as number for "Distribution" series
                                        } else {
                                            return value.toFixed(0) + '%'; // Format as percentage for other series
                                        }
                                    }
                                    applyDashArrayToDistributionSeries()
                                    return value.toFixed(0); // Default to percentage formatting if series information is not available
                                },
                                style: {
                                    colors: '#6C5EFF',
                                    fontSize: "10px"
                                },
                                offsetX: -10,
                            }
                        });
                    }

                    // Update the chart with new yaxis configuration
                    updateChartWithYAxis(yaxisConfig);

                    // Update the content of the pot-column-heading div
                    // Get all active button texts and join them with commas
                    var activeButtonTexts = $('.show_pot.active').map(function () {
                        return $(this).text().trim();
                    }).get().join(', ');

                    // Update the content of the pot-column-heading div
                    $('.pot-column-heading').text(activeButtonTexts);
                });

                //show and hide y-axis with numbers on the basis of Distribution series availability in chart
                function updateChartWithYAxis(yaxisConfig) {
                    potChart.updateOptions({
                        yaxis: yaxisConfig
                    });
                }

                //Create Custom Legend
                function createCustomLegend(seriesData) {
                    var legendContainer = document.querySelector("#legend");
                    legendContainer.innerHTML = ""; // Clear existing legends

                    seriesData.forEach(function (series, index) {
                        var legendItem = document.createElement("div");
                        legendItem.className = "custom-legend-item";
                        legendItem.style.opacity = 1; // Default to visible

                        // Add class 'distribution-legend' if series name is 'Distribution'
                        if (series.name === 'Distribution') {
                            legendItem.classList.add('distribution-legend');
                        }

                        var legendContent = `
                            <span class="d-flex justify-content-end mt-3">
                                <span class="bg-white min-h-30px d-inline-flex flex-wrap align-items-center p-4 py-1 rounded lh-sm ps-14 me-2 fs-7 fw-bold cursor-pointer z-index-0">
                                    <span class="me-2 custom-legend-marker position-relative" style="background-color: ${colors[index]}; width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 5px;"></span>
                                    <span class="me-2 series-name" style="color: ${colors[index]};">${series.name}</span>
                                    <span class="text-gray-600"> PR | Vodka | CA</span>
                                </span>
                                <button class="btn btn-white btn-active-white btn-icon min-w-40px min-h-30px mh-30px hide-series-btn">
                                    <span class="svg-icon svg-icon-muted svg-icon-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M15.4569 7.7975C15.435 7.74813 14.9056 6.57375 13.7287 5.39687C12.1606 3.82875 10.18 3 7.99999 3C5.81999 3 3.83937 3.82875 2.27124 5.39687C1.09437 6.57375 0.562494 7.75 0.543119 7.7975C0.51469 7.86144 0.5 7.93064 0.5 8.00062C0.5 8.0706 0.51469 8.1398 0.543119 8.20375C0.564994 8.25312 1.09437 9.42688 2.27124 10.6038C3.83937 12.1713 5.81999 13 7.99999 13C10.18 13 12.1606 12.1713 13.7287 10.6038C14.9056 9.42688 15.435 8.25312 15.4569 8.20375C15.4853 8.1398 15.5 8.0706 15.5 8.00062C15.5 7.93064 15.4853 7.86144 15.4569 7.7975ZM7.99999 12C6.07624 12 4.39562 11.3006 3.00437 9.92188C2.43352 9.35418 1.94786 8.70685 1.56249 8C1.94776 7.29309 2.43343 6.64574 3.00437 6.07812C4.39562 4.69938 6.07624 4 7.99999 4C9.92374 4 11.6044 4.69938 12.9956 6.07812C13.5676 6.6456 14.0543 7.29295 14.4406 8C13.99 8.84125 12.0269 12 7.99999 12ZM7.99999 5C7.40665 5 6.82663 5.17595 6.33328 5.50559C5.83994 5.83524 5.45542 6.30377 5.22836 6.85195C5.00129 7.40013 4.94188 8.00333 5.05764 8.58527C5.17339 9.16721 5.45912 9.70176 5.87867 10.1213C6.29823 10.5409 6.83278 10.8266 7.41472 10.9424C7.99667 11.0581 8.59987 10.9987 9.14804 10.7716C9.69622 10.5446 10.1648 10.1601 10.4944 9.66671C10.824 9.17336 11 8.59334 11 8C10.9992 7.2046 10.6828 6.44202 10.1204 5.87959C9.55797 5.31716 8.79539 5.00083 7.99999 5ZM7.99999 10C7.60443 10 7.21775 9.8827 6.88885 9.66294C6.55996 9.44318 6.30361 9.13082 6.15224 8.76537C6.00086 8.39991 5.96125 7.99778 6.03842 7.60982C6.11559 7.22186 6.30608 6.86549 6.58578 6.58579C6.86549 6.30608 7.22185 6.1156 7.60981 6.03843C7.99778 5.96126 8.39991 6.00087 8.76536 6.15224C9.13081 6.30362 9.44317 6.55996 9.66293 6.88886C9.8827 7.21776 9.99999 7.60444 9.99999 8C9.99999 8.53043 9.78928 9.03914 9.41421 9.41421C9.03913 9.78929 8.53043 10 7.99999 10Z" fill="#8A8A8A"/>
                                    </svg>
                                    </span>
                                </button>
                            </span>`;

                        legendItem.innerHTML = legendContent;
                        legendContainer.appendChild(legendItem);

                        // Add click event to toggle series visibility (assuming potChart is defined elsewhere)
                        legendItem.addEventListener('click', function () {
                            if (potChart) {
                                // Toggle series visibility
                                potChart.toggleSeries(series.name);

                                // Check if the series is currently visible and adjust the opacity of the legend item
                                var seriesVisible = potChart.w.globals.collapsedSeriesIndices.indexOf(index) === -1;
                                legendItem.style.opacity = seriesVisible ? 1 : 0.5;

                                // Update hide-series-btn icon based on legendItem opacity
                                var hideSeriesBtn = legendItem.querySelector('.hide-series-btn');
                                if (hideSeriesBtn) {
                                    var svgIcon = hideSeriesBtn.querySelector('svg');
                                    if (svgIcon) {
                                        svgIcon.innerHTML = ''; // Clear existing SVG
                                        svgIcon.innerHTML = seriesVisible ? `
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M15.4569 7.7975C15.435 7.74813 14.9056 6.57375 13.7287 5.39687C12.1606 3.82875 10.18 3 7.99999 3C5.81999 3 3.83937 3.82875 2.27124 5.39687C1.09437 6.57375 0.562494 7.75 0.543119 7.7975C0.51469 7.86144 0.5 7.93064 0.5 8.00062C0.5 8.0706 0.51469 8.1398 0.543119 8.20375C0.564994 8.25312 1.09437 9.42688 2.27124 10.6038C3.83937 12.1713 5.81999 13 7.99999 13C10.18 13 12.1606 12.1713 13.7287 10.6038C14.9056 9.42688 15.435 8.25312 15.4569 8.20375C15.4853 8.1398 15.5 8.0706 15.5 8.00062C15.5 7.93064 15.4853 7.86144 15.4569 7.7975ZM7.99999 12C6.07624 12 4.39562 11.3006 3.00437 9.92188C2.43352 9.35418 1.94786 8.70685 1.56249 8C1.94776 7.29309 2.43343 6.64574 3.00437 6.07812C4.39562 4.69938 6.07624 4 7.99999 4C9.92374 4 11.6044 4.69938 12.9956 6.07812C13.5676 6.6456 14.0543 7.29295 14.4406 8C13.99 8.84125 12.0269 12 7.99999 12ZM7.99999 5C7.40665 5 6.82663 5.17595 6.33328 5.50559C5.83994 5.83524 5.45542 6.30377 5.22836 6.85195C5.00129 7.40013 4.94188 8.00333 5.05764 8.58527C5.17339 9.16721 5.45912 9.70176 5.87867 10.1213C6.29823 10.5409 6.83278 10.8266 7.41472 10.9424C7.99667 11.0581 8.59987 10.9987 9.14804 10.7716C9.69622 10.5446 10.1648 10.1601 10.4944 9.66671C10.824 9.17336 11 8.59334 11 8C10.9992 7.2046 10.6828 6.44202 10.1204 5.87959C9.55797 5.31716 8.79539 5.00083 7.99999 5ZM7.99999 10C7.60443 10 7.21775 9.8827 6.88885 9.66294C6.55996 9.44318 6.30361 9.13082 6.15224 8.76537C6.00086 8.39991 5.96125 7.99778 6.03842 7.60982C6.11559 7.22186 6.30608 6.86549 6.58578 6.58579C6.86549 6.30608 7.22185 6.1156 7.60981 6.03843C7.99778 5.96126 8.39991 6.00087 8.76536 6.15224C9.13081 6.30362 9.44317 6.55996 9.66293 6.88886C9.8827 7.21776 9.99999 7.60444 9.99999 8C9.99999 8.53043 9.78928 9.03914 9.41421 9.41421C9.03913 9.78929 8.53043 10 7.99999 10Z" fill="#8A8A8A"/>
                                            </svg>                                        ` : `
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M14.25 10.9373C14.1929 10.9699 14.1299 10.9909 14.0647 10.9991C13.9994 11.0073 13.9332 11.0026 13.8698 10.9851C13.8064 10.9677 13.7471 10.938 13.6952 10.8976C13.6433 10.8572 13.5999 10.807 13.5675 10.7498L12.38 8.67485C11.6896 9.14165 10.928 9.4933 10.125 9.7161L10.4918 11.9173C10.5027 11.9822 10.5006 12.0485 10.4858 12.1125C10.471 12.1765 10.4437 12.2369 10.4055 12.2904C10.3673 12.3438 10.319 12.3893 10.2632 12.424C10.2075 12.4588 10.1454 12.4822 10.0806 12.493C10.0539 12.4973 10.027 12.4996 9.99997 12.4998C9.88168 12.4997 9.76729 12.4576 9.67712 12.381C9.58695 12.3045 9.52684 12.1984 9.50747 12.0817L9.14684 9.92047C8.38634 10.0263 7.61485 10.0263 6.85434 9.92047L6.49372 12.0817C6.47431 12.1986 6.41402 12.3048 6.32359 12.3814C6.23316 12.458 6.11847 12.5 5.99997 12.4998C5.97233 12.4997 5.94474 12.4974 5.91747 12.493C5.85266 12.4822 5.7906 12.4588 5.73485 12.424C5.6791 12.3893 5.63074 12.3438 5.59255 12.2904C5.55435 12.2369 5.52707 12.1765 5.51226 12.1125C5.49745 12.0485 5.49539 11.9822 5.50622 11.9173L5.87497 9.7161C5.07224 9.4926 4.31109 9.14031 3.62122 8.67297L2.43747 10.7498C2.37116 10.8654 2.26168 10.9498 2.1331 10.9847C2.00452 11.0195 1.86738 11.0018 1.75184 10.9355C1.63631 10.8692 1.55184 10.7597 1.51703 10.6311C1.48222 10.5025 1.49991 10.3654 1.56622 10.2498L2.81622 8.06235C2.37716 7.68302 1.97342 7.26464 1.60997 6.81235C1.56464 6.76174 1.53011 6.70243 1.50847 6.63803C1.48683 6.57363 1.47854 6.5055 1.4841 6.43779C1.48967 6.37008 1.50898 6.30421 1.54085 6.24422C1.57272 6.18422 1.61648 6.13134 1.66946 6.08882C1.72245 6.0463 1.78354 6.01502 1.84902 5.99689C1.91449 5.97876 1.98297 5.97417 2.05028 5.98339C2.11759 5.99261 2.18232 6.01545 2.2405 6.05052C2.29869 6.08559 2.34912 6.13214 2.38872 6.18735C3.42622 7.4711 5.24122 8.99985 7.99997 8.99985C10.7587 8.99985 12.5737 7.46922 13.6112 6.18735C13.6504 6.13101 13.7007 6.08333 13.759 6.04728C13.8174 6.01123 13.8826 5.98757 13.9505 5.97778C14.0184 5.96798 14.0875 5.97227 14.1537 5.99036C14.2199 6.00846 14.2816 6.03998 14.3351 6.08296C14.3886 6.12594 14.4326 6.17946 14.4645 6.24019C14.4964 6.30093 14.5155 6.36758 14.5205 6.43599C14.5255 6.50441 14.5164 6.57313 14.4937 6.63787C14.4711 6.70262 14.4353 6.76201 14.3887 6.81235C14.0253 7.26464 13.6215 7.68302 13.1825 8.06235L14.4325 10.2498C14.466 10.3069 14.4879 10.37 14.4969 10.4355C14.5059 10.5011 14.5018 10.5678 14.4848 10.6317C14.4678 10.6957 14.4383 10.7556 14.398 10.8081C14.3577 10.8605 14.3074 10.9045 14.25 10.9373Z" fill="#8A8A8A"/>
                                            </svg>                                        `;
                                    }
                                }
                            }
                        });
                    });
                }

            });
        }
    });
}

//Slide Layout(Expand/Collapse) functionality
$('#slide-full-left').click(function () {
    $(this).toggleClass('active');

    $('.summary-table-view').animate({
        width: '22%'
    }, 300, function () {
        // Add scroll-table class when width is 22%
        $(this).addClass('scroll-table');
    });

    $('.pot-view').removeClass('d-none').animate({
        width: '78%'
    }, 300).promise().done(function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });

    $(this).prop("disabled", true);

    $('#slide-full-right').addClass('d-none');
    $('#slide-half-right').removeClass('d-none');
    $('.toolbar-btn').addClass('d-none');
    $('.perf-summary').removeClass('d-none');

});

$('#slide-half-right').click(function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
        $('#slide-full-left').removeClass('active')
    }
    $('.summary-table-view').animate({
        width: '60%'
    }, 300, function () {
        $(this).removeClass('scroll-table');
    });

    $('.pot-view').animate({
        width: '40%'
    }, 300).promise().done(function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });

    $(this).addClass('d-none');
    $('#slide-full-left').prop("disabled", false);
    $('.toolbar-btn').removeClass('d-none');
    $('#slide-full-right').removeClass('d-none');
    $('.perf-summary').addClass('d-none');
});

$('#slide-half-left-top-btn').click(function () {
    $('#slide-full-right').removeClass('active')
    $('.summary-table-view').animate({
        width: '60%'
    }, 300, function () {
        $(this).removeClass('scroll-table');
    });

    $('.pot-view').removeClass('d-none').animate({
        width: '40%',
        display: 'block'
    }, 300).promise().done(function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });
    $(this).addClass('d-none');
    $('#slide-full-right').removeClass('d-none');
});

$('#slide-full-right').click(function () {
    $(this).toggleClass('active');
    $('.summary-table-view').animate({
        width: '100%'
    }, 300).promise().done(function () {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });

    $('.pot-view').addClass('d-none').animate({
        // width: '0%',
    }, 300);
    $(this).addClass('d-none');
    setTimeout(function () {
        $('#slide-half-left-top-btn').removeClass('d-none');
    }, 300);
});

//show alert on click of reset button
$('.reset-chart').click(function () {
    Swal.fire({
        html: `
        <div class="text-center">
            <div class="alert-icon">
                <span
                    class="w-60px h-60px bg-light d-inline-flex align-items-center justify-content-center rounded-circle ">
                    <span class="svg-icon svg-icon-2hx svg-icon-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
<path d="M21.875 12.5006C21.8752 14.9653 20.9048 17.331 19.1738 19.0855C17.4428 20.8401 15.0905 21.8424 12.626 21.8756H12.5C10.1057 21.8815 7.80106 20.9653 6.06445 19.317C5.98988 19.2464 5.92993 19.1619 5.88802 19.0682C5.84612 18.9745 5.82308 18.8735 5.82022 18.7709C5.81737 18.6682 5.83475 18.5661 5.87138 18.4702C5.908 18.3743 5.96316 18.2866 6.03369 18.212C6.10423 18.1374 6.18876 18.0775 6.28246 18.0356C6.37616 17.9937 6.4772 17.9706 6.57981 17.9678C6.68242 17.9649 6.78458 17.9823 6.88047 18.0189C6.97636 18.0555 7.0641 18.1107 7.13867 18.1812C8.25566 19.2346 9.65828 19.9356 11.1713 20.1965C12.6844 20.4573 14.2407 20.2666 15.646 19.6481C17.0513 19.0296 18.2431 18.0107 19.0727 16.7188C19.9023 15.4269 20.3328 13.9191 20.3105 12.3839C20.2881 10.8487 19.8139 9.35412 18.9471 8.08686C18.0803 6.81959 16.8593 5.83584 15.4366 5.25848C14.014 4.68112 12.4527 4.53576 10.9479 4.84055C9.44309 5.14535 8.06146 5.88679 6.97559 6.97225C6.96761 6.98088 6.95913 6.98903 6.9502 6.99666L4.35449 9.37557H7.03125C7.23845 9.37557 7.43716 9.45788 7.58368 9.60439C7.73019 9.7509 7.8125 9.94962 7.8125 10.1568C7.8125 10.364 7.73019 10.5627 7.58368 10.7092C7.43716 10.8558 7.23845 10.9381 7.03125 10.9381H2.34375C2.13655 10.9381 1.93784 10.8558 1.79132 10.7092C1.64481 10.5627 1.5625 10.364 1.5625 10.1568V5.46932C1.5625 5.26212 1.64481 5.0634 1.79132 4.91689C1.93784 4.77038 2.13655 4.68807 2.34375 4.68807C2.55095 4.68807 2.74966 4.77038 2.89618 4.91689C3.04269 5.0634 3.125 5.26212 3.125 5.46932V8.37947L5.88379 5.85994C7.19627 4.55256 8.86667 3.66333 10.6841 3.3045C12.5016 2.94568 14.3846 3.13335 16.0954 3.84382C17.8063 4.55429 19.2684 5.75571 20.297 7.29641C21.3256 8.83712 21.8747 10.648 21.875 12.5006Z" fill="#8A8A8A"/>
</svg>
                    </span>
                </span>
            </div>
            <h3 class="alert-title text-primary fw-bolder fs-2 my-3">Are you sure, you want to Reset?</h3>
            <div class="alert-desc">
                Resetting will clear the graphs that are <br class="d-none d-md-block"> already generated.
            </div>
        </div>
        `,
        icon: "",
        title: "",
        buttonsStyling: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, Reset",
        cancelButtonText: "No, Cancel",
        showCloseButton: true,
        customClass: {
            popup: "cutsom-swal-alert overflow-visible min-w-sm-500px  p-12 pb-11",
            confirmButton: "btn btn-primary fw-bold fs-6 me-2",
            cancelButton: "btn btn-light fw-bold fs-6"
        }
    })
})

//show toaster on click of save button
$('.save-chart').click(function () {
    toastr.options = {
        "toastClass": " custom-toast min-w-md-375px rounded"
    };

    // Call the toastr notification
    toastr.success(`<span class="fw-bold">Changes have been saved successfully</span>`);
})
//Performance Over Time End ===================================

//Store Table Start
JDDatatable_store_table('/apis/store-table.json', "store_table", "");
function JDDatatable_store_table(api, id, table_name) {
    table = $("#" + id + "").DataTable({
        "dom": "<'row'<'col-sm-12 col-md-12 'i>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'p>>",
        buttons: [],
        paging: true,
        serverSide: true,
        pageLength: 10,
        searching: false,
        responsive: false,
        scrollX: true,
        scrollY: "45vh",
        "scrollCollapse": true,
        info: false,
        ordering: false,
        order: [
            [1, "asc"]
        ],
        lengthMenu: [10, 15, 50, "All"],
        processing: false,
        language: {
            "infoFiltered": "",
            info: `Showing _START_ to _END_ of _TOTAL_ ${table_name}`,
            searchPlaceholder: "Type Report Name",
            search: "Search",
            paginate: {
                next: '<i class="fas fa-chevron-right"></i>',
                previous: '<i class="fas fa-chevron-left"></i>'
            },
            // processing: '<div class="d-flex align-items-center justify-content-center"> <div class="loader">Loading...</div></div> '
        },
        ajax: function (data, callback, settings) {
            $.ajax({
                url: api,
                type: 'GET',
                contentType: 'application/x-www-form-urlencoded',
                data: {
                    "pagination[page]": 1,
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
                    //colored cells 


                    $(document).ready(function () {
                        // Call checkDataTableScroll after a delay
                        setTimeout(function () {
                            checkDataTableScroll('store_table');
                        }, 1000); // Adjust the delay time as needed (e.g., 1000 milliseconds = 1 second)
                    });
                    setTimeout(function () {
                        $('.bottom-section .skeleton-card').addClass('d-none')
                        $('.bottom-section .content-card').removeClass('d-none');
                        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                    }, 2000);
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    setTimeout(function () {
                        let loaderIcon = $('.bottom-section .circle-loader');
                        loaderIcon.addClass(textStatus);
                        $('.bottom-section .progress-heading').text('Loading Failed')
                        $('.bottom-section .progress-message').html('Sorry, Something went wrong');
                    }, 1000);
                }
            });
        },
        "columns": [
            { "data": "store" },
            { "data": "sku" },
            { "data": "address" },
            { "data": "ava_perc" },
            { "data": "today_ava" },

        ],
        "drawCallback": function () {
            $('.td-link').closest('td').addClass('colored-cell-hover')
            $('.colored-cell.bg-lighter-success').parent('td').addClass('bg-lighter-success ')
            $('.colored-cell.bg-lighter-danger').parent('td').addClass('bg-lighter-danger ')
            $('.colored-cell.bg-secondary').parent('td').addClass('bg-secondary')
            $('.colored-cell').parent('td').addClass('text-center')
            $('.colored-cell.perc').parent('td').addClass('cell-hover-primary')
            toggleImage();

            $("#all_product").click(function () {
                if ($(this).is(":checked")) {
                    $('#store_table td').closest('tr').show();
                    $('#store_table td.bg-lighter-danger').closest('tr').show();
                    $('.bottom-table-heading').html('Products in Distribution');
                }
            });
            if ($('#all_product').is(":checked")) {
                $('#store_table td').closest('tr').show();
                $('#store_table td.bg-lighter-danger').closest('tr').show();
                $('.bottom-table-heading').html('Products in Distribution');
            }

            if ($("#out_stock_product").is(':checked')) {
                $('#store_table td').closest('tr').hide();
                $('#store_table td.bg-lighter-danger').closest('tr').show();
                $('.bottom-table-heading').html('Restock Opportunities')
            }
            $("#out_stock_product").click(function () {
                if ($(this).is(":checked")) {
                    $('#store_table td').closest('tr').hide();
                    $('#store_table td.bg-lighter-danger').closest('tr').show();
                    $('.bottom-table-heading').html('Restock Opportunities')
                }
            });
            $(".colored__perc_td tbody tr td").each(function () {
                let perc_value = $(this).find('.perc').text()
                let percentage = $(this).find('.perc')
                $(percentage).closest('td').css('background-color', 'rgba(68,158,221,' + perc_value + ')')
            });

            //Check scroll to show and hide expand button
            checkDataTableScroll("store_table");
            $(window).on('resize', function () {
                // Check the DataTable's scroll when the window is resized
                checkDataTableScroll("store_table");
            });

            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                // Check the DataTable's scroll when the tab changes
                checkDataTableScroll("store_table");

            });

        }
    });
}
//Store Table End

// get headers data from API and create colDefArr
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
                    title: `<span class="d-flex align-items-center flex-column text-center text-break lh-sm"><span class="thumb_bg img-wrapper rounded "><img src="${element.image}"alt="" class="img-fluid"></span>${element.name}</span>`,
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
// ---------------  

//Filters
JDSelect2("https://mocki.io/v1/c6cccbf7-c5bf-4d2a-915f-84a958d4fb3e", "marketplace_retailer", "Select Retailers/Marketplaces");
JDSelect2("https://mocki.io/v1/c6cccbf7-c5bf-4d2a-915f-84a958d4fb3e", "states", "Select States");

const show_table = function () {
    $('#stores').removeClass('d-none')
    $('.bottom-section .skeleton-card').removeClass('d-none')
    $('.bottom-section .content-card').addClass('d-none');
    setTimeout(function () {
        $('.bottom-section .skeleton-card').addClass('d-none')
        $('.bottom-section .content-card').removeClass('d-none');
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    }, 1000);
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust()
}

const toggleSubText = function () {
    let counter = "";
    if (counter >= 0) {
        $('.expand-image').remove();
    }
    if ($('table').find('.col-sub-text').length > 0) {
        $('table').find('.col-sub-text').closest('.dataTables_wrapper').find('table').addClass('toggle-sub-text');
        $('.toggle-sub-text').find('tr:first-child').find('th:first-child').prepend($('<span class="expand-sub-text d-inline-flex align-items-center justify-content-center btn bg-gray-300 btn-color-gray-600 btn-active-primary p-0 w-18px h-18px rounded-circle me-2 position-relative start-0 top-n1px sub-text-expanded"><i class="fas fa-minus cursor-pointer fs-9 lh-sm p-0"></i></span>').click(function () {
            $(this).toggleClass('sub-text-expanded')
            var expandible = $(this).closest('.dataTables_wrapper').find('.col-sub-text')
            if ($(this).hasClass('sub-text-expanded')) {
                $(this).html('<i class="fas fa-minus cursor-pointer fs-9 lh-sm p-0"></i>');
                expandible.slideDown();
                //show image on change of tab
                $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
                    let targetTab = $(e.target).attr('href');
                    let targetTabContent = $(targetTab);
                    $(targetTabContent).find('.expand-sub-text').addClass('sub-text-expanded')
                    $(targetTabContent).find('.expand-sub-text').html('<i class="fas fa-minus cursor-pointer fs-9 lh-sm p-0"></i>');
                    $(targetTabContent).find('.col-sub-text').slideDown();
                    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                });
                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();

            } else {
                $(this).html('<i class="fas fa-plus cursor-pointer fs-9 lh-sm p-0"></i>');
                expandible.slideUp();
                //hide image on change of tab
                $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
                    let targetTab = $(e.target).attr('href');
                    let targetTabContent = $(targetTab);
                    $(targetTabContent).find('.expand-sub-text').toggleClass('sub-text-expanded')
                    $(targetTabContent).find('.expand-sub-text').html('<i class="fas fa-plus cursor-pointer fs-9 lh-sm p-0"></i>');
                    $(targetTabContent).find('.col-sub-text').slideUp();
                    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                });
                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
            };
            counter++
            return false;
        }));
    }
}
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

function checkDataTableScroll(tableId) {
    var dataTableContainer = $("#" + tableId + "").closest('.dataTables_scrollBody')[0];

    if (dataTableContainer.scrollHeight > dataTableContainer.clientHeight) {
        $(dataTableContainer).closest('.datatable-style').find('.view_all_row').show();
        console.log("#" + tableId + " scrollbar");
    } else {
        $(dataTableContainer).closest('.datatable-style').find('.view_all_row').hide();
        console.log("#" + tableId + " no scrollbar");
    }

    console.log("scroll height: " + dataTableContainer.scrollHeight);
    console.log("client height: " + dataTableContainer.clientHeight);
}

//Expand table vertically
$('.view_all_row').click(function () {
    $(this).parent().prev('.dataTables_wrapper').find('.dataTables_scrollBody').toggleClass('expand')
    if ($(".dataTables_scrollBody").hasClass("expand")) {
        $(this).html(`<span class="svg-icon svg-icon-muted svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="black"/>
        <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="black"/>
        </svg></span>`)
    } else {
        $(this).html(`<span class="svg-icon svg-icon-muted svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="black"/>
        <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="black"/>
        </svg></span>`)
    }
})

//Msg box for generate report
const button = document.getElementById('kt_docs_sweetalert_html');
button.addEventListener('click', e => {
    e.preventDefault();
    Swal.fire({
        html: `This report is now queued for generation. When generation is complete, you can select and download it from the <strong>drop-down list </strong> on this page.`,
        title: "Success",
        buttonsStyling: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
        customClass: {
            confirmButton: "btn btn-primary",
        }
    });
});
