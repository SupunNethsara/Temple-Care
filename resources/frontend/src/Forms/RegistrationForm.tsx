import { useState } from 'react';
import axios from 'axios';
import type { RegistrationFormData, RegistrationFormProps } from "../Utils/PropTypes";

function RegistrationForm({ onClose, onSwitchToLogin }: RegistrationFormProps) {
    const [formData, setFormData] = useState<RegistrationFormData>({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fields: (keyof RegistrationFormData)[] = [
        'name',
        'phone',
        'email',
        'password',
        'password_confirmation',
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/register', formData);
            alert('Registration successful! Please login.');
            onSwitchToLogin();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative max-w-md w-full mx-4 bg-white p-8 rounded-2xl shadow-2xl border border-amber-100">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Title */}
                <div className="text-center mb-6">
                    <div className="mx-auto w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        ලියාපදිංචි වන්න
                    </h2>
                    <p className="mt-1 text-gray-600" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        ඔබගේ ගිණුම සාදා ගන්න
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field}>
                            <label
                                className="block text-sm font-medium text-gray-700 mb-1"
                                style={{ fontFamily: "'Abhaya Libre', serif" }}
                            >
                                {field === 'name'
                                    ? 'නම'
                                    : field === 'phone'
                                        ? 'දුරකථන අංකය'
                                        : field === 'email'
                                            ? 'ඊමේල් ලිපිනය'
                                            : field === 'password'
                                                ? 'මුරපදය'
                                                : 'මුරපදය තහවුරු කරන්න'}
                            </label>
                            <input
                                name={field}
                                type={
                                    field.includes('password')
                                        ? 'password'
                                        : field === 'email'
                                            ? 'email'
                                            : 'text'
                                }
                                required
                                value={formData[field] || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                placeholder={
                                    field === 'name'
                                        ? 'ඔබගේ සම්පූර්ණ නම'
                                        : field === 'phone'
                                            ? '07X XXX XXXX'
                                            : field === 'email'
                                                ? 'you@example.com'
                                                : field === 'password'
                                                    ? 'අවම වචන 8ක්'
                                                    : 'මුරපදය නැවත ඇතුළත් කරන්න'
                                }
                                disabled={loading}
                            />
                        </div>
                    ))}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            භූමිකාව
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            disabled={loading}
                        >
                            <option value="user">පරිශීලක</option>
                            <option value="admin">පරිපාලක</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50"
                        style={{ fontFamily: "'Abhaya Libre', serif" }}
                    >
                        {loading ? 'ලියාපදිංචි වෙමින්...' : 'ලියාපදිංචි වන්න'}
                    </button>

                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-600" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            දැනටමත් ගිණුමක් තිබේද?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                className="font-semibold text-amber-600 hover:text-amber-700"
                                disabled={loading}
                            >
                                පිවිසෙන්න
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;
