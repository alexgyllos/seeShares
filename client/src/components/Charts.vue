<template lang="html">
  <div class="">
    <p>hi</p>
    <div id='one-day-chart'>
    <button type="button" name="button" v-on:click="showChart('One-Day Chart')">One-Day Chart</button>
      <button type="button" name="button" v-on:click="showChart('Multi-Day Chart')">Multi-Day Chart</button>
    <highcharts :options="chart1" v-if="currentChart === 'One-Day Chart'"></highcharts>
    <highcharts :options='chart2' v-if="currentChart === 'Multi-Day Chart'"></highcharts>
  </div>
  <div>

  </div>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

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
        xAxis: {
          categories: Object.keys(this.chartData['FB'])
          },
        series: [{
          name: 'FB',
          data: this.dataToPass('FB')
        },
        {
          name: 'IBM',
          data: this.dataToPass('IBM')
          // chartData['IBM']
        }
        ]
      },
      currentChart: null
    }

  },
  components: {
    highcharts: Chart
  },
  methods: {
    showChart(chartToShow){
      return this.currentChart = chartToShow;
    // },
    // extractData(){
    //   this.
    }
  // },
  // watch: {
  //   filterByDate(startDate, endDate){

  },
  computed: {
    chart2.series[0].data(){
      
    }
    }
  }
  }

</script>

<style lang="css" scoped>
</style>
