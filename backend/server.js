import express, { json } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();

app.use(json());

app.post('/create-user', async (req, res) => {
    const { name, password } = req.body;

    const user = await prisma.user.create({
        data: {
            name,
            password,
        }
    })

    res.status(200).json(user);
});

app.post('/info-user', async (req, res) => {

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

app.post('/environment-user', async (req, res) => {
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
