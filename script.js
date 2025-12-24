lucide.createIcons();

// --- 1. PROJECT CONFIGURATION ---
const projects = {
    'p1': { 
        color: '#f59e0b', 
        title: 'BEST SNACKS OF<span style="color:#f59e0b"> LAWGATE // LPU</span>', 
        badge: 'PROJECT 001',
        date: "Dec 25, 2025 00:00:00 GMT+0530",
        img: 'url("https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1920&q=80")' 
    },
    'p2': { 
        color: '#ec4899', 
        title: ' CAKES FOR YOUR FRIENDS<span style="color:#ec4899"> BIRTHDAY</span>', 
        badge: 'PROJECT 002', 
        date: "Jan 01, 2026 00:00:00  GMT+0530", 
        img: 'url("https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1920&q=80")' 
    },
    'p3': { 
        color: '#ef4444', 
        title: 'WINTER <span style="color:#ef4444">FESTIVAL</span>', 
        badge: 'ENJOY', 
        date: "Dec 25, 2025 00:00:00  GMT+0530", 
        img: 'url("https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=1920&q=80")' 
    },
    'p5': { 
        color: '#8b5cf6', 
        title: 'STUDENT <span style="color:#8b5cf6">PARTNERS</span>', 
        badge: 'JOIN US', 
        date: "Feb 14, 2026 00:00:00  GMT+0530", 
        img: 'url("https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=80")' 
    },
    'invest': { 
        color: '#ffffff', 
        title: 'JOIN <span style="color:#fff">THE BOARD</span>', 
        badge: 'INNER CIRCLE', 
        date: "Jan 01, 2026 00:00:00  GMT+0530", 
        img: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80")' 
    },
    'feedback': { 
        color: '#10b981', 
        title: 'SYSTEM <span style="color:#10b981">DIAGNOSTICS</span>', 
        badge: 'UPLINK ONLINE', 
        date: "Dec 25, 2025 00:00:00  GMT+0530", 
        img: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80")' 
    }
};

// --- 2. VIEW NAVIGATION LOGIC ---
let countdownInterval;

function activateView(pid) {
    const config = projects[pid];
    const root = document.documentElement;
    root.style.setProperty('--accent', config.color);
    document.getElementById('dynamic-bg').style.backgroundImage = `linear-gradient(to bottom, rgba(5,5,5,0.85), rgba(5,5,5,0.98)), ${config.img}`;
    document.getElementById('hero-title').innerHTML = config.title;
    document.getElementById('hero-badge').innerText = config.badge;
    document.getElementById('hero-badge').style.borderColor = config.color;
    document.getElementById('hero-badge').style.color = config.color;

    document.querySelectorAll('.dock-item').forEach(el => el.classList.remove('active'));
    const tab = document.getElementById('tab-' + pid);
    if(tab) tab.classList.add('active');

    document.querySelectorAll('.view-panel').forEach(el => el.classList.remove('active'));
    document.getElementById(pid).classList.add('active');

    const timerEl = document.getElementById('countdown-frame');
    const labelEl = document.getElementById('countdown-label');

    if (pid === 'invest' || pid === 'feedback') {
        timerEl.style.display = 'none';
        if(labelEl) labelEl.style.display = 'none';
    } else {
        timerEl.style.display = 'inline-flex';
        if (pid === 'p1' && labelEl) {
            labelEl.style.display = 'block';
            labelEl.innerHTML = '<span class="window-alert">SYSTEM ALERT: ORDERS CLOSE 24 HRS PRIOR</span>WINDOW 1: DEC 25 (3PM-6PM) | WINDOW 2: JAN 01 (3PM-6PM)';
        } else if (labelEl) {
            labelEl.style.display = 'none';
        }
    }

    startCountdown(config.date);
    window.scrollTo(0, 0);
}

function startCountdown(dateString) {
    clearInterval(countdownInterval);
    const target = new Date(dateString).getTime();
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const gap = target - now;
        if(gap < 0) return;
        document.getElementById('d').innerText = Math.floor(gap / (1000 * 60 * 60 * 24)).toString().padStart(2,'0');
        document.getElementById('h').innerText = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2,'0');
        document.getElementById('m').innerText = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2,'0');
        document.getElementById('s').innerText = Math.floor((gap % (1000 * 60)) / 1000).toString().padStart(2,'0');
    }, 1000);
}

// --- 3. UTILITY FUNCTIONS ---
function scrollToForm() { document.querySelector('.view-panel.active .form-terminal').scrollIntoView({behavior: 'smooth'}); }

function showToast(msg) {
    const box = document.getElementById('toast-box');
    document.getElementById('toast-msg').innerText = msg;
    box.classList.add('show');
    setTimeout(() => box.classList.remove('show'), 3000);
}

// --- 4. APP POPUP LOGIC ---
function showAppPopup() {
    // Check if user has already closed it in this session to avoid annoyance
    if(!sessionStorage.getItem('appPopupClosed')) {
        document.getElementById('app-modal').style.display = 'flex';
        setTimeout(() => document.getElementById('app-modal').classList.add('active'), 10);
    }
}

function closeAppModal() {
    document.getElementById('app-modal').classList.remove('active');
    setTimeout(() => document.getElementById('app-modal').style.display = 'none', 400);
    sessionStorage.setItem('appPopupClosed', 'true');
}

// --- 5. TICKER ---
const msgs = ["Rahul from BH-4 just pre-ordered 5 Samosas...", "Simran from GH-2 just booked a Cake...", "New Investor interest from Chandigarh...", "Batch 1 for Christmas is 80% Full..."];
let msgIndex = 0;
setInterval(() => {
    msgIndex = (msgIndex + 1) % msgs.length;
    document.getElementById('ticker-text').innerText = msgs[msgIndex];
}, 5000);

// --- 6. ROBUST HIDDEN COUNTER (ALT + V) ---

const NAMESPACE = 'provertos-v2-counter'; 
const KEY = 'visits';
const counterEl = document.getElementById('secret-counter');
const countVal = document.getElementById('view-count-val');
let currentCount = 0;

function setDisplayCount(val, source) {
    currentCount = val;
    countVal.innerText = val;
    console.log(`Counter updated from ${source}: ${val}`);
}

function initCounter() {
    let localHits = localStorage.getItem('local_hits');
    if(!localHits) localHits = 0;
    localHits = parseInt(localHits) + 1;
    localStorage.setItem('local_hits', localHits);
    setDisplayCount(localHits, "Local Storage");

    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
        .then(res => res.json())
        .then(data => {
            setDisplayCount(data.value, "Global API");
        })
        .catch(err => {
            console.log('Global Counter API Blocked/Down. Using Local Count.');
        });
}

document.addEventListener('keydown', function(event) {
    if (event.altKey && (event.key === 'v' || event.key === 'V')) {
        if(counterEl.style.display === 'none') {
            counterEl.style.display = 'block';
        } else {
            counterEl.style.display = 'none';
        }
    }
});

// --- 7. INITIALIZATION ---
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img"));
    lazyImages.forEach(function(img) { if(img.complete) img.classList.add('loaded'); img.onload = function() { img.classList.add('loaded'); } });
    
    activateView('p1');
    initCounter(); 

    // Trigger Pop-up after 3.5 seconds
    setTimeout(showAppPopup, 3500);
});