import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jwtToken: string;
  domain = environment.domain;
  constructor(private activedRoute: ActivatedRoute, private route: Router, private messageService: MessageService) { }

  ngOnInit() {
    if(sessionStorage.getItem('jwt_token')) {
       // send an object to app component
        this.messageService.sendMessage(true);
        window.location.replace(`/#/campaign`);
    } else {
      this.jwtToken = this.activedRoute.snapshot.queryParams['token'];
      if(this.jwtToken) {
        sessionStorage.setItem('jwt_token', this.jwtToken);
        this.messageService.sendMessage(true);
        window.location.replace('/#/campaign');
      } else {
        this.messageService.sendMessage(false);
      }
    }

  }

}
