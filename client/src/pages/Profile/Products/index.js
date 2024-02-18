import { Button } from 'antd'
import React from 'react'
import ProductForm from './ProductForm';

function Products() {
    const [showProductForm, setShowProductForm] = React.useState(false);

    return (
        <div>
            <div className="flex justify-end">
                <Button onClick={() => setShowProductForm(true)}>Add Product</Button>
            </div>

            <ProductForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} />
        </div>
    )
}

export default Products