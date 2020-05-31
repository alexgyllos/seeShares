const baseURL = "http://localhost:3000/api/shares/"

export default {
  getSharesPromises(numberOfShares) {
    const sharePromises = Object.keys(numberOfShares).map(key => {
      console.log(key);
      return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${key}&interval=30min&apikey=P3TR43K4R4WKZ1YU`)
        .then(res => res.json());
          })
          return sharePromises;
      },
    getUserData() {
      return fetch(baseURL).then(res => res.json())
    }
  }