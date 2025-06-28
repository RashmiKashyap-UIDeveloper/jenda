/*----------------Server Side Datatable--------------------------*/
var datatable_column_width;

function JDDatatable(api, id, table_name) {
    getTableData(api, function (tblInfo) {
        var table = $("#" + id + "").DataTable({
            "dom": "<'row'<'col-sm-12 col-md-12 'i>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'p>>",
            buttons: [],
            paging: true,
            serverSide: true,
            pageLength: 10,
            searching: false,
            responsive: true,
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
                        console.log(132, data)
                        if (data.draw == data.recordsTotal) {
                            console.log("less")
                            $('.dataTables_wrapper').find('.dataTables_length').css('display', 'none');
                            $('.dataTables_wrapper').find('.dataTables_paginate').css('display', 'none');
                        } else {
                            $('.dataTables_wrapper').find('.dataTables_length').css('display', 'block');
                            $('.dataTables_wrapper').find('.dataTables_paginate').css('display', 'block');
                        }
                    },
                    error: function (jqXhr, textStatus, errorThrown) { }
                });
            },
            columns: tblInfo.colArr,
            "headerCallback": datatable_column_width,
            "columnDefs": tblInfo.colDefArr,
            "drawCallback": function () {
                list_limit();
                text_limit();
                expand_table_data();
                toggleImage();
                //colored cells 
                $(".colored__perc_td tbody tr td").each(function () {
                    var perc_value = $(this).find('.perc').text()
                    var percentage = $(this).find('.perc')
                    $(percentage).closest('td').css('background-color', 'rgba(68,158,221,' + perc_value + ')')
                });

                $('[data-bs-toggle="popover"]').popover();
                $('[data-bs-toggle="tooltip"]').tooltip();
            }
        });
        table.on('responsive-display', function () {
            responsive_list_limit();
            responsive_text_limit();
            responsive_expand_table_data();

            $(".colored__perc_td tbody tr td .dtr-details li").each(function () {
                var perc_value = $(this).find('.perc').text()
                var percentage = $(this).find('.perc')
                $(percentage).closest('.dtr-data').find('.colored-cell').css({ 'background-color': 'rgba(68,158,221,' + perc_value + ')' })
            });
        });
    });
}

// code for list item limit for see more link
function list_limit() {
    $('ul.expand-list').each(function () {
        var lis = $(this).find('li:gt(1)');
        if (!$(this).hasClass('expanded')) {
            lis.hide();
        } else {
            lis.show();
        }
        if (lis.length > 0) {
            $(this).append($('<span class="More text-primary">See All <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i></span>').click(function (event) {
                var $expandible = $(this).parents('.expand-list');
                $expandible.toggleClass('expanded');
                if (!$expandible.hasClass('expanded')) {
                    $(this).html('See All <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i>');
                    lis.slideUp('100');
                } else {
                    $(this).html('See Less <i class="fas fa-arrow-up text-primary ms-1 fs-8"></i>');
                    lis.slideDown('100');
                };
                // show expand all link 
                if ($(this).closest('.expand-list').hasClass('expanded')) {
                    $(this).closest('.expand-list').children('.expand').show('100');
                } else {
                    $(this).closest('.expand-list').children('.expand').hide('100');
                }
                event.preventDefault();
            }));
        }
    });
}
//responsive list item limit
function responsive_list_limit() {
    $('.dtr-data ul.expand-list').each(function () {
        var lis = $(this).find('li:gt(1)');
        if (!$(this).hasClass('expanded')) {
            lis.hide();
        } else {
            lis.show();
        }
        if (lis.length > 0) {
            $(this).append($('<span class="More text-primary">See All <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i></span>').click(function (event) {
                var $expandible = $(this).parents('.dtr-data .expand-list');
                $expandible.toggleClass('expanded');
                if (!$expandible.hasClass('expanded')) {
                    $(this).html('See All <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i>');
                    lis.slideUp('100');
                } else {
                    $(this).html('See Less <i class="fas fa-arrow-up text-primary ms-1 fs-8"></i>');
                    lis.slideDown('100');
                };
                // show expand all link 
                if ($(this).closest('.expand-list').hasClass('expanded')) {
                    $(this).closest('.expand-list').children('.expand').show('100');
                } else {
                    $(this).closest('.expand-list').children('.expand').hide('100');
                }

                event.preventDefault();
            }));
        }
    });
}
// code for character limit for see more link
function text_limit() {
    var showChar = 55; // How many characters are shown by default
    var moretext = "...";
    var lesstext = "<i class='fas fa-chevron-up fs-9 text-hover-gray-600 ms-1'></i>";
    $('.more').each(function () {
        var content = $(this).html();
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="morecontent"><span class="text">' + h + '</span><a href="" class="morelink text-gray-400 ms-1 fw-bolder fs-5">' + moretext + '</a></span>';
            $(this).html(html);
        }
    });
    $(".morelink").click(function () {
        $(this).closest('li').toggleClass("active");
        if ($(this).closest('li').hasClass("active")) {
            $(this).addClass("less");
            $(this).html(lesstext);
            $(this).prev().show('100', function () {
                $(this).css('display', 'inherit');
            });
        } else {
            $(this).removeClass("less");
            $(this).html(moretext);
            $(this).prev().hide('100');

        }
        return false;
    });
}
//responsive code for character limit
function responsive_text_limit() {
    var showChar = 55; // How many characters are shown by default
    var moretext = "...";
    var lesstext = "<i class='fas fa-chevron-up fs-9 text-hover-gray-600 ms-1'></i>";
    $('.dtr-data .more').each(function () {
        var content = $(this).html();
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="morecontent"><span class="text">' + h + '</span><a href="" class="morelink text-gray-400 ms-1 fw-bolder fs-5">' + moretext + '</a></span>';
            $(this).html(html);
        }
    });
    $(".dtr-data .morelink").click(function () {
        $(this).closest('li').toggleClass("active");
        if ($(this).closest('li').hasClass("active")) {
            $(this).addClass("less");
            $(this).html(lesstext);
            $(this).prev().show('100', function () {
                $(this).css('display', 'inherit');
            });
        } else {
            $(this).removeClass("less");
            $(this).html(moretext);
            $(this).prev().hide('100');
        }
        $(this).prev('.text').find('.text').toggle('100', function () {
            $(this).css('display', 'inherit');
        });
        return false;
    });
}
//expand table data
function expand_table_data() {
    //expand column
    $('ul.expand-list').each(function () {
        var showChar = 55; // How many characters are shown by default
        var moretext = "...";
        var lesstext = "<i class='fas fa-chevron-up fs-9 text-hover-gray-600 ms-1'></i>";
        var lis = $(this).find('li:gt(1)');
        var content = $(this).find('.more').html();
        //expand column
        if (lis.length > 0 && content.length > showChar) {
            $(this).append($('<span class="expand float-end text-gray-400 badge badge-light fs-8 cursor-pointer bg-hover-primary text-hover-white" >Expand All</span>').click(function (event) {
                var $expandible = $(this).parents('.expand-list');
                $expandible.toggleClass('column_expanded');
                if (!$expandible.hasClass('column_expanded')) {
                    $(this).prev().html('See All <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i>');
                    $(this).html('Expand All');
                    $(this).hide('100');
                    lis.slideUp('100');
                    $expandible.removeClass('expanded');
                } else {
                    $(this).prev().html('See Less <i class="fas fa-arrow-up text-primary ms-1 fs-8"></i>');
                    $(this).html('Collapse All');
                    $(this).show('100');
                    lis.slideDown('100');
                };
                event.preventDefault();
                $(this).closest('.expand-list').children('li').toggleClass("column_active")
                if ($(this).closest('.expand-list').children('li').hasClass('column_active')) {
                    $(this).closest('.expand-list').find('.morelink').addClass("less");
                    $(this).closest('.expand-list').find('.morelink').html(lesstext);
                    $(this).closest('.expand-list').find('.morelink').prev().show('100', function () {
                        $(this).css('display', 'inherit');
                    });
                } else {
                    $(this).closest('.expand-list').find('.morelink').removeClass("less");
                    $(this).closest('.expand-list').find('.morelink').html(moretext);
                    $(this).closest('.expand-list').find('.morelink').prev().hide('100');
                }
                return false;
            }));
            $(this).children('.expand').hide()
        }
    });

    //expand row
    $('table tbody tr').each(function () {
        var moretext = "...";
        var lesstext = "<i class='fas fa-chevron-up fs-9 text-hover-gray-600 ms-1'></i>";
        var lis = $(this).children('td').children("ul.expand-list").find('li:gt(1)');
        if (lis.length > 0 || $(this).children().find('a').hasClass("morelink")) {
            $(this).children('td:first-child').css({
                "padding-left": "36px",
                "position": "relative"
            });
            $(this).children('td:first-child').prepend($('<span class="expand_row d-inline-flex"><i class="fas fa-plus text-white cursor-pointer"></i></span>').click(function (event) {
                var $expandible = $(this).parents('tr').find('.expand-list')
                $expandible.toggleClass('row_expanded');
                if (!$expandible.hasClass('row_expanded')) {
                    $(this).parents('tr').children().find(".More").html('See All <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i>');
                    $(this).parents('tr').children().find('.expand').html('Expand All');
                    $(this).parents('tr').children().find('.expand').hide('100');
                    $(this).html('<i class="fas fa-plus text-white cursor-pointer"></i>');
                    lis.slideUp('100');
                    $expandible.removeClass('expanded');
                } else {
                    $(this).parents('tr').children().find('.More').html('See Less <i class="fas fa-arrow-up text-primary ms-1 fs-8"></i>');
                    $(this).parents('tr').children().find('.expand').html('Collapse All');
                    $(this).parents('tr').children().find('.expand').show('100');
                    $(this).parents('tr').find('.expand-list').addClass('column_expanded')
                    $(this).html('<i class="fas fa-minus text-white cursor-pointer "></i>');
                    lis.slideDown('100');
                };
                event.preventDefault();
                $(this).closest('tr').find('li').toggleClass("row_active")
                $(this).closest('tr').find('li').addClass("column_active")
                if ($(this).closest('tr').find('li').hasClass('row_active')) {
                    $(this).closest('tr').children().find('.morelink').addClass("less");
                    $(this).closest('tr').children().find('.morelink').html(lesstext);
                    $(this).closest('tr').children().find('.morelink').prev().show('100', function () {
                        $(this).css('display', 'inherit');
                    });
                } else {
                    $(this).closest('tr').children().find('.morelink').removeClass("less");
                    $(this).closest('tr').children().find('.morelink').html(moretext);
                    $(this).closest('tr').children().find('.morelink').prev().hide('100');
                }

                // show expand all link 
                if ($(this).closest('tr').children().find('.expand-list').hasClass('row_expanded')) {
                    $(this).closest('tr').children().find('.expand-list').children('.expand').show('100');
                } else {
                    $(this).closest('tr').children().find('.expand-list').children('.expand').hide('100');
                }
                return false;
            }));
        }
    });
}

//resposnive expand table data
//expand table data
function responsive_expand_table_data() {
    //expand column
    $('.dtr-data ul.expand-list').each(function () {
        var showChar = 55;
        var moretext = "...";
        var lesstext = "<i class='fas fa-chevron-up fs-9 text-hover-gray-600 ms-1'></i>";
        var lis = $(this).find('li:gt(1)');
        var content = $(this).find('.more').html();
        //expand column
        if (lis.length > 0 && content.length > showChar) {
            $(this).append($('<span class="expand float-end text-gray-400 badge badge-light fs-8 cursor-pointer bg-hover-primary text-hover-white" >Expand All</span>').click(function (event) {
                var $expandible = $(this).parents('.expand-list');
                $expandible.toggleClass('column_expanded');
                if (!$expandible.hasClass('column_expanded')) {
                    $(this).prev().html('See All <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i>');
                    $(this).html('Expand All');
                    $(this).hide('100');
                    lis.slideUp('100');
                    $expandible.removeClass('expanded');
                } else {
                    $(this).prev().html('See Less <i class="fas fa-arrow-up text-primary ms-1 fs-8"></i>');
                    $(this).html('Collapse All');
                    $(this).show('100');
                    lis.slideDown('100');
                };
                event.preventDefault();
                $(this).parent().children('li').toggleClass("column_active")
                if ($(this).parent().children('li').hasClass('column_active')) {
                    $(this).parent().find('.morelink').addClass("less");
                    $(this).parent().find('.morelink').html(lesstext);
                    $(this).parent().find('.morelink').prev().show('100', function () {
                        $(this).css('display', 'inherit');
                    });
                } else {
                    $(this).parent().find('.morelink').removeClass("less");
                    $(this).parent().find('.morelink').html(moretext);
                    $(this).parent().find('.morelink').prev().hide('100');
                }
                return false;
            }));
            $(this).children('.expand').hide()
        }
    });

    //expand row
    $('table tbody tr').each(function () {
        var moretext = "...";
        var lesstext = "<i class='fas fa-chevron-up fs-9 text-hover-gray-600 ms-1'></i>";
        var lis = $(this).next('.child').find(".dtr-data").children('.expand-list').find('li:gt(1)');
        if (lis.length > 0 || $(this).next('.child').find(".dtr-data").children('.expand-list').find('a').hasClass("morelink")) {
            $(this).next('.child').children('td:first-child').css({
                "padding-left": "36px",
                "position": "relative"
            });

            $(this).next('.child').children('td:first-child').prepend($('<span class="expand_row d-inline-flex bg-light-primary "><i class="fas fa-plus text-primary cursor-pointer"></i></span>').click(function (event) {
                var $expandible = $(this).next().children().find('.dtr-data').find('.expand-list')
                $expandible.toggleClass('row_expanded');
                if (!$expandible.hasClass('row_expanded')) {
                    $(this).parents('tr').children().find(".More").html('See All <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i>');
                    $(this).parents('tr').children().find('.expand').html('Expand All');
                    $(this).parents('tr').children().find('.expand').hide('100');
                    $(this).html('<i class="fas fa-plus text-primary cursor-pointer"></i>');
                    lis.slideUp('100');
                    $expandible.removeClass('expanded');
                } else {
                    $(this).parents('tr').children().find('.More').html('See Less <i class="fas fa-arrow-up text-primary ms-1 fs-8"></i>');
                    $(this).parents('tr').children().find('.expand').html('Collapse All');
                    $(this).parents('tr').children().find('.expand').show('100');
                    $(this).parents('tr').find('.expand-list').addClass('column_expanded')
                    $(this).html('<i class="fas fa-minus text-primary cursor-pointer"></i>');
                    lis.slideDown('100');
                };
                event.preventDefault();
                $(this).parents('tr').find('li').toggleClass("row_active")
                $(this).parent().find('li').addClass("column_active")
                if ($(this).parents('tr').find('li').hasClass('row_active')) {
                    $(this).parents('tr').children().find('.morelink').addClass("less");
                    $(this).parents('tr').children().find('.morelink').html(lesstext);
                    $(this).parents('tr').children().find('.morelink').prev().show('100', function () {
                        $(this).css('display', 'inherit');
                    });
                } else {
                    $(this).parents('tr').children().find('.morelink').removeClass("less");
                    $(this).parents('tr').children().find('.morelink').html(moretext);
                    $(this).parents('tr').children().find('.morelink').prev().hide('100');
                }
                // show expand all link 
                if ($(this).closest('tr').children().find('.expand-list').hasClass('row_expanded')) {
                    $(this).closest('tr').children().find('.expand-list').children('.expand').show('100');
                } else {
                    $(this).closest('tr').children().find('.expand-list').children('.expand').hide('100');
                }
                return false;
            }));

        }
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