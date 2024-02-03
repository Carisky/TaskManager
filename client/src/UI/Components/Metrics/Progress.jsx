import React from 'react';

export default function Progress({ done, color, max, label }) {
  // Calculate progress percentage
  const progress = (done / max) * 100;

  return (
    <div>
      <div style={{ width: '100%', marginTop:"10px", backgroundColor: '#e0e0e0', borderRadius: '5px', padding: '3px' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '20px',
            backgroundColor: color,
            borderRadius: '5px',
            textAlign: 'right',
            padding: '5px',
            boxSizing: 'border-box',
            color: 'white',
          }}
        >
         
        </div>
        <div style={{
            textAlign:"center"
        }}>
            {label}{`${Math.round(progress)}%`}
        </div>
        
      </div>
    </div>
  );
}
