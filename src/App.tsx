import { useState } from 'react';
import './App.css'
import Form from './components/form'
import User from './components/user'
import { LayoutGroup } from "framer-motion";
import type { IGithubUser } from './types/github';
// import { searchGitHubUsers } from './api/repo';

function App() {
  const [results, setResults] = useState<IGithubUser[]>([]);
  return (
    <div className='py-10 xl:px-100 lg:px-50 md:px-10 px-4'>
      <div className='flex justify-center pb-10'> 
        <h1 className='text-2xl'>Repo Finder</h1>
      </div>
      <Form result={setResults}/>
      <div className='flex justify-center'>
        <div className='w-full md:w-8/12'>
          <LayoutGroup>
            {results.map(result => {
              return (
                <User user={result} key={result.id}/>
              )
            })}
          </LayoutGroup>
        </div>
      </div>
    </div>
  )
}

export default App
