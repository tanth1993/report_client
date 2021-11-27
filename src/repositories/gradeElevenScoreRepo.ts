import * as Utils from '@dev/utils/apiCall'
import * as Interfaces from '@dev/interfaces'


export const gradeElevenScoreRepo = {
    getScore: (): Promise<Interfaces.IGradeTenScoreModel[]> => {
        const path = '/grade-eleven-score'
        return Utils.api_call_get(path)
    },
    getAvgScores: (): Promise<Interfaces.ITotal<string>[]> => {
        const path = '/grade-eleven-avg-scores'
        return Utils.api_call_get(path)
    },
}

