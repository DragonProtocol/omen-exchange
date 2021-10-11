import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Loadable from 'react-loadable'
import { Redirect, Route, HashRouter as Router, Switch } from 'react-router-dom'
import { useWeb3Context } from 'web3-react'

import { DISCLAIMER_TEXT, DOCUMENT_TITLE } from '../../common/constants'
import { MainScroll, MainWrapper, WrongNetworkMessage } from '../common'
import { Disclaimer } from '../common/disclaimer'
import { Footer } from '../common/layout/footer'
import { Header } from '../common/layout/header'
const RedirectToHome = () => <Redirect to="/" />
const SettingsViewContainer = Loadable({
  loader: () => import('../settings/settings_view'),
  loading: () => null,
  render(loaded, props) {
    const Component = loaded.default
    return <Component {...props} />
  },
})
const MarketHomeContainer = Loadable({
  loader: () => import('../market/sections/market_list/market_home_container'),
  loading: () => null,
  render(loaded) {
    const Component = loaded.MarketHomeContainer

    return <Component />
  },
})
const MarketRoutes = Loadable({
  loader: () => import('../market/routes/market_routes'),
  loading: () => null,
  render(loaded, props) {
    const Component = loaded.default
    return <Component {...props} />
  },
})

const MarketWizardCreatorContainer = Loadable({
  loader: () => import('../market/sections/market_create/market_wizard_creator_container'),
  loading: () => null,
  render(loaded) {
    const Component = loaded.MarketWizardCreatorContainer
    return <Component />
  },
})
export const Main: React.FC = () => {
  const context = useWeb3Context()

  const windowObj: any = window
  const defaultChainID = 1
  const [networkId, setNetworkId] = useState(windowObj.ethereum ? windowObj.ethereum.chainId : defaultChainID)

  if (windowObj.ethereum) {
    windowObj.ethereum.on('chainChanged', (chainId: string) => setNetworkId(chainId))
  }

  return (
    <>
      <Router>
        <MainWrapper>
          <Header />
          <Helmet>
            <title>{DOCUMENT_TITLE}</title>
          </Helmet>
          <MainScroll>
            {context.error && <WrongNetworkMessage />}
            {!context.error && (
              <Switch>
                <Route exact path="/">
                  <Redirect to="/liquidity" />
                </Route>
                <Route
                  exact
                  path="/settings"
                  render={props => <SettingsViewContainer networkId={networkId} {...props} />}
                />
                <Route
                  component={MarketHomeContainer}
                  path={['/24h-volume', '/volume', '/newest', '/ending', '/liquidity']}
                />
                <Route component={MarketWizardCreatorContainer} exact path="/create" />
                <Route component={MarketRoutes} path="/:address" />
                <Route component={RedirectToHome} />
              </Switch>
            )}
          </MainScroll>
          <Footer />
          {DISCLAIMER_TEXT.length > 0 && <Disclaimer />}
        </MainWrapper>
      </Router>
    </>
  )
}
