
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;

    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var picker = document.getElementById('line-color-inp');
    var slider = document.getElementById('line-size-inp');
    var snapshot = document.querySelector('img');
    var c = canvas.getContext('2d');
    var videoStream;

    navigator.getUserMedia({video: true}, function(stream) {
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream);
    }, function(err) {
        //user denies or machine doesn't have webcam
        console.error(err);
    });

    video.addEventListener('click', function() {
       if (videoStream) {
           canvas.width = video.clientWidth;
           canvas.height = video.clientHeight;
           c.drawImage(video, 0, 0);
       }
    });

    var mouseIsDown = false;

    var clickPath = function() {
        c.beginPath();
        mouseIsDown = true;
    };

    var releasePath = function() {
        mouseIsDown = false;
    };

    var movePath = function() {
        var pos = getMousePos();
        c.lineTo(pos.x, pos.y);
        c.stroke();
    };

    var getMousePos = function() {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    };

    var changeColor = function() {
        c.strokeStyle = String(picker.value);
    };
    var changeSize = function() {
        c.lineWidth = slider.value;
    };

    canvas.addEventListener('mousedown', clickPath);
    canvas.addEventListener('mouseup', releasePath);
    canvas.addEventListener('mousemove', function() {
        if (mouseIsDown) {
            movePath();
        }
    });
    picker.addEventListener('change', changeColor);
    slider.addEventListener('change', changeSize);

    document.querySelector('#btn-snapshot').addEventListener('click', function() {
        snapshot.src = canvas.toDataURL()
    })
});

