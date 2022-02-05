import './index.scss'
import * as React from 'react';
import { RadarRechartsJS, SkeletonSection, AutocompleteMUI } from '@dev/components'
import * as Paths from '@dev/utils/paths'
import { useHistory, useLocation } from 'react-router';
import * as Utils from '@dev/utils'
import * as Interfaces from '@dev/interfaces'
import { getStudentScoreByGrade } from '@dev/store/studentsSlice';

interface IStudent {

}

export const Student: React.FC<IStudent> = props => {
    const dispatch = Utils.useAppDispatch()
    const history = useHistory()
    const location = useLocation()
    const { dataPaging, scoreSubjectsInGrade10, scoreSubjectsInGrade11, scoreSubjectsInGrade12, isLoadingData } = Utils.useAppSelector((state) => state.studentsSlice)
    const { studentId } = Utils.parseQuerytoObj(location.search?.split('?')[1]) as Interfaces.IStudentQuery || {}
    const subjects = Utils.useAppSelector((state) => state.subjectsReducer.list)
    const defaultStudentItem = dataPaging?.data?.find(d => d?.studentId === studentId)

    const [studentItem, setSelectedStudentItem] = React.useState(defaultStudentItem || dataPaging?.data?.[0])

    React.useEffect(() => {
        const query = Utils.serializeObj({ studentId: studentItem?.studentId })
        dispatch(getStudentScoreByGrade(studentItem?.studentId, 10))
        dispatch(getStudentScoreByGrade(studentItem?.studentId, 11))
        dispatch(getStudentScoreByGrade(studentItem?.studentId, 12))
        history.replace({ pathname: location.pathname, search: query })
    }, [studentItem])

    React.useEffect(() => {
        if (!studentItem) history.replace({ pathname: Paths.Overview })
        // dispatch(getSubjects())
    }, [])


    const handleChange = (e: any, item: Interfaces.IStudentModel) => {
        if (!item) return
        setSelectedStudentItem(item)
    }
    const getDataByGradeId = (gradeId: number) => {
        type TypeObj = {
            [key: number]: Interfaces.IGradeScoreModel[]
        }

        let obj: TypeObj = {
            10: scoreSubjectsInGrade10,
            11: scoreSubjectsInGrade11,
            12: scoreSubjectsInGrade12
        }

        return obj[gradeId] || []
    }
    const renderChartByGrade = (gradeId: number) => {
        const data = [...getDataByGradeId(gradeId)]

        const dataChart: Interfaces.IScoreBySubject[] = data.map(d => {
            const subjectItem = subjects?.find(s => s?.subjectId === d?.subjectId) ?? {}
            return { score: d.score, subjectId: d.subjectId, subjectName: subjectItem?.subjectNameVN ?? '' }
        })
        const sortedData: Interfaces.IScoreBySubject[] = dataChart?.sort((a, b) => (a?.subjectName?.toLocaleLowerCase() || 0) > (b?.subjectName?.toLocaleLowerCase() || 0) ? -1 : 1)

        const title = `Điểm trung bình các môn ở khối ${gradeId}`
        return <RadarRechartsJS title={title} data={sortedData} isLoading={isLoadingData} />
    };

    const renderSelect = () => {
        return <AutocompleteMUI
            data={dataPaging?.data}
            value={studentItem}
            placeholder='Nhập tên có dấu'
            onChange={(e, item: Interfaces.IStudentModel) => handleChange(e, item)}
        />
    }

    return <div className="rp-student">
        {renderSelect()}

        <div className="rp-gender_chart">
            {renderChartByGrade(10)}
            {renderChartByGrade(11)}
            {renderChartByGrade(12)}
        </div>
    </div>
}


