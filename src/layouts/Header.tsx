import * as React from 'react';
import logo from '@dev/assets/images/logo.png'
import chartJS from '@dev/assets/images/chartjs.jpg'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { getSubjects } from '@dev/store/subjectsSlice';
import { getGrades } from '@dev/store/gradesSlice';
import { getStudents } from '@dev/store/studentsSlice';
import Drawer from '@mui/material/Drawer';
import { LeftMenu, menulist } from './LeftMenu';
import * as Paths from '@dev/utils/paths';



export const Header: React.FC<{}> = props => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);

    React.useEffect(() => {
        dispatch(getSubjects())
        dispatch(getGrades())
        dispatch(getStudents('', 1))
    }, [])

    React.useEffect(() => {
        renderLogoByRoute()
    }, [location.pathname]);

    const renderLogoByRoute = () => {
        const { pathname } = location
        let defaultTitle = 'Document'
        switch (pathname) {
            case Paths.Overview:
                document.title = menulist?.find(l => l?.path === Paths.Overview)?.name || defaultTitle
                break
            case Paths.Grade:
                document.title = menulist?.find(l => l?.path === Paths.Grade)?.name || defaultTitle
                break
            case Paths.Subject:
                document.title = menulist?.find(l => l?.path === Paths.Subject)?.name || defaultTitle
                break
            case Paths.Student:
                document.title = menulist?.find(l => l?.path === Paths.Student)?.name || defaultTitle
                break
            default:
                defaultTitle;
                break
        }
    }

    const renderLeftMenu = () => {
        return <Drawer
            anchor={'left'}
            open={isOpenMenu}
            onClose={() => setIsOpenMenu(false)}
        ><LeftMenu /></Drawer>
    }

    return <div className="header">
        <div className="row align-center header_wrapper">
            <div className="logo"><Link to={'/'}><img src={chartJS} alt='logo' /></Link></div>
            <div className="hamburger_menu ml-auto" onClick={() => setIsOpenMenu(true)}>
                <span></span>
            </div>
        </div>
        {renderLeftMenu()}
    </div>

}