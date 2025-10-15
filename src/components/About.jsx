import { useCoordinates } from "../coordContext";

const About = ({ cityInfo }) => {
  const { coordinates } = useCoordinates(); // ✅ access global coordinates if needed

  console.log("Global coordinates from context:", coordinates);

  if (!cityInfo) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-gray-600 text-lg">
          No city selected yet. Search a city on the homepage to see details.
        </p>
      </div>
    );
  }

 return (
    <div className="mt-10 mx-4 md:mx-auto max-w-4xl p-8 rounded-2xl bg-white/70 backdrop-blur-md shadow-xl">
      {/* City Name */}
      <h2 className="text-4xl font-bold text-blue-800 mb-4 border-b-2 border-blue-300 inline-block pb-2">
        {cityInfo.title}
      </h2>

      {/* Wikipedia Text */}
      <div
        className="text-gray-800 text-lg leading-relaxed space-y-4 prose prose-blue"
        dangerouslySetInnerHTML={{ __html: cityInfo.extract }}
      />
    </div>
  );
};

export default About;
