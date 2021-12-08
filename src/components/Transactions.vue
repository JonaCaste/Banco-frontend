<template>
    <div class="transactionContainer">
        <!-- Account -->
        <div class="accountInfo shadow">
            <div class="titleContainer">
                <!-- <img src="../assets/bank.png"> -->
                <h3>Mi cuenta bancaria</h3>
            </div>
            <span class="money">$ {{formatPrice(accountByUsername.balance)}}</span>
            <span><b>Usuario: </b> {{username}}</span>
            <span><b>Fecha de creación:</b> 
                <span v-if="accountByUsername.lastChange">{{accountByUsername.lastChange}}</span>
                <span v-if="!accountByUsername.lastChange"> No registra</span>
            </span>
        </div>
        <!-- Creating Transaction -->
        <div class="transactionsSection">
            <h4>Transacciones</h4>
            <input v-model="transaction.usernameOrigin" class="form-control"  placeholder="Usuario Origen">
            <input v-model="transaction.usernameDestiny" class="form-control"  placeholder="Usuario Destino">
            <input v-model="transaction.value" class="form-control"  placeholder="Valor">
            <button v-on:click="createTransaction" class="btn btn-primary">Envíar</button>
        </div>
        <!-- Transactions -->
        <table class="table table-striped transactionsTable">
            <thead>
                <tr>
                    <th>Usuario origen</th>
                    <th>Usuario destino</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactionByUsername" :key="transaction.id">
                    <td>{{transaction.usernameOrigin}}</td>
                    <td>{{transaction.usernameDestiny}}</td>
                    <td >
                        <span  v-bind:class="{'negativeValue': transaction.usernameOrigin == username}" class="transactionValue" v-if="transaction.value">$ {{formatPrice(transaction.value)}}</span>
                        <span v-if="!transaction.value">0</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import gql from "graphql-tag";
export default {
    name: "Transactions", 
    data: function() {
        return {
            username: localStorage.getItem("username") || "none",
            //La variable debe llamarse igual que el metodo query, para que graphql haga todo automaticamente
            accountByUsername: {
                balance: "",
                lastChange: "",
            },
            transactionByUsername: [],
            transaction: {
                usernameOrigin: "",
                usernameDestiny: "",
                value: 0
            }
        }
    }, 
    //querys "automaticas" de apollo
    apollo: {
        accountByUsername: {
            query: gql`
                query AccountByUsername($username: String!) {
                    accountByUsername(username: $username) {
                        balance
                        lastChange
                    }
                }
            `,
            variables() {
                return {
                    username: this.username,
                };
            },
        },
        transactionByUsername: {
            query: gql`
                query TransactionByUsername($username: String!) {
                transactionByUsername(username: $username) {
                            id
                            date
                            usernameDestiny
                            usernameOrigin
                            value
                        }
                        }
                    `,
                    variables(){
                        return {
                            username: this.username
                        }
                    }
        }
    },
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            //expresion regular, pone punto al saldo
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        createTransaction: async function(){
            this.transaction.value = +this.transaction.value; // Convierte a entero porque el apigateway lo espera asi
            await this.$apollo.mutate({
                mutation: gql`
                 mutation CreateTransaction($transaction: TransactionInput!) {
                    createTransaction(transaction: $transaction) {
                        id
                        usernameDestiny
                        usernameOrigin
                        value
                    }
                }`,
                variables: {
                    transaction: this.transaction
                }
            })
            .then((result)=>{
                this.$apollo.queries.accountByUsername.refetch();
                 this.$apollo.queries.transactionByUsername.refetch();
                 this.transaction.usernameDestiny = ""
                 this.transaction.usernameOrigin = ""
                 this.transaction.value = 0
            })
            .catch((error)=>{
                console.log(error)
            })
        
        }
    }, 
    created: function () {
        this.$apollo.queries.accountByUsername.refetch();
        this.$apollo.queries.transactionByUsername.refetch();
    }
};
</script>


<style scoped>
/* scoped nos permite aplicar estilos solo a este componenete */

    .transactionContainer{
        width: 70%;
        margin: auto;
        margin-top: 50px;
    }
    .titleContainer{
        display: flex;
    align-items: center;
    margin-bottom: 5px;
    }
    .titleContainer h3{
        margin: 0;
        margin-left: 10px;
    }
    .accountInfo{
            display: flex;
    flex-direction: column;
      padding: 25px 50px;
    }
    .money{
            font-size: 35px;
    }
    .transactionsTable{
        margin-top: 25px;
    }
    .transactionValue{
        color: green;
    }
    .negativeValue{
        color: red;
    }
    .transactionsSection{
        margin-top: 50px;
    }
    .transactionsSection input{
        margin-right: 15px;
        width: 25%;
        display: inline;
    }
</style>