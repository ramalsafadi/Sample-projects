// Main application controller
class ReviewsCarouselApp {
    constructor() {
        this.isInitialized = false;
        this.components = {};
        this.init();
    }
    
    async init() {
        try {
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            await this.initializeComponents();
            await this.loadInitialData();
            this.setupGlobalEvents();
            this.isInitialized = true;
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showInitializationError(error);
        }
    }
    
    async initializeComponents() {
        if (typeof ThemeManager !== 'undefined') {
            this.components.themeManager = new ThemeManager();
        }
        
        if (typeof ReviewsCarousel !== 'undefined') {
            this.components.carousel = new ReviewsCarousel();
        }
        
        if (typeof GooglePlacesAPI !== 'undefined') {
            this.components.apiManager = new GooglePlacesAPI();
        }
        
        window.carousel = this.components.carousel;
        window.themeManager = this.components.themeManager;
        window.apiManager = this.components.apiManager;
    }
    
    async loadInitialData() {
        if (this.components.apiManager) {
            await this.components.apiManager.loadReviews();
        }
    }
    
    setupGlobalEvents() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        this.setupAccessibilityFeatures();
        this.setupPerformanceMonitoring();
    }
    
    handleKeyboardShortcuts(e) {
        if (e.altKey) {
            switch (e.key) {
                case 'r':
                    e.preventDefault();
                    this.refreshData();
                    break;
                case 'c':
                    e.preventDefault();
                    this.toggleConfigPanel();
                    break;
                case 't':
                    e.preventDefault();
                    this.cycleThemes();
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
    }
    
    setupAccessibilityFeatures() {
        this.addAriaLabels();
        this.setupFocusManagement();
        this.setupScreenReaderAnnouncements();
    }
    
    addAriaLabels() {
        const carousel = document.querySelector('.reviews-carousel');
        if (carousel) {
            carousel.setAttribute('role', 'region');
            carousel.setAttribute('aria-label', 'عرض تقييمات العملاء');
        }
        
        const themeButtons = document.querySelectorAll('.theme-btn');
        themeButtons.forEach((button, index) => {
            button.setAttribute('role', 'button');
            button.setAttribute('aria-pressed', 'false');
            button.setAttribute('tabindex', '0');
        });
        
        const carouselButtons = document.querySelectorAll('.carousel-btn');
        carouselButtons.forEach(button => {
            button.setAttribute('role', 'button');
            button.setAttribute('tabindex', '0');
        });
    }
    
    setupFocusManagement() {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach((element, index) => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });
    }
    
    setupScreenReaderAnnouncements() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(liveRegion);
        
        this.liveRegion = liveRegion;
    }
    
    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
        }
    }
    
    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                console.log(`App loaded in ${loadTime.toFixed(2)}ms`);
            });
            
            if ('memory' in performance) {
                setInterval(() => {
                    const memory = performance.memory;
                    if (memory.usedJSHeapSize > 50 * 1024 * 1024) {
                        console.warn('High memory usage detected');
                    }
                }, 30000);
            }
        }
    }
    
    handleResize() {
        if (this.components.carousel) {
            this.components.carousel.updateResponsiveSettings();
        }
        
        this.announceToScreenReader('تم تغيير حجم الشاشة، تم تحديث العرض');
    }
    
    pauseAnimations() {
        document.body.classList.add('animations-paused');
        
        if (this.components.carousel && this.components.carousel.stopAutoPlay) {
            this.components.carousel.stopAutoPlay();
        }
    }
    
    resumeAnimations() {
        document.body.classList.remove('animations-paused');
    }
    
    refreshData() {
        if (this.components.apiManager) {
            this.components.apiManager.refreshReviews();
            this.announceToScreenReader('جاري تحديث التقييمات');
        }
    }
    
    toggleConfigPanel() {
        const configPanel = document.getElementById('configPanel');
        if (configPanel) {
            configPanel.classList.toggle('active');
        }
    }
    
    cycleThemes() {
        if (this.components.themeManager) {
            const themes = this.components.themeManager.themes;
            const currentIndex = themes.indexOf(this.components.themeManager.currentTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            this.components.themeManager.switchTheme(themes[nextIndex]);
        }
    }
    
    closeAllModals() {
        const configPanel = document.getElementById('configPanel');
        if (configPanel) {
            configPanel.classList.remove('active');
        }
        
        const modals = document.querySelectorAll('.modal, .panel');
        modals.forEach(modal => {
            modal.classList.remove('active', 'open');
        });
    }
    
    showInitializationError(error) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'initialization-error';
        errorContainer.innerHTML = `
            <div class="error-content">
                <h2>خطأ في تهيئة التطبيق</h2>
                <p>حدث خطأ أثناء تحميل التطبيق. يرجى إعادة تحميل الصفحة.</p>
                <button onclick="window.location.reload()" class="retry-btn">
                    إعادة تحميل
                </button>
                <details>
                    <summary>تفاصيل الخطأ</summary>
                    <pre>${error.message}</pre>
                </details>
            </div>
        `;
        
        document.body.appendChild(errorContainer);
    }
    
    getStatus() {
        return {
            initialized: this.isInitialized,
            components: Object.keys(this.components),
            theme: this.components.themeManager?.currentTheme,
            reviewsCount: this.components.carousel?.reviews?.length || 0,
            apiStatus: this.components.apiManager?.getConfigStatus()
        };
    }
    
    enableDebugMode() {
        window.debugMode = true;
        console.log('Debug mode enabled');
        this.createDebugPanel();
    }
    
    createDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.className = 'debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 300px;
        `;
        
        const updateDebugInfo = () => {
            const status = this.getStatus();
            debugPanel.innerHTML = `
                <strong>Debug Info:</strong><br>
                Initialized: ${status.initialized}<br>
                Theme: ${status.theme}<br>
                Reviews: ${status.reviewsCount}<br>
                API: ${status.apiStatus?.isUsingDummyData ? 'Dummy' : 'Live'}<br>
                Memory: ${performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB' : 'N/A'}
            `;
        };
        
        updateDebugInfo();
        setInterval(updateDebugInfo, 1000);
        
        document.body.appendChild(debugPanel);
    }
}

const app = new ReviewsCarouselApp();
window.reviewsApp = app;

const style = document.createElement('style');
style.textContent = `
    .animations-paused *,
    .animations-paused *::before,
    .animations-paused *::after {
        animation-play-state: paused !important;
        transition-duration: 0s !important;
    }
    
    .initialization-error {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        font-family: Arial, sans-serif;
    }
    
    .error-content {
        background: #333;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 500px;
    }
    
    .error-content h2 {
        color: #ff6b6b;
        margin-bottom: 1rem;
    }
    
    .error-content .retry-btn {
        background: #4ecdc4;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
    }
    
    .error-content details {
        margin-top: 1rem;
        text-align: left;
    }
    
    .error-content pre {
        background: #222;
        padding: 1rem;
        border-radius: 5px;
        overflow: auto;
        font-size: 0.8rem;
    }
`;
document.head.appendChild(style);

