import React from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/layouts/PageLayout';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { useBlogs } from '@/hooks/useBlogs';

const BlogPage = () => {
  const { blogs, loading } = useBlogs();

  return (
    <PageLayout>
      <Helmet>
        <title>Blog - MINIMAL</title>
        <meta name="description" content="Explora nuestro blog para obtener ideas sobre minimalismo, moda sostenible y estilo de vida." />
      </Helmet>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">Desde Nuestro Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Inspiración para un estilo de vida consciente y elegante.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando publicaciones...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No hay publicaciones todavía.</p>
      ) : (
        <div className="grid gap-12 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {blogs.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default BlogPage;

