<template lang="html">
  <div class="">

    <div id='one-day-chart'>
      <button type="button" name="button" v-on:click="showChart('Multi-Day Chart')">Multi-Day Chart</button>

      <!-- <button type="button" name="button" v-on:click=" updateSeries()">updateSeries()</button> -->

    <!-- <highcharts :options="chart1" v-if="currentChart === 'One-Day Chart'"></highcharts> -->

    <!-- <label>Stard Date:</label>
    <input type="date" name="startDate" v-model="startDate">
    <label>End Date:</label>
    <input type="date" name="endDate" v-model="endDate"> -->

    <!-- <button type="button" name="button" v-on:click="handleDates()">View Dates</button> -->
    <highcharts :options='chart2' :constructor-type="'stockChart'" v-if="currentChart === 'Multi-Day Chart'"></highcharts>
    <!-- <div id="new-chart">
      <highcharts :options="chart2" :constructor-type="'stockChart'" v-if="currentChart === 'view chart'"></highcharts>
    </div> -->

    <!-- <button v-on:click="updateData('2020-05-01', '2020-05-05')">EXTREME TEST DATA</button> -->

    <!-- <button v-on:click="addSeries">Add series</button> -->



  </div>
  <div>

  </div>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import moment from 'moment'
import { eventBus } from '../main.js';




export default {
  name: 'Charts',
  props: ["chartData"],
  data() {
    return {
      chart2: {
        title: { text: 'Multi-Day Chart' },
        yAxis: {
          title: {
            text: 'Price $'
          }
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Date'
          }
        },
        tooltip: {
          valueDecimals: 2
        },
        series: [
        // {
        //   name: 'FB',
        //   data: Object.entries(this.chartData['FB']).reverse(),
        //   pointStart: Date.UTC(2020),
        //   pointEnd: Date.UTC(2020),
        //   pointInterval: 24 * 3600 * 1500
        // },
        // {
        //   name: 'IBM',
        //   data: Object.entries(this.chartData['IBM']).reverse(),
        //   pointStart: Date.UTC(2020),
        //   pointEnd: Date.UTC(2020),
        //   pointInterval: 24 * 3600 * 1500
        // }
      ],
      rangeSelector: {
        buttons: [
          {
            type: 'day',
            count: 8,
            text: 'Week'
          },
          {
            type: 'month',
            count: 1,
            text: '1M'
          },
          {
            type: 'month',
            count: 3,
            text: '3M'
          },
          {
            type: 'all',
            text: 'All'
          }
      ],
      selected: 4
      }
      },
      mySeries: [],
      // info: {},
      // updateArgs: [true, true, true],
      // chart2: {
      //   series: [{
      //     data: []
      //   }]
      // },
      currentChart: null,
      dataFilter: {
        startDate: '2020-05-01',
        endDate: '2020-05-05'
      },
      // newData: null
    }

  },
  components: {
    highcharts: Chart
  },
  // created(){
  //   Object.entries(this.chartData).forEach(([key, data]) => {
  //     let newSeries = {
  //       name: key,
  //       data: data,
  //       pointStart: Date.UTC(2020),
  //       pointEnd: Date.UTC(2020),
  //       pointInterval: 24 * 3600 * 1500
  //     };
  //
  //     this.mySeries.push(newSeries);
  //   })
  // },
  methods: {
    showChart(chartToShow){
      return this.currentChart = chartToShow;
    }
    },
    mounted() {
      Object.entries(this.chartData).forEach(([key, prices]) => {
        let newSeries = {
          name: key,
          data: Object.entries(prices).reverse(),
          pointStart: Date.UTC(2020),
          pointEnd: Date.UTC(2020),
          pointInterval: 24 * 3600 * 1500
          };
          this.chart2.series.push(newSeries);
        })
        this.highcharts.redraw();
      }



    // addSeries() {
    //   let newSeries = {
    //       name: 'IBM',
    //       data: Object.entries(this.chartData['IBM']).reverse(),
    //       pointStart: Date.UTC(2020),
    //       pointEnd: Date.UTC(2020),
    //       pointInterval: 24 * 3600 * 1500
    //       };
    //
    //     this.chart2.series.push(newSeries);
    //     this.highcharts.redraw();
    //
    // }

    // }
    // updateSeries(){
    //
    //   let newSeries = {
    //     pointStart: Date.UTC(2020),
    //     pointEnd: Date.UTC(2020),
    //     pointInterval: 24 * 3600 * 1500
    //   }
    //    Object.entries(this.chartData).forEach(([key, data]) => {
    //     // this.mySeries[key] = this.chartData[key];
    //     newSeries['name'] = key;
    //     newSeries['data'] = data;
    //
    //     this.mySeries.push(newSeries);
    //     console.log(newSeries);
    //     // let chart = highcharts.chart('new-chart', {
    //     //   title: {
    //     //     text: 'My chart'
    //     //   }
    //     // })
    //     // this.chart2.addSeries({
    //     //   name: key,
    //     //   data: data
    //     // })
    //   })
    //
    //   this.chart2.series = this.mySeries;
    //   this.currentChart = 'view chart'
    // },
    // updateData(startDate, endDate){
    //   // eventBus.$emit('filter-dates', this.dataFilter)
    //   let newChartData = {};
    //
    //   Object.keys(this.chartData).forEach((key) => {
    //     newChartData[key] = {};
    //   });
    //
    //   Object.entries(this.chartData).forEach(([equity, dates]) => {
    //     Object.entries(dates).forEach(([date, price]) => {
    //       if ((date >= startDate) && (date <= endDate)) {
    //         newChartData[equity][date] = price;
    //       } this.chart2.series
    //     })
    //   })
    // }
  // setChartData(arr){
  //   this.
  // }

    // const filterObject = (obj, filter) => {
    //   Object.keys(obj)
    //         .filter(key => filter(obj[key]))
    //         .reduce((res, key) => res[key] = obj[key], res, {} );
    // },
    // defineFilter() {
    //   if ((date >= this.startDate) && (date ))
    // }
    //
    // handleDates(){
    //   // let formattedStartDate = moment(this.startDate).format("DD MM YYYY");
    //   // let formattedEndDate = moment(this.endDate).format("DD MM YYYY");
    //   const filtered = Object.entries(this.chartData).forEach(([equity, dates]) => {
    //     filterObject(dates, )
    //   })
    //
    //
    //   const filtered = Object.entries(this.chartData).forEach(([equity, dates]) => {Object.keys(dates).filter(date => {
    //     if((date >= this.startDate) && (date <= this.endDate)){
    //       return date;
    //     }
    //   }).reduce((obj, key) => {
    //     obj[key] = dates[key];
    //     return obj;
    //
    //   }, {})
    // });
    //
    //   console.log(filtered);
    // }

  // async created () {
  //   // this.chartData =
  //   this.updateSeries()
  // }
  }


</script>

<style lang="css" scoped>
</style>
