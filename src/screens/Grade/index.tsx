import './index.scss'
import * as React from 'react';
import * as MUI from '@mui/material';
import { useHistory, useLocation, useParams } from 'react-router';
import { getGrades, getAvgScoresData, getAvgScoresDataByGender } from '@dev/store/gradesSlice';
import * as Interfaces from '@dev/interfaces'
import { serializeObj, useAppDispatch, useAppSelector, parseQuerytoObj } from '@dev/utils'
import * as Utils from '@dev/utils'
import { LineChartVISX } from '@dev/components';

interface IGrade {

}

export const Grade: React.FC<IGrade> = props => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const location = useLocation()

    const { gradeId } = parseQuerytoObj(location.search?.split('?')[1]) as Interfaces.IQuery || {}

    const [gradeNumberId, setGradeId] = React.useState<number>(gradeId || 10)
    const grades: Interfaces.IGradeModel[] = useAppSelector((state) => state.gradesReducer.list)
    const subjects = useAppSelector((state) => state.subjectsReducer.list)
    const { avgScores, avgScoresByGenderFemale, avgScoresByGenderMale } = useAppSelector(state => state.gradesReducer)

    React.useEffect(() => {
        const query = serializeObj({ gradeId: gradeNumberId })

        dispatch(getAvgScoresData(gradeNumberId))
        dispatch(getAvgScoresDataByGender(true, gradeNumberId))
        dispatch(getAvgScoresDataByGender(false, gradeNumberId))
        history.replace({ pathname: location.pathname, search: query })
    }, [gradeNumberId])

    React.useEffect(() => {
        dispatch(getGrades())
    }, [])

    const handleChange = (e: any) => {
        setGradeId(+e.target.value)
    }

    const renderSelect = () => {
        return <MUI.Select
            className='rp-selection'
            value={gradeNumberId}
            onChange={(e) => handleChange(e)}
            displayEmpty
            placeholder='Vui lòng chọn'
        >
            {grades?.map(g => <MUI.MenuItem key={g?.number} value={g?.number}>{g?.number}</MUI.MenuItem>)}
        </MUI.Select>
    }
    const renderChart = () => {
        const dataChart: Interfaces.IDataChart[] = avgScores?.map(a => {
            const subjectName = subjects?.find(s => s?.subjectId === a?._id)?.subjectNameVN ?? 'unknown'
            return {
                x: subjectName,
                y: +(a?.total?.toFixed(1) || 0)
            }
        }) ?? []
        const sortedData: Interfaces.IDataChart[] = Utils.sortDataByNames(dataChart, 'x')

        return <LineChartVISX dataInput={sortedData} title='Điểm trung bình của toàn học sinh theo các môn học' />
    }

    const renderChartByMale = () => {
        const dataChart: Interfaces.IDataChart[] = avgScoresByGenderMale?.map(a => {
            const subjectName = subjects?.find(s => s?.subjectId === a?._id)?.subjectNameVN ?? 'unknown'
            return {
                x: subjectName,
                y: +(a?.total?.toFixed(1) || 0)
            }
        }) ?? []
        const sortedData: Interfaces.IDataChart[] = Utils.sortDataByNames(dataChart, 'x')

        return <LineChartVISX dataInput={sortedData} title='Điểm trung bình của học sinh nam' />
    }
    const renderChartByFemale = () => {
        const dataChart: Interfaces.IDataChart[] = avgScoresByGenderFemale?.map(a => {
            const subjectName = subjects?.find(s => s?.subjectId === a?._id)?.subjectNameVN ?? 'unknown'
            return {
                x: subjectName,
                y: +(a?.total?.toFixed(1) || 0)
            }
        }) ?? []
        const sortedData: Interfaces.IDataChart[] = Utils.sortDataByNames(dataChart, 'x')

        return <LineChartVISX dataInput={sortedData} title='Điểm trung bình của học sinh nữ' />
    }

    return <div className="rp-grade">
        <div className="rp-grade_control">
            <h3>Thống kê thành tích theo khối lớp</h3>
            {renderSelect()}
        </div>
        <div className="rp-wrapper_chart">
            {renderChart()}
            <div className="rp-gender_chart">
                {renderChartByMale()}
                {renderChartByFemale()}
            </div>
        </div>
    </div>
}


