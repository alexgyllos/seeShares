<template lang="html">
  <div id="pieChart" class="pieChart">
    <highcharts :options="pieChart"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  name: 'PieChart',
  props: ["pieChartData", "result"],
  data() {
    return {
      pieChart: {
        chart: {
          backgroundColor: "rgba(256, 256, 256, 0)"
        },
        title: {
          text: `Total Value: $${this.result.toFixed(2)}`,
          style: {
            fontFamily: "Avenir, Helvetica, Arial, sans-serif",
            fontSize: "1.8em",
            fontWeight: "bold",
            color: "white"
          }
        },
        type: 'pie',
        series:
        [{
          name: 'Value',
          borderColor: 'rgba(256, 256, 256, 1)',
          borderWidth: 1.5,
          color: 'blue',
          allowPointSelect: true,
          tooltip: {
            valuePrefix: '$',
            valueDecimals: 2,
            stickOnContact: true,
            distance: -80
          },
          type: 'pie',
          data: [
          ]
        }]
      }
    }
  },
  mounted() {
    Object.entries(this.pieChartData).forEach(([key, data]) => {
      this.pieChart.series[0].data.push(data);
    })
  },
  components: {
    Chart
  }
}
</script>

<style lang="css" scoped>

  #pieChart {

    margin-left: auto;
    margin-right: auto;
  }

</style>
