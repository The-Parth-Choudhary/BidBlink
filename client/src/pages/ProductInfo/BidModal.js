import { Form, Input, Modal } from 'antd'
import React, { useRef } from 'react'

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
    const formRef = useRef(null);
    const rules = [{ required: true, message: 'Required' }]

    const onFinish = async (values) => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <Modal onCancel={() => setShowBidModal(false)} open={showBidModal} centered width={600} onOk={() => formRef.current.submit()}>
            <div className='flex flex-col gap-5 mb-5'>
                <h1 className='text-2xl font-semibold text-primary text-center'>New Bid</h1>

                <Form layout='vertical' ref={formRef} onFinish={onFinish}>
                    <Form.Item label='Bid Amount' name='bidAmount' rules={rules}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Message' name='message' rules={rules}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label='Mobile' name='mobile' rules={rules}>
                        <Input type='number' />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default BidModal