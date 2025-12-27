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