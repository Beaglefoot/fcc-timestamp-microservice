# Timestamp Microservice

The first project in API section on [freeCodeCamp](https://www.freecodecamp.org/challenges/timestamp-microservice).

**The user stories are:**

* I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
* If it does, it returns both the Unix timestamp and the natural language form of that date.
* If it does not contain a date or Unix timestamp, it returns null for those properties.

**Examples of usage:**

```
Url                                                      Response
https://fcc-timestamp-bf.glitch.me/1450137600         -> {"unix":1523962353,"natural":"April 17, 2018"}
https://fcc-timestamp-bf.glitch.me/April%2017,%202018 -> {"unix":"1523912400","natural":"April 17, 2018"}
https://fcc-timestamp-bf.glitch.me/wrong              -> {"unix":null,"natural":null}
```
