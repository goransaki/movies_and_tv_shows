export class ErrorMessages {

    public static readonly messages = {
        'required': (params) => '##FIELD## darf nicht leer sein.',
        'minlength': (params) => '##FIELD## muss mindestens ' + params.requiredLength + ' Zeichen enthalten.',
        'maxlength': (params) => '##FIELD## darf maximal ' + params.requiredLength + ' Zeichen enthalten.',
        'max': (params) => '##FIELD## darf maximal ' + params.max + ' sein.',
        'min': (params) => '##FIELD## muss mindestens ' + params.min + ' sein.',
        'pattern': (params) => 'Bitte gib gültige Zeichen ein.',
        'email': (params) => 'Bitte gib eine gültige E-Mail Adresse an.',
        'decimal': (params) => '##FIELD## muss eine ganze Zahl sein.',
        'mismatchedPasswords': (params) => 'Die Passwörter sind nicht identisch.',
        'dateOfBirth': (params) => 'TEO ist für dich da, aber erst wenn du 16 bist; bitte überprüfe dein Geburtsdatum.',
        'requiredPassword': (params) => 'Bitte gib ein Passwort an.',
        'dateBlank': 'Bitte gib dein vollständiges Geburtsdatum an.',
        'emailAddress': 'Bitte gib eine gültige E-Mail Adresse ein.',
        'germanLangChar': 'Bitte wähle einen Namen ohne verwenden: ö,ä,ü,ß.',
        'customError': (err) => err,
        'mismatch': (params) => '##FIELD## stimmt nicht überein.',
        'startsWith': (params) => '##FIELD## stimmt nicht überein.',
        'allowedCharacters': (params) => 'Einige Zeichen sind nicht erlaubt.',
        'havingNumber': (params) => 'Mindestens eine Ziffer eingeben.',
        'smallLetter': (params) => 'Mindestens einen Kleinbuchstaben eingeben.',
        'bigLetter': (params) => 'Mindestens einen Großbuchstaben eingeben.',
        'notHavingFullName': (params) => 'Das Passwort darf deinen Namen nicht enthalten.',
        'notHavingBirthDate': (params) => 'Das Passwort darf dein Geburtsdatum nicht enthalten.',
        'invalidVoucherValue': (params) => 'Dieser Betrag ist leider nicht verfügbar. ' +
            'Bitte versuche es mit einem anderen Betrag, beispielsweise ' + (params.value) + ' €',
        'invalidIban': (params) => 'Ungültige IBAN',
        'minVoucherValue': (params) => '##FIELD## muss mindestens 0,1 sein.',
        'allowedHouseNumberCharacters': (params) => 'Die Hausnummer darf nur aus Zahlen, Buchstaben, Bindestrich, Punkt und Schrägstrich bestehen.',
        'allowedPostalCodeCharacters': (params) => 'Die PLZ darf nur aus Zahlen, Buchstaben und Bindestrich bestehen.',
        'titleSpecialCharacters': (params) => 'Der Titel darf keine Sonderzeichen enthalten.',
        'noProfileNameSpecialCharacters': (params) => '##FIELD## darf keine Sonderzeichen enthalten.',
        'invalidDate': (params) => 'Bitte gib ein korrektes Datum an.',
        'minorBirthDate': (params) => 'Um deinen Account in vollem Umfang weiter nutzen zu können musst du mindestens 16 Jahre alt sein.',
        'allowedLocalityCharacters': (params) => 'Der Ort darf keine Sonderzeichen enthalten.',
        'phoneNumber': (params) => 'Bitte gib eine gültige Telefonnummer an.',
        'minLengthPhoneNumber': (params) => 'Die Telefonnummer muss mindestens 4 Zeichen enthalten',
        'prefixPhoneNumber': (params) => 'Die Telefonnummer muss mit Ländervorwahl angegeben werden (z.B. +49 für Deutschland).',
        'onboardingPrefixPhoneNumber': (params) => 'Die Handynummer muss mit Ländervorwahl angegeben werden (z.B. +49 für Deutschland).',
        'withoutFullStop': (params) => 'Das Passwort darf keinen Punkt, Bindestrich, Emoticon oder Leerzeichen enthalten.',
        'withoutDash': (params) => 'Das Passwort darf keinen Punkt, Bindestrich, Emoticon oder Leerzeichen enthalten.',
        'withoutSpace': (params) => '##FIELD## darf keinen Leerzeichen enthalten.',
        'noWhiteSpace': (params) => '##FIELD## darf keinen Leerzeichen enthalten.',
        'emoticon': (params) => 'Emoticons sind nicht erlaubt.',
        'withoutWSO2SpecialCharacters': (params) => 'Das Passwort darf kein ' + params.value + ' enthalten',
    };

    public static readonly customMessages = {
        firstname: {
            'withoutWSO2SpecialCharacters': (params) => 
                '##FIELD## darf keine Sonderzeichen enthalten.'
        },
        lastname: {
            'withoutWSO2SpecialCharacters': (params) => 
                '##FIELD## darf keine Sonderzeichen enthalten.'
        },
        title: {
            'withoutWSO2SpecialCharacters': (params) => 
                '##FIELD## darf keine Sonderzeichen enthalten.'
        },
        streetaddress: {
            'withoutWSO2SpecialCharacters': (params) => 
                '##FIELD## darf keine Sonderzeichen enthalten.'
        },
        locality: {
            'withoutWSO2SpecialCharacters': (params) => 
                '##FIELD## darf keine Sonderzeichen enthalten.'
        },
        password: {
            'withoutSpace': (params) => '##FIELD## darf keinen Punkt, Bindestrich, Emoticon oder Leerzeichen enthalten.',
            'noWhiteSpace': (params) => '##FIELD## darf keinen Punkt, Bindestrich, Emoticon oder Leerzeichen enthalten.',
        },
        repeatNewPassword: {
            'mismatch': (params) => 'Die Passwörter sind nicht identisch.',
            'startsWith': (params) => 'Die Passwörter sind nicht identisch.',
        }
    };

}
