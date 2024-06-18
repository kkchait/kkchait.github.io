---
layout: default
title: Home
---

# Welcome to My Portfolio

This is a showcase of my work. Below are some of my key projects:

{% for project in site.portfolio %}
  <div class="project">
    <h2>{{ project.title }}</h2>
    <p><strong>Client:</strong> {{ project.client }}</p>
    <p><strong>Goal:</strong> {{ project.goal }}</p>
    <p>{{ project.content }}</p>
  </div>
{% endfor %}
