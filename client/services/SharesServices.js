const baseURL = "http://localhost:3000/api/shares/"
const historicalDataURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&interval=30min&apikey=P3TR43K4R4WKZ1YU&symbol=";
const latestDataURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=T4AX92YL5PLFI8RV&symbol="

export default {
  getPromises(shares, url) {
    const dataPromises = Object.keys(shares).map(async (key) => (
      await fetch(url + key).then(res => res.json())
    )
  )
  return dataPromises;
},
  async getData(shares, url) {
    const sharePromises = await this.getPromises(shares, url);
    const results = await Promise.all(sharePromises);
    return results;
  },
  async getHistoricSharesData(shares) {
    const results = await this.getData(shares, historicalDataURL);
    return results;
  },
  async getLatestSharesData(shares) {
    const results = await this.getData(shares, latestDataURL);
    return results;
  }
}
