document.addEventListener('DOMContentLoaded', function() {
    var bannerImage = document.querySelector('header .banner-image');

    window.addEventListener('scroll', function() {
        var brightness = 100 - (window.scrollY / 5);
        var blur = window.scrollY / 100;
        var filter = 'brightness(' + brightness + '%) blur(' + blur + 'px)';
        bannerImage.style.webkitFilter = filter;
        bannerImage.style.filter = filter;
    });
});