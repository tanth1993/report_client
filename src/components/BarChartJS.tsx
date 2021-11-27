import './index.css'
import { IDataChart } from '@dev/interfaces';
import * as React from 'react';
import { Bar } from 'react-chartjs-2';


interface IBarChartjs {
    dataInput?: IDataChart[]
    height?: number
    label?: string
}

export const BarChartjs: React.FC<IBarChartjs> = props => {
    const { dataInput = [{ x: '1', y: 12, }, { x: '2', y: 55, }, { x: '6', y: 88, }], height = 300, children, label = '' } = props

    const renderChart = () => {
        return <Bar
            height={height}
            options={{ maintainAspectRatio: false, scales: {} }}
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
        {renderChart()}
    </div>
}
