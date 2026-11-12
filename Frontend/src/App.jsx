import { useState } from "react";
import "./App.css";
function App() {
  async function ShortenUrl(){
    try{
      console.log("Shortening URL",url);
      const response = await fetch("http://localhost:3000/api/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url }),
      });
    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }
      const data = await response.json();
      setShortUrl(data.Shorturl);
    }
    catch(err){
      console.log("Error shortening URL",err);
    }
  }
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  return (
    <div className="container">
      <h1>URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={ShortenUrl}>Shorten URL</button>

      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </div>
  );
}

export default App;