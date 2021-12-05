import * as Utils from '@dev/utils'
import * as Interfaces from '@dev/interfaces'

export const gradesRepo = {
    getAllGrades: (): Promise<Interfaces.IGradeModel[]> => {
        const path = '/grades'
        return Utils.api_call_get(path)
    },
    getAvgScoresAccordingBySubjects: (gradeId: number): Promise<Interfaces.ITotal<string>[]> => {
        const path = `/avg-score-grades/${gradeId}`
        return Utils.api_call_get(path)
    },
    getAvgScoresAccordingByGendersBySubjects: (query: Interfaces.IQuery): Promise<Interfaces.ITotal<string>[]> => {
        //query: isMale, gradeId
        const obj = Utils.serializeObj(query)
        const path = `/avg-score-grades-by-gender?${obj}`
        return Utils.api_call_get(path)
    },
}

