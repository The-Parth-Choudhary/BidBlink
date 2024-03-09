import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import ProductForm from './ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';
import moment from 'moment';
import Bids from './Bids';

function Products() {
    const [showBids, setShowBids] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [showProductForm, setShowProductForm] = React.useState(false);
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts({ seller: user._id });
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteProduct(id);
            dispatch(SetLoader(false));
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
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
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
            dataIndex: 'price',
            render: (text, render) => {
                return 'Rs. ' + text;
            }
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
                return (
                    <div className="flex gap-5 items-center">
                        <i className="ri-delete-bin-line cursor-pointer text-red-600" onClick={() => {
                            deleteProduct(record._id);
                        }}></i>
                        <i className="ri-pencil-line cursor-pointer text-blue-600" onClick={() => {
                            setSelectedProduct(record);
                            setShowProductForm(true);
                        }}></i>
                        <span className="cursor-pointer text-green-600" onClick={() => {
                            setSelectedProduct(record);
                            setShowBids(true);
                        }}>Show Bids</span>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className="flex justify-end mb-2">
                <Button type='default' onClick={() => {
                    setSelectedProduct(null);
                    setShowProductForm(true)
                }}>Add Product</Button>
            </div>

            <Table columns={columns} dataSource={products} />

            {showProductForm && <ProductForm
                showProductForm={showProductForm}
                setShowProductForm={setShowProductForm}
                selectedProduct={selectedProduct}
                getData={getData}
                setSelectedProduct={setSelectedProduct}
            />}

            {showBids && <Bids
                showBidsModel={showBids}
                setShowBidsModel={setShowBids}
                selectedProduct={selectedProduct}
            />}
        </div>
    )
}

export default Products