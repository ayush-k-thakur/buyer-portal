import { Heart, Trash2 } from "lucide-react";
import { useMemo } from "react";

import property1 from "../../assets/property1.webp";
import property2 from "../../assets/property2.webp";
import property3 from "../../assets/property3.webp";
import property4 from "../../assets/property4.webp";
import property5 from "../../assets/property5.webp";

const images = [property1, property2, property3, property4, property5];

export default function PropertyCard({ property, isFav, toggleFavourite, type, handleDelete }) {
  const randomImage = useMemo(() => {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }, [property._id]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-200">
      {/* Image section */}
      <div className="relative">
        <img
          src={randomImage}
          alt={property.name}
          className="w-full h-36 sm:h-42 md:h-46 object-cover"
        />

        {/* Heart */}
        {type === "all-properties" && (
          <button
            onClick={() => toggleFavourite(property)}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow"
          >
            <Heart
              size={26}
              className={`transition-all duration-300 ${
                isFav ? "text-red-500 fill-red-500 scale-110" : "text-gray-500"
              } active:scale-125`}
            />
          </button>
        )}

        {/* Delete */}
        {type === "seller-listings" && handleDelete && (
          <button
            onClick={() => handleDelete(property)}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow"
          >
            <Trash2
              size={26}
              className={`transition-all duration-300 ${
                isFav ? "text-red-500 fill-red-500 scale-110" : "text-gray-500"
              } active:scale-125`}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-1">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          {property.name}
        </h3>
        <p className="text-xl font-bold text-emerald-600">
          &#8377; {property.price}
        </p>
        <p className="text-gray-500 text-sm">{property.location}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
      </div>
    </div>
  );
}