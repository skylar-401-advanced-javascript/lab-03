'use strict';

const editFile = require('../edit-file');

const fs = require('fs');

let filesToRead = `${__dirname}/../files/2.txt`;
let fileToWrite = `${__dirname}/../files/2.txt`;

describe('Copy file module', () => {
  it('calls callback with error for missing readFile', done => {
    let result = editFile('missingFile', 'fileToWrite', (err) => {
      expect(err).toBeDefined();
      done();
    });
    expect(result).toBeUndefined();
  });
  it('calls callback with data from readFile', done => {
    editFile(filesToRead, fileToWrite, (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toBeDefined();
      expect(data.toString()).toMatch(/^[0-9]+$/);
      done();
    });
  });

  it('creates fileToWrite', done => {
    editFile(filesToRead, fileToWrite, (err, data) => {
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
    editFile(filesToRead, badFileToWrite, (err, data) => {
      expect(data).toBeUndefined();
      expect(err).toBeTruthy();
      done();
    });
  });
});