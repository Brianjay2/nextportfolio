document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth' // Smooth scroll effect
            });

            // Optional: Close mobile navigation if it's open
            // This assumes you have a mobile navigation toggle with a class like 'active'
            const navUl = document.querySelector('nav ul');
            if (navUl && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                // If you have a separate hamburger icon, you might toggle its class too
                // document.querySelector('.nav-toggle').classList.remove('active');
            }
        });
    });

    // Update current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Chart.js Pie Chart Initialization for Skills Section ---

    // Define data for Programming Languages Chart
    const languageData = {
        labels: ['Java', 'JavaScript', 'Python', 'C#'], // Your specific languages
        datasets: [{
            // These numbers represent your relative proficiency/comfort level.
            // They don't have to sum to 100, Chart.js calculates percentages automatically.
            data: [40, 30, 20, 10],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',   // Blue (Java)
                'rgba(70, 68, 65, 0.8)',   // Yellow (JavaScript)
                'rgba(255, 99, 132, 0.8)',   // Red (Python)
                'rgba(75, 192, 192, 0.8)',   // Green (C#)   
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1 // Border around each slice
        }]
    };

    // Define data for Frameworks & Libraries Chart
    const frameworkData = {
        labels: ['Spring Boot','Angular',  'Javalin', 'React'], 
        datasets: [{
            data: [35, 35, 15, 15], 
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',   // Green (Spring Boot)
                'rgba(153, 102, 255, 0.8)',  // Purple (Angular)
                'rgba(255, 159, 64, 0.8)',   // Orange (Javalin)
                'rgba(255, 99, 132, 0.8)',   // Red (React)
      
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    };

    // Common Chart.js options for both pie charts
    const chartOptions = {
        responsive: true, // Chart will resize with its container
        maintainAspectRatio: false, // Allows chart to take up full height of its container
        plugins: {
            legend: {
                position: 'right', // Position of the labels for each slice
                labels: {
                    font: {
                        size: 14, // Font size of legend labels
                        family: 'Roboto, sans-serif' // Match body font
                    },
                    color: '#343a40' // Color of legend labels
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            // Display the value and then calculate percentage
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            label += `${context.parsed} (${percentage}%)`;
                        }
                        return label;
                    }
                },
                bodyFont: {
                    size: 14,
                    family: 'Roboto, sans-serif'
                },
                titleFont: {
                    size: 16,
                    family: 'Roboto, sans-serif'
                }
            },
            title: {
                display: false, // Set to true if you want Chart.js to render a title itself
                text: '', // Text for the title (we are using HTML h3 for titles)
            },
            // Custom plugin to show text in the center of a donut chart (if type is 'doughnut')
            // This is more advanced and requires further setup if you want it.
            // id: 'customCanvasDoughnutLabels',
            // afterDraw(chart) { ... }
        }
    };

    // Get the canvas elements by their IDs and initialize the charts
    const languageCtx = document.getElementById('languageChart');
    if (languageCtx) { // Ensure the canvas element exists before creating chart
        new Chart(languageCtx, {
            type: 'pie', // Can also be 'doughnut' for a ring shape
            data: languageData,
            options: chartOptions
        });
    }

    const frameworkCtx = document.getElementById('frameworkChart');
    if (frameworkCtx) { // Ensure the canvas element exists
        new Chart(frameworkCtx, {
            type: 'pie', // Can also be 'doughnut'
            data: frameworkData,
            options: chartOptions
        });
    }

    // --- Optional: Mobile Navigation Toggle (if you add a hamburger icon) ---
    /*
    const navToggle = document.querySelector('.nav-toggle'); // Assuming you have a button with this class
    const navUl = document.querySelector('nav ul');

    if (navToggle && navUl) {
        navToggle.addEventListener('click', () => {
            navUl.classList.toggle('active'); // Toggles a class to show/hide the menu
            navToggle.classList.toggle('active'); // Optional: For animating the hamburger icon
        });
    }
    */
});