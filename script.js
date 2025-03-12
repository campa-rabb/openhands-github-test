// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    // DOM element references
    const colorButton = document.getElementById('colorButton');
    const body = document.body;
    const toggleButton = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    const mainContent = document.querySelector('main');
    
    // Random color generator function
    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // Function to change background color with animation
    function changeBackgroundColor() {
        const newColor = generateRandomColor();
        
        // Animate color change
        body.style.transition = 'background-color 0.5s ease';
        body.style.backgroundColor = newColor;
        
        // Display the color code
        const colorDisplay = document.createElement('div');
        colorDisplay.textContent = `Current color: ${newColor}`;
        colorDisplay.classList.add('color-notification');
        
        // Add to the DOM
        mainContent.appendChild(colorDisplay);
        
        // Animate entry
        setTimeout(() => {
            colorDisplay.style.opacity = '1';
            colorDisplay.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            colorDisplay.style.opacity = '0';
            colorDisplay.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                mainContent.removeChild(colorDisplay);
            }, 500);
        }, 3000);
    }
    
    // Mobile menu toggle functionality
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        
        // Animation for menu items
        const menuItems = navMenu.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            // Reset animation
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            
            // Apply animation with delay based on index
            item.style.animation = navMenu.classList.contains('active') 
                ? `fadeInRight 0.3s ease forwards ${index * 0.1}s`
                : '';
        });
    }
    
    // Event listener for color change button
    if (colorButton) {
        colorButton.addEventListener('click', () => {
            changeBackgroundColor();
            
            // Button animation
            colorButton.classList.add('btn-active');
            setTimeout(() => {
                colorButton.classList.remove('btn-active');
            }, 300);
        });
    }
    
    // Event listener for mobile menu toggle
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu && navMenu.contains(event.target);
        const isClickOnToggle = toggleButton && toggleButton.contains(event.target);
        
        if (navMenu && navMenu.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
            toggleMobileMenu();
        }
    });
    
    // Add some interactive elements
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
        paragraph.addEventListener('mouseover', () => {
            paragraph.style.transition = 'color 0.3s ease';
            paragraph.style.color = generateRandomColor();
        });
        
        paragraph.addEventListener('mouseout', () => {
            paragraph.style.transition = 'color 0.3s ease';
            paragraph.style.color = '';
        });
    });
    
    // Create some dynamic content
    function createDynamicContent() {
        const currentTime = new Date().toLocaleTimeString();
        const timeDisplay = document.createElement('div');
        timeDisplay.textContent = `Current time: ${currentTime}`;
        timeDisplay.classList.add('time-display');
        
        if (mainContent.querySelector('.time-display')) {
            mainContent.removeChild(mainContent.querySelector('.time-display'));
        }
        
        mainContent.appendChild(timeDisplay);
    }
    
    // Update time every second
    setInterval(createDynamicContent, 1000);
    
    // Add a scroll animation
    window.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    });
});

