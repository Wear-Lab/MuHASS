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


//User data(Raw data)
interface Data {
    acceleration: number;
    magnetic: number;
    gyroscope: number;
    temperature: number;
    pressure: number;
    altitude: number;
    humidity: number;
    gsr: number;
    ppg: number;
    hr: number;
    microphone: number;
    k: number;
    time: DateTime;
}
  

app.get('/data', async (req, res) => {
    const { userId } = req.body;

    const user = await prisma.data.findUnique({
        where: {
            userId: userId,
        }
    });

    res.status(200).json(user);
});

app.post('/data', async (req, res) => {
    const { userId, data }: { userId: number, data: Data; } = req.body;

    const user = await prisma.data.create({
        data: {
            ...data,
            userId: userId,
        }
    });

    res.status(200).json(user);
});

app.put('/data', async (req, res) => {
    const { userId, data }: { userId: number, data: Data; } = req.body;

    const user = await prisma.data.update({
        where: {
            userId: userId,
        },
        data: {
            ...data,
        }
    });

    res.status(200).json(user);
});

app.delete('/data', async (req, res) => {
    const { userId } = req.body;

    const deleted = await prisma.data.delete({
        where: {
            userId: userId,
        }
    });

    res.status(200).json(deleted);
});


//Calculated data 
interface Calculated {
    enmo: number;
    lvpa: number;
    mvpa: number;
    time: DateTime;
}

app.get('/calculated', async (req, res) => {
    const { userId } = req.body;

    const user = await prisma.calculated.findUnique({
        where: {
            userId: userId,
        }
    });

    res.status(200).json(user);
});

app.post('/calculated', async (req, res) => {
    const { userId, calculated }: { userId: number, calculated: Calculated; } = req.body;

    const user = await prisma.calculated.create({
        data: {
            ...calculated,
            userId: userId,
        }
    });

    res.status(200).json(user);
});

app.put('/calculated', async (req, res) => {
    const { userId, calculated }: { userId: number, calculated: Calculated; } = req.body;

    const user = await prisma.calculated.update({
        where: {
            userId: userId,
        },
        data: {
            ...calculated,
        }
    });

    res.status(200).json(user);
});

app.delete('/calculated', async (req, res) => {
    const { userId } = req.body;

    const deleted = await prisma.calculated.delete({
        where: {
            userId: userId,
        }
    });

    res.status(200).json(deleted);
});


app.listen(8000, () => {
    console.log("Server stared on port 8000");
});
