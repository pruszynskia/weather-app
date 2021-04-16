import './App.css';
import Weather from './components/Weather';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Weather} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
