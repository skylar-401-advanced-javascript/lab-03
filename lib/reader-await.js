'use strict';

const fs = require('fs');
const util = require('util');

const fsReadFile = util.promisify(fs.readFile);
/**
 * Our module exports a single function that expects an array of files
 * @type {function(*=)}
 */
module.exports = async function(files) {
  return readAll([...files]);
};

/**
 * This wraps the fs module, primarily so that we can more easily write tests around it.
 * @param file
 * @param callback
 */
const readOne = (file) => {
  return fsReadFile(file);
};

/**
 * Reads and returns the contents of 3 files
 * Requires 3 paths, otherwise, it'll fail with aggression
 * @param paths
 */
const readAll = async function(paths) {
  
  let contents = [];
  let data = await readOne(paths[0]);
  contents.push(data.toString().trim());
  data = await readOne(paths[1]);
  contents.push(data.toString().trim());
  data = await readOne(paths[2]);
  contents.push(data.toString().trim());
  return contents;
};
