import React from 'react';
import { MessageCircle, Instagram, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-5xl font-black mb-6 text-[var(--text-primary)]">
                        Fale <span className="text-sky-500">Conosco</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                        Estamos aqui para transformar sua rotina com brilho e praticidade.
                        Tem alguma dúvida ou quer fazer um pedido especial? Nossa equipe está pronta para te atender com todo carinho!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info Cards */}
                    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <a
                            href="https://wa.me/5516994322916"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-8 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)] hover:border-green-500/50 transition-all group shadow-lg hover:shadow-green-500/10"
                        >
                            <div className="bg-green-500/10 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform">
                                <MessageCircle size={32} className="text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-green-500 uppercase tracking-widest mb-1">WhatsApp</h3>
                                <p className="text-2xl font-bold text-[var(--text-primary)]">+55 16 99432-2916</p>
                                <p className="text-sm text-[var(--text-secondary)] mt-1">Atendimento rápido e personalizado</p>
                            </div>
                        </a>

                        <a
                            href="https://www.instagram.com/sabrinaacessoriostz?igsh=MmtsbXZmaWIzbXI4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-8 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)] hover:border-pink-500/50 transition-all group shadow-lg hover:shadow-pink-500/10"
                        >
                            <div className="bg-pink-500/10 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform">
                                <Instagram size={32} className="text-pink-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-1">Instagram</h3>
                                <p className="text-2xl font-bold text-[var(--text-primary)]">@sabrinaacessoriostz</p>
                                <p className="text-sm text-[var(--text-secondary)] mt-1">Siga para novidades e inspirações</p>
                            </div>
                        </a>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-sky-500 rounded-3xl p-10 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {/* Decorative Circles */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

                        <h2 className="text-3xl font-black mb-8 relative z-10">Sempre conectadas com você!</h2>

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start">
                                <MessageCircle className="mr-4 mt-1 flex-shrink-0" size={24} />
                                <div>
                                    <p className="font-bold text-lg">Atendimento Digital</p>
                                    <p className="opacity-90">Nosso foco é o atendimento online para sua maior comodidade.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Instagram className="mr-4 mt-1 flex-shrink-0" size={24} />
                                <div>
                                    <p className="font-bold text-lg">Redes Sociais</p>
                                    <p className="opacity-90">Acompanhe nossas novidades e ofertas exclusivas no Instagram e WhatsApp.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/20 relative z-10">
                            <p className="text-lg font-medium italic">
                                "Sua satisfação é o que nos move há mais de 26 anos."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
