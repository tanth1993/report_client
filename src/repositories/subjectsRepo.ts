import * as Utils from '@dev/utils'
import * as Interfaces from '@dev/interfaces'


export const subjectsRepo = {
    getAllSubjects: (): Promise<Interfaces.ISubjectModel[]> => {
        const path = '/subjects'
        return Utils.api_call_get(path)
    },
    getAvgScoresAccordingBySubject: (query: Interfaces.IQuery): Promise<Interfaces.ITotal<string>[]> => {
        //query: subjectId
        const obj = Utils.serializeObj(query)
        const path = `/avg-score-by-subject?${obj}`
        return Utils.api_call_get(path)
    },
    getAmountStuInScaleBySubject: (query: Interfaces.IQuery): Promise<Interfaces.ITotal<number>[]> => {
        //query: subjectId, gradeId
        const obj = Utils.serializeObj(query)
        const path = `/amount-in-scale-by-subject?${obj}`
        return Utils.api_call_get(path)
    },
}

