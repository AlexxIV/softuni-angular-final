export class Student {
    constructor(
        public firstname : string,
        public lastname: string,
        public email: string,
        public oldPassword: string,
        public newPassword: string,
        public confirmedPassword: string,
        public student_class: number,
        public teacher: Object,
        public personal_id: string,
        public school_name: string
    ) { }
}