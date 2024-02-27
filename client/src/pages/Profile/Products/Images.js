import { Button, message } from 'antd'
import Upload from 'antd/es/upload/Upload'
import React from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { UploadProductImage } from '../../../apicalls/products';

function Images({ selectedProduct, setShowProductForm, getData }) {
    const [file, setFile] = React.useState(null);
    const dispatch = useDispatch();

    const upload = async () => {
        try {
            dispatch(SetLoader(true));
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productId', selectedProduct._id);
            const response = await UploadProductImage(formData);
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
    }

    return (
        <div>
            <Upload listType='picture' beforeUpload={() => false} onChange={(info) => {
                setFile(info.file);
            }}>
                <Button type='dashed'>Upload Image</Button>
            </Upload>

            <div className="flex justify-end gap-5 mt-5">
                <Button type='default' onClick={() => setShowProductForm(false)}>Cancel</Button>
                <Button type='primary' onClick={upload} disabled={!file}>Upload</Button>
            </div>
        </div>
    )
}

export default Images