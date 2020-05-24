<template lang="html">
  <div class="">
    <div v-if="contentLoaded">

    <p>Total Current Shares Value: {{totalValue}}
  </p>

</div>

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
      latestValue: {},
      contentLoaded: false
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

    this.contentLoaded = true;
  },
  computed: {
    totalValue(){
      let total = 0
      // if (this.contentLoaded === false) {return total = 0}
      // else {
      Object.keys(this.numberOfShares).forEach((share) => {
        Object.keys(this.latestValue).forEach(key => {
          if (share === key) {
            total += this.numberOfShares[share] * this.latestValue[key]['4. close']
          }
        })
      })
      return total;
    }
  },
  methods: {
    async getSharesData(equity){
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${equity}&interval=30min&apikey=P3TR43K4R4WKZ1YU`)
        const result = await response.json()
        this.userShares[equity] = result;
        let temp = result['Time Series (30min)']
        this.latestValue[equity] = temp[Object.keys(temp).pop()];
    }
  }
}
</script>

<style lang="css" scoped>
</style>
