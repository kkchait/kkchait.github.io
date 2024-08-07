function smoothScrollNav() {
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
}

function setTheme (mode = 'auto') {
    const userMode = localStorage.getItem('bs-theme');
    const sysMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    const useSystem = mode === 'system' || (!userMode && mode === 'auto');
    const modeChosen = useSystem ? 'system' : mode === 'dark' || mode === 'light' ? mode : userMode;
  
    if (useSystem) {
      localStorage.removeItem('bs-theme');
    } else {
      localStorage.setItem('bs-theme', modeChosen);
    }
  
    document.documentElement.setAttribute('data-bs-theme', useSystem ? (sysMode ? 'light' : 'dark') : modeChosen);
    document.querySelectorAll('.mode-switch .btn').forEach(e => e.classList.remove('text-body'));
    document.getElementById(modeChosen).classList.add('text-body');
}

function initializeConsentBanner() {
    if (!localStorage.getItem('cookiesAccepted')) {
        $('#consent-banner').show();
    }

    $('#accept-cookies').click(function() {
        localStorage.setItem('cookiesAccepted', 'true');
        $('#consent-banner').hide();
        // Initialize Google Analytics here
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    });

    $('#decline-cookies').click(function() {
        localStorage.setItem('cookiesAccepted', 'false');
        $('#consent-banner').hide();
        // Update Google Analytics consent
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    });
}

$(document).ready(function() {
    setTheme();
    document.querySelectorAll('.mode-switch .btn').forEach(e => e.addEventListener('click', () => setTheme(e.id)));
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => setTheme());
    
    smoothScrollNav();

    initializeConsentBanner();
});
    
