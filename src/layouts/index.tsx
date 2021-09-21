import * as React from 'react';
// import * as Paths from '../utils/paths'
import { Header } from './Header';
import { Footer } from './Footer';
import { LeftMenu } from './LeftMenu';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";


interface ILayoutProps {
}
interface ILayoutState {

}

class Layout extends React.Component<RouteComponentProps<ILayoutProps>, ILayoutState> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }

    private unlisten: any
    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            console.log("on route change");
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }

    public render() {
        return <div className="body-wrapper">
            {/* header */}
            <Header />

            <LeftMenu />

            {/* content */}
            <div className="content">
                {this.props.children}
            </div>

            {/* footer` */}
            <Footer />
        </div>
    }
}
export default withRouter(Layout)