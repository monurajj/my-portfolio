// components/ProfileHeader.jsx
// components/ProfileHeader.jsx
import Image from "next/image";
import { MapPin, Mail, Calendar, Download } from "lucide-react";
import MyImage from "../assets/cropedImage10.png";

const ProfileHeader = ({ personalDetails }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
      </div>

      {/* Content */}
      <div className="relative px-6 py-12 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-5xl flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-500 shadow-2xl">
              {personalDetails.ProfileImage ? (
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    //   src="MyImage"
                    src={MyImage}
                    alt={"...."}
                    layout="fill"
                    objectFit="cover"
                    className=" transform transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {personalDetails.Name?.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-tight lg:text-5xl">
                {personalDetails.Name}
              </h1>
              <p className="text-xl text-blue-100 font-medium">
                {personalDetails.Title}
              </p>
            </div>

            <p className="max-w-2xl text-blue-100/90 leading-relaxed">
              {personalDetails.Bio}
            </p>

            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start text-sm text-blue-100/90">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{personalDetails.Location}</span>
              </div>
              {personalDetails.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{personalDetails.email}</span>
                </div>
              )}
              {personalDetails.startYear && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Since {personalDetails.startYear}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// components/SocialLinks.jsx
const SocialLinks = ({ socialHandles }) => {
  // Social media icons and colors mapping
  const socialConfig = {
    LinkedIn: {
      color: "bg-[#0077B5] hover:bg-[#006399]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    GitHub: {
      color: "bg-[#333] hover:bg-[#24292e]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    Instagram: {
      color:
        "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:from-[#7232a8] hover:via-[#e51111] hover:to-[#e56b2b]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    Twitter: {
      color: "bg-[#1DA1F2] hover:bg-[#1a91da]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    Facebook: {
      color: "bg-[#1877F2] hover:bg-[#166fe5]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Connect With Me</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(socialHandles).map(([platform, url]) => {
          const config = socialConfig[platform] || {
            color: "bg-gray-600 hover:bg-gray-700",
            icon: (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            ),
          };

          return (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${config.color} text-white rounded-lg p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 group`}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                {config.icon}
              </span>
              <span className="font-medium hidden lg:block">{platform}</span>
            </a>
          );
        })}
      </div>

      {/* Decorative Element */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          Let&apos;s connect and create something amazing together!
        </p>
      </div>
    </div>
  );
};

// components/ProfessionalJourney.jsx
const ProfessionalJourney = ({ journey }) => {
  return (
    <div className="text-black bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Professional Journey</h2>
      <div className="space-y-6">
        {journey.map((position, index) => (
          <div
            key={index}
            className="relative pl-8 pb-6 border-l-2 border-blue-500 last:pb-0"
          >
            <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-blue-500" />
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm text-blue-600 font-semibold">
                {position.Year}
              </span>
              <h3 className="text-lg font-bold mt-1">{position.Role}</h3>
              <p className="text-gray-600 font-medium">{position.Company}</p>
              <p className="mt-2 text-gray-700">{position.Description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// components/SkillsAndHobbies.jsx
const SkillsAndHobbies = ({ skills, hobbies }) => {
  return (
    <div className="text-black grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Hobbies</h2>
        <div className="flex flex-wrap gap-2">
          {hobbies.map((hobby, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// components/Achievements.jsx
const Achievements = ({ achievements }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-black text-xl font-bold mb-4">Achievements</h2>
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="mt-1 text-yellow-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            {/* <h1 className="text-black" >Others...</h1> */}
            <p className="text-gray-700">{achievement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
// Previous components remain the same...

// components/FavoriteHeroes.jsx
const FavoriteHeroes = ({ heroes }) => {
  return (
    <div className="text-black bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">My Favorite Superheroes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(heroes).map((hero, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-2"
          >
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 w-full">
              <div className="w-full h-64 bg-gradient-to-b from-purple-500 to-blue-600 relative">
                {/* Placeholder for hero image */}
                <div className="relative w-full h-full">
                  <Image
                    src={hero.Image}
                    alt="Loading Image"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-20" />

                {/* Hero content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {hero.Name}
                  </h3>
                  <p className="text-white/90 italic">{hero.Punchline}</p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// pages/about.js
import data from "../data.json";

const AboutPage = () => {
  const aboutme = data.find((item) => item.id === "aboutMe");

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <ProfileHeader personalDetails={aboutme.PersonalDetails} />

        <div className="grid gap-8">
          <SocialLinks socialHandles={aboutme.MySocialHandles} />

          <FavoriteHeroes heroes={aboutme.MyFavoriteSuperHeroes} />

          <ProfessionalJourney journey={aboutme.ProfessionalJourney} />

          <SkillsAndHobbies skills={aboutme.Skills} hobbies={aboutme.Hobbies} />

          <Achievements achievements={aboutme.Achievements} />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
