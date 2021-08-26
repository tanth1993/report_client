import * as React from 'react';

interface IHeader {
    name?: string
}
export const Header: React.FC<IHeader> = props => {
    const { name } = props
    const render = () => {

        return <div className="">{name || 'Header'}</div>
    }
    const onClick = () => {

        console.log(process.env.ENVIRONMENT)

    }

    return <div className="">
        {render()}

        <button onClick={onClick}> CLick</button>
    </div>
}