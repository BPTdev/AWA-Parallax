document.addEventListener('DOMContentLoaded', start);

var parallaxEnable = true;

function start() {
    var slider = document.getElementsByClassName('slider');

    slider[0].addEventListener('scroll', function (e) {
        if (slider[0].scrollTop == 0) {
            parallaxEnable = true;
        } else {
            parallaxEnable = false;
        }
    });

    var sections = slider[0].children;
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.target.id != 'system') {
                var item = entry.target.id + 'Img';
                var planet = document.getElementById(item);
                console.log(item);
                if (entry.isIntersecting) {
                    slider[0].classList.add('disable-scroll-snap');
                    planet.style.visibility = 'visible';

                    gsap.fromTo(planet, { x: 1000, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
                        .then(() => {
                            slider[0].classList.remove('disable-scroll-snap');
                        });
                } else {
                    planet.style.visibility = 'hidden';
                }
            }
        });
    }, { threshold: 0.5 });

    for (var i = 0; i < sections.length; i++) {
        observer.observe(sections[i]);
    }
}

function applyEffect(planets, mousePos, baseSpeed) {
    if (parallaxEnable) {
        Array.from(planets).forEach(planet => {
            var speedX = parseFloat(planet.dataset.speedx) || 1;
            var speedY = parseFloat(planet.dataset.speedy) || 1;

            speedX *= baseSpeed;
            speedY *= baseSpeed;

            moveObject(planet, mousePos, speedX, speedY);
        });
    }
}

function moveObject(planet, mousePos, speedX, speedY) {
    var transformString = `translateX(${(-mousePos.x * speedX)}px) translateY(${(-mousePos.y * speedY)}px)`;
    planet.style.transform = transformString;
}