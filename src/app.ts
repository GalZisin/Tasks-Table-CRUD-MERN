import express from 'express';
import path from 'path';
import cors from 'cors';
import tasks from './routes/taskRoute';
import auth from './routes/auth';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errors';

const app = express();

var corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', tasks);
app.use('/api/v1', auth)

//Middleware to handle errors
app.use(errorMiddleware);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('/*', (req, res) => {
        console.log('path.resolve == ' + path.resolve(__dirname, 'client', 'build', 'index.html'));

        let ret = path
            .resolve(__dirname, 'client', 'build', 'index.html')
            .replace('/dist-server', '')
            .replace('\\dist-server', '');
        res.sendFile(ret);

        console.log('path.resolve ret== ' + ret);
    });
}

export default app;