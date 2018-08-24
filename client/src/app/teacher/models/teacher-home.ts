export class TeacherHome {
    constructor(
        public email: string,
        public firstname: string,
        public lastname: string,
        public school_name: string,
        public personal_id: string,
        public teacher_class?: Object[]
    ) { }
}