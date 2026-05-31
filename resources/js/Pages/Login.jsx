// resources/js/Pages/Auth/Login.jsx
import { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => reset('password');
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        post(route('login'));
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: '#f9fafb',
        }}>
            <div style={{
                background: '#fff', borderRadius: '10px',
                padding: '40px', width: '100%', maxWidth: '400px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}>
                {/* Logo */}
                <h2 style={{ textAlign: 'center', marginBottom: '28px', fontSize: '22px', fontWeight: '700' }}>
                    Mon Resto — Connexion
                </h2>

                {status && (
                    <div style={{ marginBottom: '16px', color: '#10b981', fontSize: '14px' }}>
                        {status}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            autoComplete="username"
                            required
                            style={{
                                width: '100%', padding: '9px 12px',
                                border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                                borderRadius: '6px', fontSize: '14px',
                                boxSizing: 'border-box',
                            }}
                        />
                        {errors.email && (
                            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>
                        )}
                    </div>

                    {/* Mot de passe */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            autoComplete="current-password"
                            required
                            style={{
                                width: '100%', padding: '9px 12px',
                                border: `1px solid ${errors.password ? '#ef4444' : '#d1d5db'}`,
                                borderRadius: '6px', fontSize: '14px',
                                boxSizing: 'border-box',
                            }}
                        />
                        {errors.password && (
                            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.password}</p>
                        )}
                    </div>

                    {/* Se souvenir de moi */}
                    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            type="checkbox"
                            id="remember"
                            checked={data.remember}
                            onChange={e => setData('remember', e.target.checked)}
                        />
                        <label htmlFor="remember" style={{ fontSize: '14px', cursor: 'pointer' }}>
                            Se souvenir de moi
                        </label>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                style={{ fontSize: '13px', color: '#3b82f6', textDecoration: 'none' }}
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                marginLeft: 'auto',
                                padding: '9px 24px',
                                background: processing ? '#93c5fd' : '#3b82f6',
                                color: '#fff', border: 'none',
                                borderRadius: '6px', fontWeight: '600',
                                fontSize: '14px', cursor: processing ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {processing ? 'Connexion…' : 'Se connecter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}