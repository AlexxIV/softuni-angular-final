export class EditStudent {
    constructor(
        public id: string,
        public firstname : string,
        public lastname: string,
        public email: string,
        public student_class: number,
        public teacher: Object,
        public personal_id: string,
        public school_name: string
    ) { }
}