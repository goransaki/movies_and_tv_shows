export class StorageHelper {

    public static setConfigItem(key: string, value: string): void {
        const storageKey = StorageHelper.getStorageKey();
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify({ [key]: value }));
            return;
        }
        const data = Object.assign(JSON.parse(localStorage.getItem(storageKey)), { [key]: value });
        localStorage.setItem(storageKey, JSON.stringify(data));
        return;
    }

    public static getConfigItem(item: string): string | null {
        if (!localStorage.getItem(StorageHelper.getStorageKey())) {
            return null;
        }
        const data = JSON.parse(localStorage.getItem(StorageHelper.getStorageKey()));
        return item in data ? data[item] : null;
    }

    public static getStorageKey(): string {
        return 'teo_preferences';
    }

    public static getLastLoginName(): string | null {
        if (!StorageHelper.localStorageIsSupported()) {
            return null;
        }
        return localStorage.getItem('teo_last_login_email');
    }

    public static sessionStorageIsSupported(): boolean {
        try {
            const key = 'teo_lscheck';
            if (sessionStorage.getItem(key) && sessionStorage.getItem(key) === key) {
                return true;
            }
            sessionStorage.setItem(key, key);
            return true;
        } catch (e) {
            return false;
        }
    }

    public static localStorageIsSupported(): boolean {
        try {
            const key = 'teo_lscheck';
            if (localStorage.getItem(key) && localStorage.getItem(key) === key) {
                return true;
            }
            localStorage.setItem(key, key);
            return true;
        } catch (e) {
            return false;
        }
    }


    public static getItem(item) {
        if (StorageHelper.sessionStorageIsSupported()) {
            return sessionStorage.getItem(item);
        }
        return null;
    }

    public static setItem(item, value) {
        if (StorageHelper.sessionStorageIsSupported()) {
            sessionStorage.setItem(item, value);
        }
        return;
    }

    public static removeItem(item) {
        if (StorageHelper.sessionStorageIsSupported()) {
            sessionStorage.removeItem(item);
        }
        return;
    }

}
