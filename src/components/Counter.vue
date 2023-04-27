<template>
  <h2>{{ customTitle }}</h2>
  <p> {{ counter }} <sup>2</sup> = {{  getNumeroCuadrado }} </p>
  <p data-testid="counter"> {{ counter }} </p>
  <div>
    <!--
      El v-on: se reduce a colocar @
      <button v-on:click="incrementar"> +1 </button>
    -->
    <button data-testid="incrementar" @:click="incrementar"> +1 </button>
    <button data-testid="decrementar" @:click="decrementar"> -1 </button>
  </div>
</template>

<script>
  export default {
    name: 'Counter',
    props: {
      title: String,
      start: {
        type: Number,
        //required: true,
        default: 50,
        validator( value ) {
          return value > 100
        }
      }
    },
    data() {
      return {
        counter: this.start
      }
    },

    methods: {
      incrementar() {
        this.counter += 1
      },

      decrementar() {
        this.counter -= 1
      }
    },

    // Propiedades computadas
    computed: {
      //   Una vez ejecutado el getNumeroCuadrado queda guardada en "cache" por lo cual si se llama mas de una vez
      // se dispara solo una vez a menos que se cambie el valor de alguna propiedad
      getNumeroCuadrado() {
        console.log( 'getNumeroCuadrado' )
        return this.counter * this.counter
      },

      customTitle() {
        return this.title || 'Contador'
      }
    }
  }
</script>

<style lang="css" scoped>
  button{
   margin: 0px 4px;
   padding: 5px 10px; 
  }
</style>