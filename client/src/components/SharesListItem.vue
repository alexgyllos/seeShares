<template lang="html">
  <div>
    <td>{{share['01. symbol']}}</td>
    <td>{{share['shareNumber']}}</td>
    <td>{{share['shareTotal']}}</td>
    <td>{{share['05. price'] | toFixed(2) }}</td>
    <td>{{ share['10. change percent'] | toFixed(2) }}</td>
    <!-- <td><button>remove</button></td> -->
    <!-- <ListItemChart v-if="selectedChart"></ListItemChart> -->

  </div>

</template>

<script>
import ListItemChart from '@/components/ListItemChart.vue'

export default {
  name: 'ShareListItem',
  props: ['share'],
  filters: {
    toFixed(value) {

      return Number(value).toFixed(2);
    }


  },
  components: {
    ListItemChart
  }
</script>

<style lang="css" scoped>
</style>
