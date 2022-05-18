import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../../store/action/userSlice"


const UserHeader = () => {
    const dispatch = useDispatch();
    const LogOutHandler = () => {
        dispatch(logout())
    }

    return (<Link to="/Login"> <LogoutIcon onClick={LogOutHandler} /></Link>);
}
export default UserHeader;