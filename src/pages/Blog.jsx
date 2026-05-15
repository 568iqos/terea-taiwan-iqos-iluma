import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-created_date", 50)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">部落格</h1>
          <p className="text-foreground/50 text-base">最新資訊、使用技巧與生活風格</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-foreground/40 py-20">目前沒有文章</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/blog/${post.slug || post.id}`} className="group block bg-card rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow duration-300">
                  {post.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs text-foreground/40 mb-2">
                      {new Date(post.created_date).toLocaleDateString("zh-TW")}
                    </p>
                    <h2 className="font-heading font-bold text-lg leading-snug mb-2 group-hover:underline underline-offset-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-foreground/60 line-clamp-2">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}