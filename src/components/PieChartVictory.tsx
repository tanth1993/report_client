import './index.scss'
import { IDataChart } from '@dev/interfaces';
import * as React from 'react';
import { VictoryPie, VictoryTooltip } from 'victory'
import { colorList } from '@dev/utils';

interface IPieChartVictory {
    dataInput?: IDataChart[]
    height?: number
    label?: string
    title?: string
    color?: string
    width?: number
}
export const PieChartVictory: React.FC<IPieChartVictory> = props => {
    const { dataInput = data, height = 400, title, width = 400 } = props

    const renderChart = () => {
        return <VictoryPie
            animate={{ duration: 400, onLoad: { duration: 100 } }}
            width={width}
            height={height}
            padding={60}
            data={dataInput}
            colorScale={colorList}
            labels={({ datum }) => (`Điểm ${datum.x}: ${datum.y} học sinh`)}
            innerRadius={80}
            labelComponent={<VictoryTooltip constrainToVisibleArea flyoutPadding={15} />}
        />
    }

    return <div className="rp-chart">
        {title && <h4>{title}</h4>}
        <div className="">
            {renderChart()}
        </div>
    </div>
}

const data = [
    { x: '1', y: 40 },
    { x: '2', y: 24 },
    { x: '3', y: 70 },
    { x: '4', y: 66 },
    { x: '5', y: 54 },
    { x: '6', y: 40 },
    { x: '7', y: 24 },
    { x: '8', y: 70 },
    { x: '9', y: 66 },
    { x: '10', y: 54 },

]
