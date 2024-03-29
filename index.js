require('dotenv').config();
const { leerInput, inquirerMenu, pausa, confirmar } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    
    const busquedas = new Busquedas();
    let opt; 

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
                // Buscar lugares
                // Seleccionar el lugar
                // Obntener clima

                console.log('\n Informacion de la ciudad\n');
                console.log('Ciudad:');
                console.log('Lat');
                console.log('Lng');
                console.log('Temperaura');
                console.log('Minima');
                console.log('Maxima');
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