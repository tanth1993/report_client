import * as React from 'react';
import logo from '@dev/assets/images/logo.png'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getSubjects } from '@dev/store/subjectsSlice';
import { getGrades } from '@dev/store/gradesSlice';
import { getStudents } from '@dev/store/studentsSlice';



export const Header: React.FC<{}> = props => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getSubjects())
        dispatch(getGrades())
        dispatch(getStudents('', 1))
    }, [])

    return <div className="header">
        <div className="row align-center">
            <div className="logo"><Link to={'/'}><img src={logo} alt='logo' /></Link></div>
            {/* <div className="wrapper_navigation">
                link link link
            </div> */}
        </div>
        {/* *************** Breadcrumb **************** */}
        {/* <div className="breadcrumb">
            <div className="container">
                <div className="row">
                    {getPathFromLocation()}
                </div>
            </div>
        </div> */}
    </div>

}