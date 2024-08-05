import { useEffect, useState } from "react"


import Main from "./components/main/main"
import Login from "./components/auth/Login"

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")))
  }, [])

  return (
    <>
      {isAuthenticated ? (
        <Main setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  )
}

export default App