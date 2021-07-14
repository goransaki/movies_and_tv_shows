export class ArrayHelper {

    public static getValue(array, key: any, defaultValue = null): any {

        if (this.isFunction(key)) {
            return key(array, defaultValue);
        }

        if (key instanceof Array) {
            const lastKey = key.pop();
            for (const keyPart of key) {
                array = this.getValue(array, keyPart);
            }
            key = lastKey;
        }

        if (array instanceof Array && (typeof array[key] !== 'undefined')) {
            return array[key];
        }

        if (array instanceof Object && (typeof array[key] == 'undefined')) {
            return defaultValue;
        }

        if (key.indexOf('.') !== -1) {
            const pos = key.indexOf('.');
            array = this.getValue(array, key.substring(0, pos), defaultValue);
            key = key.substring(pos + 1);
        }

        if (array !== null && typeof array === 'object') {
            return array[key];
        } else if (array instanceof Array) {
            return (typeof array[key] !== 'undefined') ? array[key] : defaultValue;
        }

        return defaultValue;

    }

    public static isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    public static getOneLevelValue(array, key: any, defaultValue = null): any {

        if (this.isFunction(key)) {
            return key(array, defaultValue);
        }

        if (key instanceof Array) {
            const lastKey = key.pop();
            for (const keyPart of key) {
                array = this.getValue(array, keyPart);
            }
            key = lastKey;
        }

        if (array instanceof Array && (typeof array[key] !== 'undefined')) {
            return array[key];
        }

        if (array !== null && typeof array === 'object') {
            return array[key];
        } else if (array instanceof Array) {
            return (typeof array[key] !== 'undefined') ? array[key] : defaultValue;
        }

        return defaultValue;

    }

    public static shuffleArray(o: Array<any>): Array<any> {
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

}
