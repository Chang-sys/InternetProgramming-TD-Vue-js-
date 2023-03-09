<template>
  <div id="app">
    <div class="container">
      <table>
        <tr>
          <td colspan="5">
            <div id="screen">
              <span id="screen_top">M=0</span>
              <div id="screen_bottom">
                <!-- v-text is a directive that is used to replace the content of HTML tag with private data -->
                <!-- It will update the content automatically when data is changed. It is called data reactive -->

                <span>{{ operand || '0' }}</span>
                <!-- <span v-text="operand" id="operand1">0</span>
                <span v-text="append1"></span>
                
                <span v-text="numb_2" id="operand3"></span> -->
                <!-- <span v-text=""></span> -->
              </div>
              <!-- <span id="screen_bottom">0</span> -->  
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <button @click="memoryClear" type="button" class="btn btn-warning">MC</button>
          </td>
          <td>
            <button @click="memoryRecall" type="button" class="btn btn-warning">MR</button>
          </td>
          <td>
            <button @click="memoryMinus" type="button" class="btn btn-warning">M-</button>
          </td>
          <td>
            <button @click="memoryAdd" type="button" class="btn btn-warning">M+</button>
          </td>
          <td>
            <button @Click="cancel" type="button" class="btn btn-light">
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button @click="apppend('7')" type="button" class="btn btn-light">7</button>
          </td>
          <td>
            <button @click="apppend('8')" type="button" class="btn btn-light">8</button>
          </td>
          <td>
            <button @click="apppend('9')" type="button" class="btn btn-light">9</button>
          </td>
          <td>
            <button @click="divide" type="button" class="btn btn-secondary">÷</button>
          </td>
          <td>
            <button @click="sign()" type="button" class="btn btn-light">+/-</button>
          </td>
        </tr>
        <tr>
          <td>
            <button @click="apppend('4')" type="button" class="btn btn-light">4</button>
          </td>
          <td>
            <button @click="apppend('5')" type="button" class="btn btn-light">5</button>
          </td>
          <td>
            <button @click="apppend('6')" type="button" class="btn btn-light">6</button>
          </td>
          <td>
            <button @click="times" type="button" class="btn btn-secondary">x</button>
          </td>
          <td>
            <button @click="minus" type="button" class="btn btn-secondary">-</button>
          </td>
        </tr>
        <tr>
          <td>
            <button v-on:click="apppend(1)" type="button" class="btn btn-light">
              1
            </button>
          </td>
          <td>
            <button @click="apppend('2')" type="button" class="btn btn-light">2</button>
          </td>
          <td>
            <button @click="apppend('3')" type="button" class="btn btn-light">3</button>
          </td>
          <td rowspan="2">
            <button @click="add" type="button" class="btn btn-secondary long-btn">+</button>
          </td>
          <td rowspan="2">
            <button @click="equal" type="button" class="btn btn-primary long-btn">=</button>
          </td>
        </tr>
        <tr>
          <td>
            <button @click="clear()" type="button" class="btn btn-danger">C</button>
          </td>
          <td>
            <button @click="apppend('0')" type="button" class="btn btn-light">0</button>
          </td>
          <td>
            <button @click="dot" type="button" class="btn btn-light">.</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="alert alert-danger" id="message_panel" role="alert">
      something wrong here
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      // This is the private data section which can be used inside this component
      previous: null,
      operand: '',
      operationClicked: false,
      operation: null,
      operationShow: '',
      memory: null,
    };
  },
  methods: {
    apppend(number) {
      // Assign number when user click to the operand data
      // To access private data from methods, use (this.)
      if (this.operationClicked) {
        this.operand = '';
        this.operationClicked = false;
      }
      this.operand = `${this.operand}${number}`;
    },
    showOperation(op){
      this.OperationShow = op;
    },
    setPrevious() {
      this.previous = this.operand;
      this.operationClicked = true;
    },
    // Operations methods
    add() {
      this.operation = (a, b) => a + b;
      this.setPrevious();
    },
    minus() {
      this.operation = (a, b) => b - a;
      this.setPrevious();
    },
    times() {
      this.operation = (a, b) => a * b;
      this.setPrevious();
    },
    divide() {
      this.operation = (a, b) => b / a;
      this.setPrevious();
    },
    equal() {
      this.operand = `${this.operation(
        parseFloat(this.operand),
        parseFloat(this.previous)
      )}`;
      this.memory = this.operand;
      this.previous = null;
    },
    clear() {
      this.operand = '';
    },
    sign() {
      this.operand = this.operand.charAt(0) == '-' ? this.operand.slice(1) : `-${this.operand}`;
    },
    dot() {
      if (this.operand.indexOf('.') === -1) {
        this.apppend('.');
      }
    },
    cancel(){
      parseInt(this.operand);
      this.operand = (this.operand - (this.operand % 10))/10;
    },
    // MC MR M- M+
    memoryClear() {
      this.memory = '';
    },
    memoryRecall() {
      this.operand = this.memory;
    },
    memoryAdd() {
      return parseFloat(this.operand) + parseFloat(this.memory);
    },
    memoryMinus() {
      return parseFloat(this.operand) - parseFloat(this.memory);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  margin-top: 10em;
  width: 300px;
  border: 1px solid black;
  padding-top: 20px;
  padding-bottom: 20px;
}

table {
  border-spacing: 7px;
  border-collapse: separate;
}

#screen {
  border: 1px solid black;
  padding: 7px;
  width: 100%;
  height: 4em;
}

#screen_top {
  display: block;
  font-size: 0.8rem;
}

#screen_bottom {
  font-size: 1.8rem;
  display: block;
  text-align: right;
}


.button-row {
  display: flex;
  justify-content: space-between;
}

button {
  width: 45px;
}

.long-btn {
  display: inline-block;
  height: 80px;
}

/* Message panel */
#message_panel {
  width: 300px;
  margin-top: 1em;
  display: none;
  margin-left: auto;
  margin-right: auto;
}
</style>
