/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

// Vendor Module
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import 'react-native-gesture-handler'
import 'react-native-get-random-values'

// @components
import Main from 'src/Main'

// @Utils
import { store } from 'store'

export default function App() {
    return (
        <StoreProvider store={store}>
            <Main />
        </StoreProvider>
    )
}
