document.addEventListener('DOMContentLoaded', start);

function start() {
    var centerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var planets = document.getElementsByClassName('planet');
    var sun = document.getElementsByClassName('sun');
    document.addEventListener('mousemove', function (e) {
        var baseSpeed = 0.5;
        var mousePos = {
            x: (e.pageX - centerPos.x) * baseSpeed,
            y: (e.pageY - centerPos.y) * baseSpeed
        };

        applyEffect(planets, mousePos, baseSpeed);
        applyEffect(sun, mousePos, baseSpeed);
    });
}

function applyEffect(planets, mousePos, baseSpeed) {
    Array.from(planets).forEach(planet => {

        var speedX = parseFloat(planet.dataset.speedx) || 1;
        var speedY = parseFloat(planet.dataset.speedy) || 1;
        
        
        speedX *= baseSpeed;
        speedY *= baseSpeed;
        

        moveObject(planet, mousePos, speedX, speedY);
    });
}

function moveObject(planet, mousePos, speedX, speedY) {
    var transformString = `translateX(${(-mousePos.x * speedX)}px) translateY(${(-mousePos.y * speedY)}px)`;
    planet.style.transform = transformString;
}
