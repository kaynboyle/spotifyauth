import { useEffect, useState } from "react";
import axios from 'axios';
function Main()  {
    const CLIENT_ID = "98acb0a78b7f4a99beeeddabf77a7673"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const  RESPONSE_TYPE = "token"    
        
        
    const{token, setToken} = useState("")

    useEffect( () => {
      const hash = window.location.hash
      let token = window.localStorage.getItem('token')

      
      if(!token && hash){
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split('=')[1]
        
        window.location.hash = ""
        window.localStorage.setItem("token", token)
        setToken(token)
        console.log(token)
        console.log("whee")
        

      }
    }, [])

    const logout = () =>{
      setToken("")
      window.localStorage.removeItem("token")
    }


  return (
    <div className="main">
      <div>

      {!token==token ?

        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>login spotify</a>
        : <button onClick={logout}>Logout</button>
      }

      {token==token ?
        <form>
          <input type="text"/>
          <button type={"submit"}>Searches</button>
        </form>
        : <h2>Please Login</h2>
        }
        </div>
        
    </div>
  );
}

export default Main;