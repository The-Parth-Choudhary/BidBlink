import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import { GetProducts } from '../../apicalls/products'
import { Form, message } from 'antd';
import Divider from '../../components/Divider';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.users);
    const [showFilters, setShowFilters] = React.useState(true);
    const [products, setProducts] = React.useState([]);
    const [filters, setFilters] = React.useState({
        status: 'approved',
        category: [],
        age: [],
        search: ''
    })
    const [searchQuery, setSearchQuery] = React.useState('');

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

    const onFinish = (searchQueryParam) => {
        if(searchQueryParam && searchQueryParam === 'empty'){
            setFilters({ ...filters, search: '' });
        }
        else{
            setFilters({ ...filters, search: searchQuery });
        }
    }

    React.useEffect(() => {
        getData();
    }, [filters])

    return (
        <div className='flex gap-5 h-screen bg-main'>
            {showFilters && <Filters
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                filters={filters}
                setFilters={setFilters}
            />}

            {showFilters && <div className='border border-solid border-gray-400 h-auto'></div>}

            <div className='flex flex-col gap-5 w-full'>
                <div className="flex gap-5 items-center">
                    {!showFilters && <i className="ri-equalizer-fill cursor-pointer text-2xl" onClick={() => setShowFilters(!showFilters)}></i>}
                    <Form className='flex items-center w-full border border-gray-300 border-solid rounded px-4 h-14' onFinish={onFinish}>
                        <input type="text" placeholder='Search' className='border-none focus:border-none bg-main'
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                if (e.target.value.trim().length === 0) {
                                    onFinish('empty');
                                }
                            }}
                        />
                        <i class="ri-search-line cursor-pointer text-main" onClick={onFinish}></i>
                    </Form>
                </div>
                <div className={`grid gap-3 ${showFilters ? 'grid-cols-4' : 'grid-cols-5'}`}>
                    {products?.map((product) => {
                        return <div className='border bg-card border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer' onClick={() => {
                            navigate(`/product/${product._id}`)
                        }}>
                            <img src={product.images[0]} className='w-full h-40' alt="" />
                            <div className="px-2 flex flex-col gap-1">
                                <h1 className='text-lg font-semibold uppercase'>{product.name}</h1>
                                <p className='text-sm uppercase'>{product.category}</p>
                                <p className='text-sm'>{product.age}{' '}{product.age === 1 ? 'year' : 'years'}{' old'}</p>
                                <Divider />
                                <span className='text-xl font-semibold text-green-700'>
                                    Rs. {product.price}
                                </span>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home