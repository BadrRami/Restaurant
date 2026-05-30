import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const Login = () => {
    const { errors } = usePage().props;

    const { data, setData, post } = useForm({
        email: '',
        password: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login.authenticate'));
    };

    return (
        <div>
            <form onSubmit={submit}>

                <div className="mb-3">
                    <label>Email</label>

                    <input
                        type="email"
                        className="form-control"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    {errors.email && (
                        <p style={{ color: 'red' }}>{errors.email}</p>
                    )}
                </div>

                <div className="mb-3">
                    <label>Password</label>

                    <input
                        type="password"
                        className="form-control"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    {errors.password && (
                        <p style={{ color: 'red' }}>{errors.password}</p>
                    )}
                </div>

                <button className="btn btn-primary">
                    Submit
                </button>

            </form>
        </div>
    );
};

export default Login;