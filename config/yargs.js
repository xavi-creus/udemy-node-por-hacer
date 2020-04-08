const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea a realizar'
};

const completado = {
    demand: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualizar el estado completado de la tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Elimina una tarea', {
        descripcion
    })
    .help()
    .argv;


module.exports = {
    argv
}