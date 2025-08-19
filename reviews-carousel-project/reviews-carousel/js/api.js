// Google Places API integration
class GooglePlacesAPI {
    constructor() {
        this.apiKey = '';
        this.placeId = '';
        this.isUsingDummyData = true;
        this.backdrop = document.getElementById('backdrop'); 
        this.initializeConfig();
        this.bindEvents();
    }
    
    initializeConfig() {
        const savedApiKey = localStorage.getItem('googlePlacesApiKey');
        const savedPlaceId = localStorage.getItem('googlePlacesPlaceId');
        
        if (savedApiKey) {
            this.apiKey = savedApiKey;
            document.getElementById('apiKey').value = savedApiKey;
        }
        
        if (savedPlaceId) {
            this.placeId = savedPlaceId;
            document.getElementById('placeId').value = savedPlaceId;
        }
        
        this.isUsingDummyData = !this.apiKey || !this.placeId;
    }
    
    bindEvents() {
        const configToggle = document.getElementById('configToggle');
        const configPanel = document.getElementById('configPanel');
        const saveBtn = document.getElementById('saveConfig');
        const dummyBtn = document.getElementById('useDummyData');
        const retryBtn = document.getElementById('retryBtn');
        
        if (configToggle && configPanel) {
            configToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                configPanel.classList.toggle('active');
                this.backdrop.classList.toggle('active'); 
            });
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveConfiguration());
        }
        
        if (dummyBtn) {
            dummyBtn.addEventListener('click', () => this.useDummyData());
        }
        
        if (retryBtn) {
            retryBtn.addEventListener('click', () => this.loadReviews());
        }
        
        // Close config panel when clicking outside
        document.addEventListener('click', (e) => {
            if (configPanel && !configPanel.contains(e.target) && !configToggle.contains(e.target)) {
                configPanel.classList.remove('active');
            }
        });
        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => {
                configPanel.classList.remove('active');
                this.backdrop.classList.remove('active');
            });
        }
    }
    
    saveConfiguration() {
        const apiKeyInput = document.getElementById('apiKey');
        const placeIdInput = document.getElementById('placeId');
        const statusEl = document.getElementById('configStatus');
        
        this.apiKey = apiKeyInput.value.trim();
        this.placeId = placeIdInput.value.trim();
        
        if (!this.apiKey || !this.placeId) {
            this.showConfigStatus('يرجى إدخال مفتاح API ومعرف المكان', 'error');
            return;
        }
        
        // Save to localStorage
        localStorage.setItem('googlePlacesApiKey', this.apiKey);
        localStorage.setItem('googlePlacesPlaceId', this.placeId);
        
        this.isUsingDummyData = false;
        this.showConfigStatus('تم حفظ الإعدادات بنجاح', 'success');
        
        // Close config panel and load reviews
        setTimeout(() => {
            document.getElementById('configPanel').classList.remove('active');
            this.loadReviews();
        }, 1500);
    }
    
    useDummyData() {
        this.isUsingDummyData = true;
        this.showConfigStatus('سيتم استخدام البيانات التجريبية', 'success');
        
        setTimeout(() => {
            document.getElementById('configPanel').classList.remove('active');
            this.loadReviews();
        }, 1500);
    }
    
    showConfigStatus(message, type) {
        const statusEl = document.getElementById('configStatus');
        statusEl.textContent = message;
        statusEl.className = `config-status ${type}`;
        
        setTimeout(() => {
            statusEl.className = 'config-status';
        }, 3000);
    }
    
    async loadReviews() {
        this.showLoading(true);
        this.hideError();
        
        try {
            let reviewsData;
            
            if (this.isUsingDummyData || !this.apiKey || !this.placeId) {
                reviewsData = await this.loadDummyReviews();
            } else {
                reviewsData = await this.fetchGoogleReviews();
            }
            
            if (reviewsData && reviewsData.reviews && reviewsData.reviews.length > 0) {
                // Update carousel with reviews
                if (window.carousel) {
                    carousel.setReviews(reviewsData.reviews);
                }
                this.showLoading(false);
            } else {
                throw new Error('لم يتم العثور على تقييمات');
            }
            
        } catch (error) {
            console.error('Error loading reviews:', error);
            this.showError(error.message || 'حدث خطأ في تحميل التقييمات');
            this.showLoading(false);
        }
    }
    
    loadDummyReviews() {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getDummyReviews());
            }, 1000);
        });
    }
    
    async fetchGoogleReviews() {
        if (!this.apiKey || !this.placeId) {
            throw new Error('مفتاح API أو معرف المكان غير صحيح');
        }
        
        // Using Google Places API Details endpoint
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=reviews,rating,user_ratings_total&key=${this.apiKey}`;
        
        try {
            // Note: Due to CORS restrictions, we need to use a proxy or server-side request
            // For demo purposes, we'll simulate the API call
            const response = await this.makeProxiedRequest(url);
            
            if (response.status === 'OK' && response.result) {
                return this.processGoogleReviews(response.result);
            } else {
                throw new Error(response.error_message || 'فشل في جلب البيانات من Google Places API');
            }
            
        } catch (error) {
            // Fallback to dummy data if API fails
            console.warn('API request failed, falling back to dummy data:', error);
            this.isUsingDummyData = true;
            return this.loadDummyReviews();
        }
    }
    
    async makeProxiedRequest(url) {
        // In a real implementation, you would use a CORS proxy or server-side endpoint
        // For this demo, we'll simulate the response
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo purposes, return dummy data formatted like Google Places API
        return {
            status: 'OK',
            result: {
                reviews: dummyReviews.map(review => ({
                    author_name: review.author_name,
                    rating: review.rating,
                    text: review.text,
                    time: Math.floor(review.time / 1000), // Google API uses seconds
                    profile_photo_url: review.profile_photo_url
                })),
                rating: 4.3,
                user_ratings_total: dummyReviews.length
            }
        };
    }
    
    processGoogleReviews(result) {
        const reviews = result.reviews || [];
        
        // Convert Google API format to our internal format
        const processedReviews = reviews.map(review => ({
            author_name: review.author_name,
            rating: review.rating,
            text: review.text,
            time: review.time * 1000, // Convert to milliseconds
            profile_photo_url: review.profile_photo_url || this.getDefaultAvatar()
        }));
        
        // Calculate average rating
        const totalRating = processedReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = processedReviews.length > 0 ? totalRating / processedReviews.length : 0;
        
        return {
            reviews: processedReviews,
            totalCount: result.user_ratings_total || processedReviews.length,
            averageRating: parseFloat(averageRating.toFixed(1))
        };
    }
    
    getDefaultAvatar() {
        // Return a default avatar URL
        return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
    }
    
    showLoading(show) {
        const loadingEl = document.getElementById('loadingIndicator');
        const carouselEl = document.querySelector('.reviews-carousel');
        
        if (show) {
            loadingEl.classList.add('active');
            carouselEl.style.opacity = '0.5';
        } else {
            loadingEl.classList.remove('active');
            carouselEl.style.opacity = '1';
        }
    }
    
    showError(message) {
        const errorEl = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        
        errorText.textContent = message;
        errorEl.classList.add('active');
    }
    
    hideError() {
        const errorEl = document.getElementById('errorMessage');
        errorEl.classList.remove('active');
    }
    
    // Method to refresh reviews
    refreshReviews() {
        this.loadReviews();
    }
    
    // Method to clear saved configuration
    clearConfiguration() {
        localStorage.removeItem('googlePlacesApiKey');
        localStorage.removeItem('googlePlacesPlaceId');
        
        document.getElementById('apiKey').value = '';
        document.getElementById('placeId').value = '';
        
        this.apiKey = '';
        this.placeId = '';
        this.isUsingDummyData = true;
        
        this.showConfigStatus('تم مسح الإعدادات', 'success');
    }
    
    // Get current configuration status
    getConfigStatus() {
        return {
            hasApiKey: !!this.apiKey,
            hasPlaceId: !!this.placeId,
            isUsingDummyData: this.isUsingDummyData,
            apiKey: this.apiKey ? this.apiKey.substring(0, 10) + '...' : '',
            placeId: this.placeId
        };
    }
}


