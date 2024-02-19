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