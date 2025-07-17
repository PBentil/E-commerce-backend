import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database.js";
import app from "./app.js";
import db from "./models/index.js";


sequelize.authenticate()
    .then(()=> console.log("db connection successful"))
    .then(()=> db.sequelize.sync({alter:true}))
    .then(()=> {
        app.listen(process.env.PORT, () => {
            console.log("Server started on port " + process.env.PORT);
        })
    })
.catch((err)=> console.log("db connection failed", err))