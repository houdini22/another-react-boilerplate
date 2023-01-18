import * as React from 'react'
import { Routes, HashRouter as Router, Route } from 'react-router-dom'
import { BlankPageLayout } from './layouts'
import IndexView from './routes/Index/components/Index'
const App = () => (
    <Router>
        <Routes>
            <Route
                path="/"
                element={
                    <BlankPageLayout>
                        <IndexView />
                    </BlankPageLayout>
                }
            />
        </Routes>
    </Router>
)

export { App }
export default App
