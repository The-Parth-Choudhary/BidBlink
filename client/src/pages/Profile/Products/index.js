import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import ProductForm from './ProductForm';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { GetProducts } from '../../../apicalls/products';

function Products() {
    const [products, setProducts] = React.useState([]);
    const [showProductForm, setShowProductForm] = React.useState(false);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts();
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.products);
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
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return <div className="flex gap-5">
                    <i className="ri-delete-bin-line cursor-pointer"></i>
                    <i className="ri-pencil-line cursor-pointer"></i>
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
                <Button onClick={() => setShowProductForm(true)}>Add Product</Button>
            </div>

            <Table columns={columns} dataSource={products} />

            <ProductForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} />
        </div>
    )
}

export default Products