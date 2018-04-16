#!/usr/bin/env node

const express = require('express');
const querystring = require('querystring');
const parse = require('date-fns/parse');
const format = require('date-fns/format');
const isValid = require('date-fns/is_valid');
const validatePathSegments = require('./helpers/validatePathSegments');
const getCurrentIp = require('./helpers/getCurrentIp');
const getCurrentTime = require('./helpers/getCurrentTime');

const PORT = process.argv[2] || 3000;
const currentIp = getCurrentIp();
const currentTime = getCurrentTime();

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
  });

  const fallbackResponse = {unix: null, natural: null};
  const pathSegments = req.path.split('/');

  if (!validatePathSegments(pathSegments)) {
    res.send(fallbackResponse);
    return;
  }

  const string = querystring.unescape(pathSegments[1]);
  const timestamp = parseInt(string);

  if (timestamp) {
    const naturalLanguageDate = format(
      new Date(timestamp * 1000),
      'MMMM D, YYYY',
    );

    res.send({unix: timestamp, natural: naturalLanguageDate});
  } else {
    const date = parse(string);
    res.send(
      isValid(date)
        ? {unix: format(date, 'X'), natural: string}
        : fallbackResponse,
    );
  }
});

app.listen(PORT, () =>
  console.log(`[${currentTime}] express is running at ${currentIp}:${PORT}`),
);
