import React, { useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import ChangePasswordModal from './ChangePasswordModal'
import { Button, message } from 'antd'
import { SetLoader } from '../../../redux/loadersSlice'
import { GetAllBids, GetProducts } from '../../../apicalls/products'

function General() {
    const { user } = useSelector((state) => state.users);
    const [showPasswordForm, setShowPasswordForm] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [bidsData, setBidsData] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const responseProduct = await GetProducts({ seller: user._id });
            const responseBids = await GetAllBids({ buyer: user._id });
            dispatch(SetLoader(false));
            if (responseBids.success) {
                setProducts(responseProduct.data);
                setBidsData(responseBids.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="flex flex-col w-1/3 gap-2 mx-auto">
            <span className=' text-xl flex justify-between'>Name: <span className='text-xl'>{user.name}</span></span>
            <span className=' text-xl flex justify-between'>Email: <span className='text-xl'>{user.email}</span></span>
            <span className=' text-xl flex justify-between'>Total Products: <span className='text-xl'>{products.length}</span></span>
            <span className=' text-xl flex justify-between'>Total Bids: <span className='text-xl'>{bidsData.length}</span></span>
            <span className=' text-xl flex justify-between'>Created At: <span className='text-xl'>
                {moment(user.createdAt).format('D MMM, YYYY hh:mm A')}
            </span></span>
            <Button type='primary' className='mt-5' onClick={() => setShowPasswordForm(true)}>Change Password</Button>

            {showPasswordForm && <ChangePasswordModal
                showPasswordForm={showPasswordForm}
                setShowPasswordForm={setShowPasswordForm}
            />}
        </div>
    )
}

export default General