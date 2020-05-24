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
  props: ["latestValue"],
  data() {
    return {
      chart1: {
        title: {text: 'One-Day Chart'},
        xAxis: {
          categories: ['open', 'close']
          },
        series: [{
          name: 'FB',
          data: [Number(this.latestValue['FB']['1. open']), Number(this.latestValue['FB']['4. close'])]
        },
        {
          name: 'IBM',
          data: [Number(this.latestValue['IBM']['1. open']), Number(this.latestValue['IBM']['4. close'])]
        }
        ]
      },
      chart2: {
        title: { text: 'Multi-Day Chart' },
        xAxis: {
          categories: ['open', 'close']
          },
        series: [{
          name: 'FB',
          data: [Number(this.latestValue['FB']['1. open']), Number(this.latestValue['FB']['4. close'])]
        },
        {
          name: 'IBM',
          data: [Number(this.latestValue['IBM']['1. open']), Number(this.latestValue['IBM']['4. close'])]
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
    },
    
  }
}
</script>

<style lang="css" scoped>
</style>
