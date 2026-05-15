import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ slug })
      .then((results) => {
        if (results.length > 0) {
          setPost(results[0]);
        } else {
          // fallback: try by id
          return base44.entities.BlogPost.filter({ id: slug }).then((r) => {
            if (r.length > 0) setPost(r[0]);
          });
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center py-40">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">找不到文章</p>
          <Link to="/blog" className="text-sm text-foreground/50 hover:text-foreground underline">返回部落格</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 返回部落格
        </Link>

        {post.cover_image && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <p className="text-xs text-foreground/40 mb-3">
          {new Date(post.created_date).toLocaleDateString("zh-TW")}
        </p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight">{post.title}</h1>
        {post.excerpt && (
          <p className="text-base text-foreground/60 mb-8 leading-relaxed border-l-2 border-black/20 pl-4">{post.excerpt}</p>
        )}

        <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed space-y-4">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}