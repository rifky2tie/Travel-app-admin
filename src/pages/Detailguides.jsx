import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detailguides() {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/guides.json")
      .then((res) => res.json())
      .then((data) => {
        if (!data[id]) {
          setError("Guide not found");
          return;
        }
        setGuide(data[id]);
      })
      .catch(() => setError("Failed to load guide data"));
  }, [id]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!guide) return <div className="p-4">Loading...</div>;

  return (
    <div>
      <div className="max-w-md mx-auto mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Banner */}
        <div className="h-28 bg-blue-100 w-full relative">
          <img
            src={guide.foto}
            alt={guide.nama}
            className="w-20 h-20 rounded-full object-cover border-4 border-white absolute left-6 -bottom-10 shadow"
          />
        </div>
        <div className="pt-14 pb-6 px-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold">{guide.nama}</div>
              <div className="text-gray-500 text-sm">{guide.lokasi}</div>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                  <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
                </svg>
              </button>
              <button className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92V19a2 2 0 01-2 2A19.72 19.72 0 013 5a2 2 0 012-2h2.09a2 2 0 012 1.72c.13 1.05.37 2.07.72 3.05a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.6 6.6l1.27-1.27a2 2 0 012.11-.45c.98.35 2 .59 3.05.72A2 2 0 0122 16.92z" />
                </svg>
              </button>
            </div>
          </div>
          {/* Info Card */}
          <div className="bg-gray-50 rounded-xl p-4 mt-6 grid grid-cols-2 gap-4 text-center text-sm">
            <div>
              <div className="font-semibold text-gray-700">Work Experience</div>
              <div className="text-gray-500 mt-1">{guide.workExperience}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Experience Level</div>
              <div className="text-gray-500 mt-1">{guide.experienceLevel}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Job Type</div>
              <div className="text-gray-500 mt-1">{guide.jobType}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">Job Status</div>
              <div className={`mt-1 font-semibold ${guide.jobStatus === "Active" ? "text-green-500" : "text-gray-500"}`}>
                {guide.jobStatus}
              </div>
            </div>
          </div>
          {/* Skills */}
          <div className="mt-8">
            <div className="font-bold mb-2">Skills</div>
            <ul className="space-y-2">
              {guide.skills && guide.skills.map((skill, i) => (
                <li key={i} className="flex items-center text-gray-700 text-sm">
                  <span className="w-5 h-5 flex items-center justify-center text-blue-500 mr-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="10" fill="#3b82f6" />
                      <path d="M8.5 13l-2.5-2.5 1.06-1.06L8.5 10.88l4.44-4.44 1.06 1.06z" fill="#fff"/>
                    </svg>
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          {/* Experiences */}
          <div className="mt-8">
            <div className="font-bold mb-2">Experiences</div>
            <div className="space-y-4">
              {guide.experiences && guide.experiences.map((exp, i) => (
                <div key={i} className="flex items-start">
                  <span className="w-8 h-8 flex items-center justify-center text-2xl mr-3">{exp.icon}</span>
                  <div>
                    <div className="font-semibold">{exp.title}</div>
                    <div className="text-gray-500 text-sm">{exp.company} &bull; {exp.date}</div>
                    <div className="text-gray-600 text-sm mt-1">{exp.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Edit Profile Button */}
          <button className="w-full mt-8 py-2 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}