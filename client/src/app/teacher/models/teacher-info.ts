export class TeacherInfo {
    constructor(
        public firstname : string,
        public lastname: string,
        public email: string,
        public oldPassword: string,
        public newPassword: string,
        public confirmedPassword: string,
        public personal_id: string,
        public school_name: string,
        public teacher_class_ref: number
    ) { }
}