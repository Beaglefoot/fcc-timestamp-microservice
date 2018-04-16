#!/usr/bin/env node

const express = require('express');
const querystring = require('querystring');
const parse = require('date-fns/parse');
const format = require('date-fns/format');
const validateUrl = require('./helpers/validateUrl');
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

  res.set({
    'Access-Control-Allow-Origin': '*',
  });

  const fallbackResponse = {unix: null, natural: null};
  const pathSegments = req.url.split('/');

  console.log('validateUrl:', validateUrl(pathSegments));

  if (!validateUrl(pathSegments)) res.send(fallbackResponse);
  else {
    const string = querystring.unescape(pathSegments[1]);
    console.log('string:', string);

    let timestamp = parseInt(string);

    if (timestamp) {
      const naturalLanguageDate = format(
        new Date(timestamp * 1000),
        'MMMM D, YYYY',
      );
      console.log('naturalLanguageDate:', naturalLanguageDate);

      res.send({unix: timestamp, natural: naturalLanguageDate});
    } else {
      timestamp = format(parse(string), 'X');
      console.log('formatedDate:', timestamp);

      res.send({unix: timestamp, natural: string});
    }
  }
});

app.listen(PORT, () =>
  console.log(`[${currentTime}] express is running at ${currentIp}:${PORT}`),
);
