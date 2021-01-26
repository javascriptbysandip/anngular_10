import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            cardNumber: ['', Validators.required],
            cardHolder: ['', Validators.required],
            expiryDate: ['', [Validators.required]],
            securityCode: ['', Validators.minLength(3)],
            amount: ['',[Validators.required,  Validators.pattern(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        if(new Date(this.form.value.expiryDate).getTime()<new Date().getTime()){
            this.alertService.error("Date should be greater");
            return true;
        }

        var totalCard = localStorage.getItem("totalCard")

        if(totalCard){
            var savedData = [];
            savedData = JSON.parse(totalCard);
            savedData.push(this.form.value);
            localStorage.setItem("totalCard",JSON.stringify(savedData));
        } else{
            var savedData = [];
            savedData.push(this.form.value);
            localStorage.setItem("totalCard",JSON.stringify(savedData));
        }
     
        this.router.navigate(['../list'], { relativeTo: this.route });
        this.alertService.success("Succcesfully created");
        return true;

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['../list'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}