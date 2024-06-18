---
layout: default
title: Home
---

<div class="container">
    <h1>Welcome to My Portfolio</h1>
    <p>This is a showcase of my work. Below are some of my key projects:</p>
    <div class="row">
        {% for project in site.portfolio %}
            <div class="col-md-6">
                <div class="project card mb-4">
                    <div class="card-body">
                        <h2 class="card-title">{{ project.title }}</h2>
                        <p><strong>Client:</strong> {{ project.client }}</p>
                        <p><strong>Goal:</strong> {{ project.goal }}</p>
                        <a href="{{ project.url | relative_url }}" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        {% endfor %}
    </div>
</div>
