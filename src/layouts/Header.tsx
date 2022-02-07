import * as React from 'react';
import logo from '@dev/assets/images/logo.png'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getSubjects } from '@dev/store/subjectsSlice';
import { getGrades } from '@dev/store/gradesSlice';
import { getStudents } from '@dev/store/studentsSlice';
import Drawer from '@mui/material/Drawer';
import { LeftMenu } from './LeftMenu';



export const Header: React.FC<{}> = props => {
    const dispatch = useDispatch()
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);

    React.useEffect(() => {
        dispatch(getSubjects())
        dispatch(getGrades())
        dispatch(getStudents('', 1))
    }, [])

    const renderLeftMenu = () => {
        return <Drawer
            anchor={'left'}
            open={isOpenMenu}
            onClose={() => setIsOpenMenu(false)}

        ><LeftMenu /></Drawer>
    }

    return <div className="header">
        <div className="row align-center header_wrapper">
            <div className="logo"><Link to={'/'}><img src={logo} alt='logo' /></Link></div>
            <div className="hamburger_menu ml-auto" onClick={() => setIsOpenMenu(true)}>
                <span></span>
            </div>
        </div>
        {renderLeftMenu()}
    </div>

}