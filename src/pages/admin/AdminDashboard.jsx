import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash, Edit, Save, X } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const { products, banner, categories, saveBanner, addProduct, updateProduct, deleteProduct, addCategory, deleteCategory, uploadFile } = useData();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');

    // Product Form State
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '', images: [], description: '', noPrice: false });
    const [productFiles, setProductFiles] = useState([]);

    // Banner Form State
    const [bannerForm, setBannerForm] = useState(banner);
    const [bannerFile, setBannerFile] = useState(null);

    // Update bannerForm when banner data changes from context
    React.useEffect(() => {
        setBannerForm(banner);
    }, [banner]);

    if (!user || user.role !== 'admin') {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrls = editingProduct ? (editingProduct.images || [editingProduct.image]) : (newProduct.images || []);

            // Upload new files if any
            if (productFiles.length > 0) {
                const uploadedUrls = await Promise.all(productFiles.map(file => uploadFile(file)));
                imageUrls = [...imageUrls, ...uploadedUrls];
            }

            // Limit to 5 images
            if (imageUrls.length > 5) {
                alert('Máximo de 5 imagens permitidas. As excedentes serão ignoradas.');
                imageUrls = imageUrls.slice(0, 5);
            }

            const mainImage = imageUrls.length > 0 ? imageUrls[0] : 'https://placehold.co/300x300/202020/white?text=Produto';

            const productData = editingProduct ? { ...editingProduct } : { ...newProduct };
            productData.image = mainImage;
            productData.images = imageUrls;

            // Ensure price is a number/float
            if (productData.noPrice) {
                productData.price = 0;
            } else {
                productData.price = parseFloat(productData.price.toString().replace(',', '.'));
                if (isNaN(productData.price)) {
                    throw new Error("O preço deve ser um número válido.");
                }
            }

            // Remove auxiliary field before sending to backend
            delete productData.noPrice;

            if (editingProduct) {
                await updateProduct(productData);
                setEditingProduct(null);
            } else {
                await addProduct(productData);
                setNewProduct({ name: '', price: '', category: '', image: '', images: [], description: '', noPrice: false });
            }
            setProductFiles([]);
            alert('Produto salvo com sucesso!');
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar produto: ' + err.message);
        }
    };

    const handleBannerSave = async () => {
        try {
            let mediaUrl = bannerForm.media;
            if (bannerFile) {
                mediaUrl = await uploadFile(bannerFile);
            }
            await saveBanner({ ...bannerForm, media: mediaUrl });
            setBannerFile(null);
            alert('Banner atualizado com sucesso!');
        } catch (err) {
            console.error(err);
            alert('Erro ao salvar banner: ' + err.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
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
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="text"
                                            value={editingProduct ? editingProduct.price : newProduct.price}
                                            onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })}
                                            className={`w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-sky-400 focus:outline-none ${(editingProduct ? editingProduct.noPrice : newProduct.noPrice) ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            disabled={editingProduct ? editingProduct.noPrice : newProduct.noPrice}
                                        />
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={editingProduct ? (editingProduct.noPrice ?? (editingProduct.price === 0)) : newProduct.noPrice}
                                                onChange={e => {
                                                    const checked = e.target.checked;
                                                    if (editingProduct) {
                                                        setEditingProduct({
                                                            ...editingProduct,
                                                            noPrice: checked,
                                                            price: checked ? 0 : (editingProduct.price === 0 ? '' : editingProduct.price)
                                                        });
                                                    } else {
                                                        setNewProduct({
                                                            ...newProduct,
                                                            noPrice: checked,
                                                            price: checked ? '' : newProduct.price
                                                        });
                                                    }
                                                }}
                                                className="form-checkbox h-4 w-4 text-sky-500 rounded border-gray-700 bg-black focus:ring-sky-500 focus:ring-offset-gray-900"
                                            />
                                            <span className="text-sm text-gray-300">Não utilizar preço</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1 text-white">Categoria</label>
                                    <select
                                        value={editingProduct ? editingProduct.category : newProduct.category}
                                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, category: e.target.value }) : setNewProduct({ ...newProduct, category: e.target.value })}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-sky-400 focus:outline-none"
                                    >
                                        <option value="">Selecione...</option>
                                        {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1 text-white">Descrição</label>
                                    <textarea
                                        value={editingProduct ? (editingProduct.description || '') : newProduct.description}
                                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value })}
                                        className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-sky-400 focus:outline-none h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1 text-white">Imagens do Produto (Máx 5)</label>
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files);
                                                if (files.length > 5) {
                                                    alert('Selecione no máximo 5 imagens.');
                                                    e.target.value = ''; // Clear input
                                                    return;
                                                }
                                                setProductFiles(files);
                                            }}
                                            className="w-full bg-black border border-gray-700 rounded p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600 cursor-pointer"
                                        />

                                        {/* Preview of existing images */}
                                        {(editingProduct?.images || (editingProduct?.image ? [editingProduct.image] : [])).length > 0 && (
                                            <div className="grid grid-cols-3 gap-2 mt-2">
                                                {(editingProduct.images || [editingProduct.image]).map((img, idx) => (
                                                    <div key={idx} className="relative group">
                                                        <img src={img} alt={`Preview ${idx}`} className="w-full h-20 object-cover rounded border border-gray-700" />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newImages = (editingProduct.images || [editingProduct.image]).filter((_, i) => i !== idx);
                                                                setEditingProduct({ ...editingProduct, images: newImages, image: newImages[0] || '' });
                                                            }}
                                                            className="absolute top-0 right-0 bg-red-600 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Trash size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Preview of new files to upload */}
                                        {productFiles.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-400 mb-1">Novas imagens para enviar ({productFiles.length}):</p>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {productFiles.map((file, idx) => (
                                                        <div key={idx} className="relative">
                                                            <div className="w-full h-20 bg-gray-800 rounded border border-gray-700 flex items-center justify-center text-xs text-gray-400 overflow-hidden">
                                                                {file.name}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-2 pt-2">
                                    <button type="submit" className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-bold transition-colors">
                                        {editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}
                                    </button>
                                    {editingProduct && (
                                        <button type="button" onClick={() => { setEditingProduct(null); setProductFiles([]); }} className="px-4 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors">
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
                                                    setEditingProduct({ ...product, noPrice: product.price === 0 });
                                                    setProductFiles([]);
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
                                    className="w-full bg-black border border-gray-700 rounded p-2 h-24 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-white">Subtítulo</label>
                                <input
                                    type="text"
                                    value={bannerForm.subtitle}
                                    onChange={e => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={bannerForm.buttonText}
                                    onChange={e => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-white">Imagem ou Vídeo de Fundo</label>
                                <p className="text-xs text-gray-400 mb-2">Aceita imagens (JPG, PNG, GIF, WEBP) e vídeos (MP4, WEBM, MOV)</p>
                                <input
                                    type="file"
                                    accept="image/*,video/*,video/mp4,video/webm,video/quicktime"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            console.log('Arquivo selecionado:', file.name, 'Tipo:', file.type);
                                            setBannerFile(file);

                                            // Detectar tipo de arquivo
                                            const isVideo = file.type.startsWith('video/') ||
                                                file.name.match(/\.(mp4|webm|mov|avi|mkv)$/i);

                                            // Preview
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setBannerForm({
                                                    ...bannerForm,
                                                    media: reader.result,
                                                    mediaType: isVideo ? 'video' : 'image'
                                                });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600 cursor-pointer"
                                />
                                {bannerForm.media && (
                                    <div className="mt-2 relative">
                                        <p className="text-xs text-gray-400 mb-1">Preview: {bannerForm.mediaType === 'video' ? 'Vídeo' : 'Imagem'}</p>
                                        {bannerForm.mediaType === 'video' ? (
                                            <video src={bannerForm.media} className="w-full h-48 object-cover rounded border border-gray-700" controls />
                                        ) : (
                                            <img src={bannerForm.media} alt="Banner Preview" className="w-full h-48 object-cover rounded border border-gray-700" />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setBannerForm({ ...bannerForm, media: '', mediaType: '' });
                                                setBannerFile(null);
                                            }}
                                            className="absolute top-2 right-2 bg-red-600 p-1 rounded-full text-white hover:bg-red-700"
                                        >
                                            <Trash size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleBannerSave}
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
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const name = e.target.categoryName.value.trim();
                                const file = e.target.categoryImage.files[0];

                                if (name && file) {
                                    try {
                                        const imageUrl = await uploadFile(file);
                                        await addCategory({ name, image: imageUrl });
                                        e.target.reset();
                                        alert('Categoria adicionada com sucesso!');
                                    } catch (err) {
                                        alert('Erro ao adicionar categoria: ' + err.message);
                                    }
                                } else {
                                    alert('Preencha o nome e selecione uma imagem.');
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm mb-1 text-white">Nome da Categoria</label>
                                <input
                                    name="categoryName"
                                    type="text"
                                    placeholder="Ex: Mochilas"
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-sky-400 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1 text-white">Imagem da Categoria</label>
                                <input
                                    name="categoryImage"
                                    type="file"
                                    accept="image/*"
                                    className="w-full bg-black border border-gray-700 rounded p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600 cursor-pointer"
                                    required
                                />
                            </div>
                            <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded w-full sm:w-auto">
                                Adicionar Categoria
                            </button>
                        </form>
                    </div>

                    {/* List Categories */}
                    <div className="space-y-2">
                        {categories.map(category => (
                            <div key={category.name} className="bg-gray-900 p-4 rounded flex items-center justify-between border border-gray-800">
                                <div className="flex items-center gap-4">
                                    <img src={category.image} alt={category.name} className="w-12 h-12 rounded object-cover border border-gray-700" />
                                    <span className="text-white font-medium">{category.name}</span>
                                </div>
                                <button
                                    onClick={() => deleteCategory(category.name)}
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
