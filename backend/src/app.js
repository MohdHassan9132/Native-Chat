import express from "express";
import {userRouter} from './router/user.router.js'

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    });
});

app.use('/api/users',userRouter)

export default app;