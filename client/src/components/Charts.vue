<template lang="html">
  <div class="">

    <div id='one-day-chart'>
      <button type="button" name="button" v-on:click="showChart('Multi-Day Chart')">Multi-Day Chart</button>

    <!-- <highcharts :options="chart1" v-if="currentChart === 'One-Day Chart'"></highcharts> -->

    <!-- <label>Stard Date:</label>
    <input type="date" name="startDate" v-model="startDate">
    <label>End Date:</label>
    <input type="date" name="endDate" v-model="endDate"> -->

    <!-- <button type="button" name="button" v-on:click="handleDates()">View Dates</button> -->
    <highcharts :options='chart2' :constructor-type="'stockChart'" v-if="currentChart === 'Multi-Day Chart'"></highcharts>

    <!-- <button v-on:click="updateData('2020-05-01', '2020-05-05')">EXTREME TEST DATA</button> -->



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
          // dateTimeLabelFormats: {
          //   month: '%e. %b',
          //   year: '%b'
          // },
          title: {
            text: 'Date'
          }
          // categories: Object.keys(this.chartData['FB']).reverse()
        },

        tooltip: {
          enabled: true,

        },

        series: [{
          data: Object.entries(this.chartData['FB']),
          pointStart: Date.UTC(2020, 1, 1),
          pointInterval: 24 * 3600 * 1000
        }




        // {
        //   name: 'FB',
        //   data: Object.values(this.chartData['FB']).reverse()
        // }
        // {
        //   name: 'IBM',
        //   data: Object.values(this.chartData['IBM']).reverse()
        // }
      ],
      rangeSelector: {
        buttons: [
          {
            type: 'day',
            count: 1,
            text: '1d'
          },
          {
            type: 'month',
            count: 1,
            text: '1m'
          },
          {
            type: 'year',
            count: 1,
            text: '1y'
          },
          {
            type: 'all',
            text: 'All'
          }
      ],
      selected: 4
      }
      },
      currentChart: null,
      dataFilter: {
        startDate: '2020-05-01',
        endDate: '2020-05-05'
      },
      newData: null
    }

  },
  components: {
    highcharts: Chart
  },
  mounted(){
    // this.newData = this.chartData;



  },
  watch: {
    // data() {
    //   this.chart2.series['FB'].setData(this.)
    // }
    // chartData(){
    //   Object.values(this.chartData['IBM'])
    // }
  },
  methods: {
    showChart(chartToShow){
      return this.currentChart = chartToShow;

  },
  updateData(startDate, endDate){
    // eventBus.$emit('filter-dates', this.dataFilter)
    let newChartData = {};

    Object.keys(this.chartData).forEach((key) => {
      newChartData[key] = {};
    });

    Object.entries(this.chartData).forEach(([equity, dates]) => {
      Object.entries(dates).forEach(([date, price]) => {
        if ((date >= startDate) && (date <= endDate)) {
          newChartData[equity][date] = price;
        } this.chart2.series
      })
    })
  }
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
    }
  }


</script>

<style lang="css" scoped>
</style>
