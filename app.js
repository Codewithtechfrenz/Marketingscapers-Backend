// app.js
var createError = require('http-errors');
var express = require('express');
const bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const http = require("http");

require('dotenv').config({ debug: false, silent: true, quiet: true });

// ================== ROUTES ==================




var messageRouter = require('./routes/itemRoutes');
var bookingRouter = require('./routes/itemRoutes');
var reviewRouter = require('./routes/itemRoutes');
var ourclientRouter = require('./routes/itemRoutes');


const PORT = process.env.PORT || 8002;

var app = express();

// ================== VIEW ENGINE ==================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ================== CORS ==================
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "https://marketingscapers.com", "https://admin.marketingscapers.com", "https://www.marketingscapers.com", "https://www.admin.marketingscapers.com"],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// ================== BODY PARSERS ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

const { log: showLog } = console;

// ================== ROUTES ==================


app.use('/message', messageRouter);
app.use('/booking', bookingRouter);
app.use('/review', reviewRouter);
app.use('/ourclient',ourclientRouter);



// ================== HEALTH CHECK ==================
app.get('/', (req, res) => {
  res.json({ status: 1, message: "API running successfully" });
});

// ================== 404 HANDLER ==================
app.use(function (req, res, next) {
  next(createError(404));
});

// ================== ERROR HANDLER ==================
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: 0,
    message: err.message || "Internal server error"
  });
});

// ================== SERVER ==================
let server = http.createServer(app);

server.listen(PORT, () => showLog(`Server running on http://localhost:${PORT}`));

module.exports = app;