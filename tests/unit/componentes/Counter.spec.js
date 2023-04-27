import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter';


describe( 'Pruebas sobre el componente Counter', () => {

  let wrapper;

  beforeEach( () => {
    wrapper = shallowMount( Counter );
  }); 

  test( 'Que el snapshot debe coincidir', () => {

    // Con shallowMount se hace un render del componente mas liviano

    // expect( wrapper.html() ).toMatchSnapshot();

  });

  test( 'h2 debe tenes valor por defecto "Contador"', () => {

    //   El find buscar el atributo que le definimos
    // puede sera una ID, un clase, un atributo... etc.
    const h2 = wrapper.find( 'h2' );
    expect( h2.text() ).toBe( 'Contador' );

  });

  test( 'El valor por defecto debe ser 100 en el <p>', () => {

    // de esta manera busco la segunda etiqueta <p>
    const pTags = wrapper.findAll( 'p' );
    expect(  pTags[1].text() ).toBe( '50' );

    // Realizo la misma prueba que arriba pero por el data-atribute
    // Para indicar que es un data-atribute se coloca entre []
    const value = wrapper.find( '[data-testid="counter"]' ).text();
    expect( value ).toBe( '50' );

  });

  test( 'Incrementar en 1 el valor del contador', async () => {

    const incrementarBtn = wrapper.find( '[data-testid="incrementar"]' );
    //   La renderización del componente no es sincrona, por lo cual cuando 
    // hago un click debo esperar a que se vuelva renderizar
    await incrementarBtn.trigger( 'click' );

    const value = wrapper.find( '[data-testid="counter"]' ).text();

    expect( value ).toBe( '51' );


  });

  test( 'Decrementar en 1 el valor del contador', async () => {

    const decrementarBtn = wrapper.find( '[data-testid="decrementar"]' );
    //   La renderización del componente no es sincrona, por lo cual cuando 
    // hago un click debo esperar a que se vuelva renderizar
    await decrementarBtn.trigger( 'click' );
    await decrementarBtn.trigger( 'click' );

    const value = wrapper.find( '[data-testid="counter"]' ).text();

    expect( value ).toBe( '48' );


  });

  test( 'Establecer el valor por defecto', () => {

    // Obtengo las properties
    const { start } = wrapper.props();

    const counter = wrapper.find( '[data-testid="counter"]' ).text();

    expect( Number( counter ) ).toBe( start );
  });

  test( 'Enviar valores a props por compoente', () => {

    const title = 'Hola mundo';

    const wrapper = shallowMount( Counter, {
      props: {
        title
      }
    });

    expect( wrapper.find( 'h2' ).text()  ).toBe( title );
  });

});