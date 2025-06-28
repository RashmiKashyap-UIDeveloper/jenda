function JChart(id, api) {

  $.getJSON(api, function(response) {
      var options = {
          chart: {
              height: 350,
              type: "line"
          },
          redrawOnWindowResize: true,
          theme: {
              palette: 'palette3' // upto palette10
          },
          dataLabels: {
              enabled: false
          },

          series: response.series,
          xaxis: {
              categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
          },
          yaxis: [{
              axisTicks: {
                  show: true
              },
              axisBorder: {
                  show: false
              },
              title: {
                  text: "Violation"
              }
          }],
          // tooltip: {
          //   shared: false,
          //   intersect: true,
          //   x: {
          //     show: false
          //   }
          // },
          legend: {
              horizontalAlign: "left",
              offsetX: 40
          }
      };

      var chart = new ApexCharts(document.querySelector("#" + id + ""), options);

      chart.render();

      if (response.showdatefilter === "true") {
          JCRange(id + "-date", "mychart-input", "Select Date Range");
      }
      /*	chart.updateSeries([{
         name: 'Sales',
         data: response.data
      }])*/
  });
}



//Highcharts default options
Highcharts.setOptions({
  colors: [
      'rgb(68, 158, 221, 0.9)', //sku blue
      'rgba( 0, 71, 133, 0.9 )', //primary 
      'rgb(228 65 75 / 90%)', //primary red
      'rgba( 80, 205, 137, 0.9 )', //green
      'rgba( 51,   178, 223, 0.9 )', //bright blue
      'rgba( 177, 69,  0,   0.9 )', //dark orange
      'rgba( 84, 110,  122,   0.9 )', //dark grey
      'rgb(80 205 137 / 90%)', //light green
      'rgba( 45,  47,  238, 0.9 )', //mid blue
      'rgba( 140, 140, 156, 0.9 )', //mid
      'rgba( 238, 46,  47,  0.9 )', //mid red
      'rgba( 44,  145, 51,  0.9 )', //mid green
      'rgba( 103, 16,  192, 0.9 )' //dark purple
  ],
  chart: {
      alignTicks: false,
      type: '',
      margin: [60, 25, 100, 90],
      style: {
          fontFamily: 'Poppins, sans-serif'
      }
  },
})
//-----------------