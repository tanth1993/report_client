import './index.scss'
import { IDataChart } from '@dev/interfaces';
import * as React from 'react';
import {
    AnimatedAxis,
    Tooltip,
    AnimatedLineSeries,
    XYChart
} from '@visx/xychart';


interface ILineChartVISX {
    dataInput?: IDataChart[]
    height?: number
    label?: string
    title?: string
    color?: string
}
const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => d.y,
};

export const LineChartVISX: React.FC<ILineChartVISX> = props => {
    const { dataInput = data, height = 500, title, color = '#2979ff' } = props

    const renderChart = () => {
        return <XYChart
            height={height}
            margin={{ left: 100, top: 20, bottom: 20, right: 50 }}
            xScale={{ type: 'band' }}
            yScale={{ type: 'linear' }}>
            <AnimatedAxis orientation="bottom" />
            <AnimatedAxis orientation="left"
                tickFormat={(value) => value + ' điểm'} />
            <AnimatedLineSeries
                stroke={color}
                strokeWidth={10}
                dataKey="Line"
                data={dataInput}
                {...accessors}
            />
            <Tooltip
                snapTooltipToDatumX
                snapTooltipToDatumY
                showVerticalCrosshair
                showHorizontalCrosshair
                showSeriesGlyphs
                renderTooltip={({ tooltipData }) => {
                    return <div className="rp-tooltip">
                        <div className="rp-tooltip_content">
                            <span style={{ background: color }}></span>
                            <span>{accessors.yAccessor(tooltipData?.nearestDatum?.datum)} điểm</span>
                        </div>
                    </div>
                }}
            />
        </XYChart>
    }
    return <div className="rp-chart">
        {title && <h4>{title}</h4>}
        <div className="">
            {renderChart()}
        </div>
    </div>
}

const data = [
    { x: 'aa', y: 50 },
    { x: 'bb', y: 10 },
    { x: 'cc', y: 20 },
    { x: 'dd', y: 70 },
    { x: 'ee', y: 55 },
    { x: 'ff', y: 64 },
    { x: 'gg', y: 32 },
    { x: 'hh', y: 89 },
];
