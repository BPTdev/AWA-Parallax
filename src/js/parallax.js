document.addEventListener('DOMContentLoaded', start);

var planets = [];
var parallaxEnable = true;

function start() {
    fetch('src/js/planets.json', { cache: 'no-cache' })
        .then(response => {
            if (!response.ok) {
                console.error('Network response was not ok')
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            planets = data.things;
            console.log('Content of planets.json:', data);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });

    setupMouseMove();
}


function setupMouseMove() {
    var centerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var inertia = 0.1;
    var mousePos = { x: 0, y: 0 };

    document.addEventListener('mousemove', function (e) {
        if (!parallaxEnable) return;

        var baseSpeed = 0.5;
        var deltaX = (e.pageX - centerPos.x) * baseSpeed - mousePos.x;
        var deltaY = (e.pageY - centerPos.y) * baseSpeed - mousePos.y;

        mousePos.x += deltaX * inertia;
        mousePos.y += deltaY * inertia;

        applyEffects(planets, mousePos, baseSpeed);
    });
}

function applyEffects(elements, mousePos, baseSpeed) {
    elements.forEach(element => {
        var speedX = element.speedx || 1;
        var speedY = element.speedy || 1;

        speedX *= baseSpeed;
        speedY *= baseSpeed;

        moveObjects(element, mousePos, speedX, speedY);
    });
}

function moveObjects(element, mousePos, speedX, speedY) {
    var transformString = `translateX(${(-mousePos.x * speedX)}px) translateY(${(-mousePos.y * speedY)}px)`;
    document.getElementById(element.id).style.transform = transformString;
}

function snapToGrid(element, targetX, targetY, scaleTarget, duration = 4000) {
    var elementRect = element.getBoundingClientRect();
    var elementX = elementRect.left + window.scrollX;
    var elementY = elementRect.top + window.scrollY;

    var adjustedTargetX = (targetX - element.offsetWidth * (1 - scaleTarget) / 2) / scaleTarget;
    var adjustedTargetY = (targetY - element.offsetHeight * (1 - scaleTarget) / 2) / scaleTarget;

    var startTime;
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        var elapsedTime = currentTime - startTime;

        if (elapsedTime >= duration) {
            element.style.transform = `translate(${adjustedTargetX}px, ${adjustedTargetY}px) scale(${scaleTarget})`;
        } else {
            var progress = elapsedTime / duration;
            var newX = elementX + (adjustedTargetX - elementX) * progress;
            var newY = elementY + (adjustedTargetY - elementY) * progress;
            var newScale = 1 + (scaleTarget - 1) * progress;
            element.style.transform = `translate(${newX}px, ${newY}px) scale(${newScale})`;
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function makeThemFlat() {
    planets.forEach(thing => {
        var element = document.getElementById(thing.id);
        snapToGrid(element, thing.position.x, thing.position.y, 0.1); // Example scale target
    });
}
