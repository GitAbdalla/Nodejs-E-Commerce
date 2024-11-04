const nodemailer = require('nodemailer')

const sendeEmail = async (options)=>{
 const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT, 
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
 })
 const mailOpts = {
    from: 'E-shop App abdalla472002@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
 }
 console.log("before sending email")
 await transporter.sendMail(mailOpts)
 console.log("after sending email")

}

module.exports = sendeEmail;