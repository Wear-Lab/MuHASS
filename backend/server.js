const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./user");
const UserInfo = require("./userInfo");
const Environment = require("./environment");


const uri = 
    "mongodb+srv://mongo:mongo123@cluster0.yawywzw.mongodb.net/?retryWrites=true&w=majority";
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
     } catch(error) {
        console.error(error); 
    }
}    

connect();

app.use(express.json());

app.post('/create-user', async (req,res) => {
    /* Test User Data */
    // const user = await User({bluetoothData: 'test'});
    // await user.save();
    // res.json(user);
    
    res.json(req.body);
});

app.post('/info-user', async (req,res) => {
     /* Test User Info Data */
    // const userInfo = await UserInfo({
    //     ENMO: '34',
    //     HR: '123',
    //     SpO2: '123',
    //     GSR: '123',
    //     LPA: '123',
    //     MVPA: '123'
    // });
    // await userInfo.save();
    // res.json(userInfo);

    res.json(req.body);
});

app.post('/environment-user', async (req,res) => {
     /* Test User Environment Data */
    // const userEnvironment = await Environment({
    //     Temperature: "34",
    //     Pressure: "123",
    //     Humidity: "123",
    //     Altitude: "123"
    // });
    // await userEnvironment.save();
    // res.json(userEnvironment);

    res.json(req.body);
});


app.listen(8000, () => {
    console.log("Server stared on port 8000");
})
