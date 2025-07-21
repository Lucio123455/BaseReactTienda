import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const BlogPostCard = ({ post }) => {
  const title = post.title || 'Sin título';
  const slug = post.slug || post.id || '';
  const image = post.imageUrl?.includes('http')
    ? post.imageUrl
    : 'https://via.placeholder.com/600x400?text=Sin+imagen';
  const excerpt = post.excerpt || 'Sin descripción disponible.';
  const author = post.author || 'Desconocido';
  const date = post.date
    ? new Date(post.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Sin fecha';
  const category = post.category || 'Sin categoría';

  return (
    <motion.div
      className="flex flex-col rounded-lg shadow-lg overflow-hidden"
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" alt={`Imagen para ${title}`} src={image} />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{category}</p>
          <Link to={`/blog/${slug}`} className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <p className="mt-3 text-base text-gray-500">{excerpt}</p>
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <p>{author}</p>
            <p>{date}</p>
          </div>
          <Link to={`/blog/${slug}`} className="text-gray-900 hover:text-gray-700">
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;

