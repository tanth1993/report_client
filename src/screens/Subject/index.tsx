import './index.css'
import * as React from 'react';
import * as Repo from '@dev/repositories'
import * as Utils from '@dev/utils'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
interface ISubject {

}

export const Subject: React.FC<ISubject> = props => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value);
    };
    const renderChart = () => {
        return <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
    }

    return <div className="rp-subject">
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        <h3>chart</h3>
        <div className="">
            {renderChart()}
        </div>
        <div style={{ width: 70 }}>
            {Utils.femaleAvt}
        </div>
        <div style={{ width: 70 }}>
            {Utils.maleAvt}
        </div>
        <div style={{ width: 70 }}>
            {Utils.notebookAvt}
        </div>
        <div style={{ width: 70 }}>
            {Utils.overviewAvt}
        </div>
        <div style={{ width: 70 }}>
            {Utils.userInfo}
        </div>
        <div style={{ width: 70 }}>
            {Utils.bookAvt}
        </div>
        <div style={{ width: 70 }}>
            {Utils.badageAvt}
        </div>
    </div>
}

const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300
    }
]
