import { useEffect, useState } from "react";
import axios from 'axios';
function Main()  {
    const CLIENT_ID = "98acb0a78b7f4a99beeeddabf77a7673"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const  RESPONSE_TYPE = "token"    
        
        
    
    const [searchKey, setSearchKey] = useState("");
    const [token, setToken] = useState('');
  
    useEffect(() => {
      const hash = window.location.hash;
      let storedToken = window.localStorage.getItem('token');
  
      if (!storedToken && hash) {
        storedToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split('=')[1];
        window.localStorage.setItem("token", storedToken);
      }
  
      setToken(storedToken);
    }, []);
  

    const logout = () =>{
      setToken("");
      window.localStorage.removeItem("token")
    }
    const searchArtists = async (e) => {
      e.preventDefault(); // Prevent default form submission
    
      if (searchKey.trim() === "") {
        return; // Don't proceed with empty search key
      }
    
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            q: searchKey,
            type: "artist"
          }
        });
    
        console.log(response.data);
        // Handle response data, update state, etc.
      } catch (error) {
        console.error("Error:", error);
        // Handle the error, display a message, etc.
      }
    };
    

    return (
      <div className="main">
        <div>
          {!token ? (
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>login spotify</a>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
          
          {token && (
            <form onSubmit={searchArtists}>
              <input type="text" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
              <button type="submit">Search</button>
            </form>
          )}
        </div>
      </div>
    );
    
}

export default Main;