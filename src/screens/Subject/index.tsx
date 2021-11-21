import './index.css'
import * as React from 'react';
import * as Repo from '@dev/repositories'
import * as Utils from '@dev/utils'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { VictoryBar, VictoryChart, VictoryContainer } from 'victory'
interface ISubject {

}

export const Subject: React.FC<ISubject> = props => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value);
    };
    const renderChart = () => {
        return <VictoryChart width={2000} height={400} domainPadding={{ x: 40 }} >
            <VictoryBar

                data={data}
            />
        </VictoryChart>
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
        <div className="" style={{ height: 500 }}>
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
    { x: 'aa', y: 40 },
    { x: 'bb', y: 24 },
    { x: 'cc', y: 70 },
    { x: 'dd', y: 66 },
    { x: 'ee', y: 54 },
    { x: 'aaa', y: 40 },
    { x: 'bbb', y: 24 },
    { x: 'ccc', y: 70 },
    { x: 'ddd', y: 66 },
    { x: 'eee', y: 54 },
    { x: 'aaaa', y: 40 },
    { x: 'bbbb', y: 24 },
    { x: 'cccc', y: 70 },
    { x: 'dddd', y: 66 },
    { x: 'eeee', y: 54 },

]
