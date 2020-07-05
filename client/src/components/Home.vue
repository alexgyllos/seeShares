<template lang="html">
  <div class="layout">
    <div class="navigation">
      <div class="logo">
        <img src="../../public/logo1.png" alt=""><h1>seeShares</h1>
      </div>
      <div class="maintContainer">
          <div>
          <!-- <p v-for="(shares, key) of numberOfShares" :key="key" :shares="shares">{{key}} {{shares}}</p> -->

          <br>

          <div class="slider">
            <div class="links">
              <a href="#slide-1"><img src="../../public/pie-chart.png" alt="pie chart link"></a>
              <a href="#slide-2"><img src="../../public/graph.png" alt="graph link"></a>
            </div>

            <div class="slides">
              <div class="pie-chart" id="slide-1">
                <PieChart :pieChartData="pieChartData" v-if="pieData" :key="pieChartComponent" :result="result"></PieChart>
              </div>

              <div class="stock-chart" id="slide-2">
                <Charts :chartData="chartData" :result="result" v-if="chartOpen" :key="stockChartComponent"></Charts>
              </div>
            </div>
          </div>


          <!-- <button class="stockChartButton" type="button" name="button" v-on:click="openChart()">Stock Chart</button> -->

          <br>


          <!-- <p v-if="totalValue">View Total Current Shares Value: ${{result}}</p> -->
          <!-- <button type="button" name="button" v-on:click="totalValue()">View</button> -->

          <br>

          <SharesList class="sharesList" v-if="listData"
                      :listData="listData"
                      :numberOfShares="numberOfShares"
                      :key="sharesListComponent">
          </SharesList>

        </div>

      </div>
    </div>
    <div class="searchColumn">
      <SearchBar></SearchBar>
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
      id: null,
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
      stockChartComponent: 0,
      sharesListComponent: 0,
      pieChartColors: [,
                       'rgba(241, 250, 238, 1)',
                       'rgba(168, 218, 220, 1)',
                       'rgba(230, 57, 70, 1)',
                       'rgba(69, 123, 157, 1)',
                       'rgba(29, 53, 87, 1)']
    }
  },
  mounted() {
    this.loadSharesData();

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
      this.rerenderPieChart();
      this.rerenderStockChart();
    })

    eventBus.$on('removed-share', async removedShare => {
      const { removedShare, ...otherShares } = this.numberOfShares;

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
    rerenderStockChart() {
      this.stockChartComponent += 1;
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
      this.openChart();
    },
    async getQuoteData(numberOfShares) {
      const quotePromises = await SharesServices.getQuotePromises(numberOfShares);
      const results = await Promise.all(quotePromises);

    },

    prearePieChartData(){
      Object.keys(this.numberOfShares).forEach((share) => {

        let newSeries = {
          name: share,
          y: this.numberOfShares[share] * this.latestValue[share],
          color: this.pieChartColors.pop()
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
    height: 100vh;
    padding: 0;
    margin: 0;
  }

  h1 {
      font-size: 2.8em;
      padding: 0;
      margin: 0;
  }

  img {
    height: 50px;
    width: 50px;
    /* display: inline-block; */
    /* flex-direction: row; */
    /* align-self: center; */
    /* margin-top:  */
  }

  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
  }

  .layout {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100%;
    width: 100%;
  }


  .navigation {
      display: flex;
      flex-direction: column;
      /* align-self: baseline;
      align-items: center;
      align-content: center;
      justify-content: center; */
      /* height: 100vh; */
      margin-left: auto;
      margin-right: auto;
      padding: 0;
      /* margin: 50px; */
  }

  .searchColumn {
    width: -500px;
    display: flex;
    justify-content: center;
    align-self: stretch;
    align-content: center;
    width: 30%;
    /* background-color: grey; */
    border-left: 1px solid white;

  }

  .maintContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    align-self: center;
    /* height: 100vh; */
    padding: 0;
    margin: 0;
  }

  .pie-chart {
    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: center;

  }

  .sharesList {
    display: flex;
    align-self: center;
    justify-content: center;
    margin: 10px;
  }

  .stockChartButton {
    margin: 10px;
  }

  button {
    width: 150px;
    height: 30px;
    background: rgb(7, 37, 62);
    padding: 5px;
    border:1px solid white;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    user-select: none;
    transition: 0.2s;
    /* margin: 10px; */
  }

  button:hover {
    font-style: italic;
    cursor: pointer;
    /* background-color: rgb(36, 75, 105); */
  }

  .slider {
  width: 850px;
  text-align: center;
  overflow: hidden;
}

.slides {
  display: flex;

  overflow-x: auto;
  scroll-snap-type: x mandatory;



  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  /*
  scroll-snap-points-x: repeat(300px);
  scroll-snap-type: mandatory;
  */
}

.slides::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.slides::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
}
.slides::-webkit-scrollbar-track {
  background: transparent;
}

.slides > div {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 850px;
  height: 400px;
  margin-right: 50px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-size: 100px; */
}
.slides > div:target {
  /* transform: scale(0.8); */
}

.slider > a {
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
  background: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 0 0.5rem 0;
  position: relative;
}
.slider > a:active {
  top: 1px;
}
.slider > a:focus {
  background: lightgrey;
}

a {
  display: inline-flex;
  /* width: 100%; */
  height: 100%;
  background: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 0 0.5rem 0;
  position: relative;
  margin: 0px 10px 10px 10px;
  padding: 10px;
  transition: 0.2s;
  /* border: 1px solid white; */
}

a:hover {
  background: lightblue;
  /* border: 1px solid white; */
}

a > img {
  height: 30px;
  width: 30px;
}
</style>
