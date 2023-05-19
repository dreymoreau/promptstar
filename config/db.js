// mongoose allow us to do a little more with mongodb, still working with promises
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        //! Additional properties no longer needed
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        // if successful console.log
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch(err){
        console.error(err)
        // stops the process after logging the error
        process.exit(1)
    }
}

// exporting the function and not calling it because there is no parentheses
module.exports = connectDB