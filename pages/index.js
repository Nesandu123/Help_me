export default function Home() {
  return (
    <div style={{fontFamily: 'Arial'}}>
      <header style={{background:'#000', color:'#FFD700', padding:'20px', textAlign:'center'}}>
        <h1>Help-Me</h1>
        <p>Your Quick Service Finder</p>
      </header>

      <nav style={{background:'#FFD700', padding:'15px', textAlign:'center'}}>
        <a href="/services" style={{marginRight:'30px', color:'#000', textDecoration:'none', fontWeight:'bold', fontSize:'16px'}}>Browse Services</a>
        <a href="/admin" style={{color:'#000', textDecoration:'none', fontWeight:'bold', fontSize:'16px'}}>Admin Panel</a>
      </nav>

      <section style={{padding:'20px'}}>
        <h2>About Us</h2>
        <p>
          Help-Me is a smart and user-friendly platform designed to connect individuals with reliable service professionals quickly and effortlessly. Whether you are looking for automobile engineers, electricians, plumbers, masons, or cleaners, Help-Me simplifies the search process by allowing users to easily browse and find the right service provider based on their needs.
        </p>
        <p>
          With a powerful admin panel, administrators can manage service categories and providers efficiently. Users can directly connect through phone calls, WhatsApp messages, or inquiry forms without complex booking systems. Designed with a bold yellow, black, and white theme, Help-Me ensures a clean and fast user experience.
        </p>
      </section>

      <section style={{padding:'20px'}}>
        <h2>Services</h2>
        <ul>
          <li>Automobile Engineers</li>
          <li>Electricians</li>
          <li>Plumbers</li>
          <li>Masons</li>
          <li>Cleaners</li>
        </ul>
      </section>

      <section style={{padding:'20px'}}>
        <h2>Contact</h2>
        <input placeholder="Your Name" /><br/><br/>
        <input placeholder="Your Email" /><br/><br/>
        <textarea placeholder="Your Inquiry"></textarea><br/><br/>
        <button style={{background:'#000', color:'#FFD700', padding:'10px'}}>Send</button>
      </section>

      <footer style={{background:'#000', color:'#fff', textAlign:'center', padding:'10px'}}>
        © 2026 Help-Me
      </footer>
    </div>
  );
}
