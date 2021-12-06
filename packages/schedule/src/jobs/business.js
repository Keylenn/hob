const moment = require('moment')
const template = require('art-template')
const { NodeHtmlMarkdown } = require('node-html-markdown')
const api = require('../../../api')
const mail = require('../utils/mail')
const ftServer = require('../utils/ftServer')

const BIN_ID = process.env.bid

const DEFAULT_REMINDER_DAYS = 45

const baseOption = {
  binId: BIN_ID,
}

function job() {
  // 东八区
  const now = moment().utcOffset(8 * 60)
  console.log('Log | Exec insurance job |', now.format("dddd, MMMM Do YYYY, h:mm:ss a"))

  api.bins.read(baseOption)
    .then((data) => {
      const pendingMailList = []
      const {list, reminderDays = DEFAULT_REMINDER_DAYS} = data?.record
      list.forEach(i => {
        const expDate = i?.info?.expDate
        if(!expDate) return

        const distanceExpDays = moment(expDate).diff(now, 'days')
        if(distanceExpDays <= reminderDays) {
          pendingMailList.push({...i.info, distanceExpDays})
        }
      })

      console.log('Log | pendingMailList ｜', pendingMailList)

       // Notify whiteList（weixin）
      if(!pendingMailList.length) {
        ftServer.apply(null, data?.record?.ftConfig?.whiteListArgs)
        return
      }

      // Notify Subscribers（mail + weixin）
      const {tpl, ...restMailConfig} = data?.record?.mailConfig ?? {}
      const html = template.render(tpl, {list: pendingMailList})
      
      mail({
        ...restMailConfig,
        html,
      })

      // https://sct.ftqq.com
      const {title, users} = data?.record?.ftConfig ?? {}
      ftServer(users, {
        title,
        desp: NodeHtmlMarkdown.translate(`${html}`)
      })
    })
    .catch((err) => {
      console.error('Log | Error in Exec insurance job |', err)
    })
}

job()