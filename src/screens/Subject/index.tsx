import './index.scss'
import * as React from 'react';
import * as Utils from '@dev/utils'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory, useLocation } from 'react-router';
import { getSubjects, getAvgScoresData, getAvgScoresDataScaleByGrade } from '@dev/store/subjectsSlice';
import { BarChartVictory, PieChartVictory, SkeletonSection } from '@dev/components'
import * as Interfaces from '@dev/interfaces'
import * as Paths from '@dev/utils/paths'

interface ISubject {

}

export const Subject: React.FC<ISubject> = props => {
    const dispatch = Utils.useAppDispatch()
    const history = useHistory()
    const location = useLocation()
    const { list: subjects, avgScores, avgScoresByGrade10, avgScoresByGrade11, avgScoresByGrade12, isLoadingData } = Utils.useAppSelector((state) => state.subjectsReducer)

    const { subjectId: subjectQuery } = Utils.parseQuerytoObj(location.search?.split('?')[1]) as Interfaces.IQuery || {}
    const grades = Utils.useAppSelector((state) => state.gradesReducer.list)

    const [subjectId, setSubjectId] = React.useState<string>(subjectQuery || subjects[0]?.subjectId || "")


    React.useEffect(() => {
        const query = Utils.serializeObj({ subjectId })
        dispatch(getAvgScoresData(subjectId))
        dispatch(getAvgScoresDataScaleByGrade(subjectId, 10))
        dispatch(getAvgScoresDataScaleByGrade(subjectId, 11))
        dispatch(getAvgScoresDataScaleByGrade(subjectId, 12))
        history.replace({ pathname: location.pathname, search: query })
    }, [subjectId])

    React.useEffect(() => {
        if (!subjectId) history.replace({ pathname: Paths.Overview })
        // dispatch(getSubjects())
    }, [])


    const getDataByGradeId = (gradeId: number) => {
        type TypeObj = {
            [key: number]: Interfaces.ITotal<number>[]
        }

        let obj: TypeObj = {
            10: avgScoresByGrade10,
            11: avgScoresByGrade11,
            12: avgScoresByGrade12
        }
        return obj[gradeId] || []
    }

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
        const data: Interfaces.IDataChart[] = avgScores?.map(a => {
            const gradeName = grades?.find(g => g.gradeId === a._id)?.number
            const fixedTotal: number = +(a.total?.toFixed(1) || 0)
            return {
                x: 'Khối ' + gradeName,
                y: fixedTotal
            }
        })
        const sortData = Utils.sortDataByNames(data, 'x')

        return <BarChartVictory
            title='Điểm trung bình môn học theo 3 khối'
            dataInput={sortData}
        />
    }

    const renderChartByGrade = (gradeId: number) => {
        const data = [...getDataByGradeId(gradeId)]
        const sortData = data?.length > 0 ? (data || [])?.sort((a, b) => (a?._id || 0) < (b?._id || 0) ? -1 : 1) : []

        const convertData: Interfaces.IDataChart[] = sortData.map(d => {
            return {
                x: d?._id + '',
                y: d?.total,
            }
        })

        const title = `Số học sinh theo thang điểm 1 - 10 ở khối ${gradeId}`
        return <PieChartVictory dataInput={convertData} title={title} />
    }

    return !isLoadingData ? <div className="rp-subject">
        <div className="rp-subject_control">
            <h3>Thống kê thành tích theo môn học</h3>
            {renderSelect()}
        </div>
        <div className="rp-wrapper_chart">
            {renderChart()}
            <div className="rp-gender_chart">
                {renderChartByGrade(10)}
                {renderChartByGrade(11)}
                {renderChartByGrade(12)}
            </div>
        </div>
    </div>
        : <SkeletonSection />
}

