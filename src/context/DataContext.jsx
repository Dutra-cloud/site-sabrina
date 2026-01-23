import React, { createContext, useState, useContext, useEffect } from 'react';
import { db, storage } from '../services/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

    // Sincronizar Produtos
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Sincronizar Banner
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'banner'), (doc) => {
            if (doc.exists()) {
                setBanner(doc.data());
            }
        });
        return () => unsubscribe();
    }, []);

    // Sincronizar Categorias
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'categories'), (doc) => {
            if (doc.exists()) {
                setCategories(doc.data().list || []);
            } else {
                // Inicializar categorias se não existirem
                setDoc(doc.ref, { list: ['Cadernos', 'Escrita', 'Acessórios', 'Mochilas', 'Artes'] });
            }
        });
        return () => unsubscribe();
    }, []);

    const uploadFile = async (file) => {
        if (!file) return null;
        const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const saveBanner = async (newBanner) => {
        await setDoc(doc(db, 'settings', 'banner'), newBanner);
    };

    const addProduct = async (product) => {
        await addDoc(collection(db, 'products'), product);
    };

    const updateProduct = async (updatedProduct) => {
        const { id, ...data } = updatedProduct;
        await updateDoc(doc(db, 'products', id), data);
    };

    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'products', id));
    };

    const addCategory = async (category) => {
        if (!categories.includes(category)) {
            const newCategories = [...categories, category];
            await setDoc(doc(db, 'settings', 'categories'), { list: newCategories });
        }
    };

    const deleteCategory = async (category) => {
        const newCategories = categories.filter(c => c !== category);
        await setDoc(doc(db, 'settings', 'categories'), { list: newCategories });
    };

    return (
        <DataContext.Provider value={{
            products,
            banner,
            categories,
            loading,
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
