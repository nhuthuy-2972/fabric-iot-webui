import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToasterContainer } from 'baseui/toast'//hien thi thong bao
import { BaseProvider } from 'baseui'//theme
import { Client as Styletron } from 'styletron-engine-atomic'//theme
import { Provider as StyletronProvider } from 'styletron-react'//theme

import IndexPage from './pages'
import DevicesPage from './pages/devices'
import { ProvideAuth } from './hooks/use-auth'
import { Layout } from './components/layout'
import { Theme } from './shared/theme'

const engine = new Styletron()

const App: React.FC<{}> = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={Theme}>
        <ToasterContainer>
          <ProvideAuth>
            <BrowserRouter>
              <Layout>
                <Switch>
                  <Route exact path="/">
                    <IndexPage />
                  </Route>
                  <Route exact path="/devices/:id">
                    <DevicesPage />
                  </Route>
                </Switch>
              </Layout>
            </BrowserRouter>
          </ProvideAuth>
        </ToasterContainer>
      </BaseProvider>
    </StyletronProvider>
  )
}

export default App
