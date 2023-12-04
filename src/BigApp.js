import React, { lazy, Suspense } from 'react'
import App from './App'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function BigApp() {
    const login = lazy(() => import('./Login'))
    const app = lazy(() => import('./App'))
    const signup = lazy(() => import('./Signup'))
    return (
        <div>
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route path="/" exact component={app} />
                        <Route path="/login" exact component={login} />
                        <Route path="/signup" exact component={signup} />
                    </Switch>
                </Suspense>
            </Router>
        </div>
    )
}

export default BigApp
