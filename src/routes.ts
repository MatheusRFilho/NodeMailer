import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/SurveysController";

import { Router } from 'express';
import { SendMailController } from "./controllers/SendMailController";
const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();


router.post('/users', userController.create);

router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show);

router.post('/sendMail', sendMailController.execute);

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