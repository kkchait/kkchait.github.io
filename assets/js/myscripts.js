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

/*
function drawSkillsCloud(data) {
    var skills = [];
    data.skillset.details.forEach(function(detailedSkills) {
        detailedSkills.skills.forEach(function(skill) {
            skills.push(skill);
        });
    });

    var wordCounts = {};
    skills.forEach(function(skill) {
        wordCounts[skill] = (wordCounts[skill] || 0) + 1;
    });

    var wordArray = Object.keys(wordCounts).map(function(key) {
        return { text: key, size: wordCounts[key] * 10 };
    });

    d3.layout.cloud()
        .size([500, 300])
        .words(wordArray)
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();

    function draw(words) {
        d3.select("#skillsWordCloud")
            .append("svg")
            .attr("width", 500)
            .attr("height", 300)
            .append("g")
            .attr("transform", "translate(250,150)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", "#007bff")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
}
*/

/*
function initializeConsentBannerByGeoloc() {
    window.cookieconsent.initialise({
        palette: {
            popup: {
                background: "#000"
            },
            button: {
                background: "#f1d600"
            }
        },
        theme: "classic",
        content: {
            message: "Cookies are used to improve the experience. By using this site, it is agreed to the use of cookies.",
            dismiss: "Accept",
            link: "Learn more",
            href: "#",
            target: "_self"
        },
        onInitialise: function (status) {
            if (this.hasConsented()) {
                // User has consented
                localStorage.setItem('cookiesAccepted', 'true');
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            } else {
                // User has not consented
                localStorage.setItem('cookiesAccepted', 'false');
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        },
        onStatusChange: function (status) {
            if (this.hasConsented()) {
                // User has consented
                localStorage.setItem('cookiesAccepted', 'true');
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            } else {
                // User has not consented
                localStorage.setItem('cookiesAccepted', 'false');
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        },
        onRevokeChoice: function () {
            // User has revoked consent
            localStorage.setItem('cookiesAccepted', 'false');
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    });

    // Check geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            // Use a geolocation API to determine the user's country based on lat/lon
            $.getJSON(`https://geolocation-db.com/json/`, function(data) {
                var country = data.country_code;
                console.log("country code is " + country);

                const eeaCountries = ['DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'SE', 'FI', 'NO', 'DK', 'IE',
                                      'PT', 'GR', 'AT', 'PL', 'CZ', 'HU', 'SK', 'SI', 'HR', 'BG', 'RO',
                                      'EE', 'LV', 'LT', 'CY', 'LU', 'MT']
                const otherCountries = ['US']
                // Show consent banner only for users in the EEA and other countries with privacy laws
                if (eeaCountries.includes(country) || otherCountries.includes(country)) {
                    window.cookieconsent.show();
                } else {
                    // Automatically consent for users outside the EEA
                    localStorage.setItem('cookiesAccepted', 'true');
                    gtag('consent', 'update', {
                        'analytics_storage': 'granted'
                    });
                }
            });
        });
    } else {
        // If geolocation is not supported, show the consent banner
        window.cookieconsent.show();
    }
}
*/

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
    smoothScrollNav();

    initializeConsentBanner();
});
    
