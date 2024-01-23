import express, { json } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(json());

app.get('/user', async (req, res) => {
    const { userId } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });

    res.status(200).json(user);
});

app.post('/user', async (req, res) => {
    const { name, password } = req.body;

    const user = await prisma.user.create({
        data: {
            name,
            password,
        }
    });

    res.status(200).json(user);
});

app.put('/user', async (req, res) => {
    const { userId, name, password } = req.body;

    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name,
            password,
        }
    });

    res.status(200).json(user);
});

app.delete('/user', async (req, res) => {
    const { userId } = req.body;

    const deleted = await prisma.user.delete({
        where: {
            id: userId,
        }
    });

    res.status(200).json(deleted);
});

interface UserInfo {
    age: number;
    gender: string;
    height: number;
    weight: number;
}

app.get('/userInfo', async (req, res) => {
    const { userId } = req.body;

    const user = await prisma.userInfo.findUnique({
        where: {
            userId: userId,
        }
    });

    res.status(200).json(user);
});

app.post('/userInfo', async (req, res) => {
    const { userId, userInfo }: { userId: number, userInfo: UserInfo; } = req.body;

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

    const user = await prisma.userInfo.create({
        data: {
            ...userInfo,
            userId: userId,
        }
    });

    res.status(200).json(user);
});

app.put('/userInfo', async (req, res) => {
    const { userId, userInfo }: { userId: number, userInfo: UserInfo; } = req.body;

    const user = await prisma.userInfo.update({
        where: {
            userId: userId,
        },
        data: {
            ...userInfo,
        }
    });

    res.status(200).json(user);
});

app.delete('/userInfo', async (req, res) => {
    const { userId } = req.body;

    const deleted = await prisma.userInfo.delete({
        where: {
            userId: userId,
        }
    });

    res.status(200).json(deleted);
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
});
