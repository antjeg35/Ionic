import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  score="";

  constructor(private router: Router, private route: ActivatedRoute, private retourAccueil: NavController) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.score = params["score"];
    })
  }

  retour() { this.retourAccueil.navigateBack('/home'); }

}
