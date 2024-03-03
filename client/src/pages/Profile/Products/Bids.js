import React, { useEffect } from 'react'
import { Modal, Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { GetAllBids } from '../../../apicalls/products';
import moment from 'moment';
import Divider from '../../../components/Divider';

function Bids({ showBidsModel, setShowBidsModel, selectedProduct }) {
    const [bidsData, setBidsData] = React.useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllBids({ product: selectedProduct._id });
            dispatch(SetLoader(false));
            if (response.success) {
                setBidsData(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message)
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => {
                return record.buyer.name
            }
        },
        {
            title: 'Bid Amount',
            dataIndex: 'bidAmount'
        },
        {
            title: 'Bid Date',
            dataIndex: 'createdAt',
            render: (text, record) => {
                return moment(text).format('D MMM YYYY, hh:mm A')
            }
        },
        {
            title: 'Message',
            dataIndex: 'message'
        },
        {
            title: 'Contact Details',
            dataIndex: 'contactDetails',
            render: (text, record) => {
                return (
                    <div>
                        <p>Phone: {record.mobile}</p>
                        <p>Email: {record.buyer.email}</p>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        if (selectedProduct) {
            getData();
        }
    }, [selectedProduct])

    return (
        <Modal title='' open={showBidsModel} onCancel={() => setShowBidsModel(false)} centered width={1400} footer={null}>
            <div className="flex flex-col gap-2">
                <h1 className='text-primary'>Bids</h1>
                <Divider />
                <h1 className='text-xl text-gray-500'>Product Name: {selectedProduct.name}</h1>

                <Table columns={columns} dataSource={bidsData} />
            </div>
        </Modal>
    )
}

export default Bids