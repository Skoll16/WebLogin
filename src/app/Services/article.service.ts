import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable()
export class ArticleService {
  private articleUrl="http://localhost:5000/article/postArticle";
  private getArcticleUrl="http://localhost:5000/article/getArticle"
  constructor(private http:HttpClient) { }
  article(article){
return this.http.post<any>(this.articleUrl,article)  }
getArcticle(){
  return this.http.get<any>(this.getArcticleUrl);
}
}
