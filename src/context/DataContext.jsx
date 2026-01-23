import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const defaultProducts = [
    { id: 1, name: 'Caderno Universitário 10 Matérias', price: '29,90', image: 'https://placehold.co/300x300/202020/white?text=Caderno', category: 'Cadernos' },
    { id: 2, name: 'Estojo Escolar Grande', price: '45,00', image: 'https://placehold.co/300x300/202020/white?text=Estojo', category: 'Acessórios' },
    { id: 3, name: 'Kit Canetas Coloridas', price: '19,90', image: 'https://placehold.co/300x300/202020/white?text=Canetas', category: 'Escrita' },
    { id: 4, name: 'Mochila Escolar Preta', price: '129,90', image: 'https://placehold.co/300x300/202020/white?text=Mochila', category: 'Mochilas' },
    { id: 5, name: 'Lápis de Cor 24 Cores', price: '39,90', image: 'https://placehold.co/300x300/202020/white?text=Lapis+Cor', category: 'Artes' },
    { id: 6, name: 'Agenda 2026', price: '59,90', image: 'https://placehold.co/300x300/202020/white?text=Agenda', category: 'Cadernos' },
];

const defaultBanner = {
    title: 'VOLTA ÀS AULAS\nCOM TUDO!',
    subtitle: 'Prepare-se para o melhor ano com materiais incríveis e preços que você ama.',
    buttonText: 'Aproveitar Agora',
    media: '/banner-volta-as-aulas.png',
    mediaType: 'image'
};

const defaultCategories = ['Cadernos', 'Escrita', 'Acessórios', 'Mochilas', 'Artes'];

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState(defaultProducts);
    const [banner, setBanner] = useState(defaultBanner);
    const [categories, setCategories] = useState(defaultCategories);

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        const storedBanner = localStorage.getItem('banner');
        const storedCategories = localStorage.getItem('categories');

        if (storedProducts) setProducts(JSON.parse(storedProducts));
        if (storedBanner) {
            const parsedBanner = JSON.parse(storedBanner);
            // Only use stored banner if it has media (the new format)
            if (parsedBanner.media) {
                setBanner(parsedBanner);
            } else {
                // If it's the old format, clear it to use the new default
                localStorage.removeItem('banner');
            }
        }
        if (storedCategories) setCategories(JSON.parse(storedCategories));
    }, []);

    const saveProducts = (newProducts) => {
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    const saveBanner = (newBanner) => {
        setBanner(newBanner);
        localStorage.setItem('banner', JSON.stringify(newBanner));
    };

    const saveCategories = (newCategories) => {
        setCategories(newCategories);
        localStorage.setItem('categories', JSON.stringify(newCategories));
    };

    const addProduct = (product) => {
        const newProducts = [...products, { ...product, id: Date.now() }];
        saveProducts(newProducts);
    };

    const updateProduct = (updatedProduct) => {
        const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        saveProducts(newProducts);
    };

    const deleteProduct = (id) => {
        const newProducts = products.filter(p => p.id !== id);
        saveProducts(newProducts);
    };

    const addCategory = (category) => {
        if (!categories.includes(category)) {
            const newCategories = [...categories, category];
            saveCategories(newCategories);
        }
    };

    const deleteCategory = (category) => {
        const newCategories = categories.filter(c => c !== category);
        saveCategories(newCategories);
    };

    return (
        <DataContext.Provider value={{
            products,
            banner,
            categories,
            saveBanner,
            saveCategories,
            addProduct,
            updateProduct,
            deleteProduct,
            addCategory,
            deleteCategory
        }}>
            {children}
        </DataContext.Provider>
    );
};
