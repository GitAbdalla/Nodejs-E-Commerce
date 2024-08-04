const mongoose = require('mongoose')

const dbConnection = async ()=>{
  // try {
    const connection = await mongoose.connect(process.env.DB_URI)
    console.log(`Database Connected: ${connection.connection.host}`)
  // } catch (error) {
  //   // console.log(error)
  // }
  // mongoose
  // .connect(process.env.DB_URI)
  // .then((conn)=> {
  //   console.log(`Database Connected: ${connection.connection.host}`)
  // })
}


module.exports = dbConnection
