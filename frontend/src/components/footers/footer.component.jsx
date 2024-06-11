import React from 'react'

function Footer() {
  return (
    <div style={{ backgroundColor: '#DDF2FD', textAlign: 'center', display:'flex' }}>
      <img src={`${process.env.PUBLIC_URL}/images/footer_logo.png`} alt="Footer" style={{ width: '150px', height: 'auto',padding:'10px' }}/>
      <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: '26px', color: '#333333', alignSelf: 'center', margin: '0', maxWidth: '50%' }}>"Có hai cách để hạnh phúc. Một là dùng tiền mua những thứ có thể khiến bạn hạnh phúc. Hai là dùng tri thức để biết hạnh phúc với những gì mình đang có."</h1>
      <div style={{marginLeft: 'auto', padding:'20px', alignSelf: 'center'}}>
        <div style={{ alignSelf: 'center', display:'flex',padding:'5px' }}>
          <img src={`${process.env.PUBLIC_URL}/images/email.png`} alt="Email Icon" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
          <p style={{ fontFamily: "'Monsterrat', cursive", fontSize: '18px', color: '#333333', margin: '0' }}>
            example@example.com
          </p>
        </div>
        
        <div style={{ alignSelf: 'center', display:'flex',padding:'5px' }}>
          <img src={`${process.env.PUBLIC_URL}/images/contact.png`} alt="Contact Icon" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
          <p style={{ fontFamily: "'Monsterrat', cursive", fontSize: '18px', color: '#333333', margin: '0' }}>
            038958033
          </p>
        </div>
      </div>
  
    </div>
  )
}

export default Footer