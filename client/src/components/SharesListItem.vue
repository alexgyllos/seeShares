<template lang="html">
  <div>
    <td>{{share['01. symbol']}}</td>
    <td>{{share['shareNumber']}}</td>
    <td>{{share['shareTotal']}}</td>
    <td>{{share['05. price']}}</td>
    <td>{{share['10. change percent']}}</td>

  </div>

</template>

<script>
export default {
  name: 'ShareListItem',
  props: ['share']

}
</script>

<style lang="css" scoped>
</style>
