import './index.scss'
import * as React from 'react';
import * as MUI from '@mui/material';
import { useHistory, useLocation, useParams } from 'react-router';
import { getGrades, getAvgScoresData, getAvgScoresDataByGender } from '@dev/store/gradesSlice';
// import { RootState } from '@dev/store/rootReducer';
import * as Interfaces from '@dev/interfaces'
import { serializeObj, useAppDispatch, useAppSelector, parseQuerytoObj } from '@dev/utils'

import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart
} from '@visx/xychart';
interface IGrade {

}

export const Grade: React.FC<IGrade> = props => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const location = useLocation()

    const { gradeId } = parseQuerytoObj(location.search?.split('?')[1]) as Interfaces.IQuery || {}

    const [gradeNumberId, setGradeId] = React.useState<number>(gradeId || 10)
    const grades: Interfaces.IGradeModel[] = useAppSelector((state) => state.gradesReducer.list)

    React.useEffect(() => {
        const query = serializeObj({ gradeId: gradeNumberId })

        dispatch(getAvgScoresData(gradeNumberId))
        dispatch(getAvgScoresDataByGender(true, gradeNumberId))
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
        return <XYChart
            height={500}
            margin={{ left: 100, top: 20, bottom: 20, right: 50 }}
            xScale={{ type: 'band' }}
            yScale={{ type: 'linear' }}>
            <AnimatedAxis orientation="bottom" />
            <AnimatedAxis orientation="left"
                tickFormat={(value) => value + ' hoc sinh'} />
            <AnimatedLineSeries stroke={'#2979ff'} strokeWidth={10} dataKey="Line" data={data} xAccessor={d => { return d.x }} yAccessor={d => { return d.y }} />
        </XYChart>
    }

    return <div className="rp-grade">
        <div className="rp-grade_control">
            <h3>Thống kê thành tích theo khối lớp</h3>
            {renderSelect()}
        </div>
        <div className="rp-wrapper">
            {renderChart()}
        </div>
    </div>
}
const data = [
    { x: 'aa', y: 50 },
    { x: 'bb', y: 10 },
    { x: 'cc', y: 20 },
    { x: 'dd', y: 70 },
    { x: 'ee', y: 55 },
    { x: 'ff', y: 64 },
    { x: 'gg', y: 32 },
    { x: 'hh', y: 89 },
];


