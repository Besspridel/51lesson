<template>
    <div class="container">
      <button @click="connectionWallet" class="connect-button">Подключить Metamask</button>
      
      <div class="info-box">
        <div class="info-item">Адрес юзера: {{ $store.state.wallet.address }}</div>
        <div class="info-item">Название сети: {{ $store.state.wallet.chain }}</div>
        <div class="info-item">ID сети: {{ $store.state.wallet.chainId }}</div>
      </div>
      
      <div class="container">
        <div class="info-box">
          <input v-model="to" placeholder="Укажите адрес получателя">
        </div>
        <div class="info-box">
          <input v-model="value" placeholder="Укажите сумму">
        </div>
        <button @click="sendTx" class="connect-button">Отправить</button>
      </div>
      
      <div class="container">
        <button @click="deployContract" class="connect-button">Задеплоить контракт</button>
      </div>
      
      <div class="container">
        <div class="info-box">
          <input v-model="number" placeholder="Укажите число">
        </div>
        <div class="info-box">
          <input v-model="cAddress" placeholder="Укажите адрес">
        </div>
        <button @click="sNumber" class="connect-button">Отправить</button>
      </div>
      
      <div class="container">
        <div class="info-box">
          <input v-model="cAddress" placeholder="Укажите адрес">
        </div>
        <button @click="gNumber" class="connect-button">Получить</button>
        <div>Число = {{ ans }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        to: "",
        value: "",
        number: "",
        ans: "",
        cAddress: ""
      }
    },
    name: 'Main',
    methods: {
      ...mapActions({
        connectionWallet: 'connectionWallet',
        sendTransaction: 'sendTransaction',
        deployContract: 'deployContract',
        setNumber: 'setNumber',
        getNumber: 'getNumber'
      }),
      async sendTx() {
        await this.sendTransaction(this.to, this.value)
        this.to = ''
        this.value = ''
      },
      async sNumber() {
        await this.setNumber([this.cAddress, this.number])
      },
      async gNumber() {
        this.ans = await this.getNumber(this.cAddress)
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px; /* Добавил отступ сверху для лучшего визуального восприятия */
  }
  
  .connect-button {
    padding: 10px 20px;
    margin-bottom: 20px;
    font-size: 16px;
    color: white;
    background-color: #3498db;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .info-box {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    width: 340px;
    margin-bottom: 20px; /* Добавил отступ снизу для лучшего визуального восприятия */
  }
  
  .info-item {
    border-bottom: 1px solid #ddd;
    padding: 8px;
  }
  
  .info-item:last-child {
    border-bottom: none;
  }
  </style>