import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-500">Recent Articles</h2>
        <p className="text-gray-400 text-sm">
          Insights from my backend and hardware exploration journey.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading articles...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 p-8">
          <p className="text-gray-500">No articles found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* เปลี่ยนจากแท็ก a เป็น Link เพื่อส่งผู้ใช้ไปยังหน้าอ่านบทความตาม ID */}
                <Link to={`/article/${post.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition cursor-pointer mb-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                  {post.content}
                </p>
              </div>
              <div className="flex items-center text-xs text-gray-400 border-t border-gray-100 pt-4">
                <span>
                  Published on: {new Date(post.date).toLocaleDateString()}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
