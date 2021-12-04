

const axios = require('axios').default

async function ftServer(urlList = [], ftData) {
  try {
    const iterable = urlList.map(url => axios({
      method: 'post',
      url,
      params: ftData
    }))

    axios.all(iterable).then(axios.spread((...resList)=>{
      resList.forEach((res, idx) => console.log(`Log | ftServer res-${idx} |`, res.data))
    }))
  } catch (error) {
    console.error('Log | Error in ftServer |', error)
  }
}

module.exports = ftServer

