'use strict';

jest.mock('fs');

const reader = require('../../lib/reader');

describe('File Reader Module', () => {

  it('when given other than three files, returns an error', done => {
    let files = ['bad.txt'];
    // In jest, throwing errors obviously kills the app, so if you're
    // going to throw one in a test, have the expect execute your code as a
    // function so that you can trap it.
    reader(files, (err) => {
      expect(err).toBeDefined();
      done();
    });
  });

  it('when given a bad file, returns an error', done => {
    let files = ['bad.txt', 'good.txt', 'good.txt'];
    // In jest, throwing errors obviously kills the app, so if you're
    // going to throw one in a test, have the expect execute your code as a
    // function so that you can trap it.
    reader(files, (err) => {
      expect(err).toBeDefined();
      done();
    });
  });


  it('reads 3 files', done => {
    let files = ['file1.txt', 'file2.txt', 'file3.txt'];
    reader(files, (err,data) => {
      expect(err).toBeNull();
      expect(data instanceof Array ).toBeTruthy();
      expect(data.length ).toBe(3);
      expect(data).toEqual([
        'file1.txt contents',
        'file2.txt contents',
        'file3.txt contents',
      ]);
      done();
    });
  });

});
