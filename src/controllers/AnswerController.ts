import { request, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class AnswerController {

    /**
     * 
     * ROutes Params => Parametros que compôes a rota 
     * routes.get("/answers/:value")
     * 
     * Query Params => Busca PAginação, não obrigatorios
     *  ?
     * chave= valor
     */
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser) {
            return response.status(400).json({
                error: "Survey user does not exists!"
            });
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);
        return response.json(surveyUser);

    }
}
export { AnswerController }