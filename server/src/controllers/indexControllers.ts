import { Request, Response } from 'express';

class IndexController {
    public index(req : Request, resp : Response) {
        resp.send('Quiubule Raza!!!');
        
    }
}
export const indexController = new IndexController();
