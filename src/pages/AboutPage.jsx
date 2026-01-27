import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AboutPage = () => {
    const { isLightMode } = useTheme();

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold mb-16 text-center text-[var(--text-primary)] tracking-tight">
                    Nossa <span className="text-sky-400">História</span>
                </h1>

                {/* Images Section - Inauguration Photos */}
                <div className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative group overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                            <img
                                src="/history3.png"
                                alt="Fachada Feitiço Acessórios"
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl shadow-xl aspect-[4/3] md:-mt-8">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                            <img
                                src="/history2.jpg"
                                alt="Interior da Loja Sabrina Acessórios"
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                            <img
                                src="/history1_new.png"
                                alt="Loja Atual"
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>
                    <p className="text-center text-[var(--text-secondary)] mt-6 italic text-lg">
                        Registros da nossa inauguração e primeiros passos
                    </p>
                </div>

                {/* Text Content Section */}
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Section 1: 1999 - Feitiço Acessórios */}
                    <div className="relative pl-8 md:pl-0">
                        <div className="hidden md:block absolute left-[-50px] top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-transparent opacity-30 rounded-full"></div>
                        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-4">
                            <span className="w-12 h-1 bg-sky-400 rounded-full"></span>
                            O Início de um Sonho
                        </h2>
                        <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed text-justify">
                            <p>
                                Em 1999, nasce um sonho em um bairro simples da cidade de Sertãozinho, SP. Com dificuldade e pouco investimento, mas com muito <strong className="text-sky-400">bom gosto, perseverança e muita luta</strong>.
                            </p>
                            <p>
                                No início, o nome era <strong className="text-sky-400">Feitiço Acessórios</strong> e sempre realçava a beleza feminina com as tendências do momento.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: 2008 - Sabrina Acessórios */}
                    <div className="relative pl-8 md:pl-0">
                        <div className="hidden md:block absolute left-[-50px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent opacity-30 rounded-full"></div>
                        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-4">
                            <span className="w-12 h-1 bg-blue-500 rounded-full"></span>
                            A Evolução
                        </h2>
                        <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed text-justify">
                            <p>
                                Em 2008, já com o nome <strong className="text-sky-400">Sabrina Acessórios</strong>, demos um grande passo: abrimos a loja na Rua Barão do Rio Branco, a rua principal do comércio em Sertãozinho.
                            </p>
                            <p>
                                Foi um momento de consolidação da nossa marca e de aproximação ainda maior com nossas clientes.
                            </p>
                        </div>
                    </div>

                    {/* Section 3: 2010 to Present */}
                    <div className="relative pl-8 md:pl-0">
                        <div className="hidden md:block absolute left-[-50px] top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-30 rounded-full"></div>
                        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-4">
                            <span className="w-12 h-1 bg-purple-500 rounded-full"></span>
                            Expansão e Futuro
                        </h2>
                        <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed text-justify">
                            <p>
                                Em 2010, entramos com as vendas online e vendedoras representando nossos produtos, continuando essa trajetória de sucesso até o dia de hoje.
                            </p>
                            <p>
                                Obrigado a todos que acreditaram no nosso trabalho e maneira de atender. E para vocês clientes, estamos abrindo esta nova loja. <strong className="text-sky-400">Sabrina de Tudo um Pouco</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
