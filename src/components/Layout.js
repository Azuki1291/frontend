import React from 'react';

import Header from "./Header";
import Footer from "./Footer";
import { GlobalProvider } from '../context';

const Layout = ({ children }) => {
    return (
        <GlobalProvider>
            <Header />
            {children}
            <Footer />
        </GlobalProvider>
    )
}

export default Layout;