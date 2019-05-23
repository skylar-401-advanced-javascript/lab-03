'use strict';

const fs = require('fs');

module.exports = function(fileToRead, fileToWrite, callback) {
  fs.readFile(fileToRead, (err, data) => {
    if(err) {
      callback(err);
    } else {
      let randomNumber = Math.ceil(Math.random()*10);
      fs.writeFile(fileToWrite, randomNumber, (err) => {
        if(err) {
          return callback(err);
        }
        callback(null, data.toString());
      });
    }
  });
};