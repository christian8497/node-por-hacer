/*
cuando los comandos configurados en yargs manejan informacion similar se puede optimizar el contenido de los objetos que se incluyen, 
listar, crear, actualizar
entonces vamos a realizar lo siguiente
*/

//declaramos una constante que contiene el objeto con las dos variables que vamos a utilizar en nuestros dos comandos

//objetos
const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    demand: true,
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la taera'
}


//comandos
const argv = require('yargs')
    .command('crear', 'Crear una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualizar el estado completo de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea', {
        descripcion
    })
    .help()
    .argv;

// agregamos esta configuracion de yargs al modulo de exportaciones globales
module.exports = {
    argv
}