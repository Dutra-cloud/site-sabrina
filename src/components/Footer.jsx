import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Footer = () => {
    const { categories } = useData();

    return (
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-12 pb-8 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)] uppercase">Sabrina De Tudo um Pouco</h3>
                        <p className="text-[var(--text-secondary)] text-sm">
                            A sua loja para te atender onde estiver e com o que precisar, com somente um clique, e chegará rapidinho para você.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-[var(--text-primary)]">Categorias</h4>
                        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                            {categories.map((category) => (
                                <li key={category.name}>
                                    <Link to={`/produtos?categoria=${encodeURIComponent(category.name)}`} className="hover:text-[var(--text-primary)]">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-[var(--text-primary)]">Redes Sociais</h4>
                        <div className="flex flex-col space-y-4">
                            <a
                                href="https://www.instagram.com/sabrinaacessoriostz?igsh=MmtsbXZmaWIzbXI4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--text-secondary)] hover:text-sky-400 flex items-center gap-2 transition-colors"
                            >
                                <Instagram size={20} />
                                <span className="text-sm">Instagram</span>
                            </a>
                            <a
                                href="https://wa.me/5516994322916"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--text-secondary)] hover:text-green-500 flex items-center gap-2 transition-colors"
                            >
                                <MessageCircle size={20} />
                                <span className="text-sm">WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[var(--border-color)] pt-8 text-center text-sm text-[var(--text-secondary)]">
                    <p>&copy; 2026 Sabrina De Tudo um Pouco. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
