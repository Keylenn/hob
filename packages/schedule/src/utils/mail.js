const nodemailer = require("nodemailer")

async function mail(config={}) {
  try {
    const {user, pwd, ...mailConfig} = config
    const transporter = nodemailer.createTransport({
      host: "smtp.qq.com",
      port: 465, // SMTP 端口
      secure: true, // true for 465, false for other ports
      auth: {
        user, // 发送者的邮箱,我这里选择 qq 邮箱
        pass: pwd, // SMTP 授权码，可以去具体的邮箱设置里面获取
      },
    })

    transporter.sendMail({
      // from: 'xxxx', // 发送者的昵称和邮箱地址
      // html: 'xxxx', // 可以发送html
      // to: "xxxx,xxx", // 接收者,可写多个接受者
      // subject: "xxxx", // 邮件主题
      // text: "xxxxx", // 主体
      ...mailConfig
    }, (err) => {
      if(err) {
        return console.error('Log | Error in sendMail |', err)
      }
    })
  } catch (error) {
    console.error('Log | Error in mail |', error)
  }
}

module.exports = mail

