import './index.scss'
import * as React from 'react';
import * as Utils from '@dev/utils'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory, useLocation, useParams } from 'react-router';
import { getSubjects, getAvgScoresData } from '@dev/store/subjectsSlice';
import { BarChartVictory } from '@dev/components'
import * as Interfaces from '@dev/interfaces'

interface ISubject {

}

export const Subject: React.FC<ISubject> = props => {
    const dispatch = Utils.useAppDispatch()
    const history = useHistory()
    const location = useLocation()
    const { subjectId: subjectQuery } = Utils.parseQuerytoObj(location.search?.split('?')[1]) as Interfaces.IQuery || {}
    const { list: subjects, avgScores, avgScoresByGrade10, avgScoresByGrade11, avgScoresByGrade12, isLoadingData } = Utils.useAppSelector((state) => state.subjectsReducer)

    const [subjectId, setSubjectId] = React.useState<string>(subjectQuery || "")


    React.useEffect(() => {
        const query = Utils.serializeObj({ subjectId })
        dispatch(getAvgScoresData(subjectId))
        history.replace({ pathname: location.pathname, search: query })
    }, [subjectId])

    React.useEffect(() => {
        dispatch(getSubjects())
    }, [])

    const handleChange = (e: any) => {
        setSubjectId(e.target.value)
    }
    const renderSelect = () => {
        return <Select
            className='rp-selection'
            value={subjectId}
            onChange={(e) => handleChange(e)}
            displayEmpty
            placeholder='Vui lòng chọn'
        >
            {subjects?.map(s => <MenuItem key={s?.subjectId} value={s?.subjectId}>{s?.subjectNameVN}</MenuItem>)}
        </Select>
    }
    const renderChart = () => {

        return <BarChartVictory
            title='điểm trung bình môn học theo 3 khối'
        />
    }
    const renderChartByGrade = () => {
        return
    }

    return <div className="rp-subject">
        <div className="rp-subject_control">
            <h3>Thống kê thành tích theo môn học</h3>
            {renderSelect()}
        </div>
        <div className="rp-wrapper_chart">
            {renderChart()}
            <div className="rp-gender_chart">
            </div>
        </div>
    </div>
}

