import express from 'express';
import { app as appConfig } from 'src/config.js';
import middlewares from './middlewares';
import router from './router';

const { prefix, port } = appConfig;
const app = express();

app.use(middlewares.json);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
app.use(middlewares.arrays);
app.use(prefix, router);

app.listen(port, () => {
    console.log(`APP STARTING AT ${port}`);
});

export default app;
