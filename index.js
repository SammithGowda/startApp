const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('upload-input');
const umbrellaImg = document.getElementById('umbrella-img');
const uploadedLogo = document.getElementById('uploaded-logo');
const mainBackground = document.getElementsByClassName('main-container')[0];

const colorOptions = {
    pink: { bg: "#f0f0f0", img: "icons/Pinkumbrella.png", btnColor: "#FFC0CB" },
    blue: { bg: "#d7f3fe", img: "icons/Blueumbrella.png", btnColor: "#007bff" },
    yellow: { bg: "#faf4c0", img: "icons/Yellowumbrella.png", btnColor: "#fff741" }
};

let selectedUmbrella = "icons/Blueumbrella.png"; //defalut blue for initial load
let uploadedLogoSrc = '';

// Handle color selection
document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', function () {
        const color = this.id;
        if (colorOptions[color]) {

            mainBackground.style.backgroundColor = colorOptions[color].bg;
            uploadBtn.style.backgroundColor = colorOptions[color].btnColor;
            // Wait for the new umbrella image to load, then show logo again

            if (uploadedLogoSrc) {
                umbrellaImg.src = "icons/loader_icon.svg";
                umbrellaImg.classList.remove('loaded');
                umbrellaImg.classList.add('loading');
                uploadedLogo.classList.add('hidden');
                setTimeout(() => {
                    umbrellaImg.src = colorOptions[color].img;
                    umbrellaImg.classList.remove('loading');
                    umbrellaImg.classList.add('loaded');
                    uploadedLogo.src = uploadedLogoSrc;
                    uploadedLogo.classList.remove('hidden');
                }, 2500); // Small delay for smooth transition
            } else {
                umbrellaImg.src = "icons/loader_icon.svg";
                umbrellaImg.classList.remove('loaded');
                umbrellaImg.classList.add('loading');
                setTimeout(() => {
                    umbrellaImg.classList.remove('loading');
                    umbrellaImg.classList.add('loaded');
                    selectedUmbrella = colorOptions[color].img;
                    // Hide uploaded logo before changing the umbrella
                    uploadedLogo.classList.add('hidden');
                    umbrellaImg.src = selectedUmbrella;
                }, 1000);
            }
        }
    });
});

// Open file input on button click
uploadBtn.addEventListener('click', function () {
    fileInput.click();
});

// Handle file upload
fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    // File size more then 5 MB
    if (file.size > 5 * 1024 * 1024) {
        alert("File size can not be more then 5 mb");
        return;
    }

    if (file) {
        const reader = new FileReader();

        umbrellaImg.src = "icons/loader_icon.svg";
        umbrellaImg.classList.remove('loaded');
        umbrellaImg.classList.add('loading');
        uploadedLogo.classList.add('hidden');

        reader.onload = function (e) {
            setTimeout(() => {
                console.log(selectedUmbrella)
                umbrellaImg.classList.remove('loading');
                umbrellaImg.classList.add('loaded');
                umbrellaImg.src = selectedUmbrella;
                uploadedLogoSrc = e.target.result;
                uploadedLogo.src = uploadedLogoSrc;
                uploadedLogo.classList.remove('hidden');
            }, 1000);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Something went wrong');
    }
});
