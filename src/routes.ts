import { UserController } from "./controllers/users/UserController";

import { Router } from 'express';
const router = Router();

const userController = new UserController();

router.post('/users', userController.create);

export { router }



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