import React, { useEffect } from "react";
import { FaLightbulb, FaGraduationCap, FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {


  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3"
    },
    {
      name: "Michael Chen",
      position: "Head of Education",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3"
    },
    {
      name: "Emily Rodriguez",
      position: "Lead Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
    },
    {
      name: "David Park",
      position: "Content Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
    }
  ];

  const values = [
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "Continuously evolving our platform with cutting-edge educational technologies"
    },
    {
      icon: <FaGraduationCap />,
      title: "Excellence",
      description: "Committed to delivering the highest quality education experience"
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description: "Fostering a supportive learning environment for all students"
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Expertise",
      description: "Bringing together world-class educators and industry experts"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/*  -------------- Header Section --------------  */}
      <div className="bg-gradient-to-r from-black to-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="md:text-[1.2rem] text-md text--white font-semibold text-center  leading-relaxed max-w-3xl mx-auto">
            Empowering minds through innovative online learning experiences
          </p>
        </div>
      </div>

      {/* --------------  Mission Statement --------------  */}
      <div className="max-w-7xl mx-auto px-4 py-16" data-aos="fade-up">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-6">Our Mission</h2>
          <p className="md:text-[1.1rem] text-md text-gray-700 font-semibold text-center  leading-relaxed">
            To revolutionize education by providing accessible, high-quality learning opportunities to students worldwide. We believe in the power of technology to transform lives through education.
          </p>
        </div>
      </div>

      {/*  -------------- Team Section  -------------- */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600" data-aos="fade-up">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative mx-auto w-48 h-48 mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-full h-full object-cover shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3";
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-blue-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>

      {/*  -------------- Vision and Values --------------  */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700" data-aos="fade-up">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-4xl text-indigo-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 font-[600]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*  -------------- Call to Action --------------  */}
      <div className="bg-indigo-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-[1.1rem] font-semibold text-white mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their lives through our platform.
          </p>
          <Link to={'/course'}>
          <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105">
            Explore Courses
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;