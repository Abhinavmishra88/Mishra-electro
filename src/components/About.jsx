const STATS = [
  { value: '25+', label: 'Years in business' },
  { value: '5000+', label: 'Happy customers' },
  { value: '6000+', label: 'Products instock' },
  { value: '24h', label: 'Service response' },
]

function About() {
  return (
    <section id='about' className='section about-section'>
      <div className='container'>
        <div className='row align-items-center g-5'>
          <div className='col-lg-5'>
            <p className='section-eyebrow about-eyebrow'>About Mishra Electro</p>
            <h2 className='section-title about-title'>A family shop that keeps the lights on</h2>
            <p>What started in 1998 as a small counter selling bulbs and switches has grown into one of the neighbourhood's most trusted electrical stores. Three generations later, the promise hasn't changed: honest prices, genuine products and work we stand behind.</p>
            <p className='mb-4'>Every wire, switch and panel we sell is sourced from authorised distributors, and every installation we do comes with a written guarantee.</p>
            <a href='#contact' className='btn btn-warning fw-bold text-dark px-4'>Get a free wiring estimate</a>
          </div>
          <div className='col-lg-7'>
            <div className='row g-3'>
              {STATS.map((stat) => (
                <div className='col-6 col-md-3' key={stat.label}>
                  <div className='stat-card card border-0 text-center h-100'>
                    <div className='card-body p-4'>
                      <p className='stat-value display-6 fw-bold mb-1'>{stat.value}</p>
                      <p className='stat-label text-secondary small mb-0'>{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
