import React, { useEffect } from 'react'
import { Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllBids } from '../../../apicalls/products';
import { SetLoader } from '../../../redux/loadersSlice'
import moment from 'moment';

function Bids() {
    const [bidsData, setBidsData] = React.useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllBids({ buyer: user._id });
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
            title: 'Product',
            dataIndex: 'product',
            render: (text, record) => {
                return record.product.name;
            }
        },
        {
            title: 'Seller',
            dataIndex: 'seller',
            render: (text, record) => {
                return record.seller.name;
            }
        },
        {
            title: 'Offered Price',
            dataIndex: 'offeredPrice',
            render: (text, record) => {
                return 'Rs. ' + record.product.price;
            }
        },
        {
            title: 'Bid Amount',
            dataIndex: 'bidAmount',
            render: (text, record) => {
                return 'Rs. ' + text;
            }
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
        }
    ]

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <Table columns={columns} dataSource={bidsData} />
        </div>
    )
}

export default Bids