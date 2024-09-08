
const button = document.getElementById('buttonStar')
const textContainer = document.getElementById('text-container');
const mouse = document.querySelector('.mouse');
const blick = document.querySelector('.blick');
const element = document.getElementById('ThemeTeme');
const element2 = document.getElementById('ThemeTeme2');
const themeSwitch = document.getElementById('switch');
const aboutMeContainer = document.querySelector('.AboutMeContainer');
const containerSkills = document.querySelector('.ContainerSkills');
const pageProjects = document.querySelector('.pageProjects');
const headerSpans = document.querySelectorAll('.__headerLeftContent span');
const body = document.body
let debounceTimer;

document.addEventListener('DOMContentLoaded', () => {
    const canvas1 = document.getElementById('myCanvas');
    const canvas2 = document.getElementById('myCanvas2');
    const themeSwitch = document.getElementById('switch');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeSwitch.checked = true;
        document.body.classList.add('dark-theme');
    } else {
        themeSwitch.checked = false;
        document.body.classList.remove('dark-theme');
    }

    const initialColor = themeSwitch.checked ? '#fff' : '#000';

    let animation1, animation2;
    let debounceTimer;

    if (canvas1) {
        animation1 = textAnimate('About', canvas1, initialColor);
    }
    if (canvas2) {
        animation2 = textAnimate('ProJect', canvas2, initialColor);
    }

    const handleThemeChange = () => {
        const isDark = themeSwitch.checked;
        document.body.classList.toggle('dark-theme', isDark);

        const newColor = isDark ? '#fff' : '#000';

        if (animation1) animation1.stop();
        if (animation2) animation2.stop();

        if (canvas1) {
            animation1 = textAnimate('About', canvas1, newColor);
        }
        if (canvas2) {
            animation2 = textAnimate('ProJect', canvas2, newColor);
        }

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    themeSwitch.addEventListener('change', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(handleThemeChange, 100);
    });
});
const addSort = [
    {
        text: 'JavaScript',
        width: '62%',
        content: 'Знаю основы JavaScript. Обьекты , циклы , массивы , методы: строк,массивов,обьектов. Классы. Функции. Взаимодействие с DOM. Запросы на сервер , асинхронный код, промисы. Все остальное , знаю где искать.'
    }, {
        text: 'TypeScript',
        width: '56%',
        content: 'Умею пользоваться на базовом уровне, понимаю для чего он нужен'

    }, {
        text: 'Git',
        width: '90%',
        content: `Умею пользоваться на базовом уровне`
    }, {
        text: 'Jest',
        width: '13%',
        content: 'Знаю поверностно'
    }, {
        text: 'scss',
        width: '2%',
        content: 'Работал с препоцессорами , у себя в проектах не использовал'
    }, {
        text: 'Html',
        width: '73%',
        content: 'Знаю всю базовую верстку , изучаю продвинутый уровень'
    }, {
        text: 'css',
        width: '80%',
        content: 'Верстаю как flex-ом , так и Grid-ом. Умею делать адаптив(медиазапросы). Есть желание развиваться в продвинутых Анимациях'
    }, {
        text: 'React',
        width: '71%',
        content: 'Состояние , хуки , управление состоянием(Redax-Toolkit), навигация(React-router-doom), UI-библиотеки. Умение делать многофункциональные компоненты, стили ведения чистоты кода.'
    },
]


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target === aboutMeContainer) {
                removeHighlight();
                highlightSpan('about');
            } else if (entry.target === containerSkills) {
                removeHighlight();
                highlightSpan('skills');
            } else if (entry.target === pageProjects) {
                removeHighlight();
                highlightSpan('project');
            }
        }
    });
}, {
    threshold: 0.5
});

observer.observe(aboutMeContainer);
observer.observe(containerSkills);
observer.observe(pageProjects);

document.addEventListener('DOMContentLoaded', createObserver);


const modals1 = new Modal('asd')

const sortedAddSort = addSort.sort((a, b) => parseFloat(b.width) - parseFloat(a.width));
const aaa = sortedAddSort.map((item) => {
    const slims = new SkillsItem(item, modals1);
    document.querySelector('.containerSKillsClass').append(slims.renderCont());
});



function textAnimate(text, canvas, color) {
    const c = canvas;
    const ctx = c.getContext("2d");
    let mask;
    let animationFrameId;

    const pointCount = 400;
    const fontStr = "bold 128pt Helvetica Neue, Helvetica, Arial, sans-serif";
    const minDistance = 25;
    const maxConnections = 8;
    const maxConnectionDistance = 5;

    ctx.font = fontStr;
    ctx.textAlign = "center";
    c.width = ctx.measureText(text).width;
    c.height = 128;

    const whitePixels = [];
    const points = [];

    class Point {
        constructor(x, y) {
            this.originalX = x;
            this.originalY = y;
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.1; // Изменение скорости анимации
            this.vy = (Math.random() - 0.5) * 0.1; // Изменение скорости анимации
            this.connections = [];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x >= c.width || this.y < 0 || this.y >= c.height || mask.data[coordsToI(this.x, this.y, mask.width)] !== 255) {
                this.vx *= -1;
                this.vy *= -1;
            }

            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            this.updateConnections();
        }

        updateConnections() {
            for (let i = this.connections.length - 1; i >= 0; i--) {
                const connection = this.connections[i];
                const dx = this.x - connection.x;
                const dy = this.y - connection.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > maxConnectionDistance) {
                    this.connections.splice(i, 1);
                    connection.connections.splice(connection.connections.indexOf(this), 1);
                }
            }

            for (const other of points) {
                if (this === other || this.connections.includes(other)) continue;

                const dx = this.x - other.x;
                const dy = this.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < minDistance && this.connections.length < maxConnections && other.connections.length < maxConnections) {
                    this.connections.push(other);
                    other.connections.push(this);

                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function loop() {
        ctx.clearRect(0, 0, c.width, c.height);

        for (const point of points) {
            point.update();
        }

        animationFrameId = requestAnimationFrame(loop);
    }

    function init() {
        ctx.clearRect(0, 0, c.width, c.height); // Очистка Canvas
        ctx.font = fontStr;
        ctx.textAlign = "left";
        ctx.fillStyle = "#fff";
        ctx.fillText(text, 0, c.height / 2 + (c.height / 2));

        mask = ctx.getImageData(0, 0, c.width, c.height);

        ctx.clearRect(0, 0, c.width, c.height);

        whitePixels.length = 0;

        for (let i = 0; i < mask.data.length; i += 4) {
            if (mask.data[i] === 255 && mask.data[i + 1] === 255 && mask.data[i + 2] === 255 && mask.data[i + 3] === 255) {
                whitePixels.push([iToX(i, mask.width), iToY(i, mask.width)]);
            }
        }

        points.length = 0;

        for (let k = 0; k < pointCount; k++) {
            addPoint();
        }
    }

    function addPoint() {
        const spawn = whitePixels[Math.floor(Math.random() * whitePixels.length)];
        const p = new Point(spawn[0], spawn[1]);
        points.push(p);
    }

    const iToX = (i, w) => ((i % (4 * w)) / 4);
    const iToY = (i, w) => (Math.floor(i / (4 * w)));
    const coordsToI = (x, y, w) => ((Math.floor(y) * w + Math.floor(x)) * 4);

    init();
    loop();

    return {
        stop: () => {
            cancelAnimationFrame(animationFrameId); // Остановка анимации
            ctx.clearRect(0, 0, c.width, c.height); // Очистка холста
            points.length = 0; // Очистка массива точек
            whitePixels.length = 0; // Очистка массива пикселей
        }
    };
}
function handleClick() {
    let index = 0;
    const text = "Привет! Меня зовут Артем Ильичев. Я Fronted-разработчик. Активно изучаю новые технологии, обучаюсь на 3 курсе Университета и люблю всё, что связано с программированием. Я склонен решать задачи самостоятельно. Обучаюсь программированию на JS 4 месяца и не вижу смысла останавливаться!";

    function showText() {
        if (index <= text.length) {
            textContainer.textContent = text.substring(0, index);
            index++;
        } else {
            clearInterval(typingInterval);
        }

    }
    let typingInterval = setInterval(showText, 50);
}
function createObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleClick();
                observer.unobserve(entry.target);
            }
        });
    }, options);
    observer.observe(document.querySelector('.__about'));
}
function highlightSpan(spanText) {
    headerSpans.forEach(span => {
        if (span.textContent.toLowerCase() === spanText.toLowerCase()) {
            span.classList.add('highlighted');
        }
    });
}
function removeHighlight() {
    headerSpans.forEach(span => {
        span.classList.remove('highlighted');
    });
}
const project = [{
    nameProject: 'Dota 2 : A Reference Guide',
    tehnology: 'React + Js',
    description: 'Проект был реализован на Vite + React + Js. Сам проект пресдтавляет собой мини-библиотеку о игре(Dota 2).',
    data: 'August 29, 2023',
    linkSite: 'https://main--dota2-guide.netlify.app',
    linkCode: 'https://github.com/Artyomka2002/Dota-2-A-Reference-Guide'
},]

project.map((item) => {
    const are = new Article(item.nameProject, item.tehnology, item.description, '', item.data)
    document.querySelector('.containerActicle').append(are.render())
})

console.log(
    document.querySelector('.containerActicle')
)










