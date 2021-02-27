import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UsersRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';
import { resolve } from 'path';

class SendMailController {
    async execute( request: Request, response: Response ) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const user = await usersRepository.findOne({email});
        
        if(!user) {
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        const survey = await surveysRepository.findOne({id: survey_id})

        if(!survey){
            return response.status(400).json({
                error: "Survey does not exists",
            });
        }

        // Salvar as informações na tabela
        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id
        })

        
        await surveyUserRepository.save(surveyUser);
        
        
        // Enviar Email
        
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description
        }
        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser)
    }
    
    async show( request: Request, response: Response ) {
    }
}  

export { SendMailController }