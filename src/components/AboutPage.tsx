"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Users, ArrowRight, Music, Target, Eye } from "lucide-react";
import { useContent, getContentValue, getMetadataArray, getMetadataValue } from "@/lib/hooks/useContent";
import MusicalLoader from "./MusicalLoader";

const AboutPage = () => {
  // Fetch all about page content
  const { contentMap, loading } = useContent({ page: 'about' });

  // Show loader while content is loading
  if (loading) {
    return <MusicalLoader />;
  }

  // Default fallback data
  const defaultValues = [
    {
      icon: Music,
      title: "Evidence-Based",
      description:
        "Using scientifically proven neurologic music therapy techniques to achieve measurable results.",
    },
    {
      icon: Users,
      title: "Family-Centered",
      description:
        "Supporting individuals and their families throughout their therapeutic journey.",
    },
    {
      icon: Heart,
      title: "Compassionate",
      description:
        "Delivering care with empathy, respect, and unwavering dedication to each client.",
    },
  ];

  const defaultTeamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Director & Board-Certified Music Therapist",
      bio: "With over 20 years of experience, Dr. Johnson leads our team with expertise in neurologic music therapy and clinical research.",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      credentials: "MM, MT-BC, NMT",
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Music Therapist",
      bio: "Specializing in pediatric neurologic music therapy with a focus on autism spectrum disorders and developmental delays.",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      credentials: "BM, MT-BC, NMT",
    },
    {
      name: "Dr. Emily Chen",
      role: "Clinical Music Therapist & Researcher",
      bio: "Dr. Chen brings extensive research experience and specializes in stroke recovery and traumatic brain injury rehabilitation.",
      image:
        "https://images.unsplash.com/photo-1594824475315-fc2c40af8ebe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      credentials: "PhD, MT-BC, NMT",
    },
    {
      name: "James Wilson",
      role: "Music Therapist & Program Coordinator",
      bio: "James coordinates our community outreach programs and specializes in group therapy sessions for various neurologic conditions.",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      credentials: "MA, MT-BC, NMT",
    },
    {
      name: "Dr. Lisa Thompson",
      role: "Pediatric Music Therapist",
      bio: "With a passion for working with children, Dr. Thompson specializes in early intervention and family-centered care approaches.",
      image:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      credentials: "DMT, MT-BC, NMT",
    },
    {
      name: "Robert Martinez",
      role: "Administrative Director",
      bio: "Robert ensures smooth operations and coordinates with families, insurance providers, and healthcare professionals.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      credentials: "MBA, CBIS",
    },
  ];

  // Get content from CMS or use defaults
  const heroTitle = getContentValue(contentMap['about_hero_title'], 'Transforming Lives Through Music');
  const heroDescription = getContentValue(contentMap['about_hero_description'], 'For over 40 years, Neurologic Music Therapy Services of Arizona has been at the forefront of evidence-based music therapy, helping individuals with neurologic conditions achieve their goals through the power of music.');
  const missionStatement = getContentValue(contentMap['about_mission'], 'To provide evidence-based neurologic music therapy services that enhance the quality of life for individuals with neurologic conditions and their families.');
  const visionStatement = getContentValue(contentMap['about_vision'], 'To be the leading provider of neurologic music therapy services in Arizona, recognized for clinical excellence, innovation, and compassionate care.');
  const historyText = getContentValue(contentMap['about_history'], 'Founded in 1984, NMTSA has grown from a small practice to Arizona\'s leading provider of neurologic music therapy. Our team of board-certified music therapists brings decades of combined experience and continues to advance the field through clinical practice, research, and education.');
  
  const values = getMetadataArray(contentMap['about_values'], 'values', defaultValues);
  const teamMembers = defaultTeamMembers; // Team members will be managed separately in the employees section

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Music,
      Users,
      Heart,
      Target,
      Eye
    };
    return icons[iconName] || Music;
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-nmtsa-50 via-nmtsa-100 to-nmtsa-200 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-nmtsa-200/30 rounded-full blur-xl animate-pulse-slow" />
          <div
            className="absolute bottom-20 right-10 w-48 h-48 bg-nmtsa-300/20 rounded-full blur-xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-nmtsa-100 text-nmtsa-700 rounded-full text-sm font-semibold mb-6">
                About NMTSA
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
                <span className="gradient-text">{heroTitle}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {heroDescription}
              </p>
              <Link
                href="/programs"
                className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Explore Our Programs
              </Link>
            </div>

            <div className="relative">
              <div className="glass-card overflow-hidden rounded-3xl">
                <Image
                  src="https://static.wixstatic.com/media/072f2d_a15cb6cb61a74ff8956322ba1d5028f1.jpg/v1/fill/w_600,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_MG_1270_JPG.jpg"
                  alt="Music therapy session at NMTSA"
                  width={600}
                  height={384}
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-gradient-to-br from-nmtsa-500 to-nmtsa-600 rounded-3xl p-8 text-white">
              <Target className="w-12 h-12 mb-6" />
              <h2 className="font-poppins font-bold text-3xl mb-4">
                Our Mission
              </h2>
              <p className="text-nmtsa-50 leading-relaxed">
                {missionStatement}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
              <Eye className="w-12 h-12 mb-6" />
              <h2 className="font-poppins font-bold text-3xl mb-4">
                Our Vision
              </h2>
              <p className="text-blue-50 leading-relaxed">
                {visionStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at NMTSA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = typeof value.icon === 'string' ? getIconComponent(value.icon) : value.icon;
              return (
                <div
                  key={value.title || index}
                  className="glass-card p-8 text-center rounded-2xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated professionals bring expertise, compassion, and
              innovation to every therapy session
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="glass-card p-6 rounded-2xl text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-nmtsa-100 to-nmtsa-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-nmtsa-200 group-hover:border-nmtsa-400 transition-colors duration-300"></div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                  {member.name}
                </h3>

                <div className="text-nmtsa-600 font-semibold mb-2">
                  {member.role}
                </div>

                <div className="text-sm text-nmtsa-500 font-medium mb-4">
                  {member.credentials}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-nmtsa-100 mb-8 leading-relaxed">
              Contact us today to learn how our music therapy services can make
              a difference in your life or the life of someone you care about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="bg-white text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg hover:bg-nmtsa-50 transition-colors"
              >
                View Our Programs
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg hover:bg-white hover:text-nmtsa-600 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
