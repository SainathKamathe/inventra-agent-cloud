import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [email, setEmail] = useState('sainath kamathe');
  const [password, setPassword] = useState('demo123');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 rounded-lg bg-primary items-center justify-center mb-4 glow-green">
            <span className="text-primary-foreground font-display text-xl font-bold">IN</span>
          </div>
          <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">INVENTRA</h1>
          <p className="text-muted-foreground mt-2">Multi-Agent AI Inventory System</p>
        </div>
        <form onSubmit={handleSubmit} className="agent-card space-y-4">
          <div>
            <Label className="text-muted-foreground">Email</Label>
            <Input value={email} onChange={e => setEmail(e.target.value)} className="bg-secondary border-border mt-1" />
          </div>
          <div>
            <Label className="text-muted-foreground">Password</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-secondary border-border mt-1" />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display">
            Login
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            No account?{' '}
            <button type="button" onClick={() => navigate('/register')} className="text-primary hover:underline">Register</button>
          </p>
        </form>
      </div>
    </div>
  );
}
