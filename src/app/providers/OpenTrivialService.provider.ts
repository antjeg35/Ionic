import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class OpenTrivialService {

    constructor(private httpClient: HttpClient){}

    public getQuestions (nbQuestions: number, level: string):Promise<Array<any>> {
        return new Promise((resolve, reject)=> {
            let params = new HttpParams();
            params = params.append('amount', String(nbQuestions));
            params = params.append('difficulty',level);
            this.httpClient.get('https://opentdb.com/api.php', {
                params: params
            })
            .toPromise()
            .then((response)=>{
                if(response && response['results']){
                    resolve(response['results']);
                }else{
                    reject('Le serveur a renvoyé une erreur inattendue');
                }
            })
            .catch((error)=> {
                reject(error);
            })
        })
    }

}