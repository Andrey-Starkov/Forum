const express = require("express");
const authRouter = require('./authRouter')
const app = express();
const cors=require("cors");
const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}
app.use(express.json())
app.use(cors(corsOptions))
app.use("/api",authRouter)

app.listen(5000, function(){
    console.log("Сервер ожидает подключения...");
});
