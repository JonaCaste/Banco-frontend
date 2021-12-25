<template>
    <div>
        <div class="background"></div>

        <div class="form shadow-lg ">
            <h3>Iniciar Sesión</h3>
            <form v-on:submit.prevent="processLogIn">
                <input v-model="credentials.username" class="form-control" placeholder="Usuario"/>
                <input v-model="credentials.password" class="form-control" type="password" placeholder="Contraseña"/>
                <p v-if="show_error" class="error">Usuario o contraseña incorrectos</p> 
                <button v-bind:class="{'disabled': is_loading}" class="btn btn-primary">
                    <span v-if="!is_loading">Ingresar</span>
                    <div v-if="is_loading" class="spinner-border text-light" role="status"></div>
                </button>
            </form>
        </div>
    </div>
</template>


<script>
import gql from "graphql-tag";
export default {
    name: "LogIn", 
    data: function() {
        return {
            show_error: false,
            is_loading: false,
            credentials: {
                username: "",
                password: ""
            }
        }
    }, 
    methods: {
        processLogIn: async function (){
            this.is_loading = true;

            //los mutate siempre tienen mutation y variables
            await this.$apollo.mutate({
                mutation: gql`
                    mutation Login($credentials: LoginInput!) {
                        login(credentials: $credentials) {
                            key
                        }
                    }
                `,
                variables: {
                    credentials: this.credentials
                }
            })
            .then((result) => {
                console.log("FUNCIONÓOOO")
                this.is_loading = false;
                this.show_error = false;
                let data = {
                    username: this.credentials.username,
                    token: result.data.login.key
                }
                //emitimos un mensaje al padre, para que oculte los botones
                this.$emit("completedLogin", data);
            })
            .catch((error)=>{
                this.show_error = true;
                console.log("DIO ERROR :c")
                console.log(error)
                this.is_loading = false;
            })
        }
    }, 
    created: function () {}
};
</script>


<style >
    .background{
        /* background-image: url("https://images.pexels.com/photos/351264/pexels-photo-351264.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"); */
        height: calc(100vh - 80px);
    }
    .form{
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: white;
        transform: translate(-50%, calc(-50% + 40px));
        padding: 80px 50px;
        border-radius: 10px;
    }
    .form form{
        display: flex;
    flex-direction: column;
    }
    .form input{
        margin-bottom: 25px;
    }
    .form h3{
        text-align: center;
        margin-bottom: 30px;
    }
    .error{
        color: red;
        font-size: 15px;
    }
    .disabled{
        pointer-events: none;
        opacity: 0.6;
    }
    @media(max-width: 500px){
        .form {
             padding: 40px 25px;
            width: 85%;
        }
    }
</style>