<template>
  <!-- 
    Componente declarado en el "script" 
    
    El v-bain envia el valor del atributo y no la asignación como String por defecto 
    el v-baind: se recuse a :
    <img alt="Vue logo" src="./assets/logo.png">
    <Counter  :start="101"/>
  -->

  <Indecision />
 

</template>

<script>
// Importacion de los componentes a utilizar
import Indecision from './components/Indecision.vue';
import Counter from './components/Counter.vue';

export default {
  name: 'App',
  
  // Declaración de los componentes importados
  components: {
    Counter,
    Indecision
  }
}
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
</style>
