import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { MessageCircle, ArrowLeft, Truck, ShieldCheck, ShoppingCart, Check, Share2 } from 'lucide-react';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { products, addToCart } = useData();
    const navigate = useNavigate();
    const [activeImage, setActiveImage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const product = products.find(p => p.id.toString() === id);

    useEffect(() => {
        if (product) {
            setActiveImage(product.image);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-sky-400 hover:text-sky-300 underline"
                >
                    Voltar para a loja
                </button>
            </div>
        );
    }

    const images = product.images && product.images.length > 0 ? product.images : [product.image];

    const handleAddToCart = () => {
        addToCart(product);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors"
            >
                <ArrowLeft size={20} className="mr-2" /> Voltar
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="space-y-4">
                    <div className="bg-[var(--bg-secondary)] rounded-2xl p-4 border border-[var(--border-color)]">
                        <img
                            src={activeImage || product.image}
                            alt={product.name}
                            className="w-full h-auto rounded-xl object-cover aspect-square"
                        />
                    </div>
                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-5 gap-2">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(img)}
                                    className={`rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-sky-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover aspect-square" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                    <div>
                        <span className="text-sky-400 text-sm font-bold tracking-wider uppercase">{product.category}</span>
                        <h1 className="text-4xl font-bold mt-2 mb-4 text-[var(--text-primary)]">{product.name}</h1>

                        {/* Price Display - Only for Bags */}
                        {product.category === 'Bolsas' && Number(product.price) > 0 && (
                            <p className="text-2xl font-bold text-green-500 mb-4">
                                R$ {product.price}
                            </p>
                        )}
                    </div>

                    <div className="space-y-4 pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-sky-500/25"
                            >
                                <ShoppingCart size={24} />
                                Adicionar ao Carrinho
                            </button>
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: product.name,
                                            text: `Olha esse produto que encontrei na Sabrina De Tudo um Pouco: ${product.name}`,
                                            url: window.location.href,
                                        });
                                    }
                                }}
                                className="bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors border border-[var(--border-color)]"
                            >
                                <Share2 size={24} />
                            </button>
                        </div>

                        {/* Toast Notification */}
                        <div className={`fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 transition-all duration-300 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'} z-50`}>
                            <Check size={20} />
                            <span>Produto adicionado ao carrinho!</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pt-6">
                        <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
                            <Truck size={24} className="text-blue-400" />
                            <span className="text-sm">Entregamos para Sertãozinho, Pontal, Barrinha e Cruz das Posses</span>
                        </div>
                    </div>

                    <div className="pt-8">
                        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Descrição</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                            {product.description || "Descrição não disponível."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
