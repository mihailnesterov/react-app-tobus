import { BrowserRouter as Router } from "react-router-dom";
import { Container } from 'reactstrap';
import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

function App() {
    return (
        <div id="wrapper" className="m-0 p-0 bg-gray-super-light">
            <Router>
                <Container fluid={true} className="p-0">
                    <Header /> 
                </Container>
                <Container>
                    <Content />
                </Container>
            </Router>
            <Container fluid={true} className="p-0">
                <Footer />
            </Container>
            
        </div>
    );
}

export default App;
