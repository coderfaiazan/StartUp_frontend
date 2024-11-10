import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../Components/ProjectCard";
import { getCollection } from "../service/collection";

function HomePage() {
  // Mock data for featured projects
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Fetch the collections
        const collections = await getCollection("All");
        if (collections.data) setProjects(collections.data.splice(1, 3));
        // console.log(collections);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    // Call the async function
    fetchProjects();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fund Your Dreams
          </h1>
          <p className="text-xl mb-8">
            Join our community of creators and backers to bring ideas to life.
          </p>
          <div className="space-x-4 flex">
            <Link
              to="/start-project"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 sm:text-md text-sm"
            >
              Start a Project
            </Link>
            <Link
              to="/explore"
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-6 rounded-full transition duration-300 sm:text-md text-sm"
            >
              Discover Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects &&
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Technology",
              "Art",
              "Film",
              "Games",
              "Music",
              "Food",
              "Health",
              "Education",
            ].map((category) => (
              <Link
                key={category}
                to={`/explore?category=${category}`}
                className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
              >
                <i
                  className={`fas fa-${category.toLowerCase()} text-3xl mb-2 text-blue-600`}
                ></i>
                <h3 className="font-semibold">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
