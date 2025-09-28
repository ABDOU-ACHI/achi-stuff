// Ethical Hacking Academy - Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 65, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Progress tracking system
    class ProgressTracker {
        constructor() {
            this.progress = this.loadProgress();
            this.initializeProgress();
            this.bindEventListeners();
        }

        loadProgress() {
            const saved = localStorage.getItem('ethicalHackingProgress');
            return saved ? JSON.parse(saved) : {
                beginner: { completed: 0, total: 4 },
                intermediate: { completed: 0, total: 4 },
                advanced: { completed: 0, total: 4 }
            };
        }

        saveProgress() {
            localStorage.setItem('ethicalHackingProgress', JSON.stringify(this.progress));
        }

        initializeProgress() {
            this.updateProgressBars();
            this.updateModuleStates();
        }

        updateProgressBars() {
            const levels = ['beginner', 'intermediate', 'advanced'];
            levels.forEach(level => {
                const progressFill = document.querySelector(`.progress-level:nth-child(${levels.indexOf(level) + 1}) .progress-fill`);
                const progressText = document.querySelector(`.progress-level:nth-child(${levels.indexOf(level) + 1}) .progress-text`);
                
                if (progressFill && progressText) {
                    const percentage = (this.progress[level].completed / this.progress[level].total) * 100;
                    progressFill.style.width = `${percentage}%`;
                    progressText.textContent = `${this.progress[level].completed}/${this.progress[level].total} completed`;
                }
            });
        }

        updateModuleStates() {
            const moduleCards = document.querySelectorAll('.module-card');
            moduleCards.forEach((card, index) => {
                const level = this.getModuleLevel(index);
                const isUnlocked = this.isModuleUnlocked(level, index);
                
                const status = card.querySelector('.module-status');
                const button = card.querySelector('.btn-start, .btn-locked');
                
                if (isUnlocked) {
                    status.textContent = 'Available';
                    status.className = 'module-status pending';
                    if (button) {
                        button.className = 'btn-start';
                        button.textContent = 'Start Module';
                        button.disabled = false;
                    }
                } else {
                    status.textContent = 'Locked';
                    status.className = 'module-status locked';
                    if (button) {
                        button.className = 'btn-locked';
                        button.textContent = 'Complete Prerequisites';
                        button.disabled = true;
                    }
                }
            });
        }

        getModuleLevel(index) {
            if (index < 4) return 'beginner';
            if (index < 8) return 'intermediate';
            return 'advanced';
        }

        isModuleUnlocked(level, moduleIndex) {
            // First module is always unlocked
            if (moduleIndex === 0) return true;
            
            // Check if previous level is completed
            if (level === 'intermediate' && this.progress.beginner.completed < this.progress.beginner.total) {
                return false;
            }
            if (level === 'advanced' && this.progress.intermediate.completed < this.progress.intermediate.total) {
                return false;
            }
            
            // Check if previous module in same level is completed
            const levelStartIndex = level === 'beginner' ? 0 : level === 'intermediate' ? 4 : 8;
            const moduleInLevel = moduleIndex - levelStartIndex;
            
            return moduleInLevel === 0 || this.getCompletedModulesInLevel(level) >= moduleInLevel;
        }

        getCompletedModulesInLevel(level) {
            return this.progress[level].completed;
        }

        completeModule(level) {
            if (this.progress[level].completed < this.progress[level].total) {
                this.progress[level].completed++;
                this.saveProgress();
                this.updateProgressBars();
                this.updateModuleStates();
                this.showCompletionNotification(level);
            }
        }

        showCompletionNotification(level) {
            const notification = document.createElement('div');
            notification.className = 'completion-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-check-circle"></i>
                    <span>Module completed! Progress in ${level} level updated.</span>
                </div>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        bindEventListeners() {
            // Bind start module buttons
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-start')) {
                    e.preventDefault();
                    const card = e.target.closest('.module-card');
                    const moduleIndex = Array.from(document.querySelectorAll('.module-card')).indexOf(card);
                    const level = this.getModuleLevel(moduleIndex);
                    
                    // Simulate module completion for demo
                    setTimeout(() => {
                        this.completeModule(level);
                    }, 1000);
                }
            });
        }
    }

    // Initialize progress tracker if on roadmap page
    if (document.querySelector('.roadmap-content')) {
        new ProgressTracker();
    }

    // Search functionality
    class SearchSystem {
        constructor() {
            this.initializeSearch();
        }

        initializeSearch() {
            const searchInput = document.querySelector('#search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.performSearch(e.target.value);
                });
            }
        }

        performSearch(query) {
            if (query.length < 2) {
                this.clearSearchResults();
                return;
            }

            const results = this.searchContent(query.toLowerCase());
            this.displaySearchResults(results);
        }

        searchContent(query) {
            const searchableContent = [
                { title: 'Cybersecurity Fundamentals', type: 'module', url: 'roadmap.html#fundamentals' },
                { title: 'Linux Command Line', type: 'module', url: 'roadmap.html#linux' },
                { title: 'Networking Fundamentals', type: 'module', url: 'roadmap.html#networking' },
                { title: 'Nmap', type: 'tool', url: 'tools.html#nmap' },
                { title: 'Metasploit', type: 'tool', url: 'tools.html#metasploit' },
                { title: 'Burp Suite', type: 'tool', url: 'tools.html#burp' },
                { title: 'RHCSA Certification', type: 'certification', url: 'certification.html#rhcsa' },
                { title: 'Web Application Security', type: 'module', url: 'roadmap.html#web-security' }
            ];

            return searchableContent.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.type.toLowerCase().includes(query)
            );
        }

        displaySearchResults(results) {
            let resultsContainer = document.querySelector('#search-results');
            if (!resultsContainer) {
                resultsContainer = document.createElement('div');
                resultsContainer.id = 'search-results';
                resultsContainer.className = 'search-results';
                document.querySelector('#search-input').parentNode.appendChild(resultsContainer);
            }

            if (results.length === 0) {
                resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
                return;
            }

            const resultsHTML = results.map(result => `
                <a href="${result.url}" class="search-result-item">
                    <div class="result-title">${result.title}</div>
                    <div class="result-type">${result.type}</div>
                </a>
            `).join('');

            resultsContainer.innerHTML = resultsHTML;
        }

        clearSearchResults() {
            const resultsContainer = document.querySelector('#search-results');
            if (resultsContainer) {
                resultsContainer.innerHTML = '';
            }
        }
    }

    // Initialize search system
    new SearchSystem();

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .module-card, .timeline-item');
    animatedElements.forEach(el => observer.observe(el));

    // Typing effect for hero section
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect on home page
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }

    // Module cards interaction
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Certification progress simulator
    function simulateCertProgress() {
        const certBars = document.querySelectorAll('.cert-progress');
        certBars.forEach((bar, index) => {
            const progress = Math.random() * 100;
            const fill = bar.querySelector('.cert-progress-fill');
            if (fill) {
                fill.style.width = `${progress}%`;
            }
        });
    }

    // Theme toggle (optional feature)
    function addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: var(--dark-bg);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            icon.className = document.body.classList.contains('light-theme') ? 
                'fas fa-sun' : 'fas fa-moon';
        });

        document.body.appendChild(themeToggle);
    }

    // Add theme toggle
    addThemeToggle();

    // Console greeting
    console.log(`
    ████████╗██╗  ██╗██╗ ██████╗ █████╗ ██╗         
    ██╔═════╝██║  ██║██║██╔════╝██╔══██╗██║         
    █████╗   ███████║██║██║     ███████║██║         
    ██╔══╝   ██╔══██║██║██║     ██╔══██║██║         
    ███████╗ ██║  ██║██║╚██████╗██║  ██║███████╗    
    ╚══════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝    
    
    ██╗  ██╗ █████╗  ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗ 
    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝ 
    ███████║███████║██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗
    ██╔══██║██╔══██║██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║
    ██║  ██║██║  ██║╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝
    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
    
     █████╗  ██████╗ █████╗ ██████╗ ███████╗███╗   ███╗██╗   ██╗
    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝████╗ ████║╚██╗ ██╔╝
    ███████║██║     ███████║██║  ██║█████╗  ██╔████╔██║ ╚████╔╝ 
    ██╔══██║██║     ██╔══██║██║  ██║██╔══╝  ██║╚██╔╝██║  ╚██╔╝  
    ██║  ██║╚██████╗██║  ██║██████╔╝███████╗██║ ╚═╝ ██║   ██║   
    ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝     ╚═╝   ╚═╝   

    Welcome to Ethical Hacking Academy!
    🎯 Learn responsibly, hack ethically.
    🛡️ Use your skills to protect and defend.
    
    Remember: With great power comes great responsibility!
    `);
});

// Add notification styles
const notificationStyles = `
.completion-notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--gradient-primary);
    color: var(--dark-bg);
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: var(--shadow-heavy);
    z-index: 1001;
    animation: slideInRight 0.3s ease-out;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
}

.search-result-item {
    display: block;
    padding: 1rem;
    color: var(--text-primary);
    text-decoration: none;
    border-bottom: 1px solid var(--border-color);
    transition: background 0.3s ease;
}

.search-result-item:hover {
    background: rgba(0, 255, 65, 0.1);
}

.result-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.result-type {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
}

.no-results {
    padding: 1rem;
    text-align: center;
    color: var(--text-muted);
}

.theme-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 255, 65, 0.3);
}

/* Light theme styles */
.light-theme {
    --primary-color: #00cc35;
    --secondary-color: #cc0035;
    --accent-color: #00aacc;
    --dark-bg: #ffffff;
    --darker-bg: #f5f5f5;
    --card-bg: #ffffff;
    --text-primary: #333333;
    --text-secondary: #666666;
    --text-muted: #999999;
    --border-color: #e0e0e0;
    --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    --gradient-dark: linear-gradient(135deg, var(--dark-bg), var(--darker-bg));
    --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-heavy: 0 10px 30px rgba(0, 0, 0, 0.2);
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);