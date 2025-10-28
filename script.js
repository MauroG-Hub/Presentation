// Messages for each image
const messages = [
    "Introduction",
    "Who is Mauro García?",
	"Project Description",
    "Project Milestones",
    "Incorrect Data Transfer - Diagnostic",
    "Implemented Solution",
    "Assembly  Station not homing properly - Diagnostic",
    "Implemented Solution",
    "Cycle Time Reduction - Diagnostic",
    "Implemented Solution",
	"Rework Implementation - Problem Description",
    "Rework Implementation - Data Storage",
    "Rework Implementation - Traceability reboot",
    "Rework Implementation - Vision System Welded Bypass",
    "Rework Implementation - New Laser program selection",
    "Project Final Results",
    "What can I bring to Tesla?",
	"What can I bring to Tesla?",
    "Mauro's goals",
    "Conclusion"
    // Add messages for more images as needed
];

const totalImages = 20; // Total number of images
const carouselInner = document.querySelector('.carousel-inner');
const indicators = document.querySelector('.carousel-indicators');
const carouselTitle = document.querySelector('.carousel-title'); 
const toggleMenuBtn = document.getElementById('toggleMenuBtn');
const menu = document.getElementById('menu');
const mainContent = document.getElementById('mainContent');

// Dynamically add images and indicators
for (let i = 1; i <= totalImages; i++) {
    const paddedIndex = i.toString().padStart(2, '0'); // Ensure two-digit format
    const isActive = i === 1 ? 'active' : ''; // Set first image as active

    // Add carousel item
    const carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item ${isActive}`;
    carouselItem.innerHTML = `
        <img src="Presentation/Picture ${paddedIndex}.png" class="d-block w-100" alt="Picture ${paddedIndex}">
    `;
    carouselInner.appendChild(carouselItem);

    // Add indicator
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.setAttribute('data-bs-target', '#imageCarousel');
    indicator.setAttribute('data-bs-slide-to', i - 1);
    if (isActive) indicator.className = 'active';
    indicators.appendChild(indicator);
}

// Function to update the title dynamically
function updateTitle(index) {
    carouselTitle.textContent = messages[index] || "Default Message";
}

// Set the initial title
updateTitle(0);

// Listen for carousel slide changes
const carousel = document.querySelector('#imageCarousel');
carousel.addEventListener('slid.bs.carousel', (event) => {
    updateTitle(event.to);
let paddedIndex = logCurrentImage(); // Replace with the actual index
let imagePath = `Presentation/${paddedIndex}.png`;

getRealImageWidth(imagePath);
});

// Toggle menu visibility
toggleMenuBtn.addEventListener('click', () => {
    menu.classList.toggle('open'); // Show/hide the menu
    mainContent.classList.toggle('menu-open'); // Adjust main content
});

function getRealImageWidth(imagePath) {
    return new Promise((resolve, reject) => {
        const img = new Image(); // Create a new Image object
        img.src = imagePath; // Set the source to the image path

        // Wait for the image to load
        img.onload = () => {
            // Get the height of the carousel
            const ScaledHeight = getCarouselHeight();
            // Calculate the scaled width
            const ScaledWidth = Math.round((img.naturalWidth * ScaledHeight) / img.naturalHeight);

            // Apply the width to the carousel
            const carousel = document.querySelector('.carousel');
            if (carousel) {
                carousel.style.width = `${ScaledWidth}px`;
            } else {
                console.log("Carousel container not found.");
            }

            resolve(ScaledWidth); // Resolve with the calculated width
        };

        // Handle errors (e.g., if the image can't load)
        img.onerror = () => {
            reject(new Error(`Failed to load image at ${imagePath}`));
        };
    });
}


// Log the current image displayed in the carousel
function logCurrentImage() {
    // Select the active carousel item
    const activeItem = document.querySelector('.carousel-item.active');
    let activeImage;

    if (activeItem) {
        // Get the image element inside the active item
        activeImage = activeItem.querySelector('img');

        if (!activeImage) {
            console.log("No image found in the active carousel item.");
        }
    } else {
        console.log("No active carousel item found.");
    }

    return activeImage.alt;
}


// Listen for carousel slide changes and log the current image
carousel.addEventListener('slid.bs.carousel', () => {
    logCurrentImage();
});

let paddedIndex = logCurrentImage(); // Replace with the actual index
let imagePath = `Presentation/${paddedIndex}.png`;

getRealImageWidth(imagePath);


// Function to get the current height of the carousel
function getCarouselHeight() {
    const carousel = document.querySelector('.carousel-container');

    if (carousel) {
        const carouselHeight = carousel.offsetHeight; // Get the height in pixels
        return carouselHeight;
    } else {
        console.log("Carousel container not found.");
        return null;
    }
}

// Link menu items to carousel slides
function linkMenuToCarousel() {
    const menuItems = document.querySelectorAll('.Menu ul li'); // Select all menu items
    const carousel = document.querySelector('#imageCarousel'); // Get the carousel

    menuItems.forEach((menuItem, index) => {
        // Add a click event listener to each menu item
        menuItem.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Use Bootstrap's carousel method to navigate to the specific slide
            const bootstrapCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
            bootstrapCarousel.to(index); // Go to the slide corresponding to the menu item

            console.log(`Switched to image ${index + 1}`);
        });
    });
}

// Call the function on page load
linkMenuToCarousel();

// Function to populate menu with titles
function populateMenuTitles() {
    const menu = document.querySelector('.Menu ul'); // Get the menu list container
    const carousel = document.querySelector('#imageCarousel'); // Get the carousel element

    // Clear the existing menu items
    menu.innerHTML = '';

    // Create menu items dynamically
    messages.forEach((title, index) => {
        const menuItem = document.createElement('li');
        menuItem.setAttribute('data-bs-slide-to', index); // Link to the corresponding carousel slide

        // Create the link element for the menu item
        const menuLink = document.createElement('a');
        menuLink.href = '#';
        menuLink.textContent = title; // Set the text to the title

        // Add a click event listener to navigate to the carousel slide
        menuLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Use Bootstrap's carousel API to navigate to the slide
            const bootstrapCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
            bootstrapCarousel.to(index); // Go to the corresponding slide

            console.log(`Navigated to slide ${index + 1}: ${title}`);
        });

        // Append the link to the menu item and the menu item to the menu
        menuItem.appendChild(menuLink);
        menu.appendChild(menuItem);
    });

    console.log("Menu updated with titles linked to the carousel.");
}

// Call the function to populate the menu on page load
populateMenuTitles();




let isControlPressed = false; // Track the state of the Control key

// Listen for keydown and keyup events to track if the Control key is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Control') {
        isControlPressed = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Control') {
        isControlPressed = false;
    }
});

// Add a mousemove event listener to the carousel for zoom

carousel.addEventListener('mousemove', (event) => {
    if (isControlPressed) {
        // Find the image being hovered
        const image = event.target.closest('.carousel-item img');
        if (image) {
            // Calculate the position of the mouse relative to the image
            const rect = image.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100; // X percentage
            const y = ((event.clientY - rect.top) / rect.height) * 100; // Y percentage

            // Update the transform-origin to follow the mouse and apply zoom
            image.style.transformOrigin = `${x}% ${y}%`;
            image.style.transform = 'scale(2)';
        }
    }
});

// Reset zoom and transform-origin when the mouse leaves the carousel
carousel.addEventListener('mouseleave', () => {
    const images = document.querySelectorAll('.carousel-item img');
    images.forEach((image) => {
        image.style.transform = 'scale(1)'; // Reset zoom
        image.style.transformOrigin = 'center'; // Reset transform origin to center
    });
});



