// Dummy reviews data for testing when no API key is provided
const dummyReviews = [
    {
        author_name: "أحمد محمد",
        rating: 5,
        text: "تجربة رائعة جداً! الخدمة ممتازة والموظفون متعاونون. أنصح بشدة بزيارة هذا المكان. جودة عالية وأسعار معقولة.",
        time: 1640995200000,
        profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        author_name: "فاطمة علي",
        rating: 4,
        text: "مكان جميل ونظيف. الطعام لذيذ والأجواء مريحة. الوحيد العيب هو الانتظار قليلاً طويل في أوقات الذروة.",
        time: 1640908800000,
        profile_photo_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    },
    {
        author_name: "محمد حسن",
        rating: 5,
        text: "خدمة عملاء ممتازة! تم التعامل مع طلبي بسرعة ومهنية عالية. المكان نظيف والموظفون مهذبون ومتعاونون.",
        time: 1640822400000,
        profile_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        author_name: "سارة أحمد",
        rating: 3,
        text: "تجربة جيدة بشكل عام. المكان لطيف لكن يحتاج لبعض التحسينات في السرعة. الموظفون ودودون.",
        time: 1640736000000,
        profile_photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
        author_name: "عبدالله خالد",
        rating: 5,
        text: "أفضل مكان في المنطقة! جودة عالية، خدمة سريعة، وأسعار مناسبة. أزوره بانتظام ولم أشعر بالخيبة أبداً.",
        time: 1640649600000,
        profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
        author_name: "نورا سالم",
        rating: 4,
        text: "مكان رائع للعائلات. الأطفال أحبوا المكان كثيراً. الطعام طازج ولذيذ. أنصح بالحجز مسبقاً في عطلة نهاية الأسبوع.",
        time: 1640563200000,
        profile_photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
        author_name: "يوسف عمر",
        rating: 5,
        text: "تجربة لا تُنسى! كل شيء كان مثالياً من الاستقبال حتى الخدمة. المكان نظيف جداً والموظفون محترفون.",
        time: 1640476800000,
        profile_photo_url: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face"
    },
    {
        author_name: "ليلى محمود",
        rating: 4,
        text: "جودة ممتازة وخدمة جيدة. المكان مريح والأجواء هادئة. مناسب للاجتماعات والمناسبات الخاصة.",
        time: 1640390400000,
        profile_photo_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    },
    {
        author_name: "كريم أحمد",
        rating: 5,
        text: "خدمة استثنائية! تجاوزت توقعاتي بكثير. الموظفون ودودون ومتعاونون. أنصح الجميع بتجربة هذا المكان.",
        time: 1640304000000,
        profile_photo_url: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
    },
    {
        author_name: "هند سعد",
        rating: 4,
        text: "مكان جميل ومريح. الخدمة سريعة والموظفون مهذبون. الأسعار معقولة والجودة جيدة. سأعود مرة أخرى بالتأكيد.",
        time: 1640217600000,
        profile_photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    }
];

// Function to get dummy reviews with calculated average
function getDummyReviews() {
    const totalRating = dummyReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / dummyReviews.length).toFixed(1);
    
    return {
        reviews: dummyReviews,
        totalCount: dummyReviews.length,
        averageRating: parseFloat(averageRating)
    };
}

// Function to format time for display
function formatReviewTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return "منذ يوم واحد";
    } else if (diffDays < 7) {
        return `منذ ${diffDays} أيام`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? "منذ أسبوع واحد" : `منذ ${weeks} أسابيع`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return months === 1 ? "منذ شهر واحد" : `منذ ${months} أشهر`;
    } else {
        const years = Math.floor(diffDays / 365);
        return years === 1 ? "منذ سنة واحدة" : `منذ ${years} سنوات`;
    }
}

