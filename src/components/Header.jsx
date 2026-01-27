import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, User, Settings, Sun, Moon, X, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';

const Header = () => {
    const { user } = useAuth();
    const { isLightMode, toggleTheme } = useTheme();
    const { cartCount } = useData();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 h-24 md:h-28 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className={`flex items-center p-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${isLightMode ? 'bg-white' : 'bg-black'}`}>
                    <img
                        src={isLightMode ? "/logo-dark.jpg" : "/logo-light.jpg"}
                        alt="Sabrina De Tudo um Pouco"
                        className="h-16 md:h-24 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="hover:text-sky-400 transition-colors text-[var(--text-primary)] font-medium">Home</Link>
                    <Link to="/produtos" className="hover:text-sky-400 transition-colors text-[var(--text-primary)] font-medium">Produtos</Link>
                    <Link to="/sobre" className="hover:text-sky-400 transition-colors text-[var(--text-primary)] font-medium">Nossa História</Link>
                    <Link to="/contato" className="hover:text-sky-400 transition-colors text-[var(--text-primary)] font-medium">Contato</Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium">
                            <Settings size={16} /> Painel
                        </Link>
                    )}
                </nav>

                {/* Search and Cart */}
                <div className="flex items-center space-x-3 md:space-x-6">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors ${isLightMode ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                        title={isLightMode ? "Modo Escuro" : "Modo Claro"}
                    >
                        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const term = e.target.search.value;
                            if (term.trim()) {
                                window.location.href = `/produtos?busca=${encodeURIComponent(term)}`;
                            }
                        }}
                        className="hidden md:flex items-center bg-[var(--bg-secondary)] rounded-full px-4 py-2 border border-[var(--border-color)]"
                    >
                        <input
                            name="search"
                            type="text"
                            placeholder="Buscar produtos..."
                            className="bg-transparent border-none focus:outline-none text-sm w-48 text-[var(--text-primary)] placeholder-gray-400"
                        />
                        <button type="submit">
                            <Search size={18} className="text-gray-400 hover:text-[var(--text-primary)] transition-colors" />
                        </button>
                    </form>

                    <Link to={user ? "/admin" : "/login"} className="hover:text-sky-400 transition-colors text-[var(--text-primary)]">
                        <User size={24} className={user ? "text-blue-500" : ""} />
                    </Link>

                    <Link to="/carrinho" className="relative hover:text-sky-400 transition-colors text-[var(--text-primary)]">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-[var(--text-primary)] p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleMenu}></div>

                {/* Menu Content */}
                <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[var(--bg-primary)] shadow-2xl transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full p-8">
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-xl font-bold text-sky-500 tracking-tight">Menu</span>
                            <button onClick={toggleMenu} className="text-[var(--text-primary)] p-2 hover:bg-[var(--bg-secondary)] rounded-lg">
                                <X size={28} />
                            </button>
                        </div>

                        {/* Mobile Search */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const term = e.target.searchMobile.value;
                                if (term.trim()) {
                                    window.location.href = `/produtos?busca=${encodeURIComponent(term)}`;
                                }
                            }}
                            className="flex items-center bg-[var(--bg-secondary)] rounded-2xl px-5 py-4 border border-[var(--border-color)] mb-10"
                        >
                            <input
                                name="searchMobile"
                                type="text"
                                placeholder="O que você procura?"
                                className="bg-transparent border-none focus:outline-none text-base w-full text-[var(--text-primary)] placeholder-gray-500"
                            />
                            <button type="submit">
                                <Search size={22} className="text-sky-500" />
                            </button>
                        </form>

                        <nav className="flex flex-col space-y-6">
                            <Link to="/" onClick={toggleMenu} className="text-2xl font-semibold text-[var(--text-primary)] hover:text-sky-500 transition-colors">Home</Link>
                            <Link to="/produtos" onClick={toggleMenu} className="text-2xl font-semibold text-[var(--text-primary)] hover:text-sky-500 transition-colors">Produtos</Link>
                            <Link to="/sobre" onClick={toggleMenu} className="text-2xl font-semibold text-[var(--text-primary)] hover:text-sky-500 transition-colors">Nossa História</Link>
                            <Link to="/contato" onClick={toggleMenu} className="text-2xl font-semibold text-[var(--text-primary)] hover:text-sky-500 transition-colors">Contato</Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin" onClick={toggleMenu} className="text-2xl font-semibold text-blue-400 flex items-center gap-3">
                                    <Settings size={24} /> Painel Admin
                                </Link>
                            )}
                            <Link to="/carrinho" onClick={toggleMenu} className="text-2xl font-semibold text-[var(--text-primary)] hover:text-sky-500 transition-colors flex items-center gap-3">
                                <ShoppingCart size={24} /> Carrinho ({cartCount})
                            </Link>
                        </nav>

                        <div className="mt-auto pt-8 border-t border-[var(--border-color)]">
                            <p className="text-sm text-[var(--text-secondary)] text-center">
                                &copy; 2026 Sabrina De Tudo um Pouco
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
