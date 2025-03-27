import { useState } from "react";

function App() {
  const [json, setJson] = useState(null);
  const [error, setError] = useState("");

  const fetchJSON = async () => {
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      if (!resp.ok) throw new Error("failed to fetch");
      console.log();
      const jsonItem = await resp.json();
      setJson(jsonItem);
      setError(null);
    } catch (err) {
      setError(err?.message ?? err);
    }
  };

  return (
    <>
      <h2>Parsed Json</h2>
      {error ? (
        <p>Errop on fetching JSON</p>
      ) : json ? (
        <div> {JSON.stringify(json)} </div>
      ) : (
        <p>Fetch json first</p>
      )}
      <button onClick={fetchJSON}>Fetch</button>
    </>
  );
}

export default App;
