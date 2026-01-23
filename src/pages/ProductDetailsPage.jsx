import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { MessageCircle, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { products } = useData();
    const navigate = useNavigate();

    const product = products.find(p => p.id.toString() === id);

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
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-4 border border-[var(--border-color)]">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-xl object-cover aspect-square"
                    />
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                    <div>
                        <span className="text-sky-400 text-sm font-bold tracking-wider uppercase">{product.category}</span>
                        <h1 className="text-4xl font-bold mt-2 mb-4 text-[var(--text-primary)]">{product.name}</h1>


                    </div>

                    <div className="space-y-4 pt-6">
                        <a
                            href={`https://wa.me/5516994322916?text=Olá, gostaria de saber mais sobre o produto: ${product.name}. Link: ${window.location.origin}/produto/${product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02]"
                        >
                            <MessageCircle size={24} />
                            <span className="text-lg">Pedir pelo WhatsApp</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6">
                        <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
                            <Truck size={24} className="text-blue-400" />
                            <span className="text-sm">Entregamos para Sertãozinho, Pontal, Pitangueiras e Cruz das Posses</span>
                        </div>
                        <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
                            <ShieldCheck size={24} className="text-green-400" />
                            <span className="text-sm">Garantia de 30 dias</span>
                        </div>
                    </div>

                    <div className="pt-8">
                        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Descrição</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            Este é um produto de alta qualidade da Sabrina De Tudo um Pouco. Perfeito para o seu dia a dia escolar ou de trabalho.
                            Fabricado com os melhores materiais para garantir durabilidade e estilo.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
