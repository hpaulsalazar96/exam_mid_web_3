const mongoose = require('mongoose'); // incorporo mongoose al proyecto
const readLine = require ('readline');

require('./esquema_usuarios');

// escuchar la señal SIGINT de windows y luego emitirla hacia node
if (process.platform === 'win32') {
    const rl = readLine.Interface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', ()=>{
        process.emit('SIGINT'); // emitir el evento
    });
}

// proceso para cerrar la conección a MONGO (mongoose)
const procShutdown = (msg, callback) =>{
    mongoose.connection.close(()=>{
        console.log('Mongoose se desconectó a través de: ', msg);
        callback();
    });
}

// Señales de eventos de terminación de procesos
// nodemon : SIGUSR2
// windows : SIGINT
// heroku  : SIGTERM

// Llamar a procShutdown dependiendo del evento

// nodemon : SIGUSR2
process.once('SIGUSR2', ()=>{
    procShutdown('Terminado por nodemon', ()=>{
        process.kill(process.pid, 'SIGUSR2');
    });
});

// heroku  : SIGTERM
process.on('SIGTERM', ()=>{
    procShutdown('Terminado por heroku', ()=>{
        process.exit(0);
    });
});

// windows : SIGINT
process.on('SIGINT', ()=>{
    procShutdown('Terminado por windows', ()=>{
        process.exit(0);
    });
});

// conexión a MONGO
let dbURI = 'mongodb://localhost:27017/db_project_dw3';
mongoose.set('strictQuery', true)

if(process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 5000,
    family: 4, // Mongo probará IPv6 primero y luego IPv4 si es que IPv6 falla
  }).catch(err => console.log('Mongoose tiene error: ', err.reason));

// Mensajes de los eventos de conexión
mongoose.connection.on('connected', ()=>{
    console.log(`Mongoose se conectó a: ${dbURI}`);
});

mongoose.connection.on('disconnected', ()=>{
    console.log(`Mongoose se desconectó a: ${dbURI}`);
});

// Multiple base de datos
// const dbURIlog = 'mongodb://localhost/db_dw3_log'; // string de conexión
// const logDB = mongoose.createConnection(dbURIlog, {
//     serverSelectionTimeoutMS: 5000,
//     family: 4, // Mongo probará IPv6 primero y luego IPv4 si es que IPv6 falla
//   });

// // Mensajes de los eventos de conexión a la DB Log
// logDB.on('connected', ()=>{
//     console.log(`Mongoose se conectó a: ${dbURIlog}`);
// });

// logDB.on('disconnected', ()=>{
//     console.log(`Mongoose se desconectó a: ${dbURIlog}`);
// });

// logDB.on('error', ()=>{
//     console.log(`Mongoose log error a: ${dbURIlog}`);
// });