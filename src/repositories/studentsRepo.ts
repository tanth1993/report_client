import * as Utils from '@dev/utils/apiCall'
import * as Interfaces from '@dev/interfaces'


export const studentsRepo = {
    getAllStudents: (): Promise<Interfaces.IStudentModel[]> => {
        const path = '/students'
        return Utils.api_call_get(path)
    },
}

