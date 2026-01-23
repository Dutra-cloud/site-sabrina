import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash, Edit, Save, X } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const { products, banner, categories, saveBanner, saveCategories, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory } = useData();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');

    // Product Form State
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '' });

    // Banner Form State
    const [bannerForm, setBannerForm] = useState(banner);

    if (!user || user.role !== 'admin') {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            updateProduct(editingProduct);
            setEditingProduct(null);
        } else {
            addProduct({ ...newProduct, image: newProduct.image || 'https://placehold.co/300x300/202020/white?text=Produto' });
            setNewProduct({ name: '', price: '', category: '', image: '' });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-300">Sair</button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`px-4 py-2 rounded text-white ${activeTab === 'products' ? 'bg-sky-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                    Produtos
                </button>
                <button
                    onClick={() => setActiveTab('banner')}
                    className={`px-4 py-2 rounded text-white ${activeTab === 'banner' ? 'bg-sky-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                    Banner
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`px-4 py-2 rounded text-white ${activeTab === 'categories' ? 'bg-sky-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                    Categorias
                </button>
            </div>

            {/* Products Tab */}
            {/* Products Tab */}
            {
                activeTab === 'products' && (
                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                        {/* Add/Edit Form - Order 1 on Mobile, 2 on Desktop */}
                        <div className="order-1 lg:order-2 bg-gray-900 p-6 rounded border border-gray-800 h-fit lg:sticky lg:top-24">
                            <h2 className="text-xl font-bold mb-4 text-white">{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
                            <form onSubmit={handleProductSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-1 text-white">Nome</label>
                                    <input
                                        type="text"
                                        value={editingProduct ? editingProduct.name : newProduct.name}
                                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-sky-400 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1 text-white">Preço</label>
                                    <input
                                        type="text"
                                        value={editingProduct ? editingProduct.price : newProduct.price}
                                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-sky-400 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1 text-white">Categoria</label>
                                    <select
                                        value={editingProduct ? editingProduct.category : newProduct.category}
                                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, category: e.target.value }) : setNewProduct({ ...newProduct, category: e.target.value })}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-sky-400 focus:outline-none"
                                    >
                                        <option value="">Selecione...</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1 text-white">Imagem do Produto</label>
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        if (editingProduct) {
                                                            setEditingProduct({ ...editingProduct, image: reader.result });
                                                        } else {
                                                            setNewProduct({ ...newProduct, image: reader.result });
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="w-full bg-black border border-gray-700 rounded p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600 cursor-pointer"
                                        />
                                        {/* Preview */}
                                        {(editingProduct?.image || newProduct.image) && (
                                            <div className="relative">
                                                <img
                                                    src={editingProduct ? editingProduct.image : newProduct.image}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded border border-gray-700"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (editingProduct) setEditingProduct({ ...editingProduct, image: '' });
                                                        else setNewProduct({ ...newProduct, image: '' });
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-600 p-1 rounded-full text-white hover:bg-red-700"
                                                >
                                                    <Trash size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-2 pt-2">
                                    <button type="submit" className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-bold transition-colors">
                                        {editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}
                                    </button>
                                    {editingProduct && (
                                        <button type="button" onClick={() => setEditingProduct(null)} className="px-4 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors">
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Product List - Order 2 on Mobile, 1 on Desktop */}
                        <div className="order-2 lg:order-1 lg:col-span-2 space-y-4">
                            <h2 className="text-xl font-bold mb-4 text-white">Lista de Produtos</h2>
                            <div className="grid gap-4">
                                {products.map(product => (
                                    <div key={product.id} className="bg-gray-900 p-4 rounded flex items-center justify-between border border-gray-800">
                                        <div className="flex items-center space-x-4">
                                            <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover border border-gray-700" />
                                            <div>
                                                <h3 className="font-bold text-white">{product.name}</h3>
                                                <p className="text-sm text-gray-400">R$ {product.price} | {product.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className="p-2 hover:bg-blue-900 rounded text-blue-400 transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => deleteProduct(product.id)} className="p-2 hover:bg-red-900 rounded text-red-400 transition-colors">
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Banner Tab */}
            {
                activeTab === 'banner' && (
                    <div className="max-w-2xl">
                        <h2 className="text-xl font-bold mb-4 text-white">Editar Banner Principal</h2>
                        <div className="bg-gray-900 p-6 rounded border border-gray-800 space-y-4">
                            <div>
                                <label className="block text-sm mb-1 text-white">Título</label>
                                <textarea
                                    value={bannerForm.title}
                                    onChange={e => setBannerForm({ ...bannerForm, title: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 h-24"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-white">Subtítulo</label>
                                <input
                                    type="text"
                                    value={bannerForm.subtitle}
                                    onChange={e => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={bannerForm.buttonText}
                                    onChange={e => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-white">Imagem ou Vídeo de Fundo</label>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setBannerForm({
                                                    ...bannerForm,
                                                    media: reader.result,
                                                    mediaType: file.type.startsWith('video') ? 'video' : 'image'
                                                });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600 cursor-pointer"
                                />
                                {bannerForm.media && (
                                    <div className="mt-2 relative">
                                        {bannerForm.mediaType === 'video' ? (
                                            <video src={bannerForm.media} className="w-full h-48 object-cover rounded border border-gray-700" controls />
                                        ) : (
                                            <img src={bannerForm.media} alt="Banner Preview" className="w-full h-48 object-cover rounded border border-gray-700" />
                                        )}
                                        <button
                                            onClick={() => setBannerForm({ ...bannerForm, media: '', mediaType: '' })}
                                            className="absolute top-2 right-2 bg-red-600 p-1 rounded-full text-white hover:bg-red-700"
                                        >
                                            <Trash size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => saveBanner(bannerForm)}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center space-x-2"
                            >
                                <Save size={18} /> <span>Salvar Alterações</span>
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Categories Tab */}
            {activeTab === 'categories' && (
                <div className="max-w-2xl">
                    <h2 className="text-xl font-bold mb-4 text-white">Gerenciar Categorias</h2>

                    {/* Add Category */}
                    <div className="bg-gray-900 p-6 rounded border border-gray-800 mb-8">
                        <h3 className="font-bold mb-4 text-white">Adicionar Nova Categoria</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const val = e.target.category.value.trim();
                                if (val) {
                                    addCategory(val);
                                    e.target.reset();
                                }
                            }}
                            className="flex gap-2"
                        >
                            <input
                                name="category"
                                type="text"
                                placeholder="Nome da categoria"
                                className="flex-1 bg-black border border-gray-700 rounded p-2 text-white focus:border-sky-400 focus:outline-none"
                            />
                            <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded">
                                Adicionar
                            </button>
                        </form>
                    </div>

                    {/* List Categories */}
                    <div className="space-y-2">
                        {categories.map(category => (
                            <div key={category} className="bg-gray-900 p-4 rounded flex items-center justify-between border border-gray-800">
                                <span className="text-white font-medium">{category}</span>
                                <button
                                    onClick={() => deleteCategory(category)}
                                    className="p-2 hover:bg-red-900 rounded text-red-400 transition-colors"
                                    title="Excluir Categoria"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div >
    );
};

export default AdminDashboard;
