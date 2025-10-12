"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Users,
  ArrowRight,
  Music,
  Target,
  Eye,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import { useContent, getContentValue, getMetadataArray } from "@/lib/hooks/useContent";
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
      icon: Users,
      title: "Capability of All People",
      description:
        "We believe in the capability of all people to reach their goals and attain their full potential.",
    },
    {
      icon: Heart,
      title: "Competence of All",
      description:
        "We believe in the competence of all people and assume competence in everyone we serve.",
    },
    {
      icon: Music,
      title: "Unique Contribution",
      description:
        "We value the contribution every person has to offer through their unique person and abilities.",
    },
    {
      icon: Target,
      title: "Science and Relationship",
      description:
        "We believe in the connection of science and relationship, and the impact both have on every person.",
    },
  ];

  const defaultTeamMembers = [
    {
      name: "Suzanne Oliver",
      role: "Founder and Executive Director",
      image: "/images/Suzanne-profile.avif",
      credentials: "MT-BC, NMT Fellow",
      email: "soliver@nmtsa.org",
    },
    {
      name: "Leanna Moore",
      role: "Clinical Training Director",
      image: "/images/leeana-profile.avif",
      credentials: "MM, MT-BC, NMT Fellow",
      email: "lmoore@nmtsa.org",
    },
    {
      name: "Maggie Reynolds",
      role: "Neurologic Music Therapist",
      image: "/images/maggie_profile.avif",
      credentials: "MT-BC, NMT",
      email: "mreynolds@nmtsa.org",
    },
    {
      name: "Matt Valois",
      role: "Neurologic Music Therapist",
      image: "/images/Matt-profile.avif",
      credentials: "MT-BC, NMT",
      email: "mvalois@nmtsa.org",
    },
    {
      name: "Jessi Teich",
      role: "Neurologic Music Therapist, Fellow",
      image: "/images/Jessi-profile.avif",
      credentials: "PhD, MT-BC, NMT Fellow",
      email: "jteich@nmtsa.org",
    },
    {
      name: "Cheryl Butterworth",
      role: "Operations Manager",
      image: "/images/Cheryl-profile.avif",
      credentials: "Operations Manager",
      email: "cbutterworth@nmtsa.org",
    },
  ];

  const visitingClinicians = [
    {
      name: "Ka I Ho",
      role: "Neurologic Music Therapist",
      location: "Macau",
      period: "March 2025 - March 2026",
      image: "/images/ka-profile.avif",
      credentials: "MT-BC, NMT",
    },
    {
      name: "Joseph (Joe) Thompson",
      role: "Neurologic Music Therapist",
      location: "Australia",
      period: "May - August 2022",
      image: "/images/joe-profile.avif",
      credentials: "MT-BC, NMT",
    },
    {
      name: "Mary-Clare Fearn",
      role: "Neurologic Music Therapist",
      location: "UK",
      period: "November 2022",
      image: "/images/mary-profile.avif",
      credentials: "HCPC Certified MT, NMT",
    },
    {
      name: "Emma Bailey",
      role: "Neurologic Music Therapist",
      location: "UK",
      period: "May 2023",
      image: "/images/emma-profile.avif",
      credentials: "HCPC Certified MT, NMT",
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
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
                Unleashing the Unique Potential of{" "}
                <span className="gradient-text">
                  Individuals with Disabilities
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Since 1982, NMTSA has provided services to persons with
                neurologic impairments (ages 18 months to 75+ years) and their
                families in the greater Phoenix area, using evidence-based
                neurologic music therapy.
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
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-10 lg:p-12 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <Eye className="w-14 h-14" />
                <h2 className="font-poppins font-bold text-4xl">Our Vision</h2>
              </div>
              <p className="text-blue-50 text-2xl leading-relaxed font-medium">
                Unleashing the unique potential of individuals with
                disabilities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-nmtsa-500 to-nmtsa-600 rounded-3xl p-10 lg:p-12 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-14 h-14" />
                <h2 className="font-poppins font-bold text-4xl">Our Mission</h2>
              </div>
              <p className="text-nmtsa-50 text-lg leading-relaxed">
                NMTSA partners with those impacted by disability to{" "}
                <span className="font-semibold text-white">
                  change lives through using the brain&apos;s response to music
                </span>
                , and optimizing body and brain connections.{" "}
                <span className="font-semibold text-white">
                  NMTSA assumes the competence of all.
                </span>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="glass-card p-8 text-center rounded-2xl hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-poppins min-h-[56px] flex items-center justify-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Neurologic Music Therapy Services of Arizona&apos;s (NMTSA)
                  vision is to unleash the unique potential of individuals with
                  disabilities. NMTSA has provided services to persons with
                  neurologic impairments (ages 18 months to 75+ years of age)
                  and their families in the greater Phoenix area since 1982.
                </p>
                <p>
                  NMTSA is nationally recognized for its evidence-based approach
                  to treatment with persons with neurological impairments, and
                  children with autism specifically. The company and its staff
                  maintain a close relationship with research staff from
                  universities across the country (with emphasis in NMT®,
                  competency-based communication, inclusion, and psychomotor
                  regulation/movement disorders) in order to remain current with
                  best practice approaches for the individuals served.
                </p>
              </div>
            </div>
            <div className="glass-card overflow-hidden rounded-3xl">
              <Image
                src="/images/clinic-staff.avif"
                alt="NMTSA Clinic Staff"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is NMT */}
      <section className="py-20 bg-gradient-to-br from-nmtsa-50 to-nmtsa-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              What is Neurologic Music Therapy{" "}
              <span className="gradient-text">(NMT)®</span>?
            </h2>
          </div>

          <div className="glass-card p-8 lg:p-12 rounded-3xl">
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Neurologic Music Therapy is an evidence-based treatment system
                that uses standardized, research-based techniques to treat the
                brain using specific elements of music such as rhythm, melody,
                dynamics, tempo, etc.
              </p>
              <p>
                The Neurologic Music Therapist is a stimulus specialist who is
                trained in the neuroscience of music perception, music
                production/creation, and music cognition. The Neurologic Music
                Therapist uses standardized techniques to address non-musical
                goals such as speech, physical movement, cognition and other
                functional abilities.
              </p>
              <p>
                The therapist focuses on the music as therapy, emphasizing
                specific elements of music in the construction of therapeutic
                exercises as research so indicates, in order to optimize
                function and/or reroute neuropathways to achieve functionality.
              </p>
              <p className="font-semibold text-nmtsa-700">
                Research has shown that rhythm and music are able to prime
                motor, cognition, and speech and does so at a subconscious
                level. Music can be used to help build new connections in the
                brain (called neuropathways) thus improving brain function and
                allowing one to lead a more productive and functional life.
              </p>
            </div>

            {/* Video Embed - Optional */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/i0VXmqjn7po"
                  title="How the Brain Process Music"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/5JR5RKCR_2s"
                  title="We are NMTSA"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
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
                      className={`w-full h-full group-hover:scale-110 transition-transform duration-300 ${
                        member.name === "Matt Valois"
                          ? "object-cover object-top"
                          : "object-cover object-center"
                      }`}
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

                <div className="text-sm text-nmtsa-500 font-medium">
                  {member.credentials}
                </div>
              </div>
            ))}
          </div>

          {/* Visiting International Clinicians */}
          {visitingClinicians.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 mb-4">
                  Visiting International{" "}
                  <span className="gradient-text">Clinicians</span>
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We are honored to host talented clinicians from around the
                  world
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visitingClinicians.map((clinician, index) => (
                  <div
                    key={clinician.name}
                    className="glass-card p-6 rounded-2xl text-center group hover:shadow-xl transition-all duration-300 border-2 border-nmtsa-200"
                  >
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-200">
                        <Image
                          src={clinician.image}
                          alt={clinician.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-blue-200 group-hover:border-purple-400 transition-colors duration-300"></div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                      {clinician.name}
                    </h3>

                    <div className="text-nmtsa-600 font-semibold mb-2">
                      {clinician.role}
                    </div>

                    <div className="text-sm text-nmtsa-500 font-medium mb-2">
                      {clinician.credentials}
                    </div>

                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">From:</span>{" "}
                      {clinician.location}
                    </div>

                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Period:</span>{" "}
                      {clinician.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Insights & <span className="gradient-text">Updates</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest research, stories, and insights from
              the world of neurologic music therapy
            </p>
          </div>

          {/* Featured Post */}
          <div className="glass-card p-8 rounded-2xl mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-nmtsa-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <span className="bg-nmtsa-100 text-nmtsa-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Research
                  </span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 mb-4">
                  The Science Behind Music Therapy
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Exploring how music activates neural pathways to promote
                  healing and recovery in individuals with neurologic
                  conditions...
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Dr. Sarah Johnson
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    October 5, 2024
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />5 min read
                  </div>
                </div>
              </div>
              <div className="rounded-2xl h-80 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="The Science Behind Music Therapy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Recent Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Supporting Families Through Music",
                excerpt:
                  "How our community programs create lasting impact and provide support for families navigating neurologic challenges...",
                date: "September 28, 2024",
                readTime: "3 min read",
                author: "Maria Rodriguez",
                category: "Community",
                image:
                  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "New Research in Neurologic Music Therapy",
                excerpt:
                  "Latest findings in evidence-based interventions and their applications in clinical practice...",
                date: "September 20, 2024",
                readTime: "4 min read",
                author: "Dr. Michael Chen",
                category: "Research",
                image:
                  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Music Therapy Success Stories",
                excerpt:
                  "Real stories from our clients and families about transformation through music therapy services...",
                date: "September 15, 2024",
                readTime: "6 min read",
                author: "Lisa Thompson",
                category: "Stories",
                image:
                  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
              },
            ].map((post, index) => (
              <article
                key={index}
                className="glass-card p-6 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="rounded-xl h-48 overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-nmtsa-100 text-nmtsa-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
              </article>
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
