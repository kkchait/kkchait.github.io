document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/js/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const portfolioContainer = document.getElementById('portfolio-container');
            data.experience.forEach(job => {
                job.accomplishments.forEach(project => {
                    const projectHTML = `
                        <div class="swiper-slide">
                            <div class="project card mb-4">
                                <div class="card-body">
                                    <h2 class="card-title">${project.project}</h2>
                                    <p><strong>Client:</strong> ${project.client}</p>
                                    <p><strong>Goal:</strong> ${project.goal}</p>
                                    <p>${project.contributions.join('<br>')}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    portfolioContainer.innerHTML += projectHTML;
                });
            });

            // Initialize Swiper after populating projects
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                }
            });
        })
        .catch(error => {
            console.error('Error fetching portfolio data:', error);
        });
});
