import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();



    const handleSubmit = (event) => {
        event.preventDefault();
        if (isAdmin && password === "admin") {
            alert("Dobrodošao Admin");
            navigate(`/index/${isAdmin}`, { state: { isAdmin: true } });

        } else {
            alert("Dobrodošao User");
            navigate(`/index/${isAdmin}`, { state: { isAdmin: false } });
        }

    };

    return (
        <div className='App-login'>
            <div className='login'>
                <div className="login-container">
                    <h2>Login</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isAdmin">Is Admin:</label>
                            <input
                                type="checkbox"
                                id="isAdmin"
                                name="isAdmin"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(!isAdmin)}
                            />
                        </div>
                        <button className="secondary" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
