const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/shopfo').then(() => {
    console.log('Mongodb connected...');
});

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: "Too many request from this IP, Please try again in an hour "
});

app.use(bodyParser.json());
app.use('/posts', limiter);

const PostRoute = require('./Routes/Post.route');
app.use('/posts', PostRoute);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
