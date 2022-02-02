import './index.scss'
import * as React from 'react';
import { RadarRechartsJS, SkeletonSection } from '@dev/components'
import * as Paths from '@dev/utils/paths'
import Select from '@mui/material/Select';
import { useHistory, useLocation, useParams } from 'react-router';
import * as Utils from '@dev/utils'
import * as Interfaces from '@dev/interfaces'
import MenuItem from '@mui/material/MenuItem';
import { getStudentScoreByGrade } from '@dev/store/studentsSlice';

interface IStudent {

}

export const Student: React.FC<IStudent> = props => {
    const dispatch = Utils.useAppDispatch()
    const history = useHistory()
    const location = useLocation()
    const { dataPaging, scoreSubjectsInGrade10, scoreSubjectsInGrade11, scoreSubjectsInGrade12 } = Utils.useAppSelector((state) => state.studentsSlice)
    const { studentId: studentStrId } = Utils.parseQuerytoObj(location.search?.split('?')[1]) as Interfaces.IStudentQuery || {}
    const subjects = Utils.useAppSelector((state) => state.subjectsReducer.list)

    const [studentId, setSelectedStudentId] = React.useState<string>(studentStrId || dataPaging?.data?.[0]?.studentId || "")

    React.useEffect(() => {
        const query = Utils.serializeObj({ studentId })
        dispatch(getStudentScoreByGrade(studentId, 10))
        dispatch(getStudentScoreByGrade(studentId, 11))
        dispatch(getStudentScoreByGrade(studentId, 12))
        history.replace({ pathname: location.pathname, search: query })
    }, [studentId])

    React.useEffect(() => {
        if (!studentId) history.replace({ pathname: Paths.Overview })
        // dispatch(getSubjects())
    }, [])


    const handleChange = (e: any) => {
        setSelectedStudentId(e.target.value)
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
        const sortData = data?.length > 0 ? (data || [])?.sort((a, b) => (a?._id || 0) < (b?._id || 0) ? -1 : 1) : []

        const dataChart: Interfaces.IScoreBySubject[] = sortData.map(d => {
            const subjectItem = subjects?.find(s => s?.subjectId === d?.subjectId) ?? {}
            return { score: d.score, subjectId: d.subjectId, subjectName: subjectItem?.subjectNameVN ?? '' }
        })
        console.log(dataChart);
        const title = `Điểm trung bình các môn ở khối ${gradeId}`
        return <RadarRechartsJS title={title} />
    };

    const renderSelect = () => {
        return <Select
            className='rp-selection'
            value={studentId}
            onChange={(e) => handleChange(e)}
            displayEmpty
            placeholder='Vui lòng chọn'
        >
            {dataPaging?.data?.map(s => <MenuItem key={s?.studentId} value={s?.studentId}>{s?.name}</MenuItem>)}
        </Select>
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


