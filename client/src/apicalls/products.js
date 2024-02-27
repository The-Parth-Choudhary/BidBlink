import { axiosInstance } from './axiosInstance';

// add new product
export const AddProduct = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/products/add-product', payload);

        return response.data;
    } catch (error) {
        return error.message;
    }
}

// get all products
export const GetProducts = async (payload) => {
    try {
        const response = await axiosInstance.get('/api/products/get-products', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// edit product
export const EditProduct = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/products/edit-product/${id}`, payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// delete product
export const DeleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/products/delete-product/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}