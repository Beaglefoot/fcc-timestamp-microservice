#!/usr/bin/env node

const express = require('express');
const querystring = require('querystring');
const getCurrentIp = require('./helpers/getCurrentIp');
const getCurrentTime = require('./helpers/getCurrentTime');

const PORT = process.argv[2] || 3000;
const currentIp = getCurrentIp();
const currentTime = getCurrentTime();

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
  console.log('--- GET ---');
  console.log('query:', req.query);
  console.log('hostname:', req.hostname);
  console.log('url:', querystring.unescape(req.url));
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  res.send('Got GET request');
});

app.listen(PORT, () =>
  console.log(`[${currentTime}] express is running at ${currentIp}:${PORT}`),
);

