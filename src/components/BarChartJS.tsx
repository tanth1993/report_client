import './index.scss'
import { IDataChart } from '@dev/interfaces';
import * as React from 'react';
import { Bar } from 'react-chartjs-2';


interface IBarChartjs {
    dataInput?: IDataChart[]
    height?: number
    label?: string
    title?: string
}

export const BarChartjs: React.FC<IBarChartjs> = props => {
    const { dataInput = [{ x: '1', y: 12, }, { x: '2', y: 55, }, { x: '6', y: 88, }], height = 300, children, label = '', title } = props

    const renderChart = () => {
        return <Bar
            height={height}
            options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    y: {
                        suggestedMax: 10,
                        ticks: {
                            callback: (value) => {
                                return value + ' điểm'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false //This will do the task
                    }
                }
            }}
            data={{
                datasets: [{
                    label: label,
                    data: dataInput,
                    backgroundColor: '#2979ff',
                    borderColor: '#2979ff',
                    borderWidth: 1,
                    barPercentage: 0.5
                },]

            }}
        />
    }
    return <div className="rp-chart bar-chart">
        {title && <h4>{title}</h4>}
        <div className="">
            {renderChart()}
        </div>
    </div>
}
