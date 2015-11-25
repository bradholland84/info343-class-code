// Main script file
$(function() {
    'use strict';

    //initial global variables
    var slider = $("#slider").slideReveal();
    var cameraFilter = $('#camera-filter');
    var cameraData = 'https://data.seattle.gov/resource/65fc-btcc.json';
    var numSDOT = 0;
    var numWSDOT = 0;
    var cams = [];
    var map;
    var markers = [];
    var camMarker = L.Icon.extend({
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    //marker objects to be used
    var redmarker = new camMarker({iconUrl: 'img/cam_red.png'}),
        bluemarker = new camMarker({iconUrl: 'img/cam_blue.png'});


    //initial mpa creation
    function createMap(location, zoom){
        map = L.map('map').setView(location, zoom);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        getCameraData(cameraData, map);
    }

    //fetches camera data from WSDOT
    function getCameraData(url, map) {
        $.getJSON(url, function (result) {
            $.each(result, function(index, item) {
                cams.push(item);
                styleMarkers(item, map);
            });
        })
    }

    //determines whether the camera is from WSDOT or SDOT and styles accordingly
    function styleMarkers(camera, map) {
        var coords = [camera.ypos, camera.xpos];
        if (camera.ownershipcd === 'WSDOT') {
            numWSDOT++;
            markers.push(L.marker(coords, {icon: redmarker}).addTo(map).addEventListener('click', function() {
                populateSidebar(camera);
            }));
        } else {
            numSDOT++;
            markers.push(L.marker(coords, {icon: bluemarker}).addTo(map).addEventListener('click', function() {
                populateSidebar(camera);
            }));
        }
        $('#SDOT').text("SDOT: " + numSDOT);
        $('#WSDOT').text("WSDOT: " + numWSDOT);
    }

    //populates sidebar with correct information based on selected camera
    function populateSidebar(camera) {
        $('#slider').slideReveal("show");
        $('#traffic-pic').attr('src', camera.imageurl.url);
        $('#camera-title').text(camera.cameralabel);
        $('#owner').text("Maintained by the " + camera.ownershipcd);
        $('#SDOT').text("SDOT: " + numSDOT);
        $('#WSDOT').text("WSDOT: " + numWSDOT);
        $('#info').remove();
    }

    //filters cameras from user-specified entry
    function filterCameras(filter) {
        var filteredMarkers = cams.currentFilter(function (item) {
            return item.cameralabel.toLowerCase().indexOf(currentFilter) >=0;
        });
        $.each(markers, function(index, item) {
            map.removeLayer(item);
        });
        $.each(filteredMarkers, function(index, item) {
            styleMarkers(item, map);
        });
    }

    //responds to user typing in currentFilter box
    cameraFilter.on('keyup', function () {
        numSDOT = 0;
        numWSDOT = 0;
        var filter = this.value.toLowerCase();
        filterCameras(currentFilter);
    });

    createMap([47.6097, -122.3331], 12);
    $('#arrow').on('click', function() {
        $('#slider').slideReveal("hide");
    });
});
