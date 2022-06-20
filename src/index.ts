// import fs from 'fs';
import fs from 'fs/promises';
import http from 'http';
import url from 'url';
import { calculator } from './calculator.js';

const PORT = process.env.PORT || 3204;

// const buffer = fs.readFileSync('./data/data.txt', { encoding: 'utf-8' });
// console.log(buffer);

export const server = http.createServer(async (req, res) => {
    const path = [...url.parse(req.url as string).path];
    const pathName = url.parse(req.url as string).pathname; // desestructurar
    let dataFile: string = `./data/${pathName}.txt`;
    console.log(dataFile);
    let a = path[14];

    let b = path[18];

    console.log(path);

    let results = calculator(a as number, b as number);
    // if (isNaN(a) && isNaN(b)) {
    //     res.end('Error de lectura no son numeros');
    // }

    try {
        const data = await fs.readFile(dataFile, {
            encoding: 'utf-8',
        });

        const template = `<h1> ${data} </h1><p>${a} + ${b}  = ${results.sum}</p>
        <p>${a} - ${b} = ${results.rest}</p>
        <p>${a} * ${b} = ${results.multi}</p>
        <p>${a} / ${b} = ${results.div}</p>`;
        res.end(template);
    } catch (err) {
        res.end('Error de lectura');
        server.emit('error', err);
    }

    /*     const path = url.parse(req.url as string).path;
    let dataFile: string = `./data/${path}.txt`;
    fs.readFile(dataFile, { encoding: 'utf-8' })
        .then((data) => {
            console.log(data);
            const template = `<h1>Hola Mundo</h1><p>${data}</p>`;
            res.end(template);
        })
        .catch((err: Error) => {
            res.end('Error de lectura');
            console.error(err.message);
        }); */

    /* fs.readFile(dataFile, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            res.end('Error de lectura');
            console.log(err.message);
            return;
        }
        console.log(data);
        const template = `<h1>Hola Mundo</h1><p>${data}</p>`;
        res.end(template);
    }); */
});
server.listen(PORT);

server.on('error', (err) => {
    console.error((err as Error).message);
});
