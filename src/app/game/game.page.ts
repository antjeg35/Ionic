import { Component, OnInit } from '@angular/core';
import { OpenTrivialService } from '../providers/OpenTrivialService.provider';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  pseudo = "";
  difficulte = "";
  nextQuestion = false;
  endGame = false;
  questions = [];
  questionCourante;
  numeroQuestion = 0;
  points = 0;

  constructor(private openTrivialService: OpenTrivialService, public route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.difficulte = params['difficulte'],
      this.pseudo = params['pseudo']      
    })
    this.loadQuestions();
  }

  async loadQuestions() {
    this.endGame = false;
    this.nextQuestion = false;
    this.numeroQuestion = 0;
    this.points = 0;
    this.questions = await this.openTrivialService.getQuestions(5, this.difficulte);
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

  score() { 
    this.router.navigate(['/score', this.points])
  }

}
