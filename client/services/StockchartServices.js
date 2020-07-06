export default {
  prepareData(sharesData, chartObject, latestSharesValue) {
    sharesData.map(dataObj => {
      const {
        '2. Symbol': shareName,
        '3. Last Refreshed': lastRefreshed,
      } = dataObj['Meta Data'];
    const formattedDate = lastRefreshed.substring(0, 10);
    chartObject[shareName] = {};
    Object.entries(dataObj['Time Series (Daily)']).forEach(([date, info]) => {
      chartObject[shareName][date] = Number(info['4. close']);
      latestSharesValue[shareName] = date === formattedDate ? Number(info['4. close']) : latestSharesValue[shareName];
      return chartObject;
      })
    })
  }
}
