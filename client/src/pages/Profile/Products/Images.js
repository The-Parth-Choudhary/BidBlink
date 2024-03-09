import { Button, message } from 'antd'
import Upload from 'antd/es/upload/Upload'
import React from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { EditProduct, UploadProductImage } from '../../../apicalls/products';

function Images({ selectedProduct, setShowProductForm, getData }) {
    const [showPreview, setShowPreview] = React.useState(true);
    const [images, setImages] = React.useState(selectedProduct.images);
    const [file, setFile] = React.useState(null);
    const dispatch = useDispatch();

    const deleteImage = async (image) => {
        try {
            dispatch(SetLoader(true));
            const updatedImages = images.filter((img) => img !== image);
            const updatedProduct = { ...selectedProduct, images: updatedImages };
            const response = await EditProduct(selectedProduct._id, updatedProduct);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                setImages(updatedImages);
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
                setImages([...images, response.data]);
                setShowPreview(false);
                setFile(null);
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
            <div className="flex gap-5 mb-5">
                {images.map((image) => {
                    return <div className='flex gap-2 border-solid border-2 border-gray-600 rounded'>
                        <img className='h-20 w-20 object-cover cursor-pointer rounded' src={image} alt="" onClick={()=>{
                            deleteImage(image);
                        }} />
                    </div>
                })}
            </div>
            <Upload listType='picture' beforeUpload={() => false} onChange={(info) => {
                setFile(info.file);
                setShowPreview(true);
            }} showUploadList={showPreview} fileList={file ? [file] : []}>

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