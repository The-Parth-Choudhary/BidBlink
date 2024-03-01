import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import { GetProductById, GetProducts } from '../../apicalls/products'
import { message } from 'antd';
import Divider from '../../components/Divider';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

function ProductInfo() {
    const [product, setProduct] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const { id } = useParams();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProductById(id);
            dispatch(SetLoader(false));
            if (response.success) {
                setProduct(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    React.useEffect(() => {
        getData();
    }, [])

    return (
        product && <div>
            <div className="grid grid-cols-2 gap-5">
                {/* images */}
                <div className='flex flex-col gap-5'>
                    <img src={product.images[selectedImageIndex]} alt="" className='w-full h-96 object-cover rounded-md' />
                    <div className="flex gap-5">
                        {product.images.map((image, index) => {
                            return (
                                <img className={
                                    'w-20 h-20 object-cover rounded-md cursor-pointer ' + (selectedImageIndex === index
                                        ? 'border-2 border-green-700 border-dashed p-2' : '')
                                } src={image} alt='' onClick={() => { setSelectedImageIndex(index) }} />
                            )
                        })}
                    </div>

                    <Divider />

                    <div className='text-gray-500'>
                        <h1>Added On</h1>
                        <span>{moment(product.createdAt).format('D MMM, YYYY hh::mm A')}</span>
                    </div>
                </div>

                {/* details */}
                <div className="flex flex-col gap-3">
                    <div>
                        <h1 className='text-2xl font-semibold text-primary'>{product.name}</h1>
                        <span>{product.description}</span>
                    </div>

                    <Divider />

                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-semibold text-primary'>Product details</h1>
                        <div className="flex justify-between mt-2">
                            <span>Price</span>
                            <span>Rs. {product.price}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Category</span>
                            <span className='uppercase'>{product.category}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Bill Availabile</span>
                            <span>{product.billAvailable ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Box Availabile</span>
                            <span>{product.boxAvailable ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Accessories Availabile</span>
                            <span>{product.accessoriesAvailable ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Warrenty Availabile</span>
                            <span>{product.warrentyAvailable ? 'Yes' : 'No'}</span>
                        </div>
                    </div>

                    <Divider />

                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-semibold text-primary'>Seller details</h1>
                        <div className="flex justify-between mt-2">
                            <span>Name</span>
                            <span>{product.seller.name}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Email</span>
                            <span>{product.seller.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo