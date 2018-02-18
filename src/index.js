import ReactDOM from 'react-dom';
import './styles/css/styles.css';
import { routes } from './components/router';


const router = routes();

ReactDOM.render(router, document.getElementById('root'));

