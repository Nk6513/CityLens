import { useLocation } from "../LocationContext";

// ---------------------------------------------------------------
// About Page Component
// ---------------------------------------------------------------
const About = () => {
  const { cityInfo } = useLocation();
  console.log("City Info:", cityInfo);

  if (!cityInfo) {
    return (
      <div className="flex justify-center mt-10 px-4">
        <div className="flex items-center border-l-4 border-blue-700 bg-blue-400 px-6 py-4 rounded-r-lg shadow-md max-w-xl">
          <p className="text-md font-semibold leading-relaxed font-sans text-black-900">
            No city selected yet. Search a city on the homepage to see details.
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------
  // About City Section
  // ---------------------------------------------------------------
  return (
    <div className="mt-10 mx-4 md:mx-auto max-w-5xl p-8 rounded-2xl bg-blue-300/30 backdrop-blur-lg shadow-xl">
      {/* Main layout container */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left: City Image */}
        {cityInfo?.image && (
          <div className="flex-shrink-0 w-full md:w-1/2">
            <img
              src={cityInfo.image}
              alt={cityInfo.title}
              className="w-full h-auto rounded-2xl shadow-md object-cover"
            />
          </div>
        )}

        {/* Right: City Info */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-blue-800 mb-4 border-b-2 border-blue-300 inline-block pb-2">
            {cityInfo.title}
          </h2>

          {cityInfo.shortdesc && (
            <p className="text-gray-700 italic mb-4">{cityInfo.shortdesc}</p>
          )}

          <label className="block cursor-pointer text-gray-800 text-lg leading-relaxed space-y-4 prose prose-blue">
            {/* Hidden checkbox to toggle read more */}
            <input type="checkbox" className="peer sr-only" />

            {/* Extract text with collapsible content */}
            <div
              className="line-clamp-3 peer-checked:line-clamp-none transition-all duration-300 ease-in-out"
              dangerouslySetInnerHTML={{ __html: cityInfo.extract }}
            />

            {/* Toggle buttons */}
            <span className="text-blue-700 font-semibold mt-1 inline-block peer-checked:hidden hover:underline">
              Read more
            </span>
            <span className="text-blue-700 font-semibold mt-1 inline-block hidden peer-checked:inline hover:underline">
              Show less
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default About;
