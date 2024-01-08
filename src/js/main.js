document.addEventListener('DOMContentLoaded', start);
var planets = [];
var planetsID = [];
function moveObject(planet, mousePos, speedX, speedY) {
    var transformString = `translateX(${(-mousePos.x * speedX)}px) translateY(${(-mousePos.y * speedY)}px)`;
    planet.style.transform = transformString;
}

function start() {
    var centerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    try {
        fetch('src/js/planets.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                planets = data.planets;
                console.log('Content of planets.json:', data); // Log the content to the console
            })
            .catch(error => {
                console.error('Error loading JSON:', error);

            });
    } catch (error) {
        console.error('Error in fetch:', error);
    }




    var sun = document.getElementsByClassName('sun');

    var inertia = 0.1;
    var prevMousePos = { x: 0, y: 0 };
    var mousePos = { x: 0, y: 0 };

    document.addEventListener('mousemove', function (e) {
        var baseSpeed = 0.5;

        var newX = (e.pageX - centerPos.x) * baseSpeed;
        var newY = (e.pageY - centerPos.y) * baseSpeed;

        // Intertia effect
        var deltaX = newX - mousePos.x;
        var deltaY = newY - mousePos.y;
        deltaX *= inertia;
        deltaY *= inertia;
        mousePos.x += deltaX;
        mousePos.y += deltaY;


        planets.forEach(element => {
            planetsID.push(this.getElementById(element.id))
        });


        applyEffect(planets, mousePos, baseSpeed);
        applyEffect(sun, mousePos, baseSpeed);

        // Mettez à jour la position précédente de la souris
        prevMousePos.x = mousePos.x;
        prevMousePos.y = mousePos.y;
    });
}

function applyEffect(elements, mousePos, baseSpeed) {
    Array.from(elements).forEach(element => {
        var speedX = element.speedX || 1;
        var speedY = element.speedY || 1;

        speedX *= baseSpeed;
        speedY *= baseSpeed;

        moveObject(element, mousePos, speedX, speedY);
    });
}

function moveObject(element, mousePos, speedX, speedY) {
    var transformString = `translateX(${(-mousePos.x * speedX)}px) translateY(${(-mousePos.y * speedY)}px)`;
    document.getElementById(element.id).style.transform = transformString;
}

function snapToGrid(element, targetX, targetY, deviationX = 0, deviationY = 0, duration = 4000) {
    var computedStyle = window.getComputedStyle(element);
    var transform = computedStyle.transform || computedStyle.webkitTransform || computedStyle.mozTransform;
    var matrix = transform.match(/^matrix\((.+)\)$/);

    var elementX, elementY;
    if (matrix) {
        var values = matrix[1].split(', ');
        elementX = parseFloat(values[4]);
        elementY = parseFloat(values[5]);
    } else {
        var rect = element.getBoundingClientRect();
        elementX = rect.left;
        elementY = rect.top;
    }

    var startTime;

    function animate(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }

        var elapsedTime = currentTime - startTime;

        if (elapsedTime >= duration) {
            // Si la durée est écoulée, placez l'élément aux coordonnées finales
            element.style.transform = `translateX(${targetX + deviationX}px) translateY(${targetY + deviationY}px)`;
        } else {
            // Sinon, continuez l'animation
            var progress = elapsedTime / duration;
            var newX = elementX + (targetX - elementX + deviationX) * progress;
            var newY = elementY + (targetY - elementY + deviationY) * progress;
            element.style.transform = `translateX(${newX}px) translateY(${newY}px)`;

            // Demandez une nouvelle frame d'animation
            requestAnimationFrame(animate);
        }
    }

    // Lancez l'animation
    requestAnimationFrame(animate);
}

function applySnapToGridToPlanets(planets) {
    planets.forEach(planet => {
        var element = document.getElementById(planet.id);
        if (element) {
            snapToGrid(element, planet.position.x, planet.position.y);
        }
    });
}
