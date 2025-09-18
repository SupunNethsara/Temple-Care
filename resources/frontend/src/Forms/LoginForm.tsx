// LoginForm.tsx
import { useState } from 'react';
import axios from 'axios';
import type { LoginFormProps } from "../Utils/PropTypes";

function LoginForm({ onClose, onSwitchToRegister, onLoginSuccess }: LoginFormProps) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: formData.email,
                password: formData.password
            });

            console.log('Login response:', response);

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                onLoginSuccess(response.data.user, response.data.token);
                onClose();
            } else {
                throw new Error('Invalid response format from server');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative max-w-md w-full mx-4 bg-white p-10 rounded-2xl shadow-2xl border border-amber-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        පිවිසෙන්න
                    </h2>
                    <p className="mt-2 text-gray-600" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        ඔබගේ ගිණුමට ප්‍රවේශ වන්න
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ඊමේල් ලිපිනය
                            </label>
                            <div className="relative">
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                                    placeholder="you@example.com"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                                මුරපදය
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                                    placeholder="ඔබගේ මුරපදය"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                                    disabled={loading}
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                                    මතක තබා ගන්න
                                </label>
                            </div>

                            <a href="#" className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors duration-200" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                                මුරපදය අමතක වුණාද?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: "'Abhaya Libre', serif" }}
                    >
                        {loading ? 'ප්‍රවේශ වෙමින්...' : 'පිවිසෙන්න'}
                    </button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            ගිණුමක් නොමැතිද?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                className="font-semibold text-amber-600 hover:text-amber-700 transition-colors duration-200"
                                disabled={loading}
                            >
                                ලියාපදිංචි වන්න
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
