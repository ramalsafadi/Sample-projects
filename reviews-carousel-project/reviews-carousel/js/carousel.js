// Carousel functionality
class ReviewsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.reviews = [];
        this.reviewsPerPage = this.getReviewsPerPage();
        this.totalPages = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.updateResponsiveSettings();
    }
    
    initializeElements() {
        this.wrapper = document.getElementById('reviewsWrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.getElementById('carouselIndicators');
        this.totalCountEl = document.getElementById('totalCount');
        this.averageRatingEl = document.getElementById('averageRating');
        this.averageStarsEl = document.getElementById('averageStars');
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.nextPage();
            if (e.key === 'ArrowRight') this.previousPage();
        });
        
        this.addTouchSupport();
        
        window.addEventListener('resize', () => {
            this.updateResponsiveSettings();
            this.render();
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.wrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousPage();
                } else {
                    this.nextPage();
                }
            }
        });
    }
    
    getReviewsPerPage() {
        return window.innerWidth < 768 ? 2 : 4;
    }
    
    updateResponsiveSettings() {
        const newReviewsPerPage = this.getReviewsPerPage();
        if (newReviewsPerPage !== this.reviewsPerPage) {
            this.reviewsPerPage = newReviewsPerPage;
            this.calculateTotalPages();
            this.currentIndex = Math.min(this.currentIndex, this.totalPages - 1);
            
            // Update wrapper display for mobile
            if (window.innerWidth < 768) {
                this.wrapper.style.display = 'flex';
                this.wrapper.style.flexDirection = 'column';
            } else {
                this.wrapper.style.display = 'grid';
                this.wrapper.style.flexDirection = '';
            }
        }
    }
    
    setReviews(reviews) {
        this.reviews = reviews;
        this.calculateTotalPages();
        this.currentIndex = 0;
        this.render();
        this.updateSummary();
    }
    
    calculateTotalPages() {
        this.totalPages = Math.ceil(this.reviews.length / this.reviewsPerPage);
    }
    
    getCurrentPageReviews() {
        const startIndex = this.currentIndex * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        return this.reviews.slice(startIndex, endIndex);
    }
    
    nextPage() {
        if (this.currentIndex < this.totalPages - 1) {
            this.currentIndex++;
            this.render();
        }
    }
    
    previousPage() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.render();
        }
    }
    
    goToPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < this.totalPages) {
            this.currentIndex = pageIndex;
            this.render();
        }
    }
    
    render() {
        this.renderReviews();
        this.renderIndicators();
        this.updateNavigationButtons();
    }
    
    renderReviews() {
        const currentReviews = this.getCurrentPageReviews();
        
        this.wrapper.classList.add('transitioning');
        this.wrapper.innerHTML = '';
        
        currentReviews.forEach((review, index) => {
            const reviewCard = this.createReviewCard(review, index);
            this.wrapper.appendChild(reviewCard);
        });
        
        // Force reflow for mobile
        if (window.innerWidth < 768) {
            this.wrapper.style.display = 'flex';
            this.wrapper.style.flexDirection = 'column';
        }
        
        setTimeout(() => {
            this.wrapper.classList.remove('transitioning');
        }, 300);
    }
    
    createReviewCard(review, index) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const stars = this.generateStars(review.rating);
        const timeAgo = formatReviewTime(review.time);
        
        card.innerHTML = `
            <div class="review-header">
                <img src="${review.profile_photo_url}" alt="${review.author_name}" class="reviewer-avatar" loading="lazy">
                <div class="reviewer-info">
                    <div class="reviewer-name">${review.author_name}</div>
                    <div class="review-meta">
                        <div class="review-rating">${stars}</div>
                        <span class="review-time">${timeAgo}</span>
                    </div>
                </div>
            </div>
            <div class="review-text">${review.text}</div>
            <div class="review-footer">
                <button class="helpful-btn" onclick="this.classList.toggle('liked')">
                    <i class="fas fa-thumbs-up"></i>
                    مفيد
                </button>
                <div class="review-source">
                    <i class="fab fa-google"></i>
                    Google
                </div>
            </div>
        `;
        
        return card;
    }
    
    generateStars(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<i class="fas fa-star star"></i>';
            } else {
                starsHTML += '<i class="far fa-star star empty"></i>';
            }
        }
        return starsHTML;
    }
    
    renderIndicators() {
        this.indicators.innerHTML = '';
        
        for (let i = 0; i < this.totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${i === this.currentIndex ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToPage(i));
            this.indicators.appendChild(indicator);
        }
    }
    
    updateNavigationButtons() {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.totalPages - 1;
    }
    
    updateSummary() {
        if (this.reviews.length === 0) return;
        
        const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (totalRating / this.reviews.length).toFixed(1);
        
        this.totalCountEl.textContent = this.reviews.length;
        this.averageRatingEl.textContent = averageRating;
        
        // Update average stars
        this.averageStarsEl.innerHTML = this.generateStars(Math.round(parseFloat(averageRating)));
    }
    
    // Auto-play functionality (optional)
    startAutoPlay(interval = 5000) {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex < this.totalPages - 1) {
                this.nextPage();
            } else {
                this.goToPage(0); // Loop back to first page
            }
        }, interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    // Pause auto-play on hover
    pauseOnHover() {
        this.wrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.wrapper.addEventListener('mouseleave', () => this.startAutoPlay());
    }
}



