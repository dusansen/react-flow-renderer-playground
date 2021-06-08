import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactFlowRenderer from './pages/react-flow-renderer/ReactFlowRenderer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/react-flow-renderer'>
            <ReactFlowRenderer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
