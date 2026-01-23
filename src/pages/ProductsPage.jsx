import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    const { products, categories, error } = useData();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const [searchTerm, setSearchTerm] = React.useState(searchParams.get('busca') || '');
    const [selectedCategory, setSelectedCategory] = React.useState(searchParams.get('categoria') || '');

    // Update state when URL changes
    React.useEffect(() => {
        setSearchTerm(searchParams.get('busca') || '');
        setSelectedCategory(searchParams.get('categoria') || '');
    }, [location.search]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const newParams = new URLSearchParams(location.search);
        if (value) {
            newParams.set('busca', value);
        } else {
            newParams.delete('busca');
        }
        navigate(`?${newParams.toString()}`, { replace: true });
    };

    const handleCategorySelect = (category) => {
        const newCategory = category === selectedCategory ? '' : category;
        setSelectedCategory(newCategory);

        const newParams = new URLSearchParams(location.search);
        if (newCategory) {
            newParams.set('categoria', newCategory);
        } else {
            newParams.delete('categoria');
        }
        // If searching, keep the search term
        if (searchTerm) {
            newParams.set('busca', searchTerm);
        }
        navigate(`?${newParams.toString()}`);
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
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

            <div className="mb-8 space-y-6">
                <h1 className="text-3xl font-bold">Nossos Produtos</h1>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Buscar produtos..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                </div>

                {/* Categories List */}
                <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => handleCategorySelect('')}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition-all border ${!selectedCategory
                            ? 'bg-sky-500 border-sky-500 text-white'
                            : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-sky-500'
                            }`}
                    >
                        Todos
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all border ${selectedCategory === category
                                ? 'bg-sky-500 border-sky-500 text-white'
                                : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-sky-500'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl mb-8">
                    <p className="font-bold">Erro ao carregar produtos:</p>
                    <p>{error}</p>
                    <p className="text-sm mt-2">Verifique sua conexão com a internet ou se há algum bloqueio de rede.</p>
                </div>
            )}

            {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-lg mb-2">Nenhum produto encontrado.</p>
                    {(searchTerm || selectedCategory) && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('');
                                navigate('/produtos');
                            }}
                            className="text-sky-500 hover:text-sky-400 underline"
                        >
                            Limpar filtros
                        </button>
                    )}
                </div>
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
