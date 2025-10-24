import { useLocation } from "../LocationContext";

// ---------------------------------------------------------------
// About Page Component
// ---------------------------------------------------------------
const About = () => {
  // ---------------------------------------------------------------
  // Access global context
  // ---------------------------------------------------------------
  const { cityInfo } = useLocation();
  console.log("City Info:", cityInfo);


  // ---------------------------------------------------------------
  // If no city is selected yet
  // ---------------------------------------------------------------
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
  // ---------------- Weather Page ----------------
  // ---------------------------------------------------------------
  return (
    <div className="mt-10 mx-4 md:mx-auto max-w-4xl p-8 rounded-2xl bg-blue-300/30 backdrop-blur-lg shadow-xl">
  <h2 className="text-4xl font-bold text-blue-800 mb-4 border-b-2 border-blue-300 inline-block pb-2">
    {cityInfo.title}
  </h2>

  <label className="block cursor-pointer text-gray-800 text-lg leading-relaxed space-y-4 prose prose-blue">
    {/*---------- Hidden checkbox to toggle ----------*/}
    <input type="checkbox" className="peer sr-only" />

    {/*---------- Text Container ----------*/}
    <div
      className="line-clamp-3 peer-checked:line-clamp-none transition-all duration-300 ease-in-out"
      dangerouslySetInnerHTML={{ __html: cityInfo.extract }}
    />

    {/*---------- Toggle buttons ----------*/}
    <span className="text-blue-700 font-semibold mt-1 inline-block peer-checked:hidden hover:underline">
      Read more
    </span>
    <span className="text-blue-700 font-semibold mt-1 inline-block hidden peer-checked:inline hover:underline">
      Show less
    </span>
  </label>
</div>

  );
};

export default About;
