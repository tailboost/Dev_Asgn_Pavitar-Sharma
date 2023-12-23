import { useEffect } from "react";

const oauth_client_id = "1a7604b5-9e56-4958-87a9-3f5f2812c922";

function App() {
  // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
  useEffect(() => {
    const params = new URL(window.document.location).searchParams;
    const code = params.get("code");
    if (!code) return;
    fetch(`http://localhost:8000/login/${code}`).then(async (resp) => {
      console.log(resp.json());
    });
  }, []);

  return (
    <div>
      <a
        className="btn"
        style={{ display: "block" }}
        href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
      >
        Connect to Notion
      </a>
    </div>
  );
}

export default App;
