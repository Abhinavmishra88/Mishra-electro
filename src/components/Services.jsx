const SERVICES = [
  {
    icon: 'bi-house-gear-fill',
    title: 'Home Wiring',
    text: 'Complete new home wiring, earthing and load balancing done neatly and safely by licensed electricians.',
  },
  {
    icon: 'bi-tools',
    title: 'Repairs and Maintenance',
    text: 'Fan, geyser, inverter, light and appliance repairs. Quick fault-finding with clean workmanship.',
  },
  {
    icon: 'bi-lightbulb-fill',
    title: 'Lighting Solutions',
    text: 'LED lighting, chandeliers, street lights and decorative lighting designed for homes, shops and offices.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Safety Audits',
    text: 'MCB/RCCB installation, overload checks and earthing testing to keep your family and property safe.',
  },
  {
    icon: 'bi-grid-1x2-fill',
    title: 'Switchboards and Panels',
    text: 'Custom distribution boards and switchboards built to your load requirements with branded components.',
  },
  {
    icon: 'bi-phone-charger',
    title: 'Inverter and Backup',
    text: 'Inverter and battery selection, installation and maintenance so your home never sits in darkness.',
  },
]

function SectionHeading({ eyebrow, title }) {
  return (
    <div className='text-center mb-5'>
      <p className='section-eyebrow'>{eyebrow}</p>
      <h2 className='section-title'>{title}</h2>
      <div className='section-divider mx-auto'></div>
    </div>
  )
}

function Services() {
  return (
    <section id='services' className='section bg-white'>
      <div className='container'>
        <SectionHeading eyebrow='What we do' title='Our Services' />
        <div className='row g-4'>
          {SERVICES.map((service) => (
            <div className='col-md-6 col-lg-4' key={service.title}>
              <a
                href={`#contact?service=${encodeURIComponent(service.title)}`}
                className='text-decoration-none'
                aria-label={`Enquire about ${service.title}`}
              >
                <div className='card service-card h-100 border-0 shadow-sm'>
                  <div className='card-body p-4'>
                    <div className='service-icon mb-3'>
                      <i className={`bi ${service.icon}`} aria-hidden='true'></i>
                    </div>
                    <h3 className='h5 fw-bold mb-2'>{service.title}</h3>
                    <p className='card-text text-secondary mb-0'>{service.text}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
