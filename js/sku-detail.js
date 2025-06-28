//filter dropdowns----------------
JDSelect2("https://run.mocky.io/v3/37454399-ca75-4dd2-af09-c4ee5a4613d4", "state", "Select States")
JDSelect2("https://mocki.io/v1/e4441e9d-2772-44fa-bf8c-f54e8478cd8c", "skus", "Add SKUs");
JDSelect2("https://mocki.io/v1/e4441e9d-2772-44fa-bf8c-f54e8478cd8c", "skus2", "Add SKUs");
JDSelect2("https://run.mocky.io/v3/37454399-ca75-4dd2-af09-c4ee5a4613d4", "marketplace_retailer", "Select Retailers/Marketplaces");
JDSelect2("https://mocki.io/v1/e4441e9d-2772-44fa-bf8c-f54e8478cd8c", "competing_sku", "Select Competing SKUs", ["1", "2", "4", "5"]);
JDSelect2("https://mocki.io/v1/e4441e9d-2772-44fa-bf8c-f54e8478cd8c", "brand_family_sku", "Select Competing SKUs", ["3", "4", "1", "4"]);
JDDatatable_listing_total_universe('/apis/listing_total_universe.json', "listing_total_universe", "Retailer & Marketplace");
var datatable_column_width;
function JDDatatable_listing_total_universe(api, id, table_name) {
    table = $("#" + id + "").DataTable({
        "dom": "<'row'<'col-sm-12 col-md-12 '>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'p>>",
        // buttons: [{
        //     extend: 'colvis',
        //     columns: ':gt(0)',
        //     text: 'Add SKUs',
        //     className: ['btn-light btn-active-primary fw-bolder btn-sm mb-3 '],
        // }],
        paging: true,
        serverSide: true,
        pageLength: 10,
        searching: false,
        responsive: false,
        scrollX: true,
        // scrollY: "45vh",
        // "scrollCollapse": true,
        info: false,
        ordering: false,
        order: [
            [1, "asc"]
        ],
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
                    setTimeout(function () {
                        $('.table').closest('.content-card').prev('.skeleton-card').addClass('d-none')
                        $('.table').closest('.content-card').removeClass('d-none');
                        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                    }, 2000);
                    // setTimeout(function () {
                    //     let loaderIcon = $('.circle-loader');
                    //     loaderIcon.addClass('failed');
                    //     $('.progress-heading').text('Loading Failed')
                    //     $(' .progress-message').html('Sorry, Something went wrong');
                    // }, 1000);
                    $('[data-bs-toggle="popover"]').popover();
                },
                error: function (jqXhr, textStatus, errorThrown) { }
            });
        },
        "columns": [
            { "data": "store" },
            { "data": "distribution" },
            { "data": "pr_distribution" },
            { "data": "report_distribution" }
        ],
        "drawCallback": function () {

            // $('[data-bs-toggle="tooltip"]').tooltip();

            if ($('#marketplace_current').height() <= $('#marketplace_current').closest('.dataTables_scrollBody').height()) {
                $('#marketplace_current').closest('.dataTables_wrapper').next().find('.view_all_row').hide()
            }
            $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
                if ($('#marketplace_average').height() <= $('#marketplace_average').closest('.dataTables_scrollBody').height()) {
                    $('#marketplace_average').closest('.dataTables_wrapper').next().find('.view_all_row').hide()
                }
            })
            toggleImage();
            $(".colored__perc_td tbody tr td").each(function () {
                var perc_value = $(this).find('.perc').text()
                var percentage = $(this).find('.perc')
                $(percentage).closest('td').css('background-color', 'rgba(68,158,221,' + perc_value + ')')
            });
            $('.td-link').closest('td').addClass('colored-cell-hover')
            $('.colored-cell.bg-lighter-success').parent('td').addClass('bg-lighter-success ')
            $('.colored-cell.bg-lighter-danger').parent('td').addClass('bg-lighter-danger ')
            $('.colored-cell.bg-secondary').parent('td').addClass('bg-secondary')
            // $('.colored-cell.perc').parent('td').addClass('cell-hover-primary')




        }
    });

    $(document).ready(function () {
        // Get DataTable column objects
        var PR_SKU_Dis_Columns = table.columns('.pr_sku_indis');
        var Report_SKU_Dis_Columns = table.columns('.report_sku_indis');

        // Event handler for the radio button click
        $('input[type="checkbox"]').click(function () {
            $('input:checkbox').not(this).prop('checked', false);
            // var id = $(this).attr('id');
            var isChecked = $(this).is(":checked");

            // If the radio button was checked before
            if (isChecked) {
                // Uncheck all other radio buttons
                $('input[type="radio"]').not(this).prop('checked', false);

                // Handle the checked state
                $(this).addClass('checked');

                if ($("#distribution-input").is(":checked")) {
                    // Hide distribution columns and show availability columns
                    PR_SKU_Dis_Columns.visible(false);
                    Report_SKU_Dis_Columns.visible(false);
                    $('#listing_total_universe').find('td:contains("No")').closest('tr').hide();
                } else if ($("#tudp_input").is(":checked")) {
                    // Hide availability columns and show distribution columns for TUDP
                    $('#listing_total_universe').find('td:contains("No")').closest('tr').show();
                    PR_SKU_Dis_Columns.visible(true);
                    Report_SKU_Dis_Columns.visible(false);
                } else if ($("#rudp_input").is(":checked")) {
                    // Hide availability columns and show distribution columns for RUDP
                    $('#listing_total_universe').find('td:contains("No")').closest('tr').show();
                    PR_SKU_Dis_Columns.visible(false);
                    Report_SKU_Dis_Columns.visible(true);
                } else {
                    // Show all columns when none of the radio buttons are selected
                    $('#listing_total_universe').find('td:contains("No")').closest('tr').show();
                    PR_SKU_Dis_Columns.visible(true);
                    Report_SKU_Dis_Columns.visible(true);
                }
            } else {
                // Handle the unchecked state
                $(this).removeClass('checked');

                // Show all columns when none of the radio buttons are selected
                $('#listing_total_universe').find('td:contains("No")').closest('tr').show();
                PR_SKU_Dis_Columns.visible(true);
                Report_SKU_Dis_Columns.visible(true);
            }

            // Adjust column widths after toggling visibility
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
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
// 

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
                    targets: index
                });
            } else {
                tblInfo.colDefArr.push({
                    title: element.name,
                    targets: index
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

//Retailer Marketplace and Availability Map Sub heading date
if ($('.today-price').hasClass('active')) {
    $('.price-sub-heading').text('on 5/25/23')
}
if ($('.today-availability').hasClass('active')) {
    $('.availability-sub-heading').text('on 5/25/23')
}

//Switch tabs
$('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    //align table header in tabs
    $($.fn.dataTable.tables(true)).DataTable().columns.adjust()

    //Retailer Marketplace Sub heading date
    if ($('.today-price').hasClass('active')) {
        $('.price-sub-heading').text('on 5/25/23')
    }
    if ($('.today-availability').hasClass('active')) {
        $('.availability-sub-heading').text('on 5/25/23')
    }
    if ($('.historical-price').hasClass('active')) {
        $('.price-sub-heading').text('from 5/1/23-5/25/23')
    }
    if ($('.historical-availability ').hasClass('active')) {
        $('.availability-sub-heading').text('from 5/1/23-5/25/23')
    }
});


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
                $('.skeleton-card').addClass('d-none')
                $('.content-card').removeClass('d-none');

                $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
            }, 1000);
        } else {
            $popup.removeClass('d-none')
            let loaderIcon = $('.circle-loader');
            loaderIcon.addClass('failed');
            $('.progress-heading').text('Loading Failed');
            $('.progress-message').html('Sorry, Something went wrong');
        }
    }, 1000);
});


//Daterange picker
$(function () {
    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#kt_daterangepicker_4 div').html(start.format('D MMM YYYY') + ' - ' + end.format('D MMM YYYY'));
        var start_date = start.format('D MMM YYYY');
        var end_date = end.format('D MMM YYYY');

        // Ensure that the IDs match your actual tab IDs
        if (start_date == end_date) {
            $('#today_price_availablity_tab').tab('show'); // Activate Tab 1
            $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
        } else {
            $('#average_price_availablity_tab').tab('show'); // Activate Tab 2
        }
    }

    $('#kt_daterangepicker_4').daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
});


//chart
document.addEventListener("DOMContentLoaded", function () {
    var  //color set for maximum 11 series
        gray_300 = KTUtil.getCssVariableValue("--bs-gray-300"),
        gray_500 = KTUtil.getCssVariableValue("--bs-gray-500"),
        blue = KTUtil.getCssVariableValue("--bs-blue"),
        green = KTUtil.getCssVariableValue('--bs-success'),
        red = KTUtil.getCssVariableValue('--bs-lighter-danger'),
        //lightest shades
        light_blue = KTUtil.getCssVariableValue("--bs-light-blue"),
        light_green = KTUtil.getCssVariableValue('--bs-light-success'),
        light_red = KTUtil.getCssVariableValue('--bs-light-danger')

    // Get reference to the radio buttons
    var distributionInput = document.getElementById("distribution-input");
    var tudpInput = document.getElementById("tudp_input");
    var rudpInput = document.getElementById("rudp_input");

    // Get reference to the chart container
    var chartContainer = document.querySelector(".mixed-widget-8-chart");

    // Define the series data
    var seriesData = [
        {
            name: 'Distribution',
            type: 'line',
             data: [1160, 1858, 4370, 1750, 2270, 3660],
            // data: [1160, 1858, 4370, 1750, 2270, 3660, 1160, 1858, 4370, 1750, 1210, 8660, 
            //        1160, 1858, 4370, 1750, 2270, 3660, 1160, 1858, 4370, 1750, 4370, 1750,
            //     //    1210, 8660, 1160, 1660, 4370, 1750, 1210, 8660, 1160, 1858, 4370, 1750,
            //     //    2270, 3660, 1160, 1858,   2270, 3660, 1160, 1858, 1369, 1750,1665, 1660,

            //     //    1160, 1858, 4370, 1750, 2270, 3660, 1160, 1858, 4370, 1750, 1210, 8660, 
            //     //    1160, 1858, 4370, 1750, 2270, 3660, 1160, 1858, 4370, 1750, 4370, 1750,
            //     //    1210, 8660, 1160, 1660, 4370, 1750, 1210, 8660, 1160, 1858, 4370, 1750,
            //     //    2270, 3660, 1160, 1858,   2270, 3660, 1160, 1858, 1369, 1750,1665, 1660,

            //     //    1160, 1858, 4370, 1750, 2270, 3660, 1160, 1858, 4370, 1750, 1210, 8660, 
            //     //    1160, 1858, 4370, 1750, 2270, 3660, 1160, 1858, 4370, 1750, 4370, 1750,
            //     //    1210, 8660, 1160, 1660, 4370, 1750, 1210, 8660, 1160, 1858, 4370, 1750,
            //     //    2270, 3660, 1160, 1858,   2270, 3660, 1160, 1858, 1369, 1750,1665, 1660
            // ],
            yAxisIndex: 0 // Use the regular number y-axis

        },
        {
            name: 'TUDP',
            type: 'column',
             data: [60, 48, 35, 40, 20, 40],
            // data: [60, 48, 35, 40, 20, 40, 60, 48, 35, 40, 20, 40, 
            //        60, 48, 35, 40, 20, 40, 60, 48, 35, 40, 20, 40, 
            //     //    60, 48, 35, 40, 20, 40, 60, 48, 35, 40, 20, 40, 
            //     //    60, 48, 35, 40,20, 40, 60, 48, 35, 40, 20, 40, 

            //     //    60, 48, 35, 40, 20, 40, 60, 48, 35, 40, 20, 40, 
            //     //    60, 48, 35, 40, 20, 40, 60, 48, 35, 40, 20, 40, 
            //     //    60, 48, 35, 40, 20, 40, 60, 48, 35, 40, 20, 40, 
            //     //    60, 48, 35, 40,20, 40, 60, 48, 35, 40, 20, 40,

            //     //    60, 48, 35, 40, 20, 40, 60, 48, 35, 40, 20, 40, 
            //     //    60, 48, 35, 40, 20, 40, 60, 48, 35, 40, 20, 40, 
            //     //    60, 48, 35, 40, 20, 40, 60, 48, 35, 40, 20, 40, 
            //     //    60, 48, 35, 40,20, 40, 60, 48, 35, 40, 20, 40
            // ],
            yAxisIndex: 1 ,// Use the percentage y-axis for TUDP
        },
        {
            name: 'RUDP',
            type: 'column',
            data: [30, 48, 55, 70, 30, 60],
            // data: [30, 48, 55, 70, 30, 60, 30, 48, 55, 70, 30, 60,
            //        30, 48, 55, 70, 30, 60, 30, 48, 55, 70, 30, 60, 
            //     //    30, 48, 55, 70, 30, 60, 30, 48, 55, 70, 30, 60, 
            //     //    30, 48, 55, 70,  30, 60, 30, 48, 55, 70, 30, 60,

            //     //    30, 48, 55, 70, 30, 60, 30, 48, 55, 70, 30, 60,
            //     //    30, 48, 55, 70, 30, 60, 30, 48, 55, 70, 30, 60, 
            //     //    30, 48, 55, 70, 30, 60, 30, 48, 55, 70, 30, 60, 
            //     //    30, 48, 55, 70,  30, 60, 30, 48, 55, 70, 30, 60,

            //     //    30, 48, 55, 70, 30, 60, 30, 48, 55, 70, 30, 60,
            //     //    30, 48, 55, 70, 30, 60, 30, 48, 55, 70, 30, 60, 
            //     //    30, 48, 55, 70, 30, 60, 30, 48, 55, 70, 30, 60, 
            //     //    30, 48, 55, 70,  30, 60, 30, 48, 55, 70, 30, 60
            // ],
            yAxisIndex: 1 ,// Use the percentage y-axis for RUDP
        }
    ];

    // Initialize the chart
    var chart = new ApexCharts(chartContainer, {
        series: seriesData,
        chart: {
            fontFamily: "inherit",
            type: "line",
            height: 250,
            toolbar: {
                show: false
            },
           // stacked:true
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 2,
                dataLabels: {
                    position: 'top',

                }
            },
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            markers: {
                radius: 12,
                fillColors: [green, blue, red],
            },
            height: 48,
            formatter: function (seriesName, { seriesIndex, w }) {
                var percentages = {
                    'Distribution': 20,
                    'TUDP': 56,
                    'RUDP': -31
                };

                var currentPercentage = percentages[seriesName];
                var changeDirection = currentPercentage >= 0 ? 'up' : 'down';
                var changeValue = Math.abs(currentPercentage) + '%';


                // Define arrow icon based on the direction of change
                var arrowIcon = changeDirection === 'up' ? '<span class="svg-icon svg-icon-3 svg-icon-success me-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="black"></rect><path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="black"></path></svg></span>' : '<span class="svg-icon svg-icon-3 svg-icon-danger me-0"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="black"></rect><path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="black"></path></svg> </span>';

                // Define icon based on series
                var icon = '';
                switch (seriesName) {
                    case 'Distribution':
                        icon = `<div class="symbol symbol-35px me-2 ">
                        <span class="symbol-label bg-light">
                          <span class="svg-icon svg-icon-1 m-0 ">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.48 95.25"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g id="Layer_2-2" data-name="Layer 2"><g id="Layer_1-2-2" data-name="Layer 1-2"><g id="Dis"><g id="Layer_1-2-3" data-name="Layer 1-2-3"><path fill="black" d="M135.69,34H60.82a3.41,3.41,0,0,0-3.4,3.41v34a3.41,3.41,0,0,0,3.4,3.41h74.87a3.41,3.41,0,0,0,3.4-3.41v-34A3.41,3.41,0,0,0,135.69,34Zm-3.44,34h-68V40.84h68Z"/><path fill="black" d="M153.11,0H3.4A3.4,3.4,0,0,0,0,3.4H0V17a3.41,3.41,0,0,0,3.4,3.41H6.8V91.85a3.41,3.41,0,0,0,3.41,3.4H146.28a3.4,3.4,0,0,0,3.4-3.4V20.41h3.4a3.41,3.41,0,0,0,3.4-3.41V3.4A3.4,3.4,0,0,0,153.11,0Zm-109,88.44H23.69V47.67h20.4Zm98.79,0h-92V44.22a3.4,3.4,0,0,0-3.4-3.4H20.28a3.4,3.4,0,0,0-3.4,3.4h0V88.44H13.61v-68H142.88Zm6.79-74.84H6.8V6.8H149.69Z"/></g></g></g></g></g></g></svg>
                          </span>
                        </span>
                      </div>`;
                        break;
                    case 'TUDP':
                        icon = `<div class="symbol symbol-35px me-2 ">
                        <span class="symbol-label bg-light">
                          <span class="svg-icon svg-icon-2x m-0 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178.64 143.81">
                              <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                  <g id="universe">
                                    <g id="Layer_1-2-2" data-name="Layer 1-2">
                                      <path fill="black" d="M175.24,48.56H132.48a3,3,0,0,0-3,3v.82a3,3,0,0,0,3,3h39.36v6.8h-39a3,3,0,0,0-3,3V66a3,3,0,0,0,3,3H165v68H73V101.78a3.41,3.41,0,0,0-2.25-3.2,3.08,3.08,0,0,0-.68-.08h-.82a3,3,0,0,0-3,3V137H45.84V104.18h.07V95.8H49a3,3,0,0,0,3-3V92a3,3,0,0,0-3-3h-6.6a3,3,0,0,0-1.18.25h-.06a3,3,0,0,0-2,2.84v8.07a3.26,3.26,0,0,0-.06.62V137H35.76V108.5a.38.38,0,0,0,0-.15V84.85a3,3,0,0,0-3-3H32a3,3,0,0,0-3,3v55.56a3.4,3.4,0,0,0,3.4,3.4h136a3.41,3.41,0,0,0,3.41-3.4V69h3.4a3.4,3.4,0,0,0,3.4-3.4V52A3.4,3.4,0,0,0,175.24,48.56Z">
                                      </path>
                                      <g id="Layer_2-2" data-name="Layer 2-2">
                                        <g id="Layer_1-2-2-2" data-name="Layer 1-2-2">
                                          <path fill="black" d="M161.05,85.83v34a3.41,3.41,0,0,1-3.41,3.4H82.8a3.4,3.4,0,0,1-3.4-3.4v-34a3.4,3.4,0,0,1,3.4-3.4H97.74a3,3,0,0,1,3,3v.82a3,3,0,0,1-2.7,3H86.4v0l-.1,0h.1v27.22h67.84V89.24H123.58a3,3,0,0,1-3-3v-.82a3,3,0,0,1,2.7-3h34.36A3.41,3.41,0,0,1,161.05,85.83Z">
                                          </path>
                                          <polygon points="86.4 89.24 86.4 89.26 86.3 89.26 86.4 89.24">
                                          </polygon>
                                          <polygon points="86.4 89.24 86.4 89.26 86.3 89.26 86.4 89.24">
                                          </polygon>
                                          <path fill="black" d="M128.29,6.76A4.34,4.34,0,0,0,128.1,6a3.83,3.83,0,0,0-3.57-2.54,3.77,3.77,0,0,0-2.06.64l-.35.23L118,6.94l-1.83,1.2-3.59,2.36-1.15.75L108,13.5l-.51.34h0l-6.2,4H93.18l-.09-.21L90,11.22l-.31-.64-.11-.22a3.78,3.78,0,0,0-3.39-2.13H79.28V3.74A3.8,3.8,0,0,0,75.53,0h-.19L68.92.08,62.5.17,53.61.29h-4L43.18.41l-7.92.1H32.7A3.76,3.76,0,0,0,29.7,2L28.18,4l-.48.63h-.1l-.46-.49-.41-.44L24.91,1.77c-.09-.11-.2-.2-.31-.31a3.93,3.93,0,0,0-2.45-.9h-8.7A3.83,3.83,0,0,0,9.91,3.31L.21,31.05A3.79,3.79,0,0,0,.32,33.8L11.25,58.5A3.28,3.28,0,0,0,12.38,60l.94.73,1,.76,5,3.88,7.27,5.62.15.1.41.32.74.56.3.2a3.45,3.45,0,0,0,2,.59H39l9.83-.08,4.86,7.68,4.15,6.53,1,1.56A3.72,3.72,0,0,0,62,90.07h5.69a3.11,3.11,0,0,0,.86-.1,3.77,3.77,0,0,0,2.63-2.19L74,80.9l.23-.55,3.42-8.21H82.3A3.79,3.79,0,0,0,85,71.05l.1-.1,3.23-3.25h5.88l.16.17,2.26,2.07.91,1L105,79.12l1.1,1.22L108,82.43l.2.22a3.75,3.75,0,0,0,5.29.29h0l.36-.35.11-.13,1.73-2.09,5.54-6.68a3.83,3.83,0,0,0,.85-2.72,4.82,4.82,0,0,0-.22-1,4,4,0,0,0-.85-1.34l-1-1.12-3.9-4-.15-.15-.56-.57-1.68-1.7h0c.06-.94-.17-2.95,3.67-4.15a3.61,3.61,0,0,0,1.29-.7l.11-.09a5.6,5.6,0,0,0,.41-.43,3.91,3.91,0,0,0,.6-1,3.47,3.47,0,0,0,.24-1.35V33.85l.67-.45,1-.67,2.68-1.81,2.3-1.56.08-.06h0a3.72,3.72,0,0,0,1.56-3V7.18A3,3,0,0,0,128.29,6.76Zm-7.52,17.47-1.43,1-.24.15-1.89,1.29-3.09,2.09-.23.18a3.67,3.67,0,0,0-1.46,2.93V52a16.35,16.35,0,0,0-3,2.69,9.26,9.26,0,0,0-.88,1,2.79,2.79,0,0,0-.34.43A19.52,19.52,0,0,0,105.49,61c-.12.31-.18.5-.18.5a3.26,3.26,0,0,0,.15,1.24,3.13,3.13,0,0,0,.27.72,3.56,3.56,0,0,0,.67.92l3,3,2.4,2.45.33.33.66.68.51.53-2.46,3-.91-1L107.72,71l-3.14-3.46-3.58-4-.68-.75L99,61.36c-.11-.1-.21-.21-.33-.3a3.79,3.79,0,0,0-2.46-.92h-9.5a3.85,3.85,0,0,0-2.5.92l-.17.16-3.35,3.35H75.11a3.75,3.75,0,0,0-3.49,2.35l-.24.56-1,2.45-.42,1-4.5,10.88-.29.7H64.08l-.45-.72L56.77,70.93l-.64-1L54.59,67.5l-.49-.77A3.8,3.8,0,0,0,50.86,65l-19.14.17H31.5L29.4,63.5l-.93-.72H28.2v-.21L26.75,61.5l-.55-.43-5.13-3.94-.33-.25L19.33,55.8l-1.57-1.21-2.43-5.5L9.49,35.89,7.82,32.11,16.15,8.25h4.39l.2.21,3.15,3.35A3.71,3.71,0,0,0,26.75,13a1.41,1.41,0,0,0,.41,0,5.59,5.59,0,0,0,.87-.23l.17-.06,3.27-1.34a3.67,3.67,0,0,0,1.65-1.26l1-1.38.49-.66h3.47L45.22,8l8-.1h2.24a3.43,3.43,0,0,1,1.19-.21H71.74v4.4a3.78,3.78,0,0,0,1.19,2.74,3.45,3.45,0,0,0,1.55.89,1.43,1.43,0,0,0,.42.09h8.91l.92,1.93,2.7,5.63a3.56,3.56,0,0,0,1.3,1.5,4.11,4.11,0,0,0,2.1.64h3.81v-.11l1.22.11h6.59a3.55,3.55,0,0,0,1.87-.5,1.19,1.19,0,0,0,.22-.12l2.94-1.93L112,20l2-1.26,1.56-1,.73-.48,3.16-2,1.43-.94Z">
                                          </path>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </span>
                        </span>
                      </div>`; // Define the icon for TUDP series
                        break;
                    case 'RUDP':
                        icon = `<div class="symbol symbol-35px me-2 ">
                        <span class="symbol-label bg-light">
                          <span class="svg-icon svg-icon-2x m-0 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.99 149.22">
                              <defs>
                                <style>
                                  .cls-1 {
                                    fill: none;
                                  }
                                </style>
                              </defs>
                              <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                  <g id="report">
                                    <g id="Layer_1-2-2" data-name="Layer 1-2">
                                      <g id="Layer_2-2" data-name="Layer 2-2">
                                        <g id="Layer_1-2-2-2" data-name="Layer 1-2-2">
                                          <path fill="black" class="cls-1" d="M34.11,117v.85S34.12,116.93,34.11,117Z"></path>
                                          <path fill="black" d="M78.21,120.93c0-.11,0-.22,0-.34v-7c0-.12,0-.24,0-.36a3.37,3.37,0,0,1,3.32-3h0a3.37,3.37,0,0,1,3.27,2.71c0,.11,0,.22.05.34s0,.22,0,.34v7a.91.91,0,0,1,0,.17v1.33h68V94.86H104.1a3,3,0,0,1-3-3V91a3,3,0,0,1,2.59-3h52.47a3.41,3.41,0,0,1,3.41,3.41v34a3.41,3.41,0,0,1-3.41,3.4H81.48a3.39,3.39,0,0,1-3.18-2.22,3,3,0,0,1-.09-.73v-.29a2.41,2.41,0,0,1,0-.38Z">
                                          </path>
                                          <path fill="black" d="M177,57.44V71.05a3.4,3.4,0,0,1-3.4,3.4h-3.4v71.37a3.41,3.41,0,0,1-3.41,3.4H30.85a3.41,3.41,0,0,1-3.16-2.14l-.09-.26,0-.13a3,3,0,0,1-.1-.52v-32.1a3.33,3.33,0,0,1,2.42-3,2.73,2.73,0,0,1,.41,0h.81a3.25,3.25,0,0,1,2.16,1.07,3.92,3.92,0,0,1,.25.32,3.79,3.79,0,0,1,.2.34l.12.24a3,3,0,0,1,.21.67c0,.11,0,.21,0,.31a1.37,1.37,0,0,1,0,.29v28.24h3.41V114.19c0-.1,0-.21,0-.31a3.34,3.34,0,0,1,3.26-2.68h0a3.15,3.15,0,0,1,1.58.41,1.56,1.56,0,0,1,.28.16L43,112a.85.85,0,0,1,.17.16,3.75,3.75,0,0,1,.51.61c.07.12.14.24.2.37a1.08,1.08,0,0,1,.08.19,1.43,1.43,0,0,1,.09.27,1.63,1.63,0,0,1,.07.3,1.57,1.57,0,0,1,0,.3c0,.11,0,.22,0,.34v27.95H64.58V114.3c0-.12,0-.24,0-.36a3.4,3.4,0,0,1,3.37-3h0a3.4,3.4,0,0,1,3.31,2.71c0,.11,0,.22,0,.34s0,.22,0,.34v28.2h92.12v-68H104.15a2.92,2.92,0,0,1-.83-.12A3,3,0,0,1,101.2,72a4.86,4.86,0,0,1,0-.54v-.82a3,3,0,0,1,2.74-3h66.4V60.86H103.68a3,3,0,0,1-2.85-3V57a3,3,0,0,1,2.85-3h69.91A3.4,3.4,0,0,1,177,57.44Z">
                                          </path>
                                          <path fill="black" d="M75.35,78.56a3.57,3.57,0,0,0-3.54-3.19h-3.5V41.22a3.52,3.52,0,0,0-3.5-3.54H45.93a3.53,3.53,0,0,0-3.54,3.54V51.81H27.08a3.53,3.53,0,0,0-3.53,3.53v20H20a3.53,3.53,0,0,0-3.53,3.53,3.57,3.57,0,0,0,1.09,2.55,3.47,3.47,0,0,0,2.44,1H71.84a3.53,3.53,0,0,0,3.53-3.51C75.37,78.79,75.36,78.67,75.35,78.56Zm-33-3.19H30.62V58.88H42.39Zm18.85,0H49.46V44.75H61.24Z">
                                          </path>
                                          <path fill="black" d="M24.43,16.48H17.66a3.53,3.53,0,1,0,0,7.06H46a3.52,3.52,0,0,0,0-7H24.43Z">
                                          </path>
                                          <path fill="black" d="M35.33,34.15a3.56,3.56,0,0,1-3.53,3.53H17.66a3.54,3.54,0,0,1,0-7.07H31.8A3.54,3.54,0,0,1,35.33,34.15Z">
                                          </path>
                                          <path fill="black" d="M82.8,2.25l-.32-.19a17.49,17.49,0,0,0-6.84-2c-.47,0-1-.06-1.45-.06H17.66A17.72,17.72,0,0,0,0,17.66v66a17.69,17.69,0,0,0,17.66,17.67H74.19A17.71,17.71,0,0,0,91.87,83.61V17.66A17.67,17.67,0,0,0,82.8,2.25Zm2,81.36a10.65,10.65,0,0,1-9.59,10.56h0l-7.29,0H17.66a10.62,10.62,0,0,1-10.6-10.6V17.66A10.57,10.57,0,0,1,17.62,7.06H75.19a10.6,10.6,0,0,1,9.61,10.6Z">
                                          </path>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </span>
                        </span>
                      </div>`; // Define the icon for RUDP series
                        break;
                    default:
                        icon = ''; // Default icon if series name doesn't match
                }

                var legendHTML = `<span class="d-inline-flex align-items-center mx-2">${icon} ${seriesName} <span class="fw-bolder d-inline-flex align-items-center ps-1">${arrowIcon}${changeValue}</span></span>`;
                // Combine the series name, arrow icon, and formatted change
                return legendHTML;
            },
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            // offsetY:-5,offsetX:5,
            style: {
                fontSize: "9px"
            },
            
           // hideOverlappingLabels: true, // Hide overlapping data labels for bar series
            formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                if (seriesIndex !== 0) {
                    return value + '%';
                } else {
                    return value;
                }
            }
        },
        fill: {
            type: "solid"
        },

        // fill: {
        //     type: ["gradient","solid","solid"],
        //     gradient: {
        //         opacityFrom: .4,
        //         opacityTo: 0,
        //         stops: [20, 120, 120, 120]
        //     }
        // },
        stroke: {
            curve: "smooth",
            show: true,
            width: [4, 0, 0],
            colors: [green, blue, red],
        },

        xaxis: {
            categories: ["Jan", "Feb", "March", "April", "May", "June"],
            // categories: [["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //              ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], 
            //              ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],

            //              ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //              ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"],
            //              ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"], ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],

            //              ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //              ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], 
            //              ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"], ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],

            //              ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //              ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], 
            //              ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"], ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"]



            //             //  ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //             //  ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], 
            //             //  ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],

            //             //  ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //             //  ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"],
            //             //  ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"], ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],

            //             //  ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //             //  ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], 
            //             //  ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"], ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],

            //             //  ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //             //  ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], 
            //             //  ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"], ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"]



                         
            //             //  ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //             //  ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], 
            //             //  ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],

            //             //  ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //             //  ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"],
            //             //  ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"], ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],

            //             //  ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //             //  ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], 
            //             //  ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"], ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],

            //             //  ["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"],
            //             //  ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"],["1/2/24-", "1/9/24"], ["1/10/24-", "1/17/24"], 
            //             //  ["1/18/24-", "1/25/24"], ["2/1/24-", "2/8/24"], ["2/9/24-", "2/16/24"], ["2/17/24-", "2/24/24"]
            // ,
            // ],
            //categories: ["2/1/23", "2/2/23", "2/3/23", "2/4/23", "2/5/23", "2/6/23", "2/7/23", "2/8/23", "2/9/23", "2/10/23", "2/11/23"],      
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tickPlacement: 'on',
            //tickAmount: 3,
            labels: {
                show: !0,
                rotate: 0,
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

        yaxis: [
            {
                opposite: true,
                show: false,
                seriesName: 'Distribution',
                min: 0,
                //max: 1000,
                tickAmount: 4,
                labels: {
                    style: {
                        colors: gray_500,
                        fontSize: "11px"
                    },
                    formatter: function (e) {
                        return e;
                    },
                    offsetX: -10,
                }
            },
            {
                seriesName: 'TUDP',
                min: 0,
                max: 100,
                tickAmount: 4,
                labels: {
                    style: {
                        colors: gray_500,
                        fontSize: "11px"
                    },
                    formatter: function (e) {
                        return e + "%";
                    },
                    offsetX: -10,
                }
            },
            {
                seriesName: 'RUDP',
                show: false,
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
            y: {
                formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                    if (seriesIndex !== 0) {
                        return val + '%';
                    } else {
                        return val;
                    }
                }
            },
            style: {
                fontSize: "12px",
                colors: ['#ffffff']
            }
        },
        colors: [green, blue, red],
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
            colors: [light_green, light_blue, light_red,],
            strokeColor: [green, blue, red],
            strokeWidth: 3,


        }
    });

    // Render the chart
    chart.render();

    // Function to update the chart series
    function updateChartSeries(seriesNames) {
        // Filter the seriesData array to get the selected series
        var selectedSeries = seriesData.filter(function (series) {
            return seriesNames.includes(series.name);
        });

        // Update the chart series
        chart.updateSeries(selectedSeries);
    }

    // Event listener for radio button clicks
    distributionInput.addEventListener("click", function () {
        if (distributionInput.checked) {
            chart.updateOptions({
                colors: [green, blue, red],
                legend: {
                    markers: {
                        fillColors: [green, blue, red],
                    },
                },

                yaxis:
                {
                    // opposite: true,
                    // show: true,
                    seriesName: 'Distribution',
                    min: 0,
                    //max: 1000,
                    tickAmount: 4,
                    labels: {
                        style: {
                            colors: gray_500,
                            fontSize: "11px"
                        },
                        formatter: function (e) {
                            return Math.floor(e);;
                        },
                        offsetX: -18,
                    }
                },

            });
            updateChartSeries(['Distribution']);
        } else {
            chart.updateOptions({
                colors: [green, blue, red],
                legend: {
                    markers: {
                        fillColors: [green, blue, red],
                    },
                },
                yaxis: [
                    {
                        opposite: true,
                        show: false,
                        seriesName: 'Distribution',
                        min: 0,
                        //max: 1000,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e;
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'TUDP',
                        min: 0,
                        max: 100,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e + "%";
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'RUDP',
                        show: false,
                    }
                ],
            });
            updateChartSeries(['Distribution', 'TUDP', 'RUDP']);
        }
    });

    tudpInput.addEventListener("click", function () {
        if (tudpInput.checked) {
            chart.updateOptions({
                colors: [green, blue],
                legend: {
                    markers: {
                        fillColors: [green, blue],
                    },
                },
                yaxis: [
                    {
                        opposite: true,
                        show: false,
                        seriesName: 'Distribution',
                        min: 0,
                        //max: 1000,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e;
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'TUDP',
                        min: 0,
                        max: 100,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e + "%";
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'RUDP',
                        show: false,
                    }
                ],
            });
            updateChartSeries(['TUDP', 'Distribution']);
        } else {
            chart.updateOptions({
                colors: [green, blue, red],
                legend: {
                    markers: {
                        fillColors: [green, blue, red],
                    },
                },
                yaxis: [
                    {
                        opposite: true,
                        show: false,
                        seriesName: 'Distribution',
                        min: 0,
                        //max: 1000,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e;
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'TUDP',
                        min: 0,
                        max: 100,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e + "%";
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'RUDP',
                        show: false,
                    }
                ],
            });
            updateChartSeries(['Distribution', 'TUDP', 'RUDP']);
        }
    });

    rudpInput.addEventListener("click", function () {

        if (rudpInput.checked) {
            chart.updateOptions({
                colors: [green, red],
                legend: {
                    markers: {
                        fillColors: [green, red],
                    },
                },
                yaxis: [
                    {
                        opposite: true,
                        show: false,
                        seriesName: 'Distribution',
                        min: 0,
                        //max: 1000,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e;
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'TUDP',
                        min: 0,
                        max: 100,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e + "%";
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'RUDP',
                        show: false,
                    }
                ],
            });
            updateChartSeries(['RUDP', 'Distribution']);
        } else {
            chart.updateOptions({
                colors: [green, blue, red],
                legend: {
                    markers: {
                        fillColors: [green, blue, red],
                    },
                },
                yaxis: [
                    {
                        opposite: true,
                        show: false,
                        seriesName: 'Distribution',
                        min: 0,
                        //max: 1000,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e;
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'TUDP',
                        min: 0,
                        max: 100,
                        tickAmount: 4,
                        labels: {
                            style: {
                                colors: gray_500,
                                fontSize: "11px"
                            },
                            formatter: function (e) {
                                return e + "%";
                            },
                            offsetX: -10,
                        }
                    },
                    {
                        seriesName: 'RUDP',
                        show: false,
                    }
                ],
            });
            updateChartSeries(['Distribution', 'TUDP', 'RUDP']);
        }
    });

});

//lazy loading
const container = document.querySelector(".skus-indis-list");
let limit = 4; // Show only four list items at a time
let pageCount = 1;
let postCount = 0; // Initialize post count

const getPost = async () => {
    const response = await fetch(`https://mocki.io/v1/796e2b73-6545-4211-9c89-2d229e45be3e?_limit=${limit}&_page=${pageCount}`);
    const data = await response.json();

    if (data.length === 0) {
        // If no data is returned, hide the loading icon and stop further loading
        $('#loading').hide();
        return;
    }

    data.forEach((curElm, index) => {
        const htmlData = `
            <li class="badge badge-light text-wrap lh-sm text-start me-1 mb-2 px-3 py-2 bg-hover-primary text-hover-white">
                <a href="https://training.nextgen.jendasolutionssandbox.com/pricepulse/listings/absolut-citron-vodka-750ml-abc-fine-wine-spirits-17th-street-causeway/details/" target="_blank" class="text-hover-white">${curElm.sku}</a>
            </li>`;
        container.insertAdjacentHTML('beforeend', htmlData);
    });

    // $(".available").each(function () {
    //     $(this).closest('li').addClass('badge-success')
    // });

    // Increment the post count by the number of items fetched
    postCount += data.length;
    pageCount++; // Increment page count for next fetch
};

$('#skus_in_dis').on('shown.bs.modal', function () {
    getPost(); // Initial fetch when modal is shown
});

const showData = () => {
    $('#loading').show();
    setTimeout(() => {
        getPost();
        $('#loading').hide();
    }, 3000);
};

$('.modal-body .scroll-y').on('scroll', function() {
    const {
        scrollHeight,
        scrollTop,
        clientHeight
    } = this;
    if (scrollTop + clientHeight >= scrollHeight && postCount % limit === 0) {
        showData();
    }
});
