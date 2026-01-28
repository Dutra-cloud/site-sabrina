import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const HomePage = () => {
    const { products, banner, categories, error } = useData();

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] rounded-3xl overflow-hidden flex items-center px-6 md:px-20 shadow-2xl py-12 md:py-20">
                {/* Background Media or Gradient */}
                <div className="absolute inset-0 z-0">
                    {banner.media ? (
                        banner.mediaType === 'video' ? (
                            <video
                                src={banner.media}
                                className="w-full h-full object-cover scale-105 animate-slow-zoom"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                src={banner.media}
                                alt="Banner Background"
                                className="w-full h-full object-cover scale-105 animate-slow-zoom"
                            />
                        )
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 animate-gradient-xy">
                            <div className="absolute right-0 bottom-0 opacity-30">
                                <div className="w-[500px] h-[500px] bg-white rounded-full blur-[120px]"></div>
                            </div>
                        </div>
                    )}
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="max-w-3xl z-10 relative animate-fade-in-up">
                    <span className="inline-block bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 md:mb-4 tracking-widest uppercase animate-pulse">
                        Temporada 2026
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight whitespace-pre-line text-white drop-shadow-lg">
                        {banner.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 md:mb-10 max-w-xl leading-relaxed drop-shadow-md">
                        {banner.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                        <Link to="/produtos" className="bg-sky-500 text-white font-black py-3 px-6 md:py-4 md:px-10 rounded-full hover:bg-sky-400 transition-all transform hover:scale-105 shadow-xl hover:shadow-sky-500/40 flex items-center gap-2 text-sm md:text-base">
                            {banner.buttonText}
                        </Link>
                        <Link to="/produtos" className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold py-3 px-6 md:py-4 md:px-10 rounded-full hover:bg-white/20 transition-all text-sm md:text-base">
                            Ver Catálogo
                        </Link>
                    </div>
                </div>
            </section>

            {/* WhatsApp CTA Section */}
            <section className="max-w-6xl mx-auto px-4">
                <div className="bg-[var(--bg-secondary)] rounded-2xl border border-green-500/20 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-lg hover:shadow-green-500/10 transition-shadow duration-300">
                    <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                        <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-600 dark:text-green-500 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-3">
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">Grupo VIP de Ofertas</h3>
                        <p className="text-[var(--text-secondary)]">
                            Clique no link e, ao entrar no WhatsApp, mande um oi e vamos te adicionar para ter acesso ao nosso status com ofertas e produtos da loja diariamente.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-green-600 dark:text-green-400 font-medium pt-2">
                            <span>🚚</span>
                            <p>Entregamos para Sertãozinho, Pontal, Pitangueiras e Cruz das Posses</p>
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <a
                            href="https://wa.me/5516994322916"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-colors shadow-md hover:shadow-lg"
                        >
                            <MessageCircle size={20} />
                            Entrar no Grupo
                        </a>
                    </div>
                </div>
            </section>

            {/* Store Presentation */}
            <section className="relative max-w-5xl mx-auto px-6 py-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
                <div className="text-center space-y-6">
                    <h2 className="text-2xl md:text-3xl font-light text-[var(--text-primary)] tracking-wide">
                        Bem-vindo à <span className="font-bold text-sky-500">Sabrina Acessórios</span>
                    </h2>
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto font-light">
                        Sabrina Acessórios, que há mais de 26 anos vem realçando a beleza feminina, agora tem mais uma loja. <strong className="text-[var(--text-primary)]">Sabrina De Tudo um Pouco</strong>, que é uma loja que foca em oferecer uma ampla variedade de produtos para facilitar o dia a dia, abrangendo desde acessórios pessoais, utilidades domésticas até opções de presentes para toda a família.
                    </p>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>
            </section>

            {/* Categories Grid */}
            <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-[var(--text-primary)] text-center">Nossas Categorias</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to={`/produtos?categoria=${category.name}`}
                            className="group relative rounded-3xl overflow-hidden aspect-[4/3] border-2 border-transparent hover:border-sky-500/50 shadow-lg hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gray-900">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-white font-black text-3xl md:text-4xl mb-2 tracking-tight drop-shadow-lg group-hover:text-sky-400 transition-colors">
                                    {category.name}
                                </h3>
                                <div className="w-12 h-1.5 bg-sky-500 rounded-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100"></div>
                                <p className="text-gray-300 text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    Ver produtos &rarr;
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>


        </div >
    );
};

export default HomePage;
