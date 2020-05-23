<template lang="html">
  <div class="">
    <p>{{this.totalShareValue}}Hi{{totalValue}}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userShares: {},
      numberOfShares: null,
      totalShareValue: null
    }
  },
  mounted() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => this.userShares['FB'] = share)

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => this.userShares['IBM'] = share)

    fetch('http://localhost:3000/api/shares/')
    .then(res => res.json())
    .then(data => this.numberOfShares = data[0]);
  },
  computed: {
    totalValue() {
      this.userShares.forEach((share, value) => {
        console.log(share)
      });

    }
  }
}
</script>

<style lang="css" scoped>
</style>
