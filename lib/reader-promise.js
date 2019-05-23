'use strict';

const fs = require('fs');
const util = require('util');

const fsReadFile = util.promisify(fs.readFile);
/**
 * Our module exports a single function that expects an array of files
 * @type {function(*=)}
 */
module.exports = exports = (files) => {
  return readAll([...files]);
};

/**
 * This wraps the fs module, primarily so that we can more easily write tests around it.
 * @param file
 * @param callback
 */
const readOne = (file) => {
  return fsReadFile(file)
    .then(data => {
      return data;
    });
};

/**
 * Reads and returns the contents of 3 files
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 */
const readAll = (paths) => {
  
  let contents = [];
  return readOne(paths[0])
    .then(data => contents.push(data.toString().trim()))
    .then(() => readOne(paths[1]))
    .then(data => contents.push(data.toString().trim()))
    .then(() => readOne(paths[2]))
    .then(data => contents.push(data.toString().trim()))
    .then(() => contents);
};
