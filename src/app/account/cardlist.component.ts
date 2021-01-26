import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'cardlist.component.html' })
export class CardlistComponent implements OnInit {
    cardList:any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { 
        var getCardData = localStorage.getItem("totalCard");
        if(getCardData){
            this.cardList = JSON.parse(getCardData);
        } else {
            this.cardList = [];
        }
        
    }

    ngOnInit() {
   
    }

   

}