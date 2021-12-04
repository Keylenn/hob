

const axios = require('axios').default

async function ftServer(urlList = [], ftData) {
  try {
    const iterable = urlList.map(url => axios({
      method: 'post',
      url,
      params: ftData
    }))

    axios.all(iterable).then(axios.spread((...params)=>{
      console.log('params', params)
    }))
  } catch (error) {
    console.error('Log | Error in ftServer |', error)
  }
}

module.exports = ftServer

