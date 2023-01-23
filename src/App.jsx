import { Stack } from '@mui/system'
import './App.css'
import GithubRepo from './pages/GithubRepo'
function App() {

  return (
    <div className="App">
      <Stack gap={4}>
        <GithubRepo />
      </Stack>
    </div>
  )
}

export default App
