import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/layouts/Landing';
import Auth from './views/Auth';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Auth authRoute="login" />} />
                <Route path="/register" element={<Auth authRoute="register" />} />
            </Routes>
        </Router>
    );
}

export default App;
