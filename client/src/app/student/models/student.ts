export class Student {
    constructor(
        public firstname : string,
        public lastname: string,
        public email: string,
        public oldPassword: string,
        public newPassword: string,
        public confirmedPassword: string
    ) { }
}