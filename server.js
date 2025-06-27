const express=require("express");
const { PORT } = require("./Config/config");
const authRoute = require("./Routes/authRoute");
const frelancerRoute = require("./Routes/freelancerRoute");
const clientRoute = require("./Routes/clientRoute");
const app=express();


app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/freelancer",frelancerRoute)
app.use("/api/client",clientRoute)

app.listen((PORT),()=>{
    console.log(`Server is Running on ${PORT}`);
});