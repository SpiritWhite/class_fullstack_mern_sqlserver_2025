
const crearEdificio = (props) => {
  const {
    altura,
    m2,
    nombre,
    color
  } = props;
  
  const msg = `
    El edificio tiene por nombre ${nombre}, 
    este tendra una altura de ${altura}, 
    tendra una dimension de ${m2} metros cuadrados,
    y su color sera ${color}
  `;

  return [msg, JSON.stringify(props)];
};

const InstrConstruccion = [
  {
    altura: 50,
    m2: 70,
    nombre: 'Gran B',
    color: 'blanco'
  },
  {
    altura: 150,
    m2: 120,
    nombre: 'El Hilton',
    color: 'amarillo'
  },
];


InstrConstruccion.forEach((elemento, index) => {
  const [msg, obj] = crearEdificio(elemento);

  const { altura, m2, nombre, color } = JSON.parse(obj);

  console.log(`Elemento: ${index}`, msg);

  console.log('Altura', altura);
  console.log('Dimension', m2);
  console.log('Nombre', nombre);
  console.log('Color', color);
});
