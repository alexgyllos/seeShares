<template lang="html">
  <div id="pieChart" class="pieChart">
    <highcharts :options="pieChart"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
  name: 'PieChart',
  props: ["pieChartData"],
  data() {
    return {
      pieChart: {
        title: {
          text: 'My Shares'
        },
        type: 'pie',
        series: [
          {
          name: 'Value',
          colorByPoint: true,
          type: 'pie',
          data: [
          // {
          //   name: 'FB',
          //   y: 30
          // },
          // {
          //   name: 'IBM',
          //   y: 70
          // },
          // {
          //   name: 'BA',
          //   y: 10
          // }
          ]
        }]
      }
    }
  },
  mounted() {
    Object.entries(this.pieChartData).forEach(([key, data]) => {
      this.pieChart.series[0].data.push(data);
    })
    // this.Chart.redraw();
  },
  components: {
    Chart
  }
}
</script>

<style lang="css" scoped>
  .pieChart {
    /* display: flex; */
    /* align-self: center; */
    /* width: 1000px; */
  }
</style>
