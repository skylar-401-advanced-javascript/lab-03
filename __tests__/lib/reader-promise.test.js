'use strict';

jest.mock('fs');

const reader = require('../../lib/reader-promise');

describe('File reader module with promises', () => {

  it('when given other than three files, returns an error', () => {
    let files = ['bad.txt'];
    return expect(reader(files))
      .rejects.toBeDefined();
  });

  it('when given a bad file, returns an error', () => {
    let files = ['bad.txt', 'good.txt', 'good.txt'];
    return expect(reader(files))
      .rejects.toBeDefined();
  });


  it('reads 3 files', () => {
    let files = ['file1.txt', 'file2.txt', 'file3.txt'];
    return reader(files)
      .then(data => {
        expect(data instanceof Array ).toBeTruthy();
        //expect(data.length ).toBe(3);
        expect(data).toEqual([
          'file1.txt contents',
          'file2.txt contents',
          'file3.txt contents',
        ]);
      });
  });
});
