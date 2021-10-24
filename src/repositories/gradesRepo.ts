import * as Utils from '@dev/utils/apiCall'
import * as Interfaces from '@dev/interfaces'


export const gradesRepo = {
    getAllGrades: (): Promise<Interfaces.IGradeModel[]> => {
        const path = '/grades'
        return Utils.api_call_get(path)
    },
}

