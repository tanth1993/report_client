import * as Utils from '@dev/utils/apiCall'
import * as Interfaces from '@dev/interfaces'


export const gradeTenScoreRepo = {
    getScore: (): Promise<Interfaces.IGradeTenScoreModel[]> => {
        const path = '/grade-ten-score'
        return Utils.api_call_get(path)
    },
}
