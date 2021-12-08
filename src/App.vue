<template>
  <div id="app">
    <div class="header shadow">
      <h2>Banco Misión TIC</h2>
      <div class="buttons">
        <button v-on:click="loadLogIn" v-if="!is_auth">Ingresar</button>
        <button v-on:click="loadSignUp" v-if="!is_auth">Registro</button>
        <button v-on:click="logout" v-if="is_auth">Cerrar sesión</button>
      </div>
      <div class="menu">
        <img src="./assets/menus.png">
      </div> 
    </div>
    <router-view v-on:completedLogin="completedLogin"></router-view> <!-- Carga el componente de lo ultimo de la ruta -->
  </div>
</template>


<script>
export default {
    name: "App",                // Nombre del componente

    data: function() {          // Todas las variables de este componentes
      return {
        is_auth: false
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
        background-color: #0d0d73;
        color: white;
        padding: 10px 50px;
        height: 54px
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
</style>