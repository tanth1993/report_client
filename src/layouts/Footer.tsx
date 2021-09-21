import * as React from 'react';
interface IFooter {

}

export const Footer: React.FC<IFooter> = props => {
    return <div className="footer">
        <div className="container">
            <div className="row align-center">
                <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            </div>
        </div>
    </div>
}

