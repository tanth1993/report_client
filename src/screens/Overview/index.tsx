import './index.scss'
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as Components from '@dev/components'
import { RootState } from '@dev/store/rootReducer';
import { getAvgScorces, onResetState } from '@dev/store/overviewSlice';
import * as Interfaces from '@dev/interfaces';
import * as Utils from '@dev/utils'

interface IOverview {

}

export const Overview: React.FC<IOverview> = props => {
    const dispatch = useDispatch()
    const dataObj = useSelector((state: RootState) => state.overviewSlice.data)
    const subjects = useSelector((state: RootState) => state.subjectsReducer.list)
    const isLoading = useSelector((state: RootState) => state.overviewSlice.isLoading)

    React.useEffect(() => {
        dispatch(getAvgScorces())
        return () => {
            dispatch(onResetState())
        }
    }, [])

    const renderChart = (dataObjKey: Interfaces.gradeNameTypes, label: string, title: string) => {
        const data = convertToDataChart(dataObj[dataObjKey], subjects)
        return <Components.BarChartjs dataInput={data} label={label} title={title} />
    }
    return !isLoading ? <div className="rp-overview">
        {renderChart('twelve', '', 'Điểm trung bình các môn theo khối lớp 12')}
        {renderChart('eleven', '', 'Điểm trung bình các môn theo khối lớp 11')}
        {renderChart('ten', '', 'Điểm trung bình các môn theo khối lớp 10')}
    </div>
        : <Components.SkeletonSection numberItem={2} />
}

function convertToDataChart(data: Interfaces.ITotal<string>[], subjects: Interfaces.ISubjectModel[]) {
    if (subjects?.length > 0) {
        const dataChart: Interfaces.IDataChart[] = data?.map(t => {
            const subjectObj = subjects?.find(s => s?.subjectId === t?._id)?.subjectNameVN
            return {
                x: subjectObj,
                y: +(t?.total?.toFixed(1) ?? 0)
            }
        })
        return Utils.sortDataByNames(dataChart, 'x')
    }
}