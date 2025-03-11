/**
 * Este script redimensiona las imagenes de la carpeta imgs a 300px de ancho y las guarda en la misma carpeta con el sufijo -small.webp
 * y a 800px de ancho con el sufijo -800.webp
 * 
 * Para ejecutar este script, debes tener instalado Node.js en tu computadora.
 * 
 * Para ejecutar este script:
 * 1. Abre la terminal en la carpeta del proyecto.
 * 2. Ejecuta npm init -y para inicializar un proyecto de Node.js.
 * 3. Instala el paquete sharp con el comando npm install sharp.
 * 
 * Usar el comando `node utils/resize-images.js` en la terminal para ejecutarlo.
 */


const fs = require( 'fs' );
const path = require( 'path' );
const sharp = require( 'sharp' );

const imagesFolder = path.join( __dirname, 'imgs', );

fs.readdir( imagesFolder, ( err, files ) => {
  if ( err ) {
    console.error( 'Error leyendo la carpeta de imagenes: ', err );
    return;
  }

  files.forEach( ( file ) => {
    const filePath = path.join( imagesFolder, file );

    const fileName = path.parse( file ).name;

    sharp( filePath )
      .resize( { width: 300 } )
      .toFile( path.join( imagesFolder, `${ fileName }-small.webp` ) )
      .then( () => {
        console.log( `Imagen ${ file } redimensionada a 300px de ancho` );
      } )
      .catch( err => console.error( err ) );

    sharp( filePath )
      .resize( { width: 800 } )
      .toFile( path.join( imagesFolder, `${ fileName }-800.webp` ) )
      .then( () => {
        console.log( `Generada: ${ fileName }-800.webp` );
      } )
      .catch( err => console.error( err ) );
  } );



} );