import './index.css'
import * as React from 'react';
import * as MUI from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { getGrades } from '@dev/store/gradesSlice';
import { RootState } from '@dev/store/rootReducer';
import * as Interfaces from '@dev/interfaces'

interface IGrade {

}

export const Grade: React.FC<IGrade> = props => {
    const dispatch = useDispatch()
    const [gradeId, setGradeId] = React.useState<string>('')
    const grades: Interfaces.IGradeModel[] = useSelector((state: RootState) => state.gradesReducer.list)


    React.useEffect(() => {
        dispatch(getGrades())
    }, [])

    const handleChange = (e: MUI.SelectChangeEvent<string>) => {
        setGradeId(e.target.value)
    }

    const renderSelect = () => {
        return <MUI.Select
            className='default-font-size'
            value={gradeId || ''}
            onChange={(e) => handleChange(e)}
            displayEmpty
            placeholder='Vui lòng chọn'
        >
            {grades?.map(g => <MUI.MenuItem key={g?._id} value={g?._id}>{g?.name}</MUI.MenuItem>)}
        </MUI.Select>
    }

    return <div className=" d-flex rp-wrapper">
        <div className="rp-grade_control">
            <span>Khối lớp</span>
            {renderSelect()}
        </div>
    </div>
}

