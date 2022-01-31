
export type gradeNameTypes = 'ten' | 'eleven' | 'twelve'
export type IData = {
    [K in gradeNameTypes]: ITotal<string>[];
};
export type ItemData<K extends string, V> = {
    [Key in K]: V
}
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
    number?: number
}

export interface IGradeScoreModel {
    _id?: string
    gradeId?: string
    subjectId?: string
    score?: number
    studentId?: string

}
export interface ITotal<T> {
    _id?: T
    total?: number
}

export interface IDataChart {
    x?: string
    y?: number
    label?: string
}
export interface IQuery {
    isMale?: boolean | string
    gradeId?: number
    subjectId?: string
}
export interface IPaginationData<T> {
    data?: T
    totalCount?: number
}
export interface IStudentQuery extends IQuery {
    text?: string
    page?: number
    pageSize?: number
    studentId?: string
}