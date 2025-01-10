import React from 'react'
import CatalogStore from '../store/CatalogStore.js'
import UserStore from '../store/UserStore.js'
import CartStore from '../store/CartStore.js'

const AppContext = React.createContext()

const context = {
    user: new UserStore(),
    catalog: new CatalogStore(),
    cart: new CartStore(),
}

const AppContextProvider = (props) => {
    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    );
}

export {AppContext, AppContextProvider}