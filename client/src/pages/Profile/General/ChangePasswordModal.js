import { Form, Input, Modal, message } from 'antd'
import React from 'react'
import { SetLoader } from '../../../redux/loadersSlice';
import { UpdatePassword } from '../../../apicalls/users';
import { useDispatch, useSelector } from 'react-redux';

const rules = [
    {
        required: true,
        message: 'Required'
    }
];

function ChangePasswordModal({ showPasswordForm, setShowPasswordForm }) {
    const formRef = React.useRef(null);
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            const response = await UpdatePassword(user._id, values);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                setShowPasswordForm(false);
            }
            else {
                dispatch(SetLoader(false));
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }

    return (
        <Modal title='' open={showPasswordForm} onCancel={() => {
            setShowPasswordForm(false);
        }} centered okText='Update' onOk={() => {
            formRef.current.submit();
        }}>
            <Form layout='vertical' ref={formRef} onFinish={onFinish}>
                <Form.Item label='Old Password' name='oldPassword' rules={rules}>
                    <Input type='password' />
                </Form.Item>
                <Form.Item label='New Password' name='newPassword' rules={rules}>
                    <Input type='password' />
                </Form.Item>
                <Form.Item label='ReEnter new Password' name='reenterNewPassword' rules={rules}>
                    <Input type='password' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChangePasswordModal