import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Trash2, Plus, Minus, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useData();
    const [customerName, setCustomerName] = useState('');

    const handleCheckout = () => {
        if (!customerName.trim()) {
            alert('Por favor, digite seu nome para continuar.');
            return;
        }

        const phoneNumber = '5516994322916'; // Número da loja
        let message = `*Novo Pedido - Sabrina De Tudo um Pouco*\n\n`;
        message += `*Cliente:* ${customerName}\n\n`;
        message += `*Itens do Pedido:*\n`;

        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (R$ ${item.price.toFixed(2)})\n`;
        });

        message += `\n*Total: R$ ${cartTotal.toFixed(2)}*`;
        message += `\n\nAguardo a confirmação do pedido!`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

        // Opcional: Limpar carrinho após enviar pedido?
        // clearCart(); 
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-[var(--bg-secondary)] p-8 rounded-full mb-6">
                    <MessageCircle size={64} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Seu carrinho está vazio</h2>
                <p className="text-[var(--text-secondary)] mb-8">Que tal dar uma olhada nas nossas novidades?</p>
                <Link to="/produtos" className="bg-sky-500 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-600 transition-colors">
                    Ver Produtos
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                <Link to="/produtos" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    <ArrowLeft size={28} />
                </Link>
                Seu Carrinho
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Lista de Itens */}
                <div className="md:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-[var(--bg-secondary)] p-4 rounded-xl flex gap-4 border border-[var(--border-color)]">
                            <div className="w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-[var(--text-primary)] line-clamp-2">{item.name}</h3>
                                    <p className="text-sky-500 font-bold mt-1">R$ {item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-3 bg-[var(--bg-primary)] rounded-lg p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-[var(--text-primary)]"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="font-medium w-4 text-center text-[var(--text-primary)]">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-[var(--text-primary)]"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        title="Remover item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumo do Pedido */}
                <div className="md:col-span-1">
                    <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-color)] sticky top-24">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Resumo do Pedido</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-[var(--text-secondary)]">
                                <span>Subtotal</span>
                                <span>R$ {cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[var(--text-secondary)]">
                                <span>Entrega</span>
                                <span className="text-green-500 text-sm">A combinar</span>
                            </div>
                            <div className="border-t border-[var(--border-color)] pt-3 flex justify-between font-bold text-lg text-[var(--text-primary)]">
                                <span>Total</span>
                                <span>R$ {cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                    Seu Nome
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Digite seu nome..."
                                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg hover:shadow-green-500/20"
                            >
                                <MessageCircle size={20} />
                                Finalizar no WhatsApp
                            </button>

                            <p className="text-xs text-center text-[var(--text-secondary)]">
                                Ao clicar, você será redirecionado para o WhatsApp para combinar a entrega e o pagamento.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
