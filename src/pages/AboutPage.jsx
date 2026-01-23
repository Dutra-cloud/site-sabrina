import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AboutPage = () => {
    const { isLightMode } = useTheme();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold mb-16 text-center text-[var(--text-primary)] tracking-tight">
                    Nossa <span className="text-sky-400">História</span>
                </h1>

                <div className="space-y-24">
                    {/* Section 1: 1999 - Feitiço Acessórios */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <div className="bg-sky-400 w-16 h-1 mb-6"></div>
                            <h2 className="text-3xl font-bold text-[var(--text-primary)]">O Início de um Sonho</h2>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed text-justify">
                                Em 1999, nasce um sonho em um bairro simples da cidade de Sertãozinho, SP. Com dificuldade e pouco investimento, mas com muito <strong className="text-sky-400">bom gosto, perseverança e muita luta</strong>.
                            </p>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed text-justify">
                                No início, o nome era <strong className="text-sky-400">Feitiço Acessórios</strong> e sempre realçava a beleza feminina com as tendências do momento.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-sky-400/20 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                                <img
                                    src="/history3.png"
                                    alt="Fachada Feitiço Acessórios"
                                    className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] transform transition-transform group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: 2008 - Sabrina Acessórios */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <div className="bg-blue-500 w-16 h-1 mb-6 ml-auto md:ml-0"></div>
                            <h2 className="text-3xl font-bold text-[var(--text-primary)]">A Evolução</h2>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed text-justify">
                                Em 2008, já com o nome <strong className="text-sky-400">Sabrina Acessórios</strong>, demos um grande passo: abrimos a loja na Rua Barão do Rio Branco, a rua principal do comércio em Sertãozinho.
                            </p>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed text-justify">
                                Foi um momento de consolidação da nossa marca e de aproximação ainda maior com nossas clientes.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-blue-500/20 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
                                <img
                                    src="/history2.jpg"
                                    alt="Interior da Loja Sabrina Acessórios"
                                    className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] transform transition-transform group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: 2010 to Present */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <div className="bg-purple-500 w-16 h-1 mb-6"></div>
                            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Expansão e Futuro</h2>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed text-justify">
                                Em 2010, entramos com as vendas online e vendedoras representando nossos produtos, continuando essa trajetória de sucesso até o dia de hoje.
                            </p>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed text-justify">
                                Obrigado a todos que acreditaram em nossos produtos e nosso modo de atender. E para atender cada vez melhor, apresentamos nossa nova fase: <strong className="text-sky-400">Sabrina De Tudo um Pouco</strong>.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-purple-500/20 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                                <img
                                    src="/history1_new.png"
                                    alt="Loja Atual"
                                    className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] transform transition-transform group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
