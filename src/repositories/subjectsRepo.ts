import * as Utils from '@dev/utils/apiCall'
import * as Interfaces from '@dev/interfaces'


export const subjectsRepo = {
    getAllSubjects: (): Promise<Interfaces.ISubjectModel[]> => {
        const path = '/subjects'
        return Utils.api_call_get(path)
    },
}

