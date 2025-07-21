import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { PlusCircle } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import ProductForm from '@/components/admin/ProductForm';
import ProductTable from '@/components/admin/ProductTable';
import { addProduct, updateProduct, deleteProduct } from '@/lib/firestore';
import { useToast } from '@/components/ui/use-toast';
import { useBlogs } from '@/hooks/useBlogs';
import BlogForm from '@/components/admin/BlogForm';
import BlogTable from '@/components/admin/BlogTable';
import { addBlog, updateBlog, deleteBlog } from '@/lib/firestore';


const AdminPage = () => {
  const { products, loading, refetch } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { toast } = useToast();
  const { blogs, loading: loadingBlogs, refetch: refetchBlogs } = useBlogs();
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleAddNewBlog = () => {
    setEditingBlog(null);
    setIsBlogFormOpen(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsBlogFormOpen(true);
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este blog?")) {
      try {
        await deleteBlog(blogId);
        toast({ title: "Éxito", description: "Blog eliminado correctamente." });
        refetchBlogs();
      } catch (error) {
        toast({ title: "Error", description: "No se pudo eliminar el blog.", variant: "destructive" });
      }
    }
  };

  const handleBlogFormSubmit = async (formData) => {
  const slugify = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const stripHtml = (html) => html.replace(/<[^>]*>?/gm, "");

  const blogData = {
    ...formData,
    slug: slugify(formData.title),
    author: "Lucio", // o quien sea el admin
    date: new Date().toISOString(),
    category: "Estilo de Vida", // o podrías agregar un campo para elegirla
    excerpt: stripHtml(formData.content).slice(0, 150) + "...",
  };

  try {
    if (editingBlog) {
      await updateBlog(editingBlog.id, blogData);
      toast({ title: "Éxito", description: "Blog actualizado correctamente." });
    } else {
      await addBlog(blogData);
      toast({ title: "Éxito", description: "Blog creado correctamente." });
    }

    setIsBlogFormOpen(false);
    setEditingBlog(null);
    refetchBlogs();
  } catch (error) {
    console.error("Error guardando blog: ", error);
    toast({
      title: "Error",
      description: "Ocurrió un error al guardar el blog.",
      variant: "destructive",
    });
  }
};



  const handleBlogFormClose = () => {
    setIsBlogFormOpen(false);
    setEditingBlog(null);
  };


  const handleAddNew = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await deleteProduct(productId);
        toast({ title: "Éxito", description: "Producto eliminado correctamente." });
        refetch();
      } catch (error) {
        toast({ title: "Error", description: "No se pudo eliminar el producto.", variant: "destructive" });
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        featured: formData.featured || false,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast({ title: "Éxito", description: "Producto actualizado correctamente." });
      } else {
        await addProduct(productData);
        toast({ title: "Éxito", description: "Producto añadido correctamente." });
      }

      setIsFormOpen(false);
      setEditingProduct(null);
      refetch();
    } catch (error) {
      console.error("Error saving product: ", error);
      toast({ title: "Error", description: "Ocurrió un error al guardar el producto.", variant: "destructive" });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Panel de Administración - MINIMAL</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sección Productos */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light text-gray-800">Gestión de Productos</h1>
          {!isFormOpen && (
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Producto
            </Button>
          )}
        </div>

        {isFormOpen && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
          />
        )}

        <ProductTable
          products={products}
          isLoading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Separador */}
        <hr className="my-10" />

        {/* Sección Blogs */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-light text-gray-800">Gestión de Blogs</h2>
          {!isBlogFormOpen && (
            <Button onClick={handleAddNewBlog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Blog
            </Button>
          )}
        </div>

        {isBlogFormOpen && (
          <BlogForm
            blog={editingBlog}
            onSubmit={handleBlogFormSubmit}
            onClose={handleBlogFormClose}
          />
        )}

        <BlogTable
          blogs={blogs}
          isLoading={loadingBlogs}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
        />
      </div>
    </div>
  );

};

export default AdminPage;