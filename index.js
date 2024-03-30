require('dotenv').config();
const { leerInput, inquirerMenu, pausa, confirmar, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    const busquedas = new Busquedas();
    let opt;

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
                const lugarSel = lugares.find(l => l.id === id);
                console.log(lugarSel);

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

                await pausa();
                break;
            case 0:
                await confirmar("gracias por preferirnos, chau");
                break;
        }
    } while (opt !== 0);
}

main();