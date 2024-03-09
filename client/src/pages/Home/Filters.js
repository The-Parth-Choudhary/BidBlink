import React from 'react'

const categories = [
    {
        name: 'Electronics',
        value: 'electronics'
    },
    {
        name: 'Fashion',
        value: 'fashion'
    },
    {
        name: 'Home',
        value: 'home'
    },
    {
        name: 'Sports',
        value: 'sports'
    },

]

const ages = [
    {
        name: '0-2 years',
        value: '0-2'
    },
    {
        name: '3-5 years',
        value: '3-5'
    },
    {
        name: '6-8 years',
        value: '6-8'
    },
    {
        name: '9+ years',
        value: '9-100'
    }
]

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
    return (
        <div className='w-72 flex flex-col'>
            <div className="flex justify-between">
                <h1 className='text-xl text-primary'>Filters</h1>
                <i className="ri-close-line cursor-pointer text-2xl" onClick={() => setShowFilters(!showFilters)}></i>
            </div>

            <div className="flex flex-col gap-1 mt-5">
                <h1 className='text-gray-600'>Categories</h1>
                <div className='flex flex-col'>
                    {categories.map((category) => {
                        return (
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" name={category.name} id={category.name} className='w-3 text-main'
                                    checked={filters.category.includes(category.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFilters({
                                                ...filters,
                                                category: [...filters.category, category.value]
                                            })
                                        }
                                        else {
                                            setFilters({
                                                ...filters,
                                                category: filters.category.filter((item) => item !== category.value)
                                            })
                                        }
                                    }} />
                                <label htmlFor={category.name}>{category.name}</label>
                            </div>
                        )
                    })}
                </div>

                <h1 className='text-gray-600 mt-5'>Ages</h1>
                <div className='flex flex-col'>
                    {ages.map((age) => {
                        return (
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" name={age.name} id={age.name} className='w-3'
                                    checked={filters.age.includes(age.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFilters({
                                                ...filters,
                                                age: [...filters.age, age.value]
                                            })
                                        }
                                        else {
                                            setFilters({
                                                ...filters,
                                                age: filters.age.filter((item) => item !== age.value)
                                            })
                                        }
                                    }} />
                                <label htmlFor={age.name}>{age.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Filters