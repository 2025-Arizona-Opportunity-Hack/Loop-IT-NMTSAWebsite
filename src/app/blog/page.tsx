import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - NMTSA Insights & Updates",
  description:
    "Stay updated with the latest insights, research, and stories from Neurologic Music Therapy Services of Arizona.",
};

import Link from "next/link";
import { Calendar, ArrowRight, User, Clock } from "lucide-react";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Music Therapy",
      excerpt:
        "Exploring how music activates neural pathways to promote healing and recovery in individuals with neurologic conditions...",
      date: "October 5, 2024",
      readTime: "5 min read",
      author: "Dr. Sarah Johnson",
      category: "Research",
      featured: true,
    },
    {
      id: 2,
      title: "Supporting Families Through Music",
      excerpt:
        "How our community programs create lasting impact and provide support for families navigating neurologic challenges...",
      date: "September 28, 2024",
      readTime: "3 min read",
      author: "Maria Rodriguez",
      category: "Community",
      featured: false,
    },
    {
      id: 3,
      title: "New Research in Neurologic Music Therapy",
      excerpt:
        "Latest findings in evidence-based interventions and their applications in clinical practice...",
      date: "September 20, 2024",
      readTime: "4 min read",
      author: "Dr. Michael Chen",
      category: "Research",
      featured: false,
    },
    {
      id: 4,
      title: "Music Therapy Success Stories",
      excerpt:
        "Real stories from our clients and families about transformation through music therapy services...",
      date: "September 15, 2024",
      readTime: "6 min read",
      author: "Lisa Thompson",
      category: "Stories",
      featured: false,
    },
    {
      id: 5,
      title: "Understanding Neuroplasticity and Music",
      excerpt:
        "How music therapy leverages the brain&apos;s ability to reorganize and form new neural connections...",
      date: "September 8, 2024",
      readTime: "7 min read",
      author: "Dr. Sarah Johnson",
      category: "Research",
      featured: false,
    },
    {
      id: 6,
      title: "Volunteer Spotlight: Making a Difference",
      excerpt:
        "Meet our dedicated volunteers and learn how they contribute to our mission of transforming lives through music...",
      date: "August 30, 2024",
      readTime: "4 min read",
      author: "Community Team",
      category: "Community",
      featured: false,
    },
  ];

  const categories = ["All", "Research", "Community", "Stories"];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-nmtsa-50 via-nmtsa-100 to-nmtsa-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-nmtsa-600 text-white rounded-full text-sm font-semibold mb-6">
            NMTSA Blog
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
            Insights & <span className="gradient-text">Updates</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Stay informed with the latest research, stories, and insights from
            the world of neurologic music therapy
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  category === "All"
                    ? "bg-nmtsa-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-nmtsa-100 hover:text-nmtsa-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <div key={post.id} className="glass-card p-8 rounded-2xl mb-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-nmtsa-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                      <span className="bg-nmtsa-100 text-nmtsa-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 mb-4">
                      {post.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="btn-primary text-white font-semibold px-6 py-3 rounded-full inline-flex items-center"
                    >
                      Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                  <div className="bg-gradient-to-br from-nmtsa-100 to-nmtsa-200 rounded-2xl h-80 flex items-center justify-center">
                    <div className="text-center text-nmtsa-600">
                      <Calendar className="w-16 h-16 mx-auto mb-4" />
                      <p className="font-semibold">Featured Article</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <article key={post.id} className="glass-card p-6 rounded-2xl">
                  <div className="bg-gradient-to-br from-nmtsa-100 to-nmtsa-200 rounded-xl h-48 flex items-center justify-center mb-6">
                    <div className="text-center text-nmtsa-600">
                      <Calendar className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm font-semibold">{post.category}</p>
                    </div>
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-nmtsa-600 font-semibold hover:text-nmtsa-700 inline-flex items-center"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="btn-secondary text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg">
              Load More Articles <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-nmtsa-600 to-nmtsa-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
            Stay <span className="text-nmtsa-200">Connected</span>
          </h2>
          <p className="text-xl text-nmtsa-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates, research
            insights, and stories from NMTSA delivered directly to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-nmtsa-600 font-semibold px-8 py-4 rounded-full hover:bg-nmtsa-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
