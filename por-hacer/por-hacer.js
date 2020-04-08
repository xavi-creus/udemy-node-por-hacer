const fs = require('fs');

let listadoporHacer = [];

const saveData = () => {
    let data = JSON.stringify(listadoporHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar ', err);
    });
}

const downLoadData = () => {

    try {
        listadoporHacer = require('../db/data.json');
    } catch (error) {
        listadoporHacer = [];
    }
}

const crear = (descripcion) => {

    //cargamos la lista actualizada
    downLoadData();

    let porHacer = {
        descripcion,
        completado: false
    };

    //insertamos la nueva tarea
    listadoporHacer.push(porHacer);

    //gauradamos la nueva tarea en el json
    saveData();

    return porHacer;
};

const getListado = () => {
    downLoadData();
    return listadoporHacer;
}

let actualizar = (descripcion, completado = true) => {
    downLoadData();
    let index = listadoporHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoporHacer[index].completado = completado;
        saveData();
        return true;
    } else {
        return false;
    }
}

let borrar = (descripcion) => {
    downLoadData();
    //busca la tarea que pasamos por parámetro y la compara con las del array,
    //solo guarda las que sean diferentes a la que le pasamos por el parámetro
    let nuevoListado = listadoporHacer.filter(tarea => tarea.descripcion !== descripcion);
    //si yiene el mismo tamaño es que no ha borrado nada
    if (listadoporHacer.length === nuevoListado.length) {
        return false;
    } else {
        //actualizamos el listado que se carga en la bbdd con el nuevo listado
        listadoporHacer = nuevoListado;
        saveData();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}