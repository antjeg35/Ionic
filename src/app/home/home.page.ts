import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OpenTrivialService } from '../providers/OpenTrivialService.provider';

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
  blocFirstQuestion = false;
  buttonNextQuestion = false;
  questions=[];
  currentQuestion;
  idQuestion=0;
  points = 0; 
  endGame = false;

  constructor(public toastController: ToastController, private openTrivialService: OpenTrivialService) {}
  
  async invalidePseudoToast() {
    const toast = await this.toastController.create({
      message: 'Veuillez rentrer un pseudo ou une difficulté correcte.',
      duration: 4000,
      color: 'danger'
    });
    toast.present();
  }

  start(){
    this.error = "";
    if(this.pseudo.length < 3 || this.level === ""){
      return this.invalidePseudoToast();
    } else{
      this.launchQuizz();
      return this.blocFirstQuestion = true;
    }
  }

  private async launchQuizz(){
    try{
      this.questions= await this.openTrivialService.getQuestions(1, this.level);
      this.handleQuestion();
    }catch(err){
      this.error= "Impossible de récupèrer les questions !"
    }
  }

  handleQuestion(){
    this.currentQuestion = this.questions[this.idQuestion];
    this.currentQuestion["incorrect_answers"].push(this.currentQuestion["correct_answer"]);
  }

  reponse(reponse: string) { 
    this.buttonNextQuestion = true;
    if (reponse == this.currentQuestion.correct_answer) { 
      this.points++; 
    } 
    if (this.idQuestion >= this.questions.length - 1) 
    { this.endGame = true; } 
  }

  nextQuestion() {
    if (this.idQuestion < this.questions.length - 1) { 
      this.idQuestion++; 
      this.buttonNextQuestion = false; 
      this.launchQuizz();
    } 
  }

  retour() { this.blocFirstQuestion = false; }
}
