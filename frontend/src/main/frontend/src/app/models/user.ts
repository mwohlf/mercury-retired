export class User {
    id: number;
    login: string;
    email: string;
    timeZone: string;
    locale: string;

    constructor(id: number = 0, login: string, email: string, timeZone?: string, locale?: string) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.timeZone = timeZone;
        this.locale = locale;
    }

}
