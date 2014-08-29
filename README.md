# imageview

Preview your uploaded images in the browser before uploading and also get their data uri to submit to a form.

## What it does

This is an alternative to using a file input and uploading via multipart - instead, you can:

1. select the image using the file input
2. resize and scale the image to the new size in a preview on your page
3. grab the data URI for the image and apply it to a textarea

## Usage

    var ImageView = require('imageview');
    var iv = new ImageView({
      picField: 'photo',
      photoSelector: 'photo-picker',
      preview: 'preview',
      previewSize: 100
    });

    iv.preview();

`picField` is where you want the data URI to be applied. `photoSelector` is where your file input is located. `preview` is where you want the canvas element to display the resized image.

`picField`, `photoSelector` and `preview` are the document IDs for each DOM element. They default to the ones above if nothing is provided. `previewSize` is the maximum width and height for the preview image.

## Tests

    npm test
