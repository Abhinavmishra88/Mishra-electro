import {
  FaCheckCircle,
  FaAward,
  FaUsers,
  FaTools,
} from "react-icons/fa";

function WhyChooseUs() {
  const reasons = [
    {
      icon: <FaCheckCircle />,
      title: "Genuine Products",
      text: "We provide reliable and genuine electrical products.",
    },
    {
      icon: <FaAward />,
      title: "Quality Assured",
      text: "Every product is selected for quality and performance.",
    },
    {
      icon: <FaUsers />,
      title: "Customer First",
      text: "Your satisfaction is always our priority.",
    },
    {
      icon: <FaTools />,
      title: "Expert Solutions",
      text: "Get professional electrical solutions for your needs.",
    },
  ];

  return (
    <section className="py-5">
      <div className="container">

        <div className="row align-items-center">

          <div className="col-lg-5 mb-4 mb-lg-0">
            <span className="text-danger fw-bold">
              WHY MISHRA ELECTRO
            </span>

            <h2 className="fw-bold mt-2">
              Your Trusted Electrical Partner
            </h2>

            <p className="text-muted">
              From everyday electrical essentials to professional
              solutions, we help you find the right products for
              every requirement.
            </p>
          </div>

          <div className="col-lg-7">

            <div className="row g-4">

              {reasons.map((reason) => (
                <div
                  className="col-md-6"
                  key={reason.title}
                >
                  <div className="p-4 border rounded h-100">

                    <div
                      className="text-danger mb-3"
                      style={{ fontSize: "30px" }}
                    >
                      {reason.icon}
                    </div>

                    <h5 className="fw-bold">
                      {reason.title}
                    </h5>

                    <p className="text-muted mb-0">
                      {reason.text}
                    </p>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;