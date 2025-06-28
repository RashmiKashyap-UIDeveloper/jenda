var rows = 10; //Default Rows to show 10
var sortcolumns = []; //Identifiy Sortcolumns values
var nosort = []; //Create 
var showpagination = "";
var showsearch = "";
var ordering = true;
var placeholder = "Search... "

//DropDown Filter---------------------------------------------------
var selectId;

function JDSelect(api, id) {
    $.getJSON(api, function(res) {
        $("#" + id + "").select2({
            multiple: true,
            placeholder: res.placeholder,
            ajax: {
                url: api,
                processResults: function(data) {
                    return {
                        results: data.items
                    };
                }
            }
        });
    });
    selectId = id;
    $("#" + id + "").on('select2:select', function(e) {
        update = e.params.data;

    });
}
//End DropDown Filter


//Datatable Function Starts Here--------------------------------------
function JDataTable(api, id) {

    $.getJSON(api, function(res) {
        var columnTitle = []; //Table Head Titles Array
        var columnValues = []; //Table Body Columns Array

        placeholder = res.searchplaceholder;
        //Save the Table Titles
        $.each(res.data[0], function(k, v) {
            columnTitle.push({
                "title": k
            });
        });

        //Save table Columns Data

        res.data.forEach(element => {
            var datas = [];
            $.each(element, function(k, v) {
                datas.push(v);
            });
            columnValues.push(datas);
        });
        var filterexist = $("#" + id + "").closest('.card').find('.js-filters').children().length;
        //Checking The Filters
        if (res.showfilter === "true" && filterexist < 1) {
            $("#" + id + "").closest('.card').find('.js-filters').append('' +
                '<div class="px-9">' +
                '<div class="js-filter rounded px-5 d-flex align-items-center card-custom ">' +
                '<span class="js-filter-label mr-5">Filter :</span>' +
                '<select class="form-control d-none" id="' + id + '-filter" name="state" multiple></select>' +
                '</div>' +
                '<div class="js-filter-update d-flex mt-5 align-items-start">' +
                '<ul class="value list-unstyled d-flex flex-grow-1"></ul>' +
                '<div class="js-filter-btns">' +
                '<button data-apilink=' + api + ' type="button" class="btn btn-success btn-sm ml-5 js-filter-update-btn">Update</button>' +
                '<button type="button" class="btn btn-warning btn-sm ml-3 js-filter-clear-btn">Clear</button>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            JDSelect(res.filterapi, "" + id + "-filter");
        }
        //Checking The Pagination
        if (res.pagination === "true" && columnValues.length > 5) {
            showpagination = "p";
        }
        //Checking The Search
        if (res.search === "true") {
            showsearch = "<'d-flex justify-content-between align-items-center js-table-search px-9 pb-5' i f>"
        }
        //Checking The Global Sort/Ordering
        if (res.ordering === "false") {
            ordering = false;
            $("#" + id + " table").addClass('nosort');
        }
        //Check and save sorting values into array
        res.sortings.forEach(element => {
            var sorts = [];
            $.each(element, function(k, v) {
                sorts.push(v);
            });
            sortcolumns.push(sorts);
        });

        //Saving No Sorting columns into array with index value
        $.each(sortcolumns[0], function(index, value) {
            if (value === "false") {
                nosort.push(index);
            }
        });

        var JData = [{
            "HEADING": [columnTitle],
            "VALUES": [columnValues]
        }];

        var datatable = $("#" + id + "");
        datatable.DataTable({
            "searching": true,
            "retrieve": true,
            "processing": true,
            "ordering": ordering,
            "pageLength": res.rows,
            "dom": "" + showsearch + "<'j-table table-bordered' t><'d-flex justify-content-center'" + showpagination + ">",
            "language": {
                "search": "",
                "searchPlaceholder": placeholder,
                "info": "<b>Total Records _TOTAL_</b>",
                "zeroRecords": "<div class='alert alert-warning'><b>No Records Found</b></div>"
            },
            "data": JData[0].VALUES[0],
            "columns": JData[0].HEADING[0],
            "columnDefs": [{
                "targets": nosort,
                "orderable": false
            }]
        });
    })
}

$(document).ready(function() {

    $("body").delegate(".js-filter-update-btn", "click", function() {
        var apilink = $(this).attr("data-apilink");
        var tabletarget = $(this).closest(".card").find("table");
        var tableid = tabletarget.attr("id");
        tabletarget.DataTable().destroy().draw();
        JDataTable(apilink, tableid);
    });

    $("body").delegate(".js-filter-clear-btn", "click", function() {
        var selecttarget = $(this).closest(".card").find("select").attr("id");
        $("#" + selecttarget + "").val(null).trigger('change');
    });
});

/*----------------Server Side Datatable--------------------------*/
var datatable_column_width;
function JDDatatable(api, id,table_name) {
  
    getTableData(api, function(tblInfo) {
        var table = $("#" + id + "").DataTable({
             "dom": "<'row'<'col-sm-12 col-md-12 'i>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'p>>",
            buttons: [],
            paging: true,
            serverSide:true,
            pageLength: 10,
            searching: false,
            responsive: true,
            order: [
                [1, "asc"]
            ],
            lengthMenu: [10, 15, 50, "All"],
            processing: true,
            info:false,
            language: {
                "infoFiltered": "",
                info:`Showing _START_ to _END_ of _TOTAL_ ${table_name}`,
                searchPlaceholder: "Type Report Name",
                search: "Search",
                paginate: {
                    next: '<i class="fas fa-chevron-right"></i>',
                    previous: '<i class="fas fa-chevron-left"></i>'
                },
                processing: '<div class="d-flex align-items-center justify-content-center"> <div class="loader">Loading...</div></div> '
            },
            ajax: function(data, callback, settings) {
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
                    success: function(data, textStatus, jQxhr) {
                        callback({
                            draw: data.draw,
                            data: data.data,
                            recordsTotal: data.recordsTotal,
                            recordsFiltered: data.recordsFiltered,
                        });
                        console.log(132, data)
                    },

                    error: function(jqXhr, textStatus, errorThrown) {}
                });
            },
            columns: tblInfo.colArr,
            "headerCallback": datatable_column_width,
            "columnDefs": tblInfo.colDefArr,
            "drawCallback": function() {
                list_limit();
                text_limit();
                toggleImage();
            }
        });
        table.on('responsive-display', function() {
            responsive_list_limit();
            responsive_text_limit();
        });
    });
}

//Toggle Datatable Images
const toggleImage = function () {
    let counter = "";
    if(counter >= 0){
        $('.expand-image').remove();
    }
    if ($('table').find('td .img-wrapper').length > 0) {
        $('table').find('td .img-wrapper').closest('.dataTables_wrapper').find('table').addClass('toggle-image');
        $('.toggle-image').find('tr:first-child').find('th:first-child').prepend($('<span class="expand-image d-inline-flex align-items-center jus\
tify-content-center btn bg-gray-300 btn-color-gray-600 btn-active-primary p-0 w-18px h-18px rounded-circle me-2 position-relative start-0 top-n1px\
 image-expanded"><i class="fas fa-minus cursor-pointer fs-9 lh-sm p-0"></i></span>').click(function () {
            $(this).toggleClass('image-expanded')
            var expandible = $(this).closest('.dataTables_wrapper').find('td .img-wrapper')
            if ($(this).hasClass('image-expanded')) {
                $(this).html('<i class="fas fa-minus cursor-pointer fs-9 lh-sm p-0"></i>');
                expandible.slideDown('fast');
            } else {
                $(this).html('<i class="fas fa-plus cursor-pointer fs-9 lh-sm p-0"></i>');
                expandible.slideUp('fast');
            };
            counter++
            return false;
        }));
    }
}
// code for list item limit for see more link
function list_limit() {
    $('ul.expand-list').each(function(){
        var lis = $(this).find('li:gt(1)');
        if(!$(this).hasClass('expanded')) {
            lis.hide();
        } else {
            lis.show();
        }
        
        if(lis.length>0){
            $(this).append($('<span class="More text-primary">See More <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i></span>').click(function(event){
                var $expandible = $(this).parents('.expand-list');
                $expandible.toggleClass('expanded');
                if ( !$expandible.hasClass('expanded')) {
                    $(this).html('See More <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i>');
                } else {
                    $(this).html('See Less <i class="fas fa-arrow-up text-primary ms-1 fs-8"></i>');
                };
                lis.slideToggle();
                event.preventDefault();
            }));
        }
    });

}
//responsive list item limit
function responsive_list_limit() {
    $('.dtr-data ul.expand-list').each(function(){
        var lis = $(this).find('li:gt(1)');
        if(!$(this).hasClass('expanded')) {
            lis.hide();
        } else {
            lis.show();
        }
        
        if(lis.length>0){
            $(this).append($('<span class="More text-primary">See More <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i></span>').click(function(event){
                var $expandible = $(this).parents('.dtr-data .expand-list');
                $expandible.toggleClass('expanded');
                if ( !$expandible.hasClass('expanded')) {
                    $(this).html('See More <i class="fas fa-arrow-down text-primary ms-1 fs-8"></i>');
                } else {
                    $(this).html('See Less <i class="fas fa-arrow-up text-primary ms-1 fs-8"></i>');
                };
                lis.slideToggle();
                event.preventDefault();
            }));
        }
    });
}

// code for character limit for see more link
function text_limit() {
    var showChar = 40; // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "See More ";
    var lesstext = "See Less";
    $('.more').each(function() {
        var content = $(this).html();
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span class="text">' + h + '</span><a href="" class="morelink text-danger">' + moretext + ' <i class="fas fa-arrow-down text-danger ms-1 fs-8"></i></a></span>';
            $(this).html(html);
        }
    });
    $(".morelink").click(function() {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext + '<i class="fas fa-arrow-down text-danger ms-1 fs-8"></i>');
        } else {
            $(this).addClass("less");
            $(this).html(lesstext + '<i class="fas fa-arrow-up text-danger ms-1 fs-8"></i> ');
        }
        $(this).parent().prev().toggle('100');
        $(this).prev().toggle('100');
        return false;
    });
}
//responsive code for character limit
function responsive_text_limit() {
    var showChar = 40; // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "See More ";
    var lesstext = "See Less";
    $('.dtr-data .more').each(function() {
        var content = $(this).html();
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span class="text">' + h + '</span><a href="" class="morelink text-danger">' + moretext + ' <i class="fas fa-arrow-down text-danger ms-1 fs-8"></i></a></span>';
            $(this).html(html);
        }
    });
    $(".dtr-data .morelink").click(function() {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext + '<i class="fas fa-arrow-down text-danger ms-1 fs-8"></i>');
        } else {
            $(this).addClass("less");
            $(this).html(lesstext + '<i class="fas fa-arrow-up text-danger ms-1 fs-8"></i> ');
        }
        $(this).parent().prev().toggle('100');
        $(this).parent().prev('.text').toggle('100');
        $(this).prev('.text').toggle('100');
        $(this).prev('.text').find('.text').show();
        $(this).prev('.text').find('.moreellipses').hide();
        return false;
    });
}
// get headers data from API and create colDefArr
function getTableData(apiUrl, callback) {
    $.getJSON(apiUrl, function(resp) {
        // console.log('d - ', data);
        var tblInfo = {};
        tblInfo.colDefArr = [];
        tblInfo.colArr = [];
        search = false;

        //custom header
        resp.header.forEach((element, index) => {
            if (element.image) {
                tblInfo.colDefArr.push({
                    title: `<span class="d-flex align-items-center flex-column text-center"><span class="thumb_bg img-wrapper rounded "><img src="${element.image}"alt="" class="img-fluid"></span>${element.name}</span>`,
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
            console.log(key)
        }

        // console.log('d - ', colDefArr);
        callback(tblInfo);
    });
}
// ---------------     