import './index.css'
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { Bar } from 'react-chartjs-2'
import { RootState } from '@dev/store/rootReducer';
import { getAvgScorces, onResetState } from '@dev/store/overviewSlice';


interface IOverview {

}

export const Overview: React.FC<IOverview> = props => {
    const dispatch = useDispatch()
    const dataObj = useSelector((state: RootState) => state.overviewSlice.data)
    const isLoading = useSelector((state: RootState) => state.overviewSlice.isLoading)

    React.useEffect(() => {
        dispatch(getAvgScorces())
        return () => {
            dispatch(onResetState())
        }
    }, [])

    const renderChart = () => {
        return <Bar height={700} data={data} options={{ maintainAspectRatio: false }}
        />
    }

    return !isLoading ? <div className="rp-overview">
        <Button variant="contained">Contained</Button>
        <div className="">
            {renderChart()}
        </div>
        <div className="d-flex">
            <div className="">
                {renderChart()}
            </div>
            <div className="">
                {renderChart()}
            </div>
        </div>
    </div>
        : <span>'Loading...........................!!!!!!!!!!!!!!!!!!!!!!,Loading...........................!!!!!!!!!!!!!!!!!!!!!!'</span>
}

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'ALbelllll',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};