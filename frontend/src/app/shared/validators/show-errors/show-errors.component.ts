import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from '@angular/forms';
import {ErrorMessages} from '../error-messages';

@Component({
    selector: 'app-show-errors',
    templateUrl: './show-errors.component.html',
    styleUrls: ['./show-errors.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShowErrorsComponent {

    private static errorMessages = ErrorMessages.messages;
    @Input() control: AbstractControlDirective | AbstractControl;
    @Input() controlName: string;
    @Input() validateMessage: string;
    @Input() validateOnly: Array<string> = [];
    private resolvedControlName: any;

    shouldShowErrors(): boolean {
        return this.validateOnly.length ?
            this.controlIsInvalid() && this.shouldShowRuleError() : this.controlIsInvalid();
    }

    private controlIsInvalid(): boolean {
        return this.control && this.control.errors && (this.control.dirty || this.control.touched);
    }

    private shouldShowRuleError(): boolean {
        const rules = Object.keys(this.control.errors);
        return this.validateOnly.indexOf(rules[0]) !== -1;
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.control));
    }

    getError(): string {
        const errors = Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.control));
        return errors[0];
    }

    private getMessage(type: string, params: any, control: any) {
        if (this.validateMessage) {
            return this.validateMessage;
        }
        if (!ShowErrorsComponent.errorMessages[type]) {
            return '';
        }
        if (typeof ShowErrorsComponent.errorMessages[type] === 'string' || ShowErrorsComponent.errorMessages[type] instanceof String) {
            return ShowErrorsComponent.errorMessages[type];
        }
        const msg = this.getCustomMessage(type, params, control) || ShowErrorsComponent.errorMessages[type](params);
        this.resolvedControlName = this.controlName ? this.controlName : this.resolveControlName(control);
        return msg.replace('##FIELD##', this.resolvedControlName);
    }

    private getCustomMessage(type: string, params: any, control: any): string | null {
        let message: string = null;
        const keys = Object.keys(ErrorMessages.customMessages);
        if (!keys.includes(this.getControlName(control))) {
            return message;
        }
        keys.map(field => {
            if (field === this.getControlName(control)) {
                return message = !ErrorMessages.customMessages[field][type] ? null : ErrorMessages.customMessages[field][type](params);
            }
        });
        return message;
    }

    getControlName(c: AbstractControl): string | null {
        const formGroup = c.parent.controls;
        return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }

    private resolveControlName(control: AbstractControl) {
        let c = this.getControlName(control);
        c = c.replace('_', ' ').replace(' id', '').toLowerCase();
        return c.replace(/\b\w/g, l => l.toUpperCase());
    }
}

