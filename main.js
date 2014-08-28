'use strict';

var ImageView = function (options) {
  if (!options) {
    options = {};
  }

  this.preview = options.preview || document.getElementById('preview');

  var canvas = document.createElement('canvas');
  var picField = document.getElementById(options.picField) || document.getElementById('photo');
  var img = new Image();
  var photoSelector = document.getElementById(options.photoSelector) || document.getElementById('photo-picker');
  var quality = parseFloat(options.quality) || 0.4;
  var maxSize = parseInt(options.maxSize, 10) || 100;
  this.hasPic = (photoSelector && photoSelector.files.length >= 1)

  this.generate = function (ev, next) {

    if (!ev.target || (ev.target && !ev.target.files)) {
      throw new Error('This needs to be input[type="file"]');
    }

    var picture = ev.target.files[0];
    renderImage(picture, next)
  };

  var onComplete = function (next) {
    canvas.width = img.width;
    canvas.height = img.height;

    if (canvas.width > maxSize) {
      var scale = maxSize / canvas.width;
      canvas.width *= scale;
      canvas.height *= scale;
    }

    if (canvas.height > maxSize) {
      var scale = maxSize / canvas.height;
      canvas.width *= scale;
      canvas.height *= scale;
    }

    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    picField.value = canvas.toDataURL('image/jpeg', quality);
    preview.appendChild(canvas);

    if (next) {
      next();
    }

  };

  var renderImage = function(picture) {
    preview.innerHTML = '';
    img.onload = img.onerror = onComplete;
    img.src = window.URL.createObjectURL(picture);
  }


  this.preview = function () {
    if (photoSelector) {
      photoSelector.addEventListener('change', this.generate, false);
    }
    if (photoSelector.files.length >= 1) {
      renderImage(photoSelector.files[0]);
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
