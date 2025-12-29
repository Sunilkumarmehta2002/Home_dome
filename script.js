/* =========================================
   1. SYSTEM INITIALIZATION & CONFIG
   ========================================= */
lucide.createIcons();

// Project Database
const projects = {
    'p1': { 
        color: '#f59e0b', // Amber
        title: 'BEST SNACKS OF<span style="color:#f59e0b"> LAWGATE // LPU</span>', 
        badge: 'Project 001',
        img: 'url("https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1920&q=80")' 
    },
    'p2': { 
        color: '#ec4899', // Pink
        title: 'CAKES FOR YOUR FRIENDS<span style="color:#ec4899"> BIRTHDAY</span>', 
        badge: 'PRE-ORDER ONLY', 
        img: 'url("https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1920&q=80")' 
    },
    'p3': { 
        color: '#ef4444', // Red
        title: 'WINTER <span style="color:#ef4444">FESTIVAL</span>', 
        badge: 'SEASONAL', 
        img: 'url("https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=1920&q=80")' 
    },
    'p5': { 
        color: '#8b5cf6', // Purple
        title: 'STUDENT <span style="color:#8b5cf6">PARTNERS</span>', 
        badge: 'JOIN THE TEAM', 
        img: 'url("https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=80")' 
    },
    'invest': { 
        color: '#ffffff', // White
        title: 'JOIN <span style="color:#fff">THE BOARD</span>', 
        badge: 'INNER CIRCLE', 
        img: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80")' 
    },
    'feedback': { 
        color: '#10b981', // Emerald
        title: 'SYSTEM <span style="color:#10b981">DIAGNOSTICS</span>', 
        badge: 'UPLINK ONLINE', 
        img: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80")' 
    }
};

// =========================================
// 2. VIEW CONTROLLER
// =========================================
function activateView(pid) {
    const config = projects[pid];
    if (!config) return;

    // 1. Update Colors & Background
    const root = document.documentElement;
    root.style.setProperty('--accent', config.color);
    
    const bg = document.getElementById('dynamic-bg');
    if(bg) {
        bg.style.backgroundImage = `linear-gradient(to bottom, rgba(5,5,5,0.85), rgba(5,5,5,0.95)), ${config.img}`;
    }

    // 2. Update Hero Text
    const heroTitle = document.getElementById('hero-title');
    const heroBadge = document.getElementById('hero-badge');
    
    if(heroTitle) heroTitle.innerHTML = config.title;
    if(heroBadge) {
        heroBadge.innerHTML = `<span style="display:inline-block; width:8px; height:8px; background:currentColor; border-radius:50%; margin-right:6px;"></span> ${config.badge}`;
        heroBadge.style.color = config.color;
        heroBadge.style.borderColor = config.color;
        // Reset specific gradient styles for non-default views if needed
        if(pid === 'p1') {
            heroBadge.style.background = `linear-gradient(90deg, ${config.color}, #d97706)`;
            heroBadge.style.color = '#fff';
            heroBadge.style.border = 'none';
        } else {
            heroBadge.style.background = 'rgba(0,0,0,0.6)';
            heroBadge.style.border = `1px solid ${config.color}`;
        }
    }

    // 3. Update Dock State
    document.querySelectorAll('.dock-item').forEach(el => el.classList.remove('active'));
    const tab = document.getElementById('tab-' + pid);
    if(tab) tab.classList.add('active');

    // 4. Switch Panels
    document.querySelectorAll('.view-panel').forEach(el => el.classList.remove('active'));
    const panel = document.getElementById(pid);
    if(panel) panel.classList.add('active');

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================
// 3. UTILITY & INTERACTION
// =========================================
function scrollToForm() { 
    const activeForm = document.querySelector('.view-panel.active .form-terminal');
    if(activeForm) {
        activeForm.scrollIntoView({behavior: 'smooth', block: 'start'});
        showToast("Loading Secure Form...");
    }
}

function showToast(msg) {
    const box = document.getElementById('toast-box');
    const txt = document.getElementById('toast-msg');
    if(box && txt) {
        txt.innerText = msg;
        box.classList.add('show');
        setTimeout(() => box.classList.remove('show'), 3000);
    }
}

// =========================================
// 4. APP POP-UP LOGIC
// =========================================
function showAppPopup() {
    const modal = document.getElementById('app-modal');
    // Check session storage to see if user closed it previously
    if(modal && !sessionStorage.getItem('appPopupClosed')) {
        modal.style.display = 'flex';
        // Small timeout to allow display:flex to apply before adding opacity class
        setTimeout(() => modal.classList.add('active'), 50);
    }
}

function closeAppModal() {
    const modal = document.getElementById('app-modal');
    if(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 400); // Wait for animation
        sessionStorage.setItem('appPopupClosed', 'true');
    }
}

// =========================================
// 5. LIVE TICKER SYSTEM
// =========================================
const msgs = [
    "🔥 NEW YEAR SALE: Use Code '2026' for instant discount.",
    "⚡ System Status: Instant Delivery Online.",
    "🛵 Order #2891 just delivered to BH-4...",
    "🍰 Simran just pre-booked a Red Velvet Cake...",
    "🚀 App is 3x faster. Download now.",
    "🍟 Batch 4 of Samosas Frying Now..."
];
let msgIndex = 0;

function startTicker() {
    const el = document.getElementById('ticker-text');
    if(!el) return;
    
    setInterval(() => {
        el.style.opacity = 0; // Fade out
        setTimeout(() => {
            msgIndex = (msgIndex + 1) % msgs.length;
            el.innerText = msgs[msgIndex];
            el.style.opacity = 1; // Fade in
        }, 500);
    }, 4000);
}

// =========================================
// 6. "GOD MODE" COUNTER (Alt + V)
// =========================================
const counterEl = document.getElementById('secret-counter');
const countVal = document.getElementById('view-count-val');

function initCounter() {
    // Simple Local Storage Counter for demo purposes
    let hits = localStorage.getItem('site_hits') || 0;
    hits = parseInt(hits) + 1;
    localStorage.setItem('site_hits', hits);
    
    if(countVal) countVal.innerText = hits;
}

document.addEventListener('keydown', function(event) {
    if (event.altKey && (event.key === 'v' || event.key === 'V')) {
        if(counterEl) {
            counterEl.style.display = (counterEl.style.display === 'none') ? 'block' : 'none';
        }
    }
});

// =========================================
// 7. BOOTSTRAP
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    // 1. Lazy Load Images
    const lazyImages = [].slice.call(document.querySelectorAll("img"));
    lazyImages.forEach(function(img) { 
        if(img.complete) img.classList.add('loaded'); 
        img.onload = function() { img.classList.add('loaded'); } 
    });
    
    // 2. Start Systems
    activateView('p1'); // Default View
    startTicker();
    initCounter();

    // 3. Trigger App Popup (Delay 2s for better UX)
    setTimeout(showAppPopup, 2000);
});


// =========================================
// 8. SHOPPING CART & PAYMENT SYSTEM
// =========================================

// Cart State
let cart = [];
const RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_KEY_ID'; // <--- PUT YOUR KEY HERE

function addToCart(name, price) {
    // Check if item exists
    const existingItem = cart.find(item => item.name === name);
    if(existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }
    updateCartUI();
    showToast(`Added ${name} to cart`);
    
    // Animate Cart Icon
    const floatBtn = document.querySelector('.cart-float');
    floatBtn.style.transform = 'scale(1.2)';
    setTimeout(() => floatBtn.style.transform = 'scale(1)', 200);
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');
    const btnTotalEl = document.getElementById('btn-pay-amt');
    const countBadge = document.getElementById('cart-count');

    // 1. Calculate Totals
    let total = 0;
    let count = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
    });

    // 2. Update HTML
    countBadge.innerText = count;
    totalEl.innerText = '₹' + total;
    btnTotalEl.innerText = '₹' + total;

    // 3. Render Items
    if(cart.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">Your cart is empty. Add some snacks!</div>';
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item-row">
            <div>
                <div class="item-name">${item.name}</div>
                <div style="font-size:0.8rem; color:#666;">₹${item.price} x ${item.qty}</div>
            </div>
            <div class="item-controls">
                <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                <span style="color:#fff; font-size:0.9rem; width:20px; text-align:center;">${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
            </div>
        </div>
    `).join('');
}

function updateQty(index, change) {
    if(cart[index].qty + change <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].qty += change;
    }
    updateCartUI();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
}

// =========================================
// 9. PAYMENT INTEGRATION
// =========================================
function processPayment() {
    // 1. Validation
    if(cart.length === 0) return showToast("Cart is empty!");
    
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const hostel = document.getElementById('cust-hostel').value;
    const room = document.getElementById('cust-room').value;

    if(!name || !phone || !room) {
        alert("Please fill in all delivery details.");
        return;
    }

    // 2. Calculate Total Amount (Razorpay expects amount in paise)
    let totalAmount = 0;
    cart.forEach(item => totalAmount += (item.price * item.qty));
    
    // 3. Create Options
    var options = {
        "key": d1GNpp5lXUPICl43XG2D0L6u, 
        "amount": totalAmount * 100, // Amount in paise
        "currency": "INR",
        "name": "Home-Dome",
        "description": "Snack Order Payment",
        "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80",
        "handler": function (response){
            // SUCCESS HANDLER
            console.log(response.razorpay_payment_id);
            paymentSuccess(response.razorpay_payment_id, totalAmount, {name, phone, hostel, room});
        },
        "prefill": {
            "name": name,
            "contact": phone
        },
        "theme": {
            "color": "#f59e0b"
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
        alert("Payment Failed: " + response.error.description);
    });
    rzp1.open();
}

function paymentSuccess(paymentId, amount, details) {
    // Here you would typically send this data to your backend
    // Since we are serverless, we will construct a WhatsApp message
    
    const orderItems = cart.map(i => `${i.name} x${i.qty}`).join(', ');
    
    const msg = `*NEW ORDER PAID* ✅%0A` +
                `*ID:* ${paymentId}%0A` +
                `*Amt:* ₹${amount}%0A` +
                `*Items:* ${orderItems}%0A` +
                `----------------%0A` +
                `*Name:* ${details.name}%0A` +
                `*Loc:* ${details.hostel} - ${details.room}%0A` +
                `*Phone:* ${details.phone}`;
                
    toggleCart();
    cart = []; // Clear cart
    updateCartUI();
    
    // Redirect to WhatsApp with Order Details
    window.location.href = `https://wa.me/917297810859?text=${msg}`;
}


// =========================================
// PROMO POPUP LOGIC
// =========================================

// Show popup 2 seconds after site loads
window.addEventListener('load', () => {
    // Check if user has already seen it in this session
    if (!sessionStorage.getItem('promoSeen')) {
        setTimeout(() => {
            const modal = document.getElementById('promo-modal');
            if(modal) {
                modal.style.display = 'flex';
                // Trigger confetti or sound here if desired
            }WELCOME10
        }, 2000); // 2000ms = 2 seconds delay
    }
});

function closePromo() {
    const modal = document.getElementById('promo-modal');
    modal.style.display = 'none';
    sessionStorage.setItem('promoSeen', 'true'); // Don't show again this session
}

function copyCode() {
    const code = document.getElementById('coupon-text').innerText;
    navigator.clipboard.writeText(code);
    
    // UI Feedback
    const feedback = document.getElementById('copy-feedback');
    feedback.innerText = "COPIED TO CLIPBOARD!";
    feedback.style.color = "#10b981"; // Green color
    
    // Haptic feedback for mobile
    if(navigator.vibrate) navigator.vibrate(50);
}





// =========================================
// UNIFIED POPUP LOGIC
// =========================================

window.addEventListener('load', () => {
    // Show after 2.5 seconds if not seen before
    if (!sessionStorage.getItem('unifiedModalSeen')) {
        setTimeout(() => {
            const modal = document.getElementById('unified-modal');
            if(modal) {
                modal.style.display = 'flex';
                // Trigger simple vibration on mobile
                if(navigator.vibrate) navigator.vibrate(50);
            }
        }, 2500); 
    }
});

function closeUnifiedModal() {
    const modal = document.getElementById('unified-modal');
    modal.style.display = 'none';
    sessionStorage.setItem('unifiedModalSeen', 'true');
}

function copyCode() {
    const code = document.getElementById('coupon-text').innerText;
    navigator.clipboard.writeText(code);
    
    // UI Feedback
    const feedback = document.getElementById('copy-feedback');
    feedback.innerText = "COPIED TO CLIPBOARD!";
    feedback.style.color = "#10b981"; // Green color
    
    // Animate the box
    const box = document.querySelector('.coupon-box');
    box.style.borderColor = "#10b981";
    
    if(navigator.vibrate) navigator.vibrate(50);
}