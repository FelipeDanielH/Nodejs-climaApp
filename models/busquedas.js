const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath = './db/database.json';
    dbFolder = './db';

    constructor() {
        // TODO leer DB si existe
    }

    get paramsMapbox() {
        return {
            'proximity': 'ip',
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get historialCapitalizado(){
        return this.historial.map( (dato) => {
            let palabras = dato.split(' ');

            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ')
        })
    }

    async ciudad(lugar = '') {
        try {
            // peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            console.log("no se encontro nada", error)
            return []
        }
    }

    async climaLugar(lat, lon) {

        const paramsOpenWeather = {
            lat,
            lon,
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }

        try {
            // instance axios create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: paramsOpenWeather
            })

            //resp.data
            const resp = await instance.get();

            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = '') {
        // TODO prevenir duplicados
        if( this.historial.includes(lugar.toLocaleLowerCase() )){
            return
        }

        this.historial = this.historial.splice(0,4);
        this.historial.unshift(lugar.toLowerCase())

        // Grabar en DB
        this.guardarDB()
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {

        if (!fs.existsSync(this.dbPath)){
            fs.mkdirSync(this.dbFolder);
            fs.writeFileSync(this.dbPath,'', (err) => {
                if(err) throw err;
            });
            return
        }

        const info = fs.readFileSync(this.dbPath,{
            encoding: 'utf-8'
        })

        const {historial} = JSON.parse(info)

        this.historial = historial

    }
}

module.exports = Busquedas;

