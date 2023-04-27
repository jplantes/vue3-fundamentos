describe( 'Primer prueba demo', () => {

  test('Debe de ser mayor a 10', () => { 
    
    // Arreglar
    let value = 5;

    // Estimulo
    value = value + 6;

    // Acerción
    expect( value ).toBeGreaterThan( 10 );
  })

})