// Register timeline helper
Handlebars.registerHelper('odd', function(value, options) {
    if((value % 2) == 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


$(document).ready(function() {
    $.getJSON('assets/json/mydata.json', function(data) {
        // Collect projects into flat list
        let projects = [];
        data.experience.forEach(exp => {
            exp.projects.forEach(proj => {
                if (proj.include) {
                    projects.push(proj);
                }
            });
        });
        data.projects = projects;
        
        // Compile template
        var source = $("body").html();
        var template = Handlebars.compile(source);
        var rendered = template(data);
        $("body").html(rendered);
        
        // Set the page title
        // var title = data.personal.firstname + " " + data.personal.lastname + " | Portfolio"
        // $(document).prop("title", title);

        // Initialize carousel
        $('.carousel').carousel({
            interval: 3000
        });

        // Create word cloud for skills
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

        d3.layout.cloud().size([500, 300])
            .words(wordArray)
            .padding(5)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();
    
        function draw(words) {
            d3.select("#skillsWordCloud").append("svg")
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

        // Smooth scrolling for navigation links
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
    });
});
    
