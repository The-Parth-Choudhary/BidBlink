import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import ProductForm from './ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';
import moment from 'moment';

function Products() {
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
                setProducts(response.products);
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
                return <div className="flex gap-5">
                    <i className="ri-delete-bin-line cursor-pointer" onClick={() => {
                        deleteProduct(record._id);
                    }}></i>
                    <i className="ri-pencil-line cursor-pointer" onClick={() => {
                        setSelectedProduct(record);
                        setShowProductForm(true);
                    }}></i>
                </div>
            }
        }
    ]

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className="flex justify-end mb-2">
                <Button onClick={() => { setShowProductForm(true) }}>Add Product</Button>
            </div>

            <Table columns={columns} dataSource={products} />

            <ProductForm
                showProductForm={showProductForm}
                setShowProductForm={setShowProductForm}
                selectedProduct={selectedProduct}
                getData={getData}
                setSelectedProduct={setSelectedProduct}
            />
        </div>
    )
}

export default Products