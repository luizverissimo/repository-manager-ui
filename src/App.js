import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  function getData() {
    api
      .get("repositories")
      .then((response) => setRepositories(response.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleAddRepository() {
    await api
      .post(`repositories`, {
        title: `semana-omni-stack3-${Date.now()}`,
        url: "git@github.com:luizverissimo/semanaomnistack.git",
        techs: ["nodejs", "postgresql"],
      })
      .then((response) => {
        setRepositories([...repositories, response.data]);
      })
      .catch((error) => console.log(error));
  }

  async function handleRemoveRepository(id) {
    await api
      .delete(`repositories/${id}`)
      .then(() => {
        const repositoriesFiltered = repositories.filter(
          (repository) => id != repository.id
        );
        setRepositories(repositoriesFiltered);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <div key={repository.id}>
            <li>{repository.title}</li>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
