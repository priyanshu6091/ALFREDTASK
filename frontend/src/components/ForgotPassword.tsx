import axios from "axios";
import { useState } from "react";

// frontend/src/components/ForgotPassword.tsx
const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await axios.post('http://localhost:5000/api/users/forgot-password', { email });
    };
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Send Reset Link</button>
      </form>
    );
  };