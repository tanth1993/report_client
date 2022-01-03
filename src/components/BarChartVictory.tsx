import './index.scss'
import { IDataChart } from '@dev/interfaces';
import * as React from 'react';
import { VictoryBar, VictoryChart, VictoryContainer } from 'victory'

interface IBarChartVictory {
    dataInput?: IDataChart[]
    height?: number
    label?: string
    title?: string
    color?: string
    width?: number
}
export const BarChartVictory: React.FC<IBarChartVictory> = props => {
    const { dataInput = data, height = 500, title, color = '#2979ff', width = 2000 } = props

    const renderChart = () => {
        return <VictoryChart width={width} height={height} domainPadding={{ x: 40 }} >
            <VictoryBar
                data={dataInput}
            />
        </VictoryChart>
    }

    return <div className="rp-chart">
        {title && <h4>{title}</h4>}
        <div className="">
            {renderChart()}
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
