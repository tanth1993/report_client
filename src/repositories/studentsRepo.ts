import * as Utils from '@dev/utils'
import * as Interfaces from '@dev/interfaces'


export const studentsRepo = {
    getAllStudents: (): Promise<Interfaces.IStudentModel[]> => {
        const path = '/students'
        return Utils.api_call_get(path)
    },
    getStudentsByQuery: (query: Interfaces.IStudentQuery): Promise<Interfaces.IPaginationData<Interfaces.IStudentModel[]>> => {
        const obj = Utils.serializeObj(query)
        const path = `/get-students-by-query?${obj}`
        return Utils.api_call_get(path)
    },
    getStudentDetail: (id: string): Promise<Interfaces.IStudentModel> => {
        const path = `/get-student-detail/${id}`
        return Utils.api_call_get(path)
    },
    getStudentScoreByGrade: (studentId?: string, gradeId?: number): Promise<Interfaces.IGradeScoreModel[]> => {
        const path = `/get-score-student/${studentId}/${gradeId}`
        return Utils.api_call_get(path)
    },
}

