import "dotenv/config"
import { connectDb } from "./src/db/db.js"
import { app } from "./src/app.js"

connectDb().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err,"Error while connecting to the database")
})