import './index.scss'
import { IDataChart } from '@dev/interfaces';
import * as React from 'react';
import { VictoryBar, VictoryChart, VictoryTooltip, VictoryAxis } from 'victory'

interface IBarChartVictory {
    dataInput?: IDataChart[]
    height?: number
    label?: string
    title?: string
    color?: string
    width?: number
}
export const BarChartVictory: React.FC<IBarChartVictory> = props => {
    const { dataInput = data, height = 400, title, color = '#2979ff', width = 1200 } = props

    const renderChart = () => {
        return <VictoryChart
            animate={{ duration: 400, onLoad: { duration: 100 } }}
            width={width}
            height={height}
            padding={{ left: 70, top: 30, bottom: 50, right: 70 }}
            domainPadding={{ x: 150 }}
            domain={{ y: [0, 10] }}
        >
            <VictoryAxis />
            <VictoryBar
                style={{
                    data: { fill: color }
                }}
                data={dataInput}
                labels={({ datum }) => (`${datum.y} điểm`)}
                labelComponent={<VictoryTooltip constrainToVisibleArea flyoutPadding={15} />}
            />
            <VictoryAxis
                dependentAxis
                tickFormat={d => {
                    return d + ' điểm'
                }}
                tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
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
