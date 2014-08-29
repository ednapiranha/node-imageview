'use strict';

var ImageView = function (options) {
  if (!options) {
    options = {};
  }

  this.preview = options.preview || document.getElementById('preview');

  var canvas = document.createElement('canvas');
  var picField = document.getElementById(options.picField) ||
    document.getElementById('photo');
  var photoSelector = document.getElementById(options.photoSelector) ||
    document.getElementById('photo-picker');
  var quality = parseFloat(options.quality) || 0.4;
  var previewSize = parseInt(options.previewSize, 10) || 100;

  this.generate = function (ev) {

    if (!ev.target || (ev.target && !ev.target.files)) {
      throw new Error('This needs to be input[type="file"]');
    }

    var picture = ev.target.files[0];
    var img = new Image();
    var reader = new FileReader();

    preview.innerHTML = '';
    img.width = previewSize;
    preview.appendChild(img);

    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
        picField.value = aImg.src;
      };
    })(img);

    reader.readAsDataURL(picture);
  };

  this.preview = function () {
    if (photoSelector) {
      photoSelector.addEventListener('change', this.generate, false);
    }
  };
};

if (typeof define === 'function' && define.amd) {
  define(function () {
    return ImageView;
  });
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageView;
}
