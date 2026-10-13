import React, {useState} from "react";
function Register({onSwitchToLogin}){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("registeres user:",{email,password});
        alert('registration successful! pleaselogin.');
         
        onSwitchToLogin();

    };
    return (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '85vh',
    background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)',
    fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
    padding: '20px'
  }}>
    <div style={{
      background: '#ffffff',
      padding: '40px 36px',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
      width: '100%',
      maxWidth: '410px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)'
    }}>
      {/* App Logo / Icon Badge */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #0d9488, #0284c7)',
          color: '#ffffff',
          fontSize: '24px',
          fontWeight: 'bold',
          boxShadow: '0 8px 16px rgba(13, 148, 136, 0.25)'
        }}>
          📝
        </div>
      </div>

      <h2 style={{ 
        marginBottom: '6px', 
        color: '#0f172a', 
        fontSize: '24px', 
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: '-0.5px'
      }}>
        Create Account
      </h2>
      
      <p style={{
        textAlign: 'center',
        color: '#64748b',
        fontSize: '14px',
        marginBottom: '28px'
      }}>
        Get started with your free account
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#334155', fontWeight: '600' }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1.5px solid #e2e8f0',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#f8fafc'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#334155', fontWeight: '600' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1.5px solid #e2e8f0',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#f8fafc'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '13px',
            background: 'linear-gradient(135deg, #0d9488, #0284c7)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(13, 148, 136, 0.3)'
          }}
        >
          Register
        </button>
      </form>

      <div style={{
        marginTop: '28px',
        paddingTop: '20px',
        borderTop: '1px solid #f1f5f9',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
          Already have an account?{' '}
          <span
            onClick={onSwitchToLogin}
            style={{
              color: '#0d9488',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  </div>
  );
}

export default Register;