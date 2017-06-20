// The MIT License (MIT)
//
// Copyright (c) 2016 Zhipeng Jia
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

'use strict'

function arrayBufferEquals (buffer1, buffer2) {
  if (buffer1.byteLength !== buffer2.byteLength) {
    return false
  }
  var view1 = new Uint8Array(buffer1)
  var view2 = new Uint8Array(buffer1)
  var i
  for (i = 0; i < view1.length; i++) {
    if (view1[i] !== view2[i]) {
      return false
    }
  }
  return true
}

var fileInput = document.getElementById('input')
var output = document.getElementById('output')

fileInput.addEventListener('change', function (e) {
  var file = fileInput.files[0]
  var reader = new FileReader()
  reader.onload = function (e) {
    var contentBuffer = reader.result
    var compressed = SnappyJS.compress(contentBuffer)
    var uncompressed = SnappyJS.uncompress(compressed)
    if (arrayBufferEquals(uncompressed, contentBuffer)) {
      output.innerHTML = 'Original byte size: ' + contentBuffer.byteLength + '<br>' +
                         'Compressed byte size: ' + compressed.byteLength
    } else {
      window.alert('Test failed!')
    }
  }
  reader.readAsArrayBuffer(file)
})
