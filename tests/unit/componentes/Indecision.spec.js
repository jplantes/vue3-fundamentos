import { shallowMount } from "@vue/test-utils";

import Indecision from '@/components/Indecision'

describe( 'Pruebas sobre el componente <Indecision />', () => {

  let wrapper;

  // Para evaluar el console.log
  let clgSpy;

  //   Implementamos un "mock" sobre fetchAPI ya que en nodeJS no existe
  // y para solucionar el error del .then le decimos que devuelve una 
  // Promesa resuelta
  // Dentro de la resolucion retornamos el json
  global.fetch = jest.fn( () => Promise.resolve({
    json: () => Promise.resolve({
      answer: 'yes',
      forced: false,
      image: 'https://yesno.wtf/assets/yes/2.gif'
    })
  }));

  beforeEach( () => {
    wrapper = shallowMount( Indecision );
    clgSpy = jest.spyOn( console, 'log' );

    // Limpiar todos los mocks
    jest.clearAllMocks();
  });

  test( 'Debe coincidir con el snapshot', () => {

    expect( wrapper.html() ).toMatchSnapshot();
    
  });

  test( 'Escribir en el input no debe disparar nada', async () => {

    // El .vm es la instancia de VUE para poder acceder a las funciones
    const getPreguntasSpy = jest.spyOn( wrapper.vm, 'getPregunta' );

    const inputHtml = wrapper.find( 'input' );
    await inputHtml.setValue( 'Hola mundo' );

    expect( clgSpy ).toHaveBeenCalled();
    expect( getPreguntasSpy ).not.toHaveBeenCalled();
    
  });

  test( 'Escribir en el input (?) debe disparar la petición', async () => {
    // El .vm es la instancia de VUE para poder acceder a las funciones
    const getPreguntasSpy = jest.spyOn( wrapper.vm, 'getPregunta' );

    const inputHtml = wrapper.find( 'input' );
    await inputHtml.setValue( 'Hola mundo?' );

    expect( clgSpy ).toHaveBeenCalled();
    expect( getPreguntasSpy ).toHaveBeenCalled();
  });

  test( 'Pruebas en getPregunta', async () => {

    await wrapper.vm.getPregunta();

    const imgHtml = wrapper.find( 'img' );
    expect( imgHtml.exists() ).toBeTruthy();


    expect( wrapper.vm.img ).toBe( 'https://yesno.wtf/assets/yes/2.gif' );
    expect( wrapper.vm.respuesta ).toBe( 'Si' );

  });

  test( 'Pruebas en getPregunta - fallo en el API', async () => {
    
    fetch.mockImplementationOnce( () => Promise.reject( 'API is down' ));
    
    await wrapper.vm.getPregunta();

    const imgHtml = wrapper.find( 'img' );
    expect( imgHtml.exists() ).toBeFalsy();
    expect( wrapper.vm.respuesta ).toBe( 'No se pudo cargar del API' );
  });

});