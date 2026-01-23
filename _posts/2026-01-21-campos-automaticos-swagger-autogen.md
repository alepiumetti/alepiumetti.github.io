---
layout: post
title:  "Pacto entre derrotados"
date:   2026-01-06 10:53:00 +03
tags: [dev]
mastodon_url: ""
---

Cuando hay campos automáticos en la documentación de Swagger, autogenerado por el módulo swagger-autogen se puede resolver con una directiva para que no lea el endpoint automáticamente.


Problema: 

![alt text](../assets/images/Problema.jpg)

Solución: 

Agregar la directiva `#swagger.auto = false`

```javascript

routes.get('/api/usuarios',
  /* 
    #swagger.auto = false <-- 
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Obtener usuarios'
    #swagger.description = 'Devuelve los usuarios.'
  ...
  */
)
```

![alt text](../assets/images/Solucion.jpg)
