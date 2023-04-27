<template>
  <!-- v-baind: -> : -->
  <img v-if="img" :src="img" alt="bg">

  <div class="bg-dark"></div>

  <div class="indecision-container">

    <input 
      type="text" 
      placeholder="Hazme una pregunta"
      v-model="pregunta"
    >
    <p>Recuerda termina con un signo de interrogación (?)</p>
    
    <div v-if="isValidCuestion" >
      <h2>{{ pregunta }}</h2>
      <h1>{{ respuesta }}</h1>
    </div>

  </div>

</template>

<script>
  export default {
  
    data() {
      return {
        pregunta: null,
        respuesta: null,
        img: null,
        isValidCuestion: false
      }
    },

    methods: {
      async getPregunta() {

        try {
          this.respuesta = 'Pensando...'
  
          const { answer, image } = await fetch( 'https://yesno.wtf/api' ).then( r => r.json() )
  
          this.respuesta = ( answer === 'yes' ) ? 'Si' : 'No' 
          this.img = image
        } catch (error) {
          this.respuesta = 'No se pudo cargar del API'
          
        }
      }
    },

    watch: {
      // El observable se tiene que llamar igual que la propiedad que queremos observar
      pregunta( value, oldValue ) {

        this.isValidCuestion = false

        console.log({ value });

        if ( !value.includes( '?' ) ) return

        this.isValidCuestion = true

        //TODO: hacer peticion http
        this.getPregunta()

      }
    }


  }
</script>

<style lang="css" scoped>
  img, .bg-dark {
      height: 100vh;
      left: 0px;
      max-height: 100%;
      max-width: 100%;
      position: fixed;
      top: 0px;
      width: 100vw;
  }

  .bg-dark {
      background-color: rgba(0, 0, 0, 0.4);
  }

  .indecision-container {
      position: relative;
      z-index: 99;
  }
  
  input {
      width: 250px;
      padding: 10px 15px;
      border-radius: 5px;
      border: none;
  }
  input:focus {
      outline: none;
  }

  p {
      color: white;
      font-size: 20px;
      margin-top: 0px;
  }

  h1, h2 {
      color: white;
  }
  
  h2 {
      margin-top: 150px;
  }
</style>