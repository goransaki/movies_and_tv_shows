import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { injectTemplateRef } from '@angular/core/src/render3/view_engine_compatibility';
import { EmoticonHelper } from '../../helpers/emoticon-helper';

export class BasicValidators {
    static DATE_REGEXP: RegExp = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
    static phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
    static PHONE_REGEX = /^\+[0-9]*$/;
    static PREFIX_PHONE_REGEX = /^\+[1-9]+/;
    static readonly wso2QuotationMarks = ['"', '`', '\'', '„', '”', '„', '”', '“', '"', '“'];

    static email(control: FormControl) {
        if (control.value && control.value.length < 1) {
            return null;
        }
        const EMAIL_REGEXP = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return EMAIL_REGEXP.test(control.value) ? null : {
            emailAddress: {
                valid: false
            }
        };
    }

    static valueLessThan(greaterValueKey: string, lesserValueKey: string) {
        return (group: FormGroup) => {
            const greaterValue = group.controls[greaterValueKey];
            const lesserValue = group.controls[lesserValueKey];
            return (Number(greaterValue.value.toString().replace(/\./g, '')) <= Number(lesserValue.value.toString().replace(/\./g, ''))) ? lesserValue.setErrors({ valueNotLesThan: true }) : lesserValue.setErrors(null);
        };
    }

    static minVoucherValue(control: FormControl) {
        let value = (control.value.replace(',', '.'));
        return (Number(value) >= 0.1) ? null : {
            minVoucherValue: {
                valid: false
            }
        };
    }

    static havingNumber(control: FormControl) {
        const NUMBER_REGEXP = /\d/;
        return NUMBER_REGEXP.test(control.value) ? null : {
            havingNumber: {
                valid: false
            }
        };
    }


    static havingSmallLetter(control: FormControl) {
        const SMALL_LETTER_REGEXP = /[a-z]/;
        return SMALL_LETTER_REGEXP.test(control.value) ? null : {
            smallLetter: {
                valid: false
            }
        };
    }

    static havingBigLetter(control: FormControl) {
        const BIG_LETTER_REGEXP = /[A-Z]/;
        const umlauts = ['Ä', 'Ö', 'Ü'];
        const UMLAUT_REGEX = new RegExp(umlauts.join('|'));
        return UMLAUT_REGEX.test(control.value) || BIG_LETTER_REGEXP.test(control.value) ? null : {
            bigLetter: {
                valid: false
            }
        };
    }

    static matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            const password = group.controls[passwordKey];
            const passwordConfirmation = group.controls[passwordConfirmationKey];

            return (password.value !== passwordConfirmation.value)
                ? passwordConfirmation.setErrors({ mismatchedPasswords: true }) : passwordConfirmation.setErrors(null);
        };
    }

    static matchingEmails(emailKey: string, emailConfirmationKey: string) {
        return (group: FormGroup) => {
            const email = group.controls[emailKey];
            const emailConfirmation = group.controls[emailConfirmationKey];

            return (email.value !== emailConfirmation.value)
                ? emailConfirmation.setErrors({ mismatch: true }) : emailConfirmation.setErrors(null);
        };
    }

    static orderMatchingEmail(emailKey: string, emailConfirmationKey: string) {
        return (group: FormGroup) => {
            const email = group.controls[emailKey];
            const emailConfirmation = group.controls[emailConfirmationKey];

            (email.value !== emailConfirmation.value)
                ? emailConfirmation.setErrors({mismatch: true}) : emailConfirmation.setErrors(null);
            return null;
        };
    }

    static uniqueValue(initialValue: any, targetValue: any, message: string) {
        return (group: FormGroup) => {
            const target = group.controls[targetValue];
            if (initialValue === target.value) {
                return target.setErrors({ 'customError': message });
            }
            if (target.hasError('customError')) {
                delete target.errors['customError'];
                target.updateValueAndValidity();
            }
        };
    }

    static stringStartsWith(fullTextKey: string, textMatchKey: string) {
        return (group: FormGroup) => {
            const fullText = group.controls[fullTextKey];
            const textMatch = group.controls[textMatchKey];

            if (fullText && fullText.value && !fullText.value.startsWith(textMatch.value)) {
                return textMatch.setErrors({ startsWith: true });
            }

            if (textMatch.hasError('startsWith')) {
                delete textMatch.errors['startsWith'];
                textMatch.updateValueAndValidity();
            }
        };
    }

    /*  static sameDateOfTheMonth(date1Key: string, date2Key: string) {
          return (group: FormGroup) => {
              const date1 = group.controls[date1Key];
              const date2 = group.controls[date2Key];

              if (date1.value === null || date2.value === null) {
                  return date1.setErrors(null);
              }

              const day1 = moment(date1.value, 'DD.MM.YYYY').date();
              const day2 = moment(date2.value, 'DD.MM.YYYY').date();

              return (day1 !== day2 ? date1.setErrors({dateNotEqual: true}) : date1.setErrors(null);

          };
      }*/

    static birthDate(control: FormControl) {
        let DATE_REGEXP = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

        const selectedDate = parseInt(moment(control.value, 'DD.MM.YYYY').format('X'), 0);
        const sixteenYearsAgo = parseInt(moment().subtract(16, 'y').format('X'), 0);
        if (DATE_REGEXP.test(control.value)) {
            return (sixteenYearsAgo >= selectedDate) ? null : {
                dateOfBirth: {
                    valid: false
                }
            };
        }

        return {
            dateBlank: {
                valid: false
            }
        };
    }

    static noSpecialCharacters(control: FormControl) {
        const ALLOWED_CHAR_REGEXP = /^[A-Za-z0-9#$%=@!{},`~&*()'<>?.:;_| ^/+\-\t\r\n\[\]\\\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df\u20AC\u0022\u201C\u201D\u2019\u2018\u2035\u2032]*$/;
        return ALLOWED_CHAR_REGEXP.test(control.value) ? null : {
            allowedCharacters: {
                valid: false
            }
        };
    }

    static noProfileSpecialCharacters(control: FormControl) {
        const ALLOWED_CHAR_REGEXP = /^[A-Za-z0-9!.' \-\t\r\n\[\]\\\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df\u20AC\u0022\u201C\u201D\u2019\u2018\u2035\u2032]*$/;
        return ALLOWED_CHAR_REGEXP.test(control.value) ? null : {
            allowedCharacters: {
                valid: false
            }
        };
    }

    static noTitleSpecialCharacters(control: FormControl) {
        const ALLOWED_CHAR_REGEXP = /^[A-Za-z0-9. '\-\t\r\n\[\]\\\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df\u20AC\u0022\u201C\u201D\u2019\u2018\u2035\u2032]*$/;
        return ALLOWED_CHAR_REGEXP.test(control.value) ? null : {
            titleSpecialCharacters: {
                valid: false
            }
        };
    }

    static noProfileNameSpecialCharacters(control: FormControl) {
        const ALLOWED_CHAR_REGEXP = /^(?:(?![€])[A-Za-z0-9.àáâäæãåāîïíīįìèéêëēėęôöòóóœøōõûüùúū '!\-\t\r\n\[\]\\\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df\u20AC\u0022\u201C\u201D\u2019\u2018\u2035\u2032])*$/;
        return ALLOWED_CHAR_REGEXP.test(control.value) ? null : {
            noProfileNameSpecialCharacters: {
                valid: false
            }
        };
    }


    static houseNumberCharacters(control: FormControl) {
        const ALLOWED_CHAR_REGEXP = /^[A-Za-z0-9/\- .]*$/;
        return ALLOWED_CHAR_REGEXP.test(control.value) ? null : {
            allowedHouseNumberCharacters: {
                valid: false
            }
        };
    }

    static postalCodeCharacters(control: FormControl) {
        const ALLOWED_CHAR_REGEXP = /^[A-Za-z0-9\- ]*$/;
        return ALLOWED_CHAR_REGEXP.test(control.value) ? null : {
            allowedPostalCodeCharacters: {
                valid: false
            }
        };
    }

    static localitySpecialCaracters(control: FormControl) {
        const ALLOWED_CHAR_REGEXP = /^(?:(?![€])[A-Za-z0-9\- .!'\t\r\n\[\]\\\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00df\u20AC\u0022\u201C\u201D\u2019\u2018\u2035\u2032])*$/;
        return ALLOWED_CHAR_REGEXP.test(control.value) ? null : {
            allowedLocalityCharacters: {
                valid: false
            }
        };
    }


    static notHavingFullName(controlKey: string, fullName: { firstname: string, lastname: string }) {
        return (group: FormGroup) => {
            const control = group.controls[controlKey];
            if (control.value === null) {
                return;
            }
            const fname = fullName.firstname.toLowerCase();
            const lname = fullName.lastname.toLowerCase();
            const value = control.value.toLowerCase();

            if (value.includes(fname) || value.includes(lname)) {
                return control.setErrors({ ...(control.errors || {}), notHavingFullName: true });
            }
            if (control.hasError('notHavingFullName')) {
                delete control.errors['notHavingFullName'];
                control.updateValueAndValidity();
            }
        };
    }

    static notHavingBirthDate(controlKey: string, birthDate: string) {
        return (group: FormGroup) => {
            const control = group.controls[controlKey];
            if (control.value === null) {
                return;
            }
            const dateSeparators: Array<string> = ['', '/'];
            const dateOfBirth = birthDate.toLowerCase();
            const password = control.value.toLowerCase();

            if (password.includes(dateOfBirth)) {
                return control.setErrors({ ...(control.errors || {}), notHavingBirthDate: true });
            }
            for (let i = 0; i < dateSeparators.length; i++) {
                const separator = dateSeparators[i];
                if (password.includes(dateOfBirth.replace(/\./g, separator))) {
                    return control.setErrors({ ...(control.errors || {}), notHavingBirthDate: true });
                }
            }
            const monthAndDay = dateOfBirth.replace(/\./g, '').substring(0, 4);
            if (password.includes(monthAndDay) || password.includes(dateOfBirth.substring(0, 4))) {
                return control.setErrors({ ...(control.errors || {}), notHavingBirthDate: true });
            }

            if (control.hasError('notHavingBirthDate')) {
                delete control.errors['notHavingBirthDate'];
                control.updateValueAndValidity();
            }
        };
    }

    static appointmentEmail(control) {
        if ((control.value && control.value.length < 1) || !control.value) {
            return null;
        }
        const EMAIL_REGEXP = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return EMAIL_REGEXP.test(control.value) ? null : {
            message: 'Die eingetragene E-Mail-Adresse ist möglicherweise nicht gültig. Bitte überprüfe die Eingabe.'
        };
    }

    static mustHaveOneItemSet(control: FormArray) {
        if (!control.value) {
            return {
                required: {
                    valid: false
                }
            };
        }

        const valid = control.controls.some(item => item.value !== false);
        return valid ? null : {
            required: {
                valid: false
            }
        };
    }

    static withoutEmoticons(control: FormControl) {
        if (!control.value || control.value.length < 1) {
            return null;
        }
        let controlValue = control.value;
        // some char seen as emojis fix
        const emojiLikeCharacters = ['€', '‘', '“', '”', '„', '”', '„'];
        for (let i = 0; i < emojiLikeCharacters.length; i++) {
            const char = emojiLikeCharacters[i];
            if (controlValue.indexOf(char) > -1) {
                controlValue = controlValue.replace(char, '');
            }
        }
        const EMOTICONS = EmoticonHelper.getRegex();
        return EMOTICONS.test(controlValue) ? { emoticon: { valid: false } } : null;
    }

    static validDate(control: FormControl) {
        if (!control.value) {
            return {
                required: {
                    valid: false
                }
            };
        }
        if (control.value.indexOf('_') !== -1) { // check if user is still typing the date
            return {
                dateBlank: {
                    valid: false
                }
            };
        }
        const selectedDate = parseInt(moment(control.value, 'DD.MM.YYYY', true).format('X'), 0);
        const selectedYear = parseInt(moment(control.value, 'DD.MM.YYYY', true).format('YYYY'), 10);
        const currentYear = parseInt(moment().format('YYYY'), 10);
        if (isNaN(selectedDate) || selectedYear > currentYear || selectedYear <= 1900) {
            return {
                invalidDate: {
                    valid: false
                }
            };
        }
        return null;
    }

    static minorBirthDate(control: FormControl) {
        const sixteenYearsAgo = parseInt(moment().subtract(16, 'y').format('X'), 0);
        const selectedDate = parseInt(moment(control.value, 'DD.MM.YYYY', true).format('X'), 0);

        if (BasicValidators.DATE_REGEXP.test(control.value)) {
            return !(sixteenYearsAgo < selectedDate) ? null : {
                minorBirthDate: {
                    valid: false
                }
            };
        }
        return null;
    }

    static phoneNumber(control: FormControl) {
        if (!control.value || !control.value.length) {
            return null;
        }

        const value = control.value ? control.value.replace(/\s/g, '') : '';

        if (!value.match(BasicValidators.PREFIX_PHONE_REGEX)) {
            return {
                prefixPhoneNumber: {
                    valid: false
                }
            };
        }

        if (!BasicValidators.PHONE_REGEX.test(value)) {
            return {
                phoneNumber: {
                    valid: false
                }
            };
        }

        if (value.length && value.length <= 4) {
            return {
                minLengthPhoneNumber: {
                    valid: false
                }
            };
        }
        return null;
    }

    static onboardingPhoneNumber(control: FormControl) {
        if (!control.value || !control.value.length) {
            return null;
        }

        const value = control.value ? control.value.replace(/\s/g, '') : '';

        if (!value.match(BasicValidators.PREFIX_PHONE_REGEX)) {
            return {
                onboardingPrefixPhoneNumber: {
                    valid: false
                }
            };
        }

        if (!BasicValidators.PHONE_REGEX.test(value)) {
            return {
                phoneNumber: {
                    valid: false
                }
            };
        }

        if (value.length && value.length <= 4) {
            return {
                minLengthPhoneNumber: {
                    valid: false
                }
            };
        }
        return null;
    }

    static withoutFullStop(control: FormControl) {
        if (!control.value) {
            return null;
        }
        if (control.value.indexOf('.') !== -1) {
            return {
                withoutFullStop: {
                    valid: false
                }
            };
        }
        return null;
    }

    static withoutDash(control: FormControl) {
        if (!control.value) {
            return null;
        }
        if (control.value.indexOf('-') !== -1) {
            return {
                withoutDash: {
                    valid: false
                }
            };
        }
        return null;
    }

    static withoutSpace(control: FormControl) {
        if (!control.value) {
            return null;
        }
        if (control.value.indexOf(' ') !== -1) {
            return {
                withoutSpace: {
                    valid: false
                }
            };
        }
        return null;
    }

    static noWhiteSpace(control: FormControl) {
        if (!control.value || control.value.length < 1) {
            return null;
        }
        if (control.value.trim().length < 1) {
            return {
                noWhiteSpace: {
                    valid: false
                }
            };
        }
        return null;
    }

    static appointmentPhoneNumber(control: FormControl) {
        if (!control.value || !control.value.length) {
            return null;
        }

        const value = control.value ? control.value.replace(/\s/g, '') : '';

        if (!value.match(BasicValidators.PREFIX_PHONE_REGEX)) {
            return {
                message: 'Die Telefonnummer muss mit Ländervorwahl angegeben werden (z.B. +49 für Deutschland).'
            }
        }

        if (!BasicValidators.PHONE_REGEX.test(value)) {
            return {
                message: 'Die eingetragene Telefonnummer ist möglicherweise nicht gültig. Bitte überprüfe die Eingabe.'
            }
        }

        if (value.length && value.length <= 4) {
            return {
                message: 'Die Telefonnummer muss mindestens 4 Zeichen enthalten.'
            }
        }
        return null;
    }

    static withoutWSO2SpecialCharacters(control: FormControl) {
        if (!control.value || !control.value.length) {
            return null;
        }
        let wso2Chracters = ['&', '<', '>'].concat(BasicValidators.wso2QuotationMarks);
        let matches: Array<string> = [];
        for (let i = 0; i < wso2Chracters.length; i++) {
            const char = wso2Chracters[i];
            if (control.value.indexOf(char) !== -1) {
                matches.push(char);
            }
        }
        if (matches.length) {
            return {
                withoutWSO2SpecialCharacters: {
                    valid: false,
                    value: matches[0],
                    matches: matches
                }
            }
        }
        return null;
    }

    static greaterThanZero(control: FormControl) {
        if (!control.value || control.value.length < 1) {
            return null;
        }
        if (parseFloat(control.value.replace(',', '.')) <= 0) {
            return {
                greaterThanZero: {
                    valid: false
                }
            };
        }
        return null;
    }

}
