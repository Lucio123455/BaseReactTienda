import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/layouts/PageLayout';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ChevronLeft } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, 'blogs'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          setPost({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error al cargar el post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <p className="text-center mt-10">Cargando publicación...</p>;
  }

  if (!post) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Post no encontrado</h1>
          <p className="text-gray-600 mb-8">Lo sentimos, no pudimos encontrar la publicación que buscas.</p>
          <Link to="/blog" className="text-gray-900 font-semibold hover:underline">
            Volver al Blog
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Helmet>
        <title>{post.title} - MINIMAL Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Volver al Blog
          </Link>
        </div>

        <header className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
          >
            {post.title}
          </motion.h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag className="w-4 h-4" />
              <span>{post.category}</span>
            </div>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="prose prose-lg max-w-none prose-p:text-gray-700 prose-h2:text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </PageLayout>
  );
};

export default BlogPostPage;
