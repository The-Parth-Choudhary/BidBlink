import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { GetProducts } from '../../apicalls/products';
import moment from 'moment';

function Products() {
    const [products, setProducts] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts(null);
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.products);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const onStatusUpdate = (id, status) => {

    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Seller',
            dataIndex: 'name',
            render: (text, record) => {
                return record.seller.name
            }
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Added on',
            dataIndex: 'createdAt',
            render: (text, record) => moment(record.createdAt).format('DD-MM-YYYY hh:mm A')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                const { status, _id } = record;
                return <div className="flex gap-3">
                    {status === 'Pending' && <span className='underline cursor-pointer' onClick={() => {
                        onStatusUpdate(_id, 'Approved')
                    }}>Approve</span>}
                    {status === 'Pending' && <span className='underline cursor-pointer' onClick={() => {
                        onStatusUpdate(_id, 'Rejected')
                    }}>Reject</span>}
                    {status === 'Approved' && <span className='underline cursor-pointer' onClick={() => {
                        onStatusUpdate(_id, 'Blocked')
                    }}>Block</span>}
                    {status === 'Blocked' && <span className='underline cursor-pointer' onClick={() => {
                        onStatusUpdate(_id, 'Blocked')
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
            <Table columns={columns} dataSource={products} />
        </div>
    )
}

export default Products