



const About = () => {

  
  





  return (
    <div className="max-w-md w-full mx-auto bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 mt-10">
      {/* City Image / Thumbnail */}
      <div className="h-48 w-full mb-4">
        <img
          src="https://via.placeholder.com/400x200"
          alt="City"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* City Info */}
      <div className="mb-4 text-white">
        <h2 className="text-2xl font-bold mb-2">City Name</h2>
        <p className="mb-2">
          Country: <span className="font-medium">Country Name</span>
        </p>
        <p className="mb-2">
          Population: <span className="font-medium">Population Info</span>
        </p>
        <p className="mb-2">
          Coordinates: <span className="font-medium">Lat, Lon</span>
        </p>
        <p>
          Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Optional footer / button */}
      <div className="flex justify-end">
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-opacity-80 transition">
          More Info
        </button>
      </div>
    </div>
  );
};

export default About;
