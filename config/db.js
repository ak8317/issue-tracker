const mongoose=require('mongoose')

require('dotenv').config();

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DATABASE,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}
module.exports=connectDB