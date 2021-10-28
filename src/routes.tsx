import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import * as Paths from './utils/paths'
import * as Screens from './screens'
import Layout from './layouts';

export const RoutesModule: React.FC<{}> = props => {
    return <Router>
        <Layout>
            <Switch>
                <Redirect exact from="/" to={Paths.Overview} />

                <Route exact path={Paths.Overview} component={Screens.Overview} />
                <Route exact path={Paths.Grade} component={Screens.Grade} />
                <Route exact path={Paths.Subject} component={Screens.Subject} />
                <Route exact path={Paths.Student} component={Screens.Student} />

            </Switch>
        </Layout>
    </Router>
}
