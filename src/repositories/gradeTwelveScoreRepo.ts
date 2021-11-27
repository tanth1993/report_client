import * as Utils from '@dev/utils/apiCall'
import * as Interfaces from '@dev/interfaces'


export const gradeTwelveScoreRepo = {
    getScore: (): Promise<Interfaces.IGradeTenScoreModel[]> => {
        const path = '/grade-twelve-score'
        return Utils.api_call_get(path)
    },
    getAvgScores: (): Promise<Interfaces.ITotal<string>[]> => {
        const path = '/grade-twelve-avg-scores'
        return Utils.api_call_get(path)
    },
}

