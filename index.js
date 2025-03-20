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

let selectedUmbrella = ''; // Store selected umbrella image
let uploadedLogoSrc = '';  // Store uploaded logo path

// Handle color selection
document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', function () {
        const color = this.id; // Get the button ID (pink, blue, yellow)
        if (colorOptions[color]) {
            mainBackground.style.backgroundColor = colorOptions[color].bg;
            selectedUmbrella = colorOptions[color].img;
            uploadBtn.style.backgroundColor = colorOptions[color].btnColor;
            
            // Hide uploaded logo before changing the umbrella
            uploadedLogo.classList.add('hidden');
            umbrellaImg.src = selectedUmbrella; // Update umbrella image
            if (uploadedLogoSrc) {
                umbrellaImg.src = "icons/loader_icon.svg";
                umbrellaImg.classList.remove('loaded');
                umbrellaImg.classList.add('loading');
            }
            
            // Wait for the new umbrella image to load, then show logo again
            setTimeout(() => {
                if (uploadedLogoSrc) {  // If a logo was uploaded, re-show it
                    umbrellaImg.src = selectedUmbrella; // Update umbrella image
                    umbrellaImg.classList.remove('loading');
                    umbrellaImg.classList.add('loaded');
                    uploadedLogo.src = uploadedLogoSrc;
                    uploadedLogo.classList.remove('hidden');
                }
            }, 1000); // Small delay for smooth transition
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

        // Start rotating loader and reset logo
        umbrellaImg.src = "icons/loader_icon.svg";
        umbrellaImg.classList.remove('loaded');
        umbrellaImg.classList.add('loading');
        uploadedLogo.classList.add('hidden');

        reader.onload = function (e) {
            setTimeout(() => {
                // Stop rotating, enlarge umbrella
                umbrellaImg.classList.remove('loading');
                umbrellaImg.classList.add('loaded');
                umbrellaImg.src = selectedUmbrella;

                // Store uploaded image source
                uploadedLogoSrc = e.target.result;
                
                // Show uploaded logo inside umbrella
                uploadedLogo.src = uploadedLogoSrc;
                uploadedLogo.classList.remove('hidden');
            }, 1000); // 1-second delay for effect
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an umbrella color first!');
    }
});
