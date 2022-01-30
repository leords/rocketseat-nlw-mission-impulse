import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload {
    sub: string
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({
            errorCode: "token.invalid",
        });
    }

    //Beares, 541a5d456ad465a4d564ad

    const [, token] = authToken.split(" "); // a ',' ignora o Beares e pega somente o token!

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as Ipayload //vai verificar o que tem dentro do verify e retonar do tipo 'Ipayload'.

        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).json({ errorCode: "token.expired" });
    }
}