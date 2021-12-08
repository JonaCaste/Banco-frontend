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

### Los estilos en Vue son globales
Podemos utilizar el atributo `scope` en la los `style` del componenete, para señalar que los estilos son locales

## Router
En la carpeta `router/` encontramos todas las rutas, dentro encontramos `index.js`

En nuestro proyecto lo moveremos a la carpeta raiz y lo renombraremos `router.js`; por que solo vamos a utilizar este archivo de rutas

## Conexión a GraphQL
Instalamos los siguientes paquetes para podernos conectar a un ApiGateway con Apollo y GraphQL
Con Apollo Client hacemos que tanto el ApiGateway como el cliente se comuniquen entre ellos
* `npm install graphql graphql-tag apollo-link-context vuex`
* `npm install --save @vue/apollo-composable @apollo/client @vue/apollo-option`

Configuramos el proyecto en `main.js`

## Directivas
Nos permite enlazar variables o metodos entre el HTML y el JS
* `v-model` -> enlaza un input con una variable
* `v-on`    -> entrelaza un evento
    * `v-on:submit` -> evento al enviar un formulario
    * `v-on:click`  -> evento al dar un click
* `v-if`    -> un condicional que muestra la etiqueta o no
* `v-bind:class="{"clase": condicion}"`    -> agrega una clase mientras esta el condicional esta activo

## Base de datos en los navegadores
* localStorage  -> Datos de la app
* Cookies       -> Publicidad
* Cache         -> Optimización

## Despliegue con Docker - Heroku
Los comandos los encontramos en `Dockerfile` con el mismo orden
Para el despliegue con Docker hacemos:
* Instalamos Node
* Instalamos paquetes para ejecutar aplicaiones http-server
    * `install -g` -> -g instala de manera global
* seleccionamos la carpeta en la que vamos a trabajar
* Copiar y pegar el archivo `package.json` y `package-lock.json`
* Instalamos el `package.json`
* Copiamos y pegamos todo el proyecto
* Exponemos los puertos
* Corremos el servidor

Realizamos el despliegue en heroku

## Vue.config
Creamos el archivo `vue.config.js`
En este archivo apagamos una configuracion de Vue, ya que nos puede generar errores (solapando configs) con heroku 