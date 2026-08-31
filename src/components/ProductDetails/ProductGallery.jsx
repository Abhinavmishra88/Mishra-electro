import { useState } from "react";
import "../../styles/productDetails.css";
import img1 from "../../assets/products/product1.png";
import img2 from "../../assets/products/product2.png";
import img3 from "../../assets/products/product3.png";
import img4 from "../../assets/products/product4.png";

const images = [img1, img2, img3, img4];

function ProductGallery() {

  const [selected, setSelected] = useState(images[0]);

  return (

    <div className="gallery">

      <img
        src={selected}
        className="main-image"
        alt=""
      />

      <div className="thumbs">

        {images.map((img, i) => (

          <img
            key={i}
            src={img}
            alt=""
            onClick={() => setSelected(img)}
          />

        ))}

      </div>

    </div>

  );

}

export default ProductGallery;