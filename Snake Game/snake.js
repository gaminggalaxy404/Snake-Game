// Объявляем связь переменных с index.html
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Создаем константу для хранения картинки фона
const background = new Image();
// Указываем путь где хранится избражение
background.src = "ground.png";

// Создаем константу для хранения картинки еды
const foodImg = new Image();
// Указываем путь где хранится избражение
foodImg.src = "food.png";

// Игровое поле
const box = 32;

// Змейка
let snake =[];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

let d;
// Запрос для обработки ввода действий с клавиатуры
document.addEventListener("keydown",direction);

// Функция с помощью который будем управлять змейкой.
function direction(event){
    let key = event.keyCode;
    if(key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

// Функция проверки столкновений
function collision (head,array){
    for (let i=0; i<array.length;i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Генерация еды в случайном месте нашего поля
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
};

// Пишем функцию для прорисовки игры
function draw () {
    ctx.drawImage(background,0,0);
    ctx.drawImage(foodImg,food.x,food.y);

    // Цикл отрисовки игрового персонажа - змейки
    for (let i=0; i<snake.length; i++){
        ctx.fillStyle = (i==0)?"yellow":"black";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "beige";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    // Переменные для обработки позиций на экране
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Условия при которых наш персонаж будет двигаться в соответствующем направлении
    if (d == "LEFT") snakeX -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "UP") snakeY -= box;
    if (d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    if(snakeX<box ||
    snakeX>17*box ||
    snakeY<3*box ||
    snakeY>17*box ||
    collision(newHead,snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

}

// Запускаем отрисовку функции с промежутком между циклами - 100 миллисекунд
let game = setInterval(draw,170);