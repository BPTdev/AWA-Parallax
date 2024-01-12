document.addEventListener('DOMContentLoaded', start);

var parallaxEnable = true;

function start() {
    var slider = document.getElementsByClassName('slider');
    var sections = slider[0].children;

    slider[0].addEventListener('scroll', function (e) {
        if (slider[0].scrollTop == 0) {
            parallaxEnable = true;
        } else {
            parallaxEnable = false;
        }
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.target.id != 'section-system') {
                var img = entry.target.id + 'Img';
                var txt = entry.target.id + 'Text';
                var planet = document.getElementById(img);
                var description = document.getElementById(txt);

                if (entry.isIntersecting) {
                    slider[0].classList.add('disable-scroll-snap');
                    planet.style.visibility = 'visible';
                    description.style.visibility = 'visible';

                    gsap.fromTo(planet, { x: 1000, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75, onComplete: function () { slider[0].classList.remove('disable-scroll-snap'); } });

                    gsap.fromTo(description, { x: -500, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75 })
                } else {
                    planet.style.visibility = 'hidden';
                    description.style.visibility = 'hidden';
                }
            }
        });
    }, { threshold: 0.5 });

    for (var i = 0; i < sections.length; i++) {
        observer.observe(sections[i]);
    }
}