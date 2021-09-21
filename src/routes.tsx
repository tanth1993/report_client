import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import * as Paths from './utils/paths'
import * as Screens from './screens'
import Layout from './layouts';

export const RoutesModule: React.FC<{}> = props => {
    return <Router>
        <Layout>
            <Switch>
                <Route exact path={Paths.Home} component={Screens.Home} />
                <Route exact path={Paths.Detail} component={Screens.Detail} />

                <Route component={Screens.Home} />
            </Switch>
        </Layout>
    </Router>
}
