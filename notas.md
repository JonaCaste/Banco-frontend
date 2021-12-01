# Frontend - Vue

## Crear proyecto
### Recordemos que debemos tener instalado Vue en nuetro equipo
Creamos el proyecto con `vue create bank-fe`

Seleccionamos la config manual y seleccionamos:
* Choose Vue version
* Babel
* Router
Posteriormente selecionamos la versión, en este caso: `3.x`
Ahora marcamos `n`(no) a `Use history mode for router?`
Para la configuracón del proyecto, seleccionamos `In package.json`
Para terminar, marcamos `n`(no) a `Save this as a preset for future projects?`

## Componentes
Los componentes cuentan con:
* template
* style
* scripts

El componente principal se encuentra en `app.vue`, y es el que se monta dento de `#app` en el archivo `main.js`

## router
En la carpeta `router/` encontramos todas las rutas, dentro encontramos `index.js`

En nuestro proyecto lo moveremos a la carpeta raiz y lo renombraremos `router.js`; por que solo vamos a utilizar este archivo de rutas