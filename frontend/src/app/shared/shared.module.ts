import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ShowErrorsComponent} from './validators/show-errors/show-errors.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ShowErrorsComponent,
    ],
    exports: [
        ShowErrorsComponent,
    ]
})

export class SharedModule {
}


