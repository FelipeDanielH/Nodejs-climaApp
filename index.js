require('dotenv').config();
const { leerInput, inquirerMenu, pausa, confirmar, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    const busquedas = new Busquedas();
    let opt;
    busquedas.leerDB();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                // Buscar lugares
                const lugares = await busquedas.ciudad(termino);

                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if( id === '0') continue;
                const lugarSel = lugares.find(l => l.id === id);

                // Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);

                

                const { lng, lat } = lugarSel;
                // Obntener clima
                const clima = await busquedas.climaLugar(lat, lng);

                //Monstrar informacion
                console.clear();
                console.log('\n Informacion de la ciudad\n');
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat', lugarSel.lat);
                console.log('Lng', lugarSel.lng);
                console.log('Temperaura', clima.temp);
                console.log('Minima', clima.min);
                console.log('Maxima', clima.max);
                console.log('Como esta el clima:', clima.desc);
                await pausa();
                break;
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar,i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ lugar }`);
                })
                await pausa();
                break;
            case 0:
                await confirmar("gracias por preferirnos");
                break;
        }
    } while (opt !== 0);
}

main();