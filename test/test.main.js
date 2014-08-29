'use strict';

var should = require('chai').should();

var ImageView = require('../main');
var iv;

window.URL = {
  createObjectURL: function (p) {
    return p;
  }
};

describe('imageview', function () {
  it('should fail with invalid input[type="file"]', function () {
    iv = new ImageView();

    expect(function () {
      iv.generate({});
    }).to.throw('This needs to be input[type="file"]');
  });

  it('should display an image preview and return the data uri', function () {
    iv = new ImageView({
      previewSize: 200
    });

    iv.generate({
      target: {
        files: ['test.png']
      }
    });

    iv.preview();

    document.getElementById('preview').innerHTML.toString().should.equal('<img width=\"200\">');
  });
});
