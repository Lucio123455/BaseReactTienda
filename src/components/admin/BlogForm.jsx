import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const BlogForm = ({ blog, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (blog) setFormData(blog);
    }, [blog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (value) => {
        setFormData(prev => ({ ...prev, content: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean']
        ]
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">{blog ? 'Editar Blog' : 'Nuevo Blog'}</h2>

            <div className="mb-4">
                <label className="block mb-1">Título</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Contenido</label>
                <ReactQuill
                    value={formData.content}
                    onChange={handleEditorChange}
                    modules={quillModules}
                    className="bg-white h-60"
                />
            </div>

            <div className="mb-4 mt-12">
                <label className="block mb-1">Imagen (URL)</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                />
                {formData.imageUrl && (
                    <div className="border rounded overflow-hidden">
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="w-full max-h-64 object-contain"
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" onClick={onClose} variant="outline">Cancelar</Button>
                <Button type="submit">{blog ? 'Actualizar' : 'Crear'}</Button>
            </div>
        </form>
    );

};

export default BlogForm;
