export class UserRegister {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public confirmedPassword: string,
        public isTeacher?: boolean,
        public teacher_class_ref?: number
    ) { }
}