import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import moment from 'moment';
import { GetAllUsers, UpdateUserStatus } from '../../apicalls/users';

function Users() {
    const [users, setUsers] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllUsers();
            dispatch(SetLoader(false));
            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const onStatusUpdate = async (id, status) => {
        try {
            dispatch(SetLoader(true));
            const response = await UpdateUserStatus(id, status);
            if (response.success) {
                message.success(response.message);
                getData();
            }
            else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text, record) => {
                return record.role.toUpperCase();
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text, record) => moment(record.createdAt).format('DD-MM-YYYY hh:mm A')
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => {
                let color;
                if (text === 'active') color = 'green'
                else color = 'red'
                return {
                    props: {
                        style: { color: color, fontWeight: 500 }
                    },
                    children: text.toUpperCase()
                };
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                const { status, _id } = record;
                return <div className="flex gap-3">
                    {status === 'active' && <span className='cursor-pointer text-red-600 font-bold' onClick={() => {
                        onStatusUpdate(_id, 'blocked')
                    }}>Block</span>}
                    {status === 'blocked' && <span className='cursor-pointer text-green-600 font-bold' onClick={() => {
                        onStatusUpdate(_id, 'active')
                    }}>Unblock</span>}
                </div>
            }
        }
    ]

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Table columns={columns} dataSource={users} />
        </div>
    )
}

export default Users