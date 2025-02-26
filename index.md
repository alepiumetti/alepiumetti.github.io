---
layout: default
title: Inicio?
---


## Del dicho al hecho. 

Cómo costumbre de inicio del año tengo: Ver la trilogía del señor de los anillos, las 3 pelis de kung fu panda, abrir un servidor de minecraft con amigues y retomar el blog. 

Así que acá estoy, retomando el blog por enésima vez en mi vida.

___ 

## Recent Posts
<ul>
  {% for post in site.posts limit:3 %}
    <li>
      <span>{{ post.date | date: "%Y-%m-%d" }}</span>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

___ 

Encontrame hablando de más en [mastodon](https://rebel.ar/@piumaster)