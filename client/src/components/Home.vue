<template lang="html">
  <div class="">

    <p>
    {{totalValue}}
  </p>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userShares: {},
      numberOfShares: null,
      total: null,
      latestValue: {}
    }
  },
  mounted() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['FB'] = share;
      let temp = share['Time Series (30min)']
      this.latestValue['FB'] = temp[Object.keys(temp).pop()]
    })

    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=30min&apikey=P3TR43K4R4WKZ1YU')
    .then(res => res.json())
    .then(share => {
      this.userShares['IBM'] = share;
      let temp = share['Time Series (30min)']
      this.latestValue['IBM'] = temp[Object.keys(temp).pop()]
    })

    fetch('http://localhost:3000/api/shares/')
    .then(res => res.json())
    .then(data => this.numberOfShares = data[0]);
  },
  computed: {
    totalValue(){
      // const result = Object.entries(this.numberOfShares).forEach((share, value) => {
      //   Object.entries(this.latestValue).forEach((k, v) => {
      //     if (share === k) {
      //       console.log( value * v['4. close'])
      //     }
      //   })
      // })

      let total = 0
      Object.keys(this.numberOfShares).forEach((share) => {
        Object.keys(this.latestValue).forEach(key => {
          if (share === key) {
            total += this.numberOfShares[share] * this.latestValue[key]['4. close']
          }
        })
      })
      return total;

    }
  }
}
</script>

<style lang="css" scoped>
</style>
