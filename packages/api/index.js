const {JsonBinIoApi} = require("jsonbin-io-api")

const SECRET_KEY =  process.env.jbsk

const api = new JsonBinIoApi(SECRET_KEY)

module.exports = api