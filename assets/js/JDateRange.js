function JCRange(id, input){
  var start = moment().subtract(29, 'days');
  var end = moment();

  $("#"+id+"").daterangepicker({
    buttonClasses: ' btn',
    applyClass: 'btn-primary',
    cancelClass: 'btn-secondary',

    startDate: start,
    endDate: end,
    ranges: {
      'Today': [moment(), moment()],
      'This Week': [moment().startOf('week'), moment().endOf('week')],
      '4 weeks ending today': [moment().subtract(4, 'weeks'), moment()],
      '13 weeks ending today': [moment().subtract(13, 'weeks'), moment()],
      '26 weeks ending today' : [moment().subtract(26, 'weeks'), moment()],
      '52 weeks ending today': [moment().subtract(52, 'weeks'), moment()]
    }
}, function(start, end, label) {
    $('.'+input+'').val( start.format('MM/DD/YYYY') + ' / ' + end.format('MM/DD/YYYY'));
});
}

