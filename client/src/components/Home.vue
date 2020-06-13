<template lang="html">
  <div class="maintContainer">
    <h1>SHARE/\/BOOK</h1>

      <div>

      <SearchBar></SearchBar>

      <!-- <p v-for="(shares, key) of numberOfShares" :key="key" :shares="shares">{{key}} {{shares}}</p> -->

      <br>

      <div class="pie-chart">
        <PieChart :pieChartData="pieChartData" v-if="pieData" :key="pieChartComponent"></PieChart>
      </div>


      <p v-if="totalValue">View Total Current Shares Value: ${{result}}</p>
      <!-- <button type="button" name="button" v-on:click="totalValue()">View</button> -->

      <br>

      <SharesList class="sharesList" v-if="listData"
                  :listData="listData"
                  :numberOfShares="numberOfShares"
                  :key="sharesListComponent">
      </SharesList>

      <button type="button" name="button" v-on:click="openChart()">Open the CHART</button>

      <br>

      <Charts :chartData="chartData" v-if="chartOpen"></Charts>
    </div>

  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import Charts from '@/components/Charts.vue'
import PieChart from '@/components/PieChart.vue'
import moment from 'moment'
import { eventBus } from '../main.js';
import SharesServices from '../../services/SharesServices.js'
import SharesList from '@/components/SharesList.vue'
import SearchBar from '@/components/SearchBar.vue'
// import SharesListItem from '@/components/SharesListItem.vue';

export default {
  name: 'Home',
  data() {
    return {
      numberOfShares: null,
      total: null,
      latestValue: {},
      componentLoaded: false,
      result: 0,
      chartOpen: false,
      chartData: {},
      pieChartData: {},
      pieData: false,
      listData: null,
      databaseShares: null,
      pieChartComponent: 0,
      sharesListComponent: 0
    }
  },
  mounted() {
    this.loadSharesData();
    // this.prearePieChartData();
    eventBus.$on('selected-share', async newShare => {
      const updatedShares = { ...newShare, ...this.databaseShares };
      const { _id, ...shares } = updatedShares;
      this.numberOfShares = shares;
      this.databaseShares = await SharesServices.updateUserShares(_id, shares);
      const result = await this.getHistoricSharesData(newShare);
      this.prepareData(result, this.chartData);
      const newListItem = await this.getQuoteSharesData(newShare);
      const { 'Global Quote': globalQuote } = newListItem[0];
      this.listData.push(globalQuote);
      this.rerenderSharesList();
      // quoteResults.map(({ 'Global Quote': globalQuote }) => globalQuote);
      this.rerenderPieChart();


      // const updatedShares = { ...newShare, ...this.databaseShares };
      // const { _id, ...shares } = updatedShares;
      // this.databaseShares = await SharesServices.updateUserShares(_id, shares);
      // const result = await this.getHistoricSharesData(shares);
      // this.getQuoteSharesData(shares);
      // this.prepareData(results, this.chartData);
    })


  },
  methods: {
    totalValue(){
      let total = 0
      Object.keys(this.numberOfShares).forEach((share) => {
        total += (this.numberOfShares[share] * this.latestValue[share]);
        })
      return this.result = total ;
    },
    rerenderPieChart(){
      this.pieChartComponent += 1;
    },
    rerenderSharesList() {
      this.sharesListComponent += 1;
    },
    async loadSharesData() {
      const userData = await SharesServices.getUserData();
      this.databaseShares = userData[0];
      const { _id, ...shares } = userData[0];
      this.numberOfShares = shares;
      const results = await this.getHistoricSharesData(shares)
      const quoteResults = await this.getQuoteSharesData(shares)
      this.listData = quoteResults.map(({ 'Global Quote': globalQuote }) => globalQuote);
      this.prepareData(results, this.chartData);
    },
    openChart(){
      return this.chartOpen = true;
    },
    async getHistoricSharesData(shares) {
      const sharePromises = await SharesServices.getSharesPromises(shares)
      const results = await Promise.all(sharePromises);
      return results;
    },
    async getQuoteSharesData(shares) {
      const quotePromises = await SharesServices.getQuotePromises(shares)
      const quoteResults = await Promise.all(quotePromises);
      return quoteResults;

      // this.listData = quoteResults.map(({ 'Global Quote': globalQuote }) => globalQuote)
    },
    prepareData(results, chartDataObject) {
      results.map(resultObj => {
        const {
          '2. Symbol': shareName,
          '3. Last Refreshed': lastRefreshed,
        } = resultObj['Meta Data'];
        const formatted = lastRefreshed.substring(0, 10);
        chartDataObject[shareName] = {};
        Object.entries(resultObj['Time Series (Daily)']).forEach(([date, info]) => {
          chartDataObject[shareName][date] = Number(info['4. close']);
          this.latestValue[shareName] = date === formatted ? Number(info['4. close']) : this.latestValue[shareName]

          return chartDataObject
        })
      })
      this.totalValue();
      this.prearePieChartData();
    },
    async getQuoteData(numberOfShares) {
      const quotePromises = await SharesServices.getQuotePromises(numberOfShares);
      const results = await Promise.all(quotePromises);

    },

    prearePieChartData(){
      Object.keys(this.numberOfShares).forEach((share) => {

        let newSeries = {
          name: share,
          y: this.numberOfShares[share] * this.latestValue[share]
        }
        this.pieChartData[share] = newSeries;
      })
      this.pieData=true;
    }





    },
  components: {
    Charts,
    PieChart,
    SharesList,
    SearchBar
  }
}
</script>

<style>
  html {
    background-color: rgb(17, 52, 78);
  }

  .maintContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    align-self: center;
  }

  .pie-chart {
    display: flex;
    align-self: center;
  }

  .sharesList {
    display: flex;
    align-self: center;
    justify-content: center;
    margin: 10px;
  }
</style>
