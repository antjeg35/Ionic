import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OpenTrivialService } from '../providers/OpenTrivialService.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pseudo = "";
  difficulte = "easy";
  sauvegarder = false;
  error = "";
  beginGame = false;
  nextQuestion = false;
  endGame = false;
  questions = [];
  questionCourante;
  numeroQuestion = 0;
  points = 0;

  constructor(public toastController: ToastController, private openTrivialService: OpenTrivialService) { }

  async loadQuestions() {
    this.endGame = false;
    this.nextQuestion = false;
    this.numeroQuestion = 0;
    this.points = 0;
    this.questions = await this.openTrivialService.getQuestions(10, this.difficulte);
    this.loadQuestion();
  }

  loadQuestion() {
    this.questionCourante = this.questions[this.numeroQuestion];
    this.questionCourante["answers"] = [];
    for (let answer of this.questionCourante["incorrect_answers"]) {
      this.questionCourante["answers"].push({ correct: false, answer: answer });
    }
    this.questionCourante["answers"].push({
      correct: true, answer: this.questionCourante["correct_answer"]
    });
    this.questionCourante["answers"] = this.shuffleArray(this.questionCourante["answers"]);
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  async commencer() {
    if (this.pseudo === "" || this.difficulte === "") {
      const toast = await (this.toastController.create({
        message: "Veuillez saisir un pseudo et une difficulté"
      }));
      toast.present();
      return;
    }
    this.loadQuestions();
    this.beginGame = true;
  }

  reponse(reponse: string) {
    this.nextQuestion = true;
    if (reponse["correct"]) {
      this.points++;
    }
    if (this.numeroQuestion >= this.questions.length - 1) {
      this.endGame = true;
    }
  }

  questionSuivante() { 
    if (this.numeroQuestion < this.questions.length - 1) { 
    this.numeroQuestion++; 
    this.nextQuestion = false; 
    this.loadQuestion(); 
    } 
  }

  retour() { this.beginGame = false; }
}
