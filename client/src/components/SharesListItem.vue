<template lang="html">
  <div>
    <td>{{share['01. symbol']}}</td>
    <td>{{share['shareNumber']}}</td>
    <td>{{share['shareTotal']}}</td>
    <td>{{share['05. price'] | toFixed(2) }}</td>
    <td>{{ share['10. change percent'] | toFixed(2) }}</td>

  </div>

</template>

<script>
export default {
  name: 'ShareListItem',
  props: ['share'],
  filters: {
    toFixed(value) {
      console.log(Number(value));
      console.log(value);
      return Number(value).toFixed(2);
    }


}
</script>

<style lang="css" scoped>
</style>
