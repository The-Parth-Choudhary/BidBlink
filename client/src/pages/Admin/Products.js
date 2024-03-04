import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { GetProducts, UpdateProductStatus } from '../../apicalls/products';
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
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const onStatusUpdate = async (id, status) => {
        try {
            dispatch(SetLoader(true));
            const response = await UpdateProductStatus(id, status);
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
            title: 'Seller',
            dataIndex: 'name',
            render: (text, record) => {
                return record.seller.name
            }
        },
        {
            title: 'Product',
            dataIndex: 'image',
            render: (text, record) => {
                return <img className='w-20 h-20 object-cover rounded-md' src={record?.images?.length > 0 ? record.images[0] : ''} />
            }
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
            dataIndex: 'status',
            render: (text, record) => {
                let color;
                if (text === 'pending') color = '#bebe00'
                else if (text === 'approved') color = 'green'
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
                    {status === 'pending' && <span className='cursor-pointer text-green-600 font-bold' onClick={() => {
                        onStatusUpdate(_id, 'approved')
                    }}>Approve</span>}
                    {status === 'pending' && <span className='cursor-pointer text-red-600 font-bold' onClick={() => {
                        onStatusUpdate(_id, 'rejected')
                    }}>Reject</span>}
                    {status === 'approved' && <span className='cursor-pointer text-red-600 font-bold' onClick={() => {
                        onStatusUpdate(_id, 'blocked')
                    }}>Block</span>}
                    {status === 'blocked' && <span className='cursor-pointer text-green-600 font-bold' onClick={() => {
                        onStatusUpdate(_id, 'approved')
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