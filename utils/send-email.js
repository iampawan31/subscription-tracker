import dayjs from 'dayjs'
import { emailTemplates } from './email-template.js'
import transporter, { accountEmail } from '../config/nodemailer.js'

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) {
    throw new Error('Missing required parameters')
  }

  const template = emailTemplates.find((tem) => tem.label === type)

  if (!template) {
    throw new Error('Invalid email type')
  }

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price / 100} (${
      subscription.frequency
    })`,
    paymentMethod: subscription.paymentMethod
  }

  const message = template.generateBody(mailInfo)
  const subject = template.generateSubject(mailInfo)

  const mailOptions = {
    from: accountEmail,
    to,
    subject,
    html: message
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err, 'Error sending email')

    console.log('Email sent', info.response)
  })
}
