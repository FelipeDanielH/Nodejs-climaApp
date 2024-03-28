const { leerInput, inquirerMenu, pausa, confirmar } = require("./helpers/inquirer")

const main = async () => {
    
    let opt; 

    do {
        opt = await inquirerMenu()
        switch (opt) {
            case 1:
                console.log("opcion 1");
                await pausa();
                break;
            case 2:
                console.log("opcion 2");
                await pausa();
                break;
            case 0:
                await confirmar("gracias por preferirnos, chau");
                break;
        }
    } while (opt !== 0);
}

main();