// Theme switching functionality
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themes = ['dark', 'light', 'colorful', 'blackwhite', 'modern'];
        this.isTransitioning = false;
        
        this.initializeTheme();
        this.bindEvents();
    }
    
    initializeTheme() {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('reviewsCarouselTheme');
        if (savedTheme && this.themes.includes(savedTheme)) {
            this.currentTheme = savedTheme;
        }
        
        this.applyTheme(this.currentTheme, false);
        this.updateActiveButton();
    }
    
    bindEvents() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        themeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                if (theme && theme !== this.currentTheme && !this.isTransitioning) {
                    this.switchTheme(theme);
                }
            });
            
            // Add hover sound effect (optional)
            button.addEventListener('mouseenter', () => {
                this.playHoverSound();
            });
        });
        
        // Keyboard shortcuts for theme switching
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                const themeIndex = parseInt(e.key) - 1;
                if (themeIndex >= 0 && themeIndex < this.themes.length) {
                    e.preventDefault();
                    this.switchTheme(this.themes[themeIndex]);
                }
            }
        });
    }
    
    switchTheme(newTheme) {
        if (this.isTransitioning || newTheme === this.currentTheme) return;
        
        this.isTransitioning = true;
        const oldTheme = this.currentTheme;
        
        // Add transition class to body
        document.body.classList.add('theme-transition');
        
        // Play transition sound
        this.playTransitionSound(newTheme);
        
        // Apply theme-specific transition effects
        this.applyTransitionEffect(oldTheme, newTheme);
        
        // Change theme after a short delay for smooth transition
        setTimeout(() => {
            this.currentTheme = newTheme;
            this.applyTheme(newTheme, true);
            this.updateActiveButton();
            this.saveTheme();
            
            // Remove transition class
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
                this.isTransitioning = false;
            }, 500);
        }, 100);
    }
    
    applyTheme(theme, animated = false) {
        // Remove all theme classes
        this.themes.forEach(t => {
            document.documentElement.classList.remove(`theme-${t}`);
        });
        
        // Add new theme class
        document.documentElement.classList.add(`theme-${theme}`);
        document.documentElement.setAttribute('data-theme', theme);
        
        if (animated) {
            this.triggerThemeAnimation(theme);
        }
    }
    
    applyTransitionEffect(oldTheme, newTheme) {
        const carousel = document.querySelector('.reviews-carousel');
        const cards = document.querySelectorAll('.review-card');
        
        // Theme-specific transition effects
        switch (newTheme) {
            case 'dark':
                this.applyDarkTransition(carousel, cards);
                break;
            case 'light':
                this.applyLightTransition(carousel, cards);
                break;
            case 'colorful':
                this.applyColorfulTransition(carousel, cards);
                break;
            case 'blackwhite':
                this.applyBlackWhiteTransition(carousel, cards);
                break;
            case 'modern':
                this.applyModernTransition(carousel, cards);
                break;
        }
    }
    
    applyDarkTransition(carousel, cards) {
        carousel.style.filter = 'brightness(0.3) blur(2px)';
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'rotateY(180deg) scale(0.8)';
                card.style.opacity = '0.3';
            }, index * 50);
        });
        
        setTimeout(() => {
            carousel.style.filter = '';
            cards.forEach(card => {
                card.style.transform = '';
                card.style.opacity = '';
            });
        }, 300);
    }
    
    applyLightTransition(carousel, cards) {
        carousel.style.transform = 'scale(0.95)';
        carousel.style.filter = 'brightness(1.5) blur(1px)';
        
        setTimeout(() => {
            carousel.style.transform = '';
            carousel.style.filter = '';
        }, 300);
    }
    
    applyColorfulTransition(carousel, cards) {
        carousel.style.filter = 'hue-rotate(180deg) saturate(2)';
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(0.9)`;
                card.style.filter = 'hue-rotate(90deg)';
            }, index * 30);
        });
        
        setTimeout(() => {
            carousel.style.filter = '';
            cards.forEach(card => {
                card.style.transform = '';
                card.style.filter = '';
            });
        }, 400);
    }
    
    applyBlackWhiteTransition(carousel, cards) {
        carousel.style.filter = 'grayscale(1) contrast(2)';
        carousel.style.transform = 'scaleX(0.1)';
        
        setTimeout(() => {
            carousel.style.transform = 'scaleX(1)';
        }, 150);
        
        setTimeout(() => {
            carousel.style.filter = '';
            carousel.style.transform = '';
        }, 300);
    }
    
    applyModernTransition(carousel, cards) {
        carousel.style.transform = 'perspective(1000px) rotateX(-20deg)';
        carousel.style.filter = 'blur(3px)';
        
        setTimeout(() => {
            carousel.style.transform = 'perspective(1000px) rotateX(0deg)';
            carousel.style.filter = '';
        }, 300);
    }
    
    triggerThemeAnimation(theme) {
        const carousel = document.querySelector('.reviews-carousel');
        
        // Remove any existing animation classes
        carousel.classList.remove('theme-entering');
        
        // Force reflow
        carousel.offsetHeight;
        
        // Add animation class
        carousel.classList.add('theme-entering');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            carousel.classList.remove('theme-entering');
        }, 1000);
    }
    
    updateActiveButton() {
        const buttons = document.querySelectorAll('.theme-btn');
        buttons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.theme === this.currentTheme) {
                button.classList.add('active');
            }
        });
    }
    
    saveTheme() {
        localStorage.setItem('reviewsCarouselTheme', this.currentTheme);
    }
    
    // Sound effects (optional - using Web Audio API)
    playHoverSound() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                return; // Audio not supported
            }
        }
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    playTransitionSound(theme) {
        if (!this.audioContext) return;
        
        const frequencies = {
            dark: [200, 300, 400],
            light: [400, 600, 800],
            colorful: [300, 500, 700, 900],
            blackwhite: [220, 440],
            modern: [350, 550, 750]
        };
        
        const themeFreqs = frequencies[theme] || [440];
        
        themeFreqs.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.2);
            }, index * 50);
        });
    }
    
    // Theme cycling for demo purposes
    startThemeCycle(interval = 3000) {
        this.stopThemeCycle();
        let currentIndex = this.themes.indexOf(this.currentTheme);
        
        this.themeCycleInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % this.themes.length;
            this.switchTheme(this.themes[currentIndex]);
        }, interval);
    }
    
    stopThemeCycle() {
        if (this.themeCycleInterval) {
            clearInterval(this.themeCycleInterval);
            this.themeCycleInterval = null;
        }
    }
    
    // Get current theme info
    getCurrentThemeInfo() {
        const themeInfo = {
            dark: {
                name: 'المظهر الداكن',
                description: 'مظهر داكن مع تأثيرات متوهجة',
                primaryColor: '#a1cca5'
            },
            light: {
                name: 'المظهر الفاتح',
                description: 'مظهر فاتح ونظيف',
                primaryColor: '#93b7be'
            },
            colorful: {
                name: 'المظهر الملون',
                description: 'مظهر نابض بالحياة والألوان',
                primaryColor: '#3f84e5'
            },
            blackwhite: {
                name: 'أبيض وأسود',
                description: 'مظهر كلاسيكي بالأبيض والأسود',
                primaryColor: '#000000'
            },
            modern: {
                name: 'المظهر العصري',
                description: 'مظهر عصري ومتطور',
                primaryColor: '#fe5f55'
            }
        };
        
        return themeInfo[this.currentTheme];
    }
}


