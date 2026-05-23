import express from "express";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/" , (req, res)=>{
    console.log("app started");
    res.json({
        success:true,
        message:"app is running"
    })
})

export default app;