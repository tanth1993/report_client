import './index.scss'
import * as React from 'react';
import * as Repo from '@dev/repositories'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts'
interface IStudent {

}

export const Student: React.FC<IStudent> = props => {
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

    return <div className="rp-student">
        <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
        </FormControl>
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
