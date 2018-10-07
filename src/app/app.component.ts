import { Component } from '@angular/core';
import {MenuItem, ConfirmationService} from 'primeng/api';
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';
import { AuthenticationService } from './services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lucky Wheel Admin';
  itemsMenu: MenuItem[];
  userStatus = false;

  constructor(
    private authService: AuthenticationService, 
    private router: Router, 
    private confirmationService: ConfirmationService) {}

  ngOnInit() {
    
    if(localStorage.getItem("currentUser")) {
        this.userStatus = true;
    }
    this.itemsMenu = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            url: '/'
        },
        {
            label: 'Campaign',
            icon: 'pi pi-fw pi-bookmark',
            url: '/#/campaign'
        },
        {
            label: 'Subscriber',
            icon: 'pi pi-fw pi-user-plus',
            url: '/#/subscriber'
        },
        {
            label: 'Integration',
            icon: 'pi pi-fw pi-cog',
            url: '/#/integration',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {label: 'Save', icon: 'pi pi-fw pi-save'},
                        {label: 'Update', icon: 'pi pi-fw pi-save'},
                    ]
                },
                {
                    label: 'Other',
                    icon: 'pi pi-fw pi-tags',
                    items: [
                        {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                    ]
                }
            ]
        }
    ];
  }


  logout() {
    this.confirmationService.confirm({
        message: 'Are you sure?',
        accept: () => {
            this.authService.logout()
            location.reload();
        }
    });
}
}
