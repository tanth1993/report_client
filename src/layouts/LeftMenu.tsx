import * as React from 'react';
import classnames from 'classnames'
import { IMenu } from '../interfaces'
import { NavLink } from 'react-router-dom';
import * as Paths from '@dev/utils/paths'

export const LeftMenu: React.FC<{}> = props => {

    return <div className={classnames({
        "left-menu": true,
    })}>
        {(menulist || []).map((item, i) => {
            return <NavLink exact key={`menu_${i}`} to={item.path || ''}>
                <div className="left-menu_item">
                    <span className='left-menu_item_icon'>{item.icon}</span>
                    <span className='left-menu_item_name'>{item.name}</span>
                </div>
            </NavLink>
        })}
    </div>
}

const menulist: IMenu[] = [
    {
        name: 'Tổng quan',
        path: Paths.Overview,
    },
    {
        name: 'Khối lớp',
        path: Paths.Grade,
    },
    {
        name: 'Môn học',
        path: Paths.Subject,
    },
    {
        name: 'Hồ sơ học sinh',
        path: Paths.Student,
    },
]