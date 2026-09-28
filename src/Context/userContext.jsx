import React, { createContext, useState, useEffect } from 'react'

export let UserContext = createContext()

export default function UserContextProvider(props) {

  const [userToken, setUserToken] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(true)

  function saveUserToken(token) {
    localStorage.setItem("userToken", token)
    setUserToken(token)
    setIsLogin(true)
  }

  useEffect(() => {

    const token = localStorage.getItem('userToken')

    if (token) {
      setUserToken(token)
      setIsLogin(true)
    }

    setLoading(false)

  }, [])

  return (

    <UserContext.Provider value={{
      isLogin,
      setIsLogin,
      userToken,
      setUserToken,
      saveUserToken,
      loading
    }}>

      {props.children}

    </UserContext.Provider>

  )
}