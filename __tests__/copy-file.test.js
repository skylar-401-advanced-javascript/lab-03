'use strict';

const EOL = require('os').EOL;

const copyFile = require('../copy-file');

const fs = require('fs');

let filesToRead = `${__dirname}/../files/2.txt`;
let generateFiletoWrite = () => {
  var random = Math.random().toString().replace('.', '');
  return `${__dirname}/../files/output/${random}.txt`;
};

describe('Copy file module', () => {
  it('calls callback with error for missing readFile', done => {
    let result = copyFile('missingFile', 'fileToWrite', (err) => {
      expect(err).toBeDefined();
      done();
    });
    expect(result).toBeUndefined();
  });
  it('calls callback with data from readFile', done => {
    let fileToWrite = generateFiletoWrite();
    copyFile(filesToRead, fileToWrite, (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toBeDefined();
      expect(data.toString()).toBe(`File 2 Contents${EOL}`);
      done();
    });
  });

  it('creates fileToWrite', done => {
    let fileToWrite = generateFiletoWrite();
    copyFile(filesToRead, fileToWrite, (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toBeDefined();

      fs.access(fileToWrite, fs.constants.F_OK, (err) => {
        if(err) {
          throw err;
        } else {
          done();
        }
      });
    });
  });

  it('fails on fileToWrite into missing directory', done => {
    let badFileToWrite = `${__dirname}/this-is-missing/test.txt`;
    copyFile(filesToRead, badFileToWrite, (err, data) => {
      expect(data).toBeUndefined();
      expect(err).toBeTruthy();
      done();
    });
  });
});