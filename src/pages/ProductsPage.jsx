import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    const { products } = useData();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const categoryFilter = searchParams.get('categoria');
    const searchFilter = searchParams.get('busca');

    const filteredProducts = products.filter(product => {
        const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
        const matchesSearch = searchFilter ? product.name.toLowerCase().includes(searchFilter.toLowerCase()) : true;
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 transition-colors group"
            >
                <ArrowLeft size={20} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Voltar
            </button>
            <h1 className="text-3xl font-bold mb-8">
                {categoryFilter ? `Categoria: ${categoryFilter}` : searchFilter ? `Resultados para: "${searchFilter}"` : 'Nossos Produtos'}
            </h1>

            {filteredProducts.length === 0 ? (
                <p className="text-gray-400 text-center py-20">Nenhum produto encontrado.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <Link to={`/produto/${product.id}`} key={product.id} className="bg-[var(--bg-secondary)] rounded-xl overflow-hidden border border-[var(--border-color)] hover:border-gray-600 transition-all group block">
                            <div className="relative aspect-square overflow-hidden bg-gray-800">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-4 right-4 bg-green-600 p-3 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 z-10">
                                    <MessageCircle size={20} />
                                </div>
                            </div>

                            <div className="p-4">

                                <h3 className="font-medium text-lg mb-2 line-clamp-2 h-14 text-[var(--text-primary)]">{product.name}</h3>
                                <p className="text-sm text-green-400 font-bold">Ver detalhes</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
