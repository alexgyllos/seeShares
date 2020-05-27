<template lang="html">
  <div class="">

    <div id='one-day-chart'>
    <button type="button" name="button" v-on:click="showChart('One-Day Chart')">One-Day Chart</button>
      <button type="button" name="button" v-on:click="showChart('Multi-Day Chart')">Multi-Day Chart</button>

    <highcharts :options="chart1" v-if="currentChart === 'One-Day Chart'"></highcharts>

    <label>Stard Date:</label>
    <input type="date" name="startDate" v-model="startDate">
    <label>End Date:</label>
    <input type="date" name="endDate" v-model="endDate">

    <button type="button" name="button" v-on:click="handleDates()">View Dates</button>
    <highcharts :options='chart2' v-if="currentChart === 'Multi-Day Chart'"></highcharts>

    <button v-on:click="updateData('2020-05-01', '2020-05-05')">EXTREME TEST DATA</button>



  </div>
  <div>

  </div>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import moment from 'moment'

export default {
  name: 'Charts',
  props: ["chartData"],
  data() {
    return {
      chart1: {
        title: {text: 'One-Day Chart'},
        xAxis: {
          categories: ['open', 'close']
          },
        series: [{
          name: 'FB',
          data: [Number(this.chartData['FB'])]
        },
        {
          name: 'IBM',
          data: [Number(this.chartData['IBM'])]
        }
        ]
      },
      chart2: {
        title: { text: 'Multi-Day Chart' },
        yAxis: {
          title: {
            text: 'Price $'
          }
        },
        xAxis: {
          categories: Object.keys(this.chartData['FB']).reverse()
          },
        series: [
        {
          name: 'FB',
          data: Object.values(this.chartData['FB']).reverse()
        },
        {
          name: 'IBM',
          data: Object.values(this.chartData['IBM']).reverse()
        }
        ]
      },
      currentChart: null,
      startDate: null,
      endDate: null,
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
    let newChartData = {};

    Object.keys(this.chartData).forEach((key) => {
      newChartData[key] = {};
    });

    Object.entries(this.chartData).forEach(([equity, dates]) => {
      Object.entries(dates).forEach(([date, price]) => {
        if ((date >= startDate) && (date <= endDate)) {
          newChartData[equity][date] = price;
        } return newChartData;
        // this.chart2[series][0].data = newChartData['FB'];
        // this.chart2[series][1].data = newChartData['IBM'];
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
