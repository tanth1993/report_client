export interface IMenu {
    name?: string
    icon?: JSX.Element
    path?: string
}
export interface IStudentModel {
    _id?: string
    studentId?: string
    name?: string
    birthday?: string
    isMale?: boolean
}

export interface ISubjectModel {
    _id?: string
    subjectId?: string
    subjectName?: string
    subjectNameVN?: string
}

export interface IGradeModel {
    _id?: string
    gradeId?: string
    name?: string
}

export interface IGradeTenScoreModel {
    _id?: string
    gradeId?: string
    subjectId?: string
    score?: number
    studentId?: string

}