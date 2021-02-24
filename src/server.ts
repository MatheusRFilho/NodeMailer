import 'reflect-metadata';
import express from 'express';
import './database/index';

const app = express();

/**
 * Metódos HTTP
 * 
 * get      => Buscar
 * post     => Salvar
 * put      => Alterar
 * delete   => Deletar
 * patch    => Alteração especifica
 * 
*/

app.get('/', (request, response) => {
    return response.json({message: 'test'});
});

app.post('/', (request, response) => {
    return response.json({message: 'Os dados foram salvos com sucesso'})
});

app.listen(3333, () => console.log("Server is Running!"));