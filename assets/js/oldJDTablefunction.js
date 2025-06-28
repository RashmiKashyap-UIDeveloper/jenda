var rows = 10; //Default Rows to show 10
var sortcolumns = []; //Identifiy Sortcolumns values
var nosort = []; //Create 
var showpagination = "";
var showsearch = "";
var ordering = true;
var placeholder = "Search... "

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
