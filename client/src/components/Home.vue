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
      numberOfShares: null
    }
  },
  mounted() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => this.userShares['FB'] = share)

    fetch('http://localhost:3000/api/shares/')
    .then(res => res.json())
    .then(data => this.numberOfShares = data[0]);
  }
}
</script>

<style lang="css" scoped>
</style>
