import React, { useEffect } from 'react';
import { Avatar, Badge, message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';
import Notifications from './Notifications';
import { GetAllNotifications, ReadAllNotifications } from '../apicalls/notifications';

function ProtectedPage({ children }) {
    const [notifications, setNotifications] = React.useState([]);
    const [showNotifications, setShowNotifications] = React.useState(false);
    const { user } = useSelector(state => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateToken = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetCurrentUser();
            dispatch(SetLoader(false));
            if (response.success) {
                dispatch(SetUser(response.data));
            }
            else {
                navigate('/login');
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            navigate('/login');
            message.error(error.message);
        }
    }

    const getNotifications = async () => {
        try {
            const response = await GetAllNotifications();
            if (response.success) {
                setNotifications(response.data);
            }
            else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    const readNotifications = async () => {
        try {
            const response = await ReadAllNotifications();
            if (response.success) {
                getNotifications()
            }
            else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
            getNotifications();
        }
        else {
            navigate('/login');
            message.error('Please login to continue');
        }
    }, []);

    return user &&
        <div>
            {/* header */}
            <div className='flex justify-between items-center bg-primary p-5'>
                <h1 className="text-2xl text-white cursor-pointer" onClick={() => { navigate('/') }}>BidBlink</h1>

                <div className='bg-white py-2 px-5 rounded flex gap-5'>
                    <span className='cursor-pointer uppercase text-main' onClick={() => {
                        if (user.role === 'user') {
                            navigate('/profile');
                        }
                        else {
                            navigate('/admin');
                        }
                    }}>
                        <b>{user.name}</b>
                    </span>

                    <Badge size='small' count={notifications?.filter((notification) => !notification.read).length}
                        onClick={() => {
                            readNotifications();
                            setShowNotifications(true)
                        }}>
                        <i class="ri-notification-2-line cursor-pointer text-yellow-600"></i>
                    </Badge>

                    <i className="ri-logout-box-r-line cursor-pointer text-red-600" onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }}></i>
                </div>
            </div>

            {/* body */}
            <div className='p-5'>
                {children}
            </div>

            {/* notifications */}
            {
                <Notifications
                    notifications={notifications}
                    reloadNotifications={getNotifications}
                    showNotifications={showNotifications}
                    setShowNotifications={setShowNotifications}
                />
            }
        </div>
}

export default ProtectedPage