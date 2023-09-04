const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Quản Lý Điểm Cao Nhất Từ Bộ Nhớ

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Điểm Cao Nhất: ${highScore}` ;

// Sinh Ra Vật Phẩm Với Một Vị Trí Ngẫu Nhiên

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("GAME OVER...");
    location.reload();
}

// Điều Khiển Bằng Lên Xuống Trái Phải

const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Thay Đổi Hướng Đi

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Khi Ăn Được Vật Phẩm
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Tăng Chiều Dài Sau Mỗi Lần Ăn Được Vật Phẩm
        score++;
        highScore = score >= highScore ? score : highScore; 

        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Điểm: ${score}`;
        highScoreElement.innerText = `Điểm Cao Nhất: ${highScore}`;
    }

    // Nếu Đụng Tường Kết Thúc Game

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    // Cập nhật đầu rắn
    snakeX += velocityX;
    snakeY += velocityY;

    // Di Chuyển Các Phần Của Con Rắn Theo Vị Trí Mà Đầu Đã Đi Qua

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];


    // Thêm div Cho Cơ Thể Con Rắn

    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Kiểm Tra Xem Con Rắn Có Đâm Vào Thân Hay Không
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);

var video = document.getElementById('video');
video.addEventListener('ended', function() {
  video.currentTime = 1;
  video.play();
});
