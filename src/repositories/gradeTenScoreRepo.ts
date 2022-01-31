import * as Utils from '@dev/utils/apiCall'
import * as Interfaces from '@dev/interfaces'


export const gradeTenScoreRepo = {
    getScore: (): Promise<Interfaces.IGradeScoreModel[]> => {
        const path = '/grade-ten-score'
        return Utils.api_call_get(path)
    },
    getAvgScores: (): Promise<Interfaces.ITotal<string>[]> => {
        const path = '/grade-ten-avg-scores'
        return Utils.api_call_get(path)
    },
}

