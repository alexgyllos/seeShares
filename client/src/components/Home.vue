<template lang="html">
  <div class="">

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userShares: {},
      numberOfShares: {}
    }
  },
  mounted() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => this.userShares['FB'] = share)
  }
}
</script>

<style lang="css" scoped>
</style>
