import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import { GetProducts } from '../../apicalls/products'
import { message } from 'antd';
import Divider from '../../components/Divider';
import { useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.users);
    const [products, setProducts] = React.useState([]);
    const [filters, setFilters] = React.useState({
        status: 'approved'
    })

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts(filters);
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.data);
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
        <div>
            <div className="grid grid-cols-5 gap-2">
                {products?.map((product) => {
                    return <div className='border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer' onClick={() => {
                        navigate(`/product/${product._id}`)
                    }}>
                        <img src={product.images[0]} className='w-full h-40 object-cover' alt="" />
                        <div className="px-2 flex flex-col gap-1">
                            <h1 className='text-lg font-semibold'>{product.name}</h1>
                            <p className='text-sm'>{product.description}</p>
                            <Divider />
                            <span className='text-xl font-semibold text-green-700'>
                                Rs. {product.price}
                            </span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home