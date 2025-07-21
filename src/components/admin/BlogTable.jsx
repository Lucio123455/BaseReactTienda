import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

const BlogTable = ({ blogs, isLoading, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr><td colSpan="5" className="text-center py-8 font-light">Cargando blogs...</td></tr>
          ) : blogs.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-8 font-light">No hay blogs aún.</td></tr>
          ) : (
            blogs.map(blog => (
              <tr key={blog.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blog.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.category || 'Sin categoría'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.author || 'Sin autor'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.date ? new Date(blog.date).toLocaleDateString('es-ES', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  }) : 'Sin fecha'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(blog)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(blog.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;

