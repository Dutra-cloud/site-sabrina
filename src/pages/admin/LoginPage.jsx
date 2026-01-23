import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            navigate('/admin');
        } else {
            setError('Credenciais inválidas');
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Usuário</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-gray-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
