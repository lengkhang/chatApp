import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {Server} from 'uws';
import uuid from 'uuid/v4';

const PORT = 3000;
const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));
app.set('root', __dirname);

app.wss = new Server({
    server: app.server
});

const clients = [];

app.wss.on('connection', (connection) => {
    console.log('==> A new connection');

    const userId = uuid();
    const user = {
        userId,
        connection
    };
    clients.push(user);
    console.log('==> userId:', userId);

    connection.on('message', message => {
        console.log('==> Server received a message:', message);

        connection.send('Hi client, nice to meet u');
    });

    connection.on('close', () => {
        console.log('==> A client left:', userId);

        const userIndex = clients.findIndex(client => client.userId);
        clients.splice(userIndex, 1);
    })
});

app.get('/', (req, res) => {
    res.json({
        success: true
    });
});

app.get('/api/all-connections', (req, res) => {
    res.json({
        clients
    });
})

app.server.listen(process.env.PORT || PORT, () => {
        console.log(`App is running on port ${app.server.address().port}`);
});

export default app;