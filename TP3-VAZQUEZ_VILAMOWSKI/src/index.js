import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from
"./modules/wrapper.js"
import axios from "axios";
import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
import ValidacionesHelper from './modules/validaciones-helper.js'
import DateTimeHelper from './modules/datetime-helper.js'
const app = express();
const port = 3000;

app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

app.get('/', (req, res) => { // EndPoint "/"
res.send('Ya estoy respondiendo!');
res.status(200).send("OK")
})

app.get('/saludar/:nombre', (req, res) => { // EndPoint "/saludar"
    const nombre = ValidacionesHelper.getStringOrDefault(req.params.nombre, "Juan");
    res.send('Hola ' + req.params.nombre);
    res.status(200).send("OK")
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => { // EndPoint "/"
    const ano = ValidacionesHelper.getIntegerOrDefault(req.params.ano, "2023");
    const mes = ValidacionesHelper.getIntegerOrDefault(req.params.mes, "02");
    const dia = ValidacionesHelper.getIntegerOrDefault(req.params.dia, "12");
    const fecha = new Date(`${ano}-${mes}-${dia}`);
    if (isNaN(Date.parse(fecha))){
        res.status(400).send('Fecha invalida');
    } 
    else {
        res.send('Fecha valida');
        res.status(200).send("OK")
    }
})

app.get('/matematica/sumar', (req, res) => {
    const n1 = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.n1), 2);
    const n2 = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.n2), 1);
    const resultado = sumar(n1, n2);
    res.send(`La suma da ${resultado}`)
    res.status(200).send("OK")
})

app.get('/matematica/restar', (req, res) => {
    const n1 = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.n1), 2);
    const n2 = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.n2), 1);
    const resultado = restar(n1, n2);
    res.send(`La resta da ${resultado}`)
    res.status(200).send("OK")
})

app.get('/matematica/multiplicar', (req, res) => {
    const n1 = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.n1), 2);
    const n2 = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.n2), 1);
    const resultado = multiplicar(n1, n2);
    res.send(`La multiplicación da ${resultado}`)
    res.status(200).send("OK")
})

app.get('/matematica/dividir', (req, res) => {
    const n1 = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.n1), 2);
    const n2 = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.n2), 1);
    const resultado = dividir(n1, n2);
    res.send(`La división da ${resultado}`)
    res.status(200).send("OK")
})

app.get('/wrapper/omdbsearchbypage', async (req, res) => {
    const s = ValidacionesHelper.getStringOrDefault(req.query.s, "Cars");
    const p = ValidacionesHelper.getIntegerOrDefault(req.query.p, 1);;
    let resultado = await OMDBSearchByPage(s, p);
    res.send(resultado)
    res.status(200).send("OK")
})

app.get('/wrapper/omdbsearchcomplete', async (req, res) => {
    const s = ValidacionesHelper.getStringOrDefault(req.query.s, "Cars");
    let resultado = await OMDBSearchComplete(s);
    res.send(resultado)
    res.status(200).send("OK")
})

app.get('/wrapper/omdbgetbyimdbid', async (req, res) => {
    const i = req.query.i;
    let resultado = await OMDBGetByImdbID(i);
    res.send(resultado)
    res.status(200).send("OK")
})

const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));
app.get('/alumno', (req, res) => {
    let resultado = alumnosArray.toString();
    res.send(resultado)
    res.status(200).send("OK")
})

app.get('/alumno/:dni', (req, res) => {
    const dni = req.params.dni;
    const alumnoEncontrado = alumnosArray.find(alumno => alumno.dni == dni);
    if (!alumnoEncontrado) {
    res.status(404).send("Alumno no encontrado");
    }
    res.status(200).send(alumnoEncontrado);
})

app.post('/alumno', (req, res) => {
    const { username, dni, edad } = req.query;
    if (!username || !dni || !edad) {
    res.status(400).send("Faltan campos");
    }
    const nuevoAlumno = new Alumno(username, dni, edad);
    alumnosArray.push(nuevoAlumno);

    res.status(201).send("Alumno creado satisfactoriamente");
})

app.delete('/alumno', (req, res) => {
    const dni = req.query.dni;
    if (!dni) {
    res.status(400).send("Falta el campo dni");
    }
    const alumnoIndex = alumnosArray.findIndex(alumno => alumno.dni == dni);
    if (alumnoIndex == -1) {
        return res.status(404).send("Alumno no encontrado");
    }
    alumnosArray.splice(alumnoIndex, 1);
    res.status(200).send("Alumno eliminado correctamente" );
})
 
app.get('/fechas/isDate', (req, res) => {
    const fecha = req.query.fecha;
    let valida = DateTimeHelper.isDate(fecha);
    if (valida){
        res.status(200).send("Fecha valida");
    } 
    else {
        res.status(400).send("Fecha inválida")
    }
}) 

app.get('/fechas/getEdadActual', (req, res) => {
    const fecha = req.query.fecha;
    let valida = DateTimeHelper.isDate(fecha);
    if (valida){
        let edad = DateTimeHelper.getEdadActual(fecha);
        res.status(200).send(edad);
    } 
    else {
        res.status(400).send("Fecha inválida")
    }
}) 

app.get('/fechas/getDiasHastaMiCumple', (req, res) => {
    const fecha = req.query.fecha;
    let valida = DateTimeHelper.isDate(fecha);
    if (valida){
        let cantDias = DateTimeHelper.getDiasHastaMiCumple(fecha);
        res.status(200).json("Cantidad de dias que faltan para tu cumple: " + String(cantDias) + ". Edad: " + DateTimeHelper.getEdadActual(fecha));
    } 
    else {
        res.status(400).send("Fecha inválida")
    }
}) 

app.get('/fechas/getDiaTexto', (req, res) => {
    const fecha = req.query.fecha;
    const abr = req.query.abr === 'true';
    let valida = DateTimeHelper.isDate(fecha);
    if (valida){
        res.status(200).json("Dia: " + DateTimeHelper.getDiaTexto(fecha, abr));
    } 
    else {
        res.status(400).send("Fecha inválida")
    }
}) 

app.get('/fechas/getMesTexto', (req, res) => {
    const fecha = req.query.fecha;
    const abr = req.query.abr === 'true';
    let valida = DateTimeHelper.isDate(fecha);
    if (valida){
        res.status(200).json("Mes: " + DateTimeHelper.getMesTexto(fecha, abr));
    } 
    else {
        res.status(400).send("Fecha inválida")
    }
}) 
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})