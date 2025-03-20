const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('upload-input');
const umbrellaImg = document.getElementById('umbrella-img');
const uploadedLogo = document.getElementById('uploaded-logo');
const mainBackground = document.getElementsByClassName('main-container')[0];

const colorOptions = {
    pink: { bg: "#f0f0f0", img: "icons/Pinkumbrella.png", btnColor: "pink" },
    blue: { bg: "#d7f3fe", img: "icons/Blueumbrella.png", btnColor: "blue" },
    yellow: { bg: "#faf4c0", img: "icons/Yellowumbrella.png", btnColor: "#fff741" }
};

let selectedUmbrella = ''; // Stores currently selected umbrella image
let uploadedLogoSrc = '';  // Stores uploaded logo path (if any)

// Handle color selection
document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', function () {
        const color = this.id; // Get the button ID (pink, blue, yellow)
        if (colorOptions[color]) {
            mainBackground.style.backgroundColor = colorOptions[color].bg;
            uploadBtn.style.backgroundColor = colorOptions[color].btnColor;

            // Hide both the uploaded logo and umbrella before switching
            uploadedLogo.classList.add('hidden');
            umbrellaImg.src = "icons/loader_icon.svg"; // Show loading icon

            // Wait for transition effect, then show new umbrella and restore uploaded logo
            setTimeout(() => {
                selectedUmbrella = colorOptions[color].img; // Update umbrella
                umbrellaImg.src = selectedUmbrella;
                // If user already uploaded a logo, reapply it
                if (uploadedLogoSrc) {
                    uploadedLogo.src = uploadedLogoSrc;
                    // umbrellaImg.classList.add("loaded")
                    uploadedLogo.classList.remove('hidden');
                }
            }, 1000); // 1-second loading effect
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
    if (file && selectedUmbrella) {
        const reader = new FileReader();

        // Show loading icon before processing the upload
        umbrellaImg.src = "icons/loader_icon.svg";
        uploadedLogo.classList.add('hidden');

        reader.onload = function (e) {
            setTimeout(() => {
                // Update umbrella image and stop loading
                umbrellaImg.src = selectedUmbrella;

                // Store uploaded image source
                uploadedLogoSrc = e.target.result;

                // Show uploaded logo
                uploadedLogo.src = uploadedLogoSrc;
                uploadedLogo.classList.remove('hidden');
            }, 1000); // 1-second delay for effect
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an umbrella color first!');
    }
});
