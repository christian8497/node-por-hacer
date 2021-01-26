//vamos a configurar filesystem para poder guardar la entrada de datos en algun lugar fisico dentro de nuestra app
const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

//guardar tarea en base de datos
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); //convierte toda la data de listadoPorHacer a un json valido

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

//cargar datos de la db
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

//crear nueva tarea
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}


//funcion para obtener listadoPorHacer
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

//funcion para actualizar el estado de una tarea
const actualizar = (descripcion, completado = true) => {
    cargarDB(); //cargamos bd

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    }); //dentro de index guardamos la posicion de la tarea que le estamos solicitando desde consola

    if (index >= 0) {
        listadoPorHacer[index].completado = completado; //condicion para validar si se obtiene una propiedad en la posicion del arreglo para cambiar el valor true o false dependiendo de lo que envie el usuario
        guardarDB();
        return true;
    } else {
        return false;
    }
}

//funcion para borrar una tarea en especifico
const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => { //la propiedad filter realiza una nueva lista, pero en este caso con el codigo de abajo retornamos toda la lista de tareas excepto la que especificamos que deseamos borrar
        return tarea.descripcion !== descripcion;
    });

    //condicion para validar si se borro la tarea que especificamos
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado; //se remplaza la informacion del listadoPorHacer con la del nuevoListado
        guardarDB();
        return true;
    }


}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}