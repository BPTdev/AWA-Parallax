document.addEventListener('DOMContentLoaded', start);

var parallaxEnable = true;

function start() {
    var centerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var planets = document.getElementsByClassName('planet');
    var sun = document.getElementsByClassName('sun');
    var slider = document.getElementsByClassName('slider');

    document.addEventListener('mousemove', function (e) {
        var baseSpeed = 0.5;
        var mousePos = {
            x: (e.pageX - centerPos.x) * baseSpeed,
            y: (e.pageY - centerPos.y) * baseSpeed
        };

        applyEffect(planets, mousePos, baseSpeed);
        applyEffect(sun, mousePos, baseSpeed);
    });

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
            if (entry.intersectionRatio > 0) {
                if (entry.isIntersecting && entry.target.id != 'system') {
                    var item = entry.target.id + 'Img';
                    var planet = document.getElementById(item);

                    gsap.fromTo(planet, { x: 1000 }, { x: 0, duration: 1 });
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