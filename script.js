const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const message = document.getElementById("para");

// Array of 5 unique images + 1 duplicate
let images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300.jpg"
];

// Randomly select one image to duplicate
let duplicateIndex = Math.floor(Math.random() * images.length);
images.push(images[duplicateIndex]);

// Shuffle images randomly
images = images.sort(() => Math.random() - 0.5);

let selectedImages = []; // Store clicked images

// Display images dynamically with unique classes
images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("img" + (index + 1));  // Assign class img1, img2, etc.
    img.dataset.index = index;

    img.addEventListener("click", () => selectImage(img));

    imageContainer.appendChild(img);
});

// Handle image selection
function selectImage(img) {
    if (selectedImages.length < 2) {
        if (!selectedImages.includes(img)) {
            img.classList.add("selected");
            selectedImages.push(img);
        }
    }

    if (selectedImages.length === 2) {
        verifyButton.style.display = "block"; // Show Verify button
    }

    resetButton.style.display = "block"; // Show Reset button
}

// Reset selection
resetButton.addEventListener("click", () => {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    verifyButton.style.display = "none";
    resetButton.style.display = "none";
    message.innerText = "";
});

// Verify selection
verifyButton.addEventListener("click", () => {
    if (selectedImages.length === 2) {
        if (selectedImages[0].src === selectedImages[1].src) {
            message.innerText = "You are a human. Congratulations!";
            message.style.color = "green";
        } else {
            message.innerText = "We can't verify you as a human. You selected non-identical tiles.";
            message.style.color = "red";
        }
    }
    verifyButton.style.display = "none"; // Hide Verify button after checking
});
