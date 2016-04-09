/**
 * Created by surlavi on 16-4-9.
 */

function el(id) {
    return document.getElementById(id);
} // Get elem by ID

var originCanvas, targetCanvas;
var originContext, targetContext;
var uploadElement;
var faceInfo;
var imageWidth, imageHeight;

function imageInit(uploadId, originCanvasId, targetCanvasId) {

    originCanvas = el(originCanvasId);
    originContext = originCanvas.getContext("2d");

    targetCanvas = el(targetCanvasId);
    targetContext = targetCanvas.getContext("2d");

    function readImage() {
        if ( this.files && this.files[0] ) {
            var FR= new FileReader();
            FR.onload = function(e) {
                var img = new Image();
                img.onload = function() {
                    imageWidth = img.width;
                    imageHeight = img.height;
                    originCanvas.height = imageHeight;
                    originCanvas.width = imageWidth;
                    targetCanvas.height = imageHeight;
                    targetCanvas.width = imageWidth;
                    var ratio = imageWidth / 480;
                    var $tCanvasWrapper = $(targetCanvas).parent();
                    $tCanvasWrapper.css('transform', 'scale(' + 1 / ratio + ')');
                    $tCanvasWrapper.css('transform-origin', '0 0');

                    originContext.drawImage(img, 0, 0);
                    targetContext.drawImage(img, 0, 0);

                    console.log("upload complete");
                    getFaceInfo();
                };
                img.src = e.target.result;
            };
            FR.readAsDataURL( this.files[0] );
        }

        document.getElementById("image-upload").setAttribute("hidden", "true");
        document.getElementById("upload").setAttribute("hidden", "true");
    }

    uploadElement = el(uploadId);
    uploadElement.addEventListener("change", readImage, false);
}

var ImageAgent;

function getFaceInfo() {

    var url = '/FriendMachine/sensetime.php';

    var formData = new FormData();
    formData.append('file', uploadElement.files[0]);

    var xhr = new XMLHttpRequest();
    var faceHeight, faceWidth;
    xhr.open('POST', url, true);
    xhr.onload = function (e) {
        faceInfo = JSON.parse(e.target.responseText).faces[0];

        faceHeight = faceInfo.rect.bottom - faceInfo.rect.top;
        faceWidth = faceInfo.rect.right - faceInfo.rect.left;
        console.log("get face info complete.");
    };
    xhr.send(formData);

    ImageAgent = {
        getOriginImageData: function () {
            return originContext.getImageData(0, 0, imageWidth, imageHeight);
        },
        setTargetImageData: function (imageData) {
            return targetContext.putImageData(imageData, 0, 0);
        },
        getLeftEyeBrowRect: function () {
            var points = faceInfo.landmarks21;
            return {
                down: parseInt(max(max(points[0][1], points[1][1]), points[2][1]) + faceHeight / 30),
                up: parseInt(min(min(points[0][1], points[1][1]), points[2][1] - faceHeight / 15)),
                left: parseInt(points[0][0] - faceWidth / 30),
                right: parseInt(points[2][0] + faceWidth / 25)
            };
        },
        getRightEyeBrowRect: function () {
            var points = faceInfo.landmarks21;
            return {
                down: parseInt(max(max(points[3][1], points[4][1]), points[5][1]) + faceHeight / 30),
                up: parseInt(min(min(points[3][1], points[4][1]), points[5][1] - faceHeight / 15)),
                left: parseInt(points[3][0] - faceWidth / 30),
                right: parseInt(points[5][0] + faceWidth / 25)
            };
        },
        getMouseRect: function () {
            var points = faceInfo.landmarks21;
            return {
                down: parseInt(points[15][1] + faceHeight / 50),
                up: parseInt(points[13][1] - faceHeight / 50),
                left: parseInt(points[19][0] - faceWidth / 30),
                right: parseInt(points[20][0] + faceWidth / 30)
            };
        },
        getLeftEyeRect: function () {
            var points = faceInfo.landmarks21;
            return {
                down: parseInt(max(points[6][1], points[7][1]) + faceHeight / 20),
                up: parseInt(min(points[6][1], points[7][1]) - faceHeight / 15),
                left: parseInt(points[6][0] - faceWidth / 20),
                right: parseInt(points[7][0] + faceWidth / 50),
                center_x: parseInt(points[16][1]),
                center_y: parseInt(points[16][0])
            };
        },
        getRightEyeRect: function () {
            var points = faceInfo.landmarks21;
            return {
                down: parseInt(max(points[8][1], points[9][1]) + faceHeight / 20),
                up: parseInt(min(points[8][1], points[9][1]) - faceHeight / 15),
                left: parseInt(points[8][0] - faceWidth / 20),
                right: parseInt(points[9][0] + faceWidth / 50),
                center_x: parseInt(points[17][1]),
                center_y: parseInt(points[17][0])
            };
        }
    }
}

function max(a, b) {
    return a > b ? a : b;
}

function min(a, b) {
    return a < b ? a : b;
}

