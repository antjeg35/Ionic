import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pseudo= '';
  level= '';
  save= false;
  error= '';
  blocLogin= true;
  blocFirstQuestion = false;
  buttonNextQuestion = false;

  constructor() {}
  

  start(){
    this.error = "";
    if(this.pseudo.length < 3 || this.level === ""){
      return this.error = 'Veuillez rentrer un pseudo ou une difficulté correcte'
    } else{
      this.blocFirstQuestion = true;
      this.blocLogin = false;
      return;
    }
  }

  firstQuestion($event){
    if(typeof $event != 'undefined'){
      return this.buttonNextQuestion = true;
    }
  }



}
