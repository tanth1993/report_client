import './index.scss'
import * as React from 'react';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts'

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
    const { dataPaging } = Utils.useAppSelector((state) => state.studentsSlice)
    const { studentId: studentStrId } = Utils.parseQuerytoObj(location.search?.split('?')[1]) as Interfaces.IStudentQuery || {}

    const [studentId, setSelectedStudentId] = React.useState<string>(studentStrId || dataPaging?.data?.[0]?.studentId || "")

    React.useEffect(() => {
        const query = Utils.serializeObj({ studentId })
        dispatch(getStudentScoreByGrade(studentId, 10))
        dispatch(getStudentScoreByGrade(studentId, 11))
        dispatch(getStudentScoreByGrade(studentId, 12))
        history.replace({ pathname: location.pathname, search: query })
    }, [studentId])

    // React.useEffect(() => {
    //     dispatch(getStudents('', 1))

    // }, [])


    const handleChange = (e: any) => {
        setSelectedStudentId(e.target.value)
    }

    const renderChart = () => {
        return <RadarChart outerRadius={90} width={730} height={250} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
        </RadarChart>

    }
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
        <h3>Chart</h3>
        <div className="">
            {renderChart()}
        </div>
    </div>
}

const data = [
    {
        "subject": "Math",
        "A": 120,
        "B": 100,
        "fullMark": 150
    },
    {
        "subject": "Chinese",
        "A": 98,
        "B": 12,
        "fullMark": 150
    },
    {
        "subject": "English",
        "A": 140,
        "B": 30,
        "fullMark": 150
    },
    {
        "subject": "Geography",
        "A": 99,
        "B": 140,
        "fullMark": 150
    },
    {
        "subject": "Physics",
        "A": 150,
        "B": 30,
        "fullMark": 150
    },
    {
        "subject": "History",
        "A": 42,
        "B": 125,
        "fullMark": 150
    }
]
