import * as Repo from '@dev/repositories'
import * as React from 'react';
interface IDetail {

}

export const Detail: React.FC<IDetail> = props => {
    React.useEffect(() => {
        getGeo()
    }, [])

    const getGeo = async () => {
        let rsp = await Repo.studentsRepo.getAllStudents()
        console.log(rsp)
    }
    return <div className="Detail">
        Detail Component Detail Component Detail Component Detail Component Detail Component
    </div>
}

