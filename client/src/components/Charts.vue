<template lang="html">
  <div class="">

    <div id='one-day-chart'>
      <button type="button" name="button" v-on:click="showChart('Multi-Day Chart')">Multi-Day Chart</button>
    <highcharts :options='chart2' :constructor-type="'stockChart'" v-if="currentChart === 'Multi-Day Chart'"></highcharts>


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
        series: [],
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
      currentChart: null,
      dataFilter: {
        startDate: '2020-05-01',
        endDate: '2020-05-05'
      }
    }
  },
  components: {
    highcharts: Chart
  },
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
  }


</script>

<style lang="css" scoped>
</style>
