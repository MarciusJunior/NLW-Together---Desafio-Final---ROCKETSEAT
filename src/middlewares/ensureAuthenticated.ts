import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
      
  
  //Receber o Token
      const authToken = request.headers.authorization;

      //Validar preenchimento do Token
      if(!authToken){
        return response.status(401).end();
      }

      const [, token] = authToken.split(" ");

      try{
        //Validar se Token é válido
        const { sub } = verify(token , "4c49f80710123943d665cc557889180c") as IPayload;
        
        
        //Recuperar informações do usuário
        request.user_id = sub;

        return next();
      }catch(err ){
        return response.status(401).end();
      }

}