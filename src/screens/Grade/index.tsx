import './index.css'
import * as React from 'react';
import * as MUI from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { getGrades } from '@dev/store/gradesSlice';
import { RootState } from '@dev/store/rootReducer';
import * as Interfaces from '@dev/interfaces'
import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart
} from '@visx/xychart';
interface IGrade {

}

export const Grade: React.FC<IGrade> = props => {
    const dispatch = useDispatch()
    const [gradeId, setGradeId] = React.useState<string>('')
    const grades: Interfaces.IGradeModel[] = useSelector((state: RootState) => state.gradesReducer.list)


    React.useEffect(() => {
        dispatch(getGrades())
    }, [])

    const handleChange = (e: MUI.SelectChangeEvent<string>) => {
        setGradeId(e.target.value)
    }

    const renderSelect = () => {
        return <MUI.Select
            className='default-font-size'
            value={gradeId || ''}
            onChange={(e) => handleChange(e)}
            displayEmpty
            placeholder='Vui lòng chọn'
        >
            {grades?.map(g => <MUI.MenuItem key={g?._id} value={g?._id}>{g?.name}</MUI.MenuItem>)}
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

    return <div className=" d-flex rp-wrapper">
        <div className="rp-grade_control">
            <span>Khối lớp</span>
            {renderSelect()}
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


