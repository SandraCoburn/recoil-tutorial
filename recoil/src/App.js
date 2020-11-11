import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import './App.css';

const reposState = atom({
  key: 'repos',
  default: [],
});

function App() {
  const [repos, setRepos] = useRecoilState(reposState);

  useEffect(() => {
    const getRepos = async () => {
      const url = 'https://ghapi.huchen.dev/repositories?since=monthly';
      const resp = await fetch(url);
      const body = await resp.json();
      console.log(body);
    };
    getRepos();
  }, []);
  return repos.map((repo) => (
    <div key={repo.url}>
      <a href={repo.url}>
        {repo.autorh} /{repo.name}
      </a>
      <div>{repo.description}</div>
    </div>
  ));
}

export default App;
