import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { CardlistComponent } from './cardlist.component';
import { RegisterComponent } from './register.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'list', component: CardlistComponent },
            { path: 'register', component: RegisterComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }