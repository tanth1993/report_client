import * as React from 'react';

interface IHeader {
    name?: string
}
export const Header: React.FC<IHeader> = props => {
    const [numb, setState] = React.useState<number>(0)

    const { name } = props
    const render = () => {
        return <div className="">
            <h2>{name || 'Header'}</h2>
            <h4>{numb}</h4>
        </div>
    }

    const onClick = () => {
        console.log(process.env.ENVIRONMENT)
    }

    return <div className="" style={{ padding: 50 }}>
        {render()}

        <button onClick={() => setState(numb + 1)}> ++++++ </button>
        <br />
        <button onClick={() => setState(numb - 1)}> --------- </button>
    </div>
}