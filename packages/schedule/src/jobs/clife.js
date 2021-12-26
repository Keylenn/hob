const moment = require('moment')
const api = require('../../../api')
const ftServer = require('../utils/ftServer')

const BIN_ID = process.env.bid

const baseOption = {
  binId: BIN_ID,
}

function job() {
  // 东八区
  const now = moment().utcOffset(8 * 60)
  console.log('Log | Exec clife job |', now.format("dddd, MMMM Do YYYY, h:mm:ss a"))

  api.bins.read(baseOption)
    .then((data) => {
      const clifeListArgs =  data?.record?.ftConfig?.clifeListArgs

      console.log('Log | clifeListArgs ｜', clifeListArgs)
      if(clifeListArgs) {
        ftServer.apply(null, clifeListArgs)
      }
    })
    .catch((err) => {
      console.error('Log | Error in Exec clife job |', err)
    })
}

job()