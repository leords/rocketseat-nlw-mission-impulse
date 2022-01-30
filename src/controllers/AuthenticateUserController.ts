import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
   async handle(request: Request, response: Response) {

   const { code } = request.body; //desestruturo o body pegando apenas o parametro 'code'; +/- isso

   const service = new AuthenticateUserService(); // service recebe um novo obj de AuthenticateUserService;
   try {
      const result = await service.execute(code) // result aguarda para receber o retorno da função execute da classe AuthenticateUserService passando code por parametro!;
      return response.json(result) //retornando result no tipo json;

   } catch (err) {
       return response.json(err.message)
    }
   }
}


export {AuthenticateUserController}