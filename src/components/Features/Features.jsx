import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaUndo,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      text: "Quick and reliable delivery to your doorstep.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Quality Products",
      text: "Genuine and trusted electrical products.",
    },
    {
      icon: <FaHeadset />,
      title: "Expert Support",
      text: "Professional assistance whenever you need it.",
    },
    {
      icon: <FaUndo />,
      title: "Easy Returns",
      text: "Simple and convenient return process.",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="row g-4">

          {features.map((feature) => (
            <div
              className="col-lg-3 col-md-6"
              key={feature.title}
            >
              <div className="text-center p-4 bg-white rounded shadow-sm h-100">

                <div
                  className="text-primary mb-3"
                  style={{ fontSize: "36px" }}
                >
                  {feature.icon}
                </div>

                <h5 className="fw-bold">
                  {feature.title}
                </h5>

                <p className="text-muted mb-0">
                  {feature.text}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;