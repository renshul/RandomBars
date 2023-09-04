const constants = {
    initialX: 0,
    initialY: window.innerHeight / 2,
    rectHeight: 50,
    rectWidth: 100,
    xIncrement: 100,
    yOffset: 50,
    topMargin: 100,
    bottomMargin: 100,
}

const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const svg = document.getElementById('svg')
svg.viewBox = `0 0 ${window.innerWidth} ${window.innerHeight - 50}`

const svgNS = "http://www.w3.org/2000/svg";

let bBox;
setTimeout(() => {
    let x = constants.initialX
    let y = constants.initialY
    setInterval(() => {
        bBox = svg.getBBox()

        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', `${x}`);
        rect.setAttribute('y', `${y}`);
        rect.setAttribute('height', `${constants.rectHeight}`);
        rect.setAttribute('width', `${constants.rectWidth}`);
        rect.setAttribute('fill', '#' + Math.round(0xffffff * Math.random()).toString(16));

        rect.style.display = 'none';

        svg.appendChild(rect);

        rect.style.display = '';

        x += constants.xIncrement
        x = x > window.innerWidth ? 0 : x

        if (Math.random() < 0.5) {
            y -= random(0, constants.yOffset)
        } else {
            y += random(0, constants.yOffset)
        }

        y = y < 0 ? 0 : y
        y = x === 0 ? random(0, window.innerHeight) : y
        y = y >= (window.innerHeight - constants.rectHeight) ? window.innerHeight - constants.bottomMargin : y

        svg.viewBox = `0 0 ${window.innerWidth + x} ${window.innerHeight}`
    }, 100)
})