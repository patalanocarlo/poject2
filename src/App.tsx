import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './assets/components/ArticoleList';
import ArticleDetail from './assets/components/ArticaleDetails';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;