const FeatureCard = ({ feature }) => {
    const { title, description, image } = feature;
    return (
      <div className="bg-white rounded-xl border p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-contain rounded-lg mb-4"
        />
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  export default FeatureCard;