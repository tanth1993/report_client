import * as React from 'react';
import logo from '@dev/assets/images/logo.png'
import { Link } from 'react-router-dom';


export const Header: React.FC<{}> = props => {

    return <div className="header">
        <div className="row align-center">
            <div className="logo"><Link to={'/'}><img src={logo} alt='logo' /></Link></div>
            <div className="wrapper_navigation">
                link link link
            </div>
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