
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BlogPosts = [
  {
    id: 1,
    title: "How to Edit Screenshots Like a Pro",
    excerpt:
      "Learn the best practices for editing screenshots effectively and making them look professional...",
    date: "March 15, 2024",
    category: "Tutorials",
  },
  {
    id: 2,
    title: "Top 10 Screenshot Tools in 2024",
    excerpt:
      "Discover the best screenshot editing tools available today and how they can improve your workflow...",
    date: "March 10, 2024",
    category: "Reviews",
  },
  {
    id: 3,
    title: "Screenshot Editing for Beginners",
    excerpt:
      "A complete guide to getting started with screenshot editing, including basic techniques and tips...",
    date: "March 5, 2024",
    category: "Guides",
  },
  {
    id: 4,
    title: "The Future of Screenshot Editing",
    excerpt:
      "Explore upcoming trends and technologies in the world of screenshot editing and image manipulation...",
    date: "March 1, 2024",
    category: "Industry News",
  },
];

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600">
          Latest insights, tutorials, and news about screenshot editing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BlogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                Read more <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
