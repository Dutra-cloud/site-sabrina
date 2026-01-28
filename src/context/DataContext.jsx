import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../services/supabase';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const defaultBanner = {
    title: 'VOLTA ÀS AULAS\nCOM TUDO!',
    subtitle: 'Prepare-se para o melhor ano com materiais incríveis e preços que você ama.',
    buttonText: 'Aproveitar Agora',
    media: '/banner-volta-as-aulas.png',
    mediaType: 'image'
};

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [banner, setBanner] = useState(defaultBanner);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase.from('products').select('*').order('name', { ascending: true });
            if (error) {
                console.error('Error fetching products:', error);
                setError(error.message);
            } else if (data) {
                setProducts(data);
                setError(null);
            }
        } catch (err) {
            console.error('Unexpected error fetching products:', err);
            setError(err.message);
        }
    };

    const fetchSettings = async () => {
        try {
            const { data: bannerData, error: bannerError } = await supabase.from('settings').select('value').eq('key', 'banner').single();
            if (bannerError && bannerError.code !== 'PGRST116') console.error('Error fetching banner:', bannerError);
            if (bannerData) setBanner(bannerData.value);

            const { data: categoriesData, error: categoriesError } = await supabase.from('settings').select('value').eq('key', 'categories').single();
            if (categoriesError && categoriesError.code !== 'PGRST116') console.error('Error fetching categories:', categoriesError);

            if (categoriesData) {
                // Normalize categories to objects if they are strings
                const normalizedCategories = (categoriesData.value.list || []).map(cat => {
                    if (typeof cat === 'string') {
                        return { name: cat, image: 'https://placehold.co/300x300/202020/white?text=' + cat };
                    }
                    return cat;
                }).sort((a, b) => a.name.localeCompare(b.name));
                setCategories(normalizedCategories);
            } else {
                // Inicializar categorias se não existirem
                const defaultCats = [
                    { name: 'Cadernos', image: 'https://placehold.co/300x300/202020/white?text=Cadernos' },
                    { name: 'Escrita', image: 'https://placehold.co/300x300/202020/white?text=Escrita' },
                    { name: 'Acessórios', image: 'https://placehold.co/300x300/202020/white?text=Acessórios' },
                    { name: 'Mochilas', image: 'https://placehold.co/300x300/202020/white?text=Mochilas' },
                    { name: 'Artes', image: 'https://placehold.co/300x300/202020/white?text=Artes' }
                ].sort((a, b) => a.name.localeCompare(b.name));
                const { error: insertError } = await supabase.from('settings').insert({ key: 'categories', value: { list: defaultCats } });
                if (insertError) console.error('Error initializing categories:', insertError);
                setCategories(defaultCats);
            }
        } catch (err) {
            console.error('Unexpected error fetching settings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchSettings();

        // Realtime Subscription
        const channel = supabase
            .channel('public_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
                fetchProducts();
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => {
                fetchSettings();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const uploadFile = async (file) => {
        if (!file) return null;
        const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
        const { data, error } = await supabase.storage.from('uploads').upload(fileName, file);

        if (error) {
            console.error('Erro no upload:', error);
            throw error;
        }

        const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(fileName);
        return publicUrl;
    };

    const saveBanner = async (newBanner) => {
        const { error } = await supabase.from('settings').upsert({ key: 'banner', value: newBanner });
        if (error) throw error;
        setBanner(newBanner);
    };

    const addProduct = async (product) => {
        const { id, ...productData } = product; // Remove ID temporário se existir
        const { data, error } = await supabase.from('products').insert(productData).select().single();
        if (error) throw error;
        if (data) {
            setProducts(prev => [data, ...prev]);
        }
    };

    const updateProduct = async (updatedProduct) => {
        const { id, ...data } = updatedProduct;
        const { data: updatedData, error } = await supabase.from('products').update(data).eq('id', id).select().single();
        if (error) throw error;
        if (updatedData) {
            setProducts(prev => prev.map(p => p.id === id ? updatedData : p));
        }
    };

    const deleteProduct = async (id) => {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const addCategory = async (categoryData) => {
        // categoryData expects { name, image }
        // Check if category name already exists
        if (!categories.some(c => c.name === categoryData.name)) {
            const newCategories = [...categories, categoryData].sort((a, b) => a.name.localeCompare(b.name));
            const { error } = await supabase.from('settings').upsert({ key: 'categories', value: { list: newCategories } });
            if (error) throw error;
            setCategories(newCategories);
        }
    };

    const deleteCategory = async (categoryName) => {
        const newCategories = categories.filter(c => c.name !== categoryName);
        const { error } = await supabase.from('settings').upsert({ key: 'categories', value: { list: newCategories } });
        if (error) throw error;
        setCategories(newCategories);
    };

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => {
        const price = Number(item.price) || 0;
        return total + (price * item.quantity);
    }, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <DataContext.Provider value={{
            products,
            banner,
            categories,
            loading,
            error,
            cart,
            cartTotal,
            cartCount,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            saveBanner,
            addProduct,
            updateProduct,
            deleteProduct,
            addCategory,
            deleteCategory,
            uploadFile
        }}>
            {children}
        </DataContext.Provider>
    );
};
