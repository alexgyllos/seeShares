<template lang="html">
  <div class="">
    <p>hi</p>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
  name: 'Charts',
  props: ["latestValue"],
  data() {
    return {
      chartOptions: {
        xAxis: {
          categories: ['open', 'close']
        },
        series: [{
          name: 'FB',
          data: [Number(this.latestValue['FB']['1. open']), Number(this.latestValue['FB']['4. close'])]
        },{
          // name: 'IBM',
          // data: [2, 4, 5],
        }
        ]
      }
    }
  },
  components: {
    highcharts: Chart
  }
}
</script>

<style lang="css" scoped>
</style>
