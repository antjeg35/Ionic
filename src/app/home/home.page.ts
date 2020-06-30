import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

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

  constructor(public toastController: ToastController) {}
  
  async invaliPseudoToast() {
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
      return this.invaliPseudoToast();
    } else{
      return this.blocFirstQuestion = true;
    }
  }

  firstQuestion($event){
    if(typeof $event != 'undefined'){
      return this.buttonNextQuestion = true;
    }
  }
}
