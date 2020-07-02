import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pseudo = "";
  difficulte = "easy";
  sauvegarder = false;


  constructor(private toastController: ToastController, private router: Router) {}

  async commencer() {
    if (this.pseudo === "" || this.difficulte === "") {
      const toast = await (this.toastController.create({
        message: "Veuillez saisir un pseudo et une difficulté"
      }));
      toast.present();
      return;
    }
    this.navigate();
  }

  navigate(){
    this.router.navigate(['/game-page', this.pseudo, this.difficulte])
  }
}
