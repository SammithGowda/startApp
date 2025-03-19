const umbrella = document.querySelector('.umbrella img');
const uploadBtn = document.querySelector('.upload-btn');

const colorOptions = {
    gray: { bg: "#f0f0f0", img: "icon/Pinkumbrella.png", btnColor: "pink" },
    blue: { bg: "#d7f3fe", img: "icon/Blueumbrella.png", btnColor: "blue" },
    red: { bg: "#ffe0e0", img: "icon/Yellowumbrella.png", btnColor: "yellow" }
};

document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', function () {
        const color = this.id;
        if (colorOptions[color]) {
            document.body.style.backgroundColor = colorOptions[color].bg;
            umbrella.src = colorOptions[color].img;
            uploadBtn.style.backgroundColor = colorOptions[color].btnColor;
        }
    });
});

