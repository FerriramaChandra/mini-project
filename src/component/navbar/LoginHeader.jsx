import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const LoginHeader = () => {
    return (<Link to="/Login"> <AccountCircleIcon /></Link>);
}

export default LoginHeader;