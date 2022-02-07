import './index.scss'
import { IScoreBySubject } from '@dev/interfaces';
import * as React from 'react';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { responsiveThreshold } from '@dev/utils';


interface IRadarRechartsJS {
    data?: IScoreBySubject[]
    height?: number
    title?: string
    color?: string
    width?: number
    isLoading?: boolean
}
const isMobile = window.innerWidth < responsiveThreshold
export const RadarRechartsJS: React.FC<IRadarRechartsJS> = props => {
    const { data = defaultData, height = 400, title, color = '#2979ff', width = '100%' } = props

    const renderChart = () => {
        return data?.length > 0 && <ResponsiveContainer width={width} height={height} >
            <RadarChart data={[...data]} className={'rp-recharts'} outerRadius={isMobile ? 120 : 170}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subjectName" />
                <PolarRadiusAxis domain={[0, 10]} tickCount={6} />
                <Radar dataKey={'score'} stroke={color} fill={color} fillOpacity={0.6} isAnimationActive={true} />
                <Tooltip formatter={(value: number, name: string, props: any) => [value, 'Điểm']} />
                <Legend
                    wrapperStyle={{ position: 'relative', width: 170 }}
                    iconType={'square'}
                    payload={data.map(d => ({ value: `${d.subjectName}: ${d.score}`, type: 'square', id: d.subjectId, color: color, }))}
                />
            </RadarChart>
        </ResponsiveContainer>
    }

    return <div className="rp-chart">
        {title && <h4>{title}</h4>}
        <div className="">
            {renderChart()}
        </div>
    </div>
}
const defaultData = [
    {
        "score": 6,
        "subjectId": "a0f65e92-bac5-4ac4-9e46-d5088305b368",
        "subjectName": "Địa Lý"
    },
    {
        "score": 3,
        "subjectId": "a616e89c-899b-48df-a59c-776465c3dad9",
        "subjectName": "Anh Văn"
    },
    {
        "score": 10,
        "subjectId": "c6bc223c-9d5f-4fd6-92cd-e110b3eff87d",
        "subjectName": "Lịch Sử"
    },
    {
        "score": 6,
        "subjectId": "852fea54-d48c-4961-ab47-5d83753f556c",
        "subjectName": "Ngữ Văn"
    },
    {
        "score": 8,
        "subjectId": "db9d1758-8069-48e7-ad72-23a04523668e",
        "subjectName": "Toán"
    },
    {
        "score": 8,
        "subjectId": "2266d847-a9f0-4ccf-805a-1447c01703de",
        "subjectName": "Hóa"
    },
    {
        "score": 1,
        "subjectId": "179dcef9-1896-4bbb-aed8-24e1510094bd",
        "subjectName": "Lý"
    }
]