/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function askPermission() {
        Notification.requestPermission(function(result) {
            if ('granted' === result) {
                showNotification('Thanks!', 'You will now see all my damn notifications.')
            }
        })
    }



    function showNotification(title, body) {
        var note = new Notification(title, {body: body,
            icon: 'img/notification.png'});
        window.setTimeout(note.close.bind(note), 3000);

    }

    var triggerBtn = document.getElementById('trigger');
    triggerBtn.addEventListener('click', function() {
        switch (Notification.permission) {
            case 'granted':
                showNotification('Hello',
                    'triggered at ' + new Date().toLocaleTimeString());
                break;
            case 'denied':
                alert('please enable notifications!');
                break;
            default:
                askPermission();
        }

    });
});
