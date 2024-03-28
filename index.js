const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer")

const main = async () => {
    let opt = await inquirerMenu()

    do {
        switch (opt) {
            case 1:
                console.log("opcion 1");
                pausa();
                break;

            case 2:
                console.log("opcion 2");
                pausa();
                break
        }
    } while (opt === 0)

}

main();