import React from 'react';

import { createContext, useContext, useState } from 'react'

export const GlobalProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState("")
    const [bunerWallets, setBunerWallets] = useState("")
    const [isMember, setMember] = useState(false)

    const contextProvider = {
        walletAddress,
        setWalletAddress,
        setBunerWallets,
        bunerWallets,
        setMember,
        isMember
    }
    return (
        <GlobalContext.Provider value={contextProvider}>
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalContext = createContext({
    walletAddress: "",
    setWalletAddress: () => { },
    bunerWallets: "",
    setBunerWallets: () => { },
    setMember: () => { },
    isMember: "",
})

export function useGlobalContext() {
    return useContext(GlobalContext)
}