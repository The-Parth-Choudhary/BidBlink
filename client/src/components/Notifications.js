import { Modal, message } from 'antd'
import React from 'react'
import Divider from '../components/Divider';
import { useNavigate } from 'react-router-dom';
import { DeleteNotification } from '../apicalls/notifications';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import moment from 'moment';

function Notifications({ notifications, reloadNotifications, showNotifications, setShowNotifications }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteCurrNotification = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteNotification(id);
            if (response.success) {
                reloadNotifications();
                dispatch(SetLoader(false));
                message.success(response.message);
            }
            else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    return (
        <Modal title='Notifications' open={showNotifications} onCancel={() => setShowNotifications(false)} centered footer={null} width={1000}>
            <div className='flex flex-col gap-2'>
                {notifications.length > 0 ? notifications.map((notification) => {
                    return (
                        <div className='flex flex-col gap-2 border border-solid border-gray-300 rounded p-2 cursor-pointer'
                            key={notification._id}>
                            <div className="flex justify-between">
                                <div onClick={() => {
                                    navigate(notification.onclick);
                                    setShowNotifications(false);
                                }}>
                                    <h1>{notification.title}</h1>
                                    <span>{notification.message}</span>
                                    <h1 className='text-gray-500 text-sm'>{moment(notification.createdAt).fromNow()}</h1>
                                </div>
                                <i className="ri-delete-bin-line cursor-pointer flex items-center text-red-600" onClick={() => {
                                    deleteCurrNotification(notification._id);
                                }}></i>
                            </div>
                        </div>
                    )
                }) : <div><h1 className='text-gray-600'>No new Notification</h1></div>}
            </div>
        </Modal>
    )
}

export default Notifications