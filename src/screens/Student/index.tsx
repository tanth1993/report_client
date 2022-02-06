import './index.scss'
import * as React from 'react';
import { RadarRechartsJS, SkeletonSection, AutocompleteMUI } from '@dev/components'
import * as Paths from '@dev/utils/paths'
import { useHistory, useLocation } from 'react-router';
import * as Utils from '@dev/utils'
import * as Interfaces from '@dev/interfaces'
import { getStudentScoreByGrade, onResetState, getStudentsByQuery } from '@dev/store/studentsSlice';
import { InfoSection } from './InfoSection';

interface IStudent {

}

export const Student: React.FC<IStudent> = props => {
    const dispatch = Utils.useAppDispatch()
    const history = useHistory()
    const location = useLocation()
    const { dataPaging, dataQueryPaging, scoreSubjectsInGrade10, scoreSubjectsInGrade11, scoreSubjectsInGrade12, isLoadingData, isLoading } = Utils.useAppSelector((state) => state.studentsSlice)
    const { studentId: studentStrId } = Utils.parseQuerytoObj(location.search?.split('?')[1]) as Interfaces.IStudentQuery || {}
    const subjects = Utils.useAppSelector((state) => state.subjectsReducer.list)

    const [studentId, setSelectedStudentId] = React.useState<string>(studentStrId || dataPaging?.data?.[0]?.studentId || "")
    const [query, setQuery] = React.useState('');
    const isMounted = React.useRef(false);

    React.useEffect(() => {
        const query = Utils.serializeObj({ studentId })
        dispatch(getStudentScoreByGrade(studentId, 10))
        dispatch(getStudentScoreByGrade(studentId, 11))
        dispatch(getStudentScoreByGrade(studentId, 12))
        history.replace({ pathname: location.pathname, search: query })
    }, [studentId])

    React.useEffect(() => {
        isMounted.current = true
        if (!studentId) history.replace({ pathname: Paths.Overview })

        return () => {
            dispatch(onResetState())
        }
    }, [])


    const handleChange = (e: any, item: Interfaces.IStudentModel) => {
        if (!item) return
        setSelectedStudentId(item?.studentId || '')
    }
    const handleInputChange = ((value: string) => {

        setQuery(value)
        if (!value) return
        dispatch(getStudentsByQuery(value, 1, 20))
    })
    // const handleInputChange: any = Utils.debounce((value: string) => {
    //     setQuery(value)
    //     dispatch(getStudentsByQuery(value, 1, 20))
    // }, 1000);

    const getDataByGradeId = (gradeId: number) => {
        type TypeObj = {
            [key: number]: Interfaces.IGradeScoreModel[]
        }

        let obj: TypeObj = {
            10: scoreSubjectsInGrade10,
            11: scoreSubjectsInGrade11,
            12: scoreSubjectsInGrade12
        }

        return obj[gradeId] || []
    }

    const renderInfoSection = () => {
        const item = [...(dataPaging?.data || []), ...(dataQueryPaging?.data || [])]?.find(d => d?.studentId === studentId);
        return item && <InfoSection item={item} />
    }

    const renderChartByGrade = (gradeId: number) => {
        const data = [...getDataByGradeId(gradeId)]

        const dataChart: Interfaces.IScoreBySubject[] = data.map(d => {
            const subjectItem = subjects?.find(s => s?.subjectId === d?.subjectId) ?? {}
            return { score: d.score, subjectId: d.subjectId, subjectName: subjectItem?.subjectNameVN ?? '' }
        })
        const sortedData: Interfaces.IScoreBySubject[] = dataChart?.sort((a, b) => (a?.subjectName?.toLocaleLowerCase() || 0) > (b?.subjectName?.toLocaleLowerCase() || 0) ? -1 : 1)

        const title = `Điểm trung bình các môn ở khối ${gradeId}`
        return <RadarRechartsJS title={title} data={sortedData} isLoading={isLoadingData} />
    };

    const renderSelect = () => {
        return <AutocompleteMUI
            data={query ? dataQueryPaging?.data : dataPaging?.data}
            // value={[studentId]}
            placeholder='Nhập tên có dấu'
            onChange={(e, item: Interfaces.IStudentModel) => handleChange(e, item)}
            onInputChange={(e, value) => handleInputChange(value)}
            inputValue={query}
        // onFocus={() => setIsCallApi(true)}
        // onBlur={() => setIsCallApi(false)}
        />
    }

    return !isLoading ? <div className="rp-student">
        {renderSelect()}
        {renderInfoSection()}
        <div className="rp-gender_chart">
            {renderChartByGrade(10)}
            {renderChartByGrade(11)}
            {renderChartByGrade(12)}
        </div>
    </div>
        : <SkeletonSection />
}


