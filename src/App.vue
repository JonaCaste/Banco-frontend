<template>
  <div id="app">
    <div class="header shadow">
      <h2>Banco Misión TIC</h2>
      <div class="buttons">
        <button v-on:click="loadLogIn" v-if="!is_auth">Ingresar</button>
        <button v-on:click="loadSignUp" v-if="!is_auth">Registro</button>
        <button v-on:click="logout" v-if="is_auth">Cerrar sesión</button>
      </div>
      <button v-on:click="navResponsive" class="button-nav-responsive"><img src="https://img.icons8.com/material-rounded/24/ffffff/menu.png"/></button>
      <div class="nav-buttons-responsive" v-bind:class="{'nav-buttons-responsive_active': navResponsive_isActive}">
        <button v-on:click="loadLogIn" v-if="!is_auth">Ingresar</button>
        <button v-on:click="loadSignUp" v-if="!is_auth">Registro</button>
        <button v-on:click="logout" v-if="is_auth">Cerrar sesión</button>
      </div>
    </div>
    <router-view v-on:completedLogin="completedLogin"></router-view>
    <!-- router-view Carga el componente de lo ultimo que esta en la ruta ruta -->
    <!--:completedLogin es el evento que emite el hijo y carga completedLogin -->
  </div>
</template>


<script>
export default {
    name: "App",                // Nombre del componente

    data: function() {          // Todas las variables de este componentes
      return {
        is_auth: false,
        navResponsive_isActive: false
      }
    }, 

    methods: {                  //todas las funciones que utiliza este componente
      verifyAuth(){
        this.is_auth = localStorage.getItem("is_auth") || false;
        if(this.is_auth){
          this.loadTransactions();
        }else{
          this.loadLogIn();
        }
      },  
      loadLogIn(){
        this.$router.push({name: "logIn"});     //pone logIn al final de la ruta
      },
      loadSignUp(){
        this.$router.push({name: "signUp"});
      },
      loadTransactions(){
        this.$router.push({name: "transactions"});
      },
      completedLogin(data){
        this.is_auth = true;
        localStorage.setItem("is_auth", true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        this.verifyAuth()
      },
      logout(){
        this.is_auth = false;
        localStorage.clear();
        this.verifyAuth()
      },
      navResponsive(){
        if(this.navResponsive_isActive == false) this.navResponsive_isActive = true;
        else this.navResponsive_isActive = false;
      }
    },
    created: function () {            //eventos, lo que pasa cuando el componente se inicia
      this.verifyAuth();              //llamamos loadLogIn() al cargar este componente
    }
};
</script>


<style>
  .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0f0fab;
        color: white;
        padding: 10px 50px;
        height: 80px
  }
  body{
    margin: 0;
  }
  .header h2{
    margin: 0;
    font-family: sans-serif;
  }
  .header button{
    border: none;
    background-color: transparent;
    color: white;
  }
  .menu{
    display: none;
  }
  .menu img{
        width: 25px;
  }
  @media(max-width: 500px){
    .buttons{
      display: none;
    }
    .menu {
      display: block;
    }
    .header{
      padding: 10px 20px;
    }
  }

  /* Barra responsive */

  .nav-buttons-responsive{
    position: absolute;
    left: 0;

    top: -100%;

    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 20px 0;

    background-color: #0f0fab;

    transition: all 0.8s;

    z-index: 2000;

  }

  .nav-buttons-responsive button{
    width: 50%;
    margin: 0 auto 10px auto;

    border: none;
    background-color: transparent;

    font-size: 15px;

    color: #fff;
  }

  .button-nav-responsive{
    border: none;
    background-color: transparent;

    font-weight: bold;
    font-size: 15px;

    color: #fff;
  }
  
  .nav-buttons-responsive_active{
    top: 80px;
  }

  @media (min-width: 500px) {
    .nav-buttons{
      display: block;
    }

    .button-nav-responsive{
      display: none;
    }

    .nav-buttons-responsive{
      display: none;
    }
  }
</style>