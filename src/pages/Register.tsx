import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Register() {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [form, setForm] = useState({ name: '', shopName: '', mobile: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const { register, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (register(form)) setStep('otp');
  };

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyOtp(otp)) navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-foreground tracking-tight">INVENTRA</h1>
          <p className="text-muted-foreground mt-2">{step === 'form' ? 'Create your account' : 'Verify OTP'}</p>
        </div>
        {step === 'form' ? (
          <form onSubmit={handleRegister} className="agent-card space-y-3">
            {(['name', 'shopName', 'mobile', 'email'] as const).map(field => (
              <div key={field}>
                <Label className="text-muted-foreground capitalize">{field === 'shopName' ? 'Shop Name' : field}</Label>
                <Input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} className="bg-secondary border-border mt-1" required />
              </div>
            ))}
            <div>
              <Label className="text-muted-foreground">Password</Label>
              <Input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="bg-secondary border-border mt-1" required />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display">Register</Button>
            <p className="text-center text-sm text-muted-foreground">
              Have an account?{' '}
              <button type="button" onClick={() => navigate('/login')} className="text-primary hover:underline">Login</button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleOtp} className="agent-card space-y-4">
            <p className="text-sm text-muted-foreground">Enter the OTP sent to your mobile. <span className="text-primary">(Use 123456 for demo)</span></p>
            <Input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" className="bg-secondary border-border text-center text-2xl tracking-[0.5em] font-display" maxLength={6} />
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display">Verify</Button>
          </form>
        )}
      </div>
    </div>
  );
}
