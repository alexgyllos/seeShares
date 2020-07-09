<template lang="html">
  <div class="">

    <div id='one-day-chart'>
    <highcharts :options='chart2' :constructor-type="'stockChart'" v-if="currentChart === 'Multi-Day Chart'"></highcharts>


  </div>
  <div>

  </div>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import moment from 'moment'
import { eventBus } from '../main.js';




export default {
  name: 'Charts',
  props: ["chartData", "result"],
  data() {
    return {
      chart2: {
      chart: {
        backgroundColor: "rgba(256, 256, 256, 0)",
        style: {
          fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          color: "white",
          textAlign: 'center'
        }
        },
        title: {
        text: `Total Value: $${this.result.toFixed(2)}`,
        style: {
          fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          fontSize: "1.8em",
          fontWeight: "bold",
          color: "white",
          textAlign: 'center'
        }
        },
        yAxis: {
          title: {

            style: {
              fontFamily: "Avenir, Helvetica, Arial, sans-serif",
              fontSize: "1.8em",
              fontWeight: "bold",
              color: "white",
              textAlign: 'center'
            }
          }
        },
        xAxis: {
          type: 'datetime',
          title: {

            style: {
              fontFamily: "Avenir, Helvetica, Arial, sans-serif",
              fontSize: "1.8em",
              fontWeight: "bold",
              color: "white",
              textAlign: 'center'
            }
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
        currentChart: 'Multi-Day Chart',
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
      }
  }


</script>

<style lang="css" scoped>

  #one-day-chart {
  }
</style>
