import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Article() {
  const { id } = useParams(); // ดึงค่า ID ที่อยู่บน URL ออกมา
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ยิง API ไปที่เส้นทางแบบระบุ ID ที่เราทำไว้ใน Express
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Article not found");
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading article...</div>
    );
  if (!post)
    return (
      <div className="text-center py-10 text-red-500">Article Not Found</div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="text-sm text-blue-600 hover:underline mb-6 inline-block"
      >
        &larr; Back to Home
      </Link>

      <article className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-950 mb-4">{post.title}</h1>
        <div className="text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100">
          Published on: {new Date(post.date).toLocaleDateString()}
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </article>
    </div>
  );
}

export default Article;
