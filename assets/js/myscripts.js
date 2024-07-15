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

$(document).ready(function() {
    smoothScrollNav();
});
    
