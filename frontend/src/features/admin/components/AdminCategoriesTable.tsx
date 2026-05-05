"use client";

import React, { useEffect, useState } from "react";
import { useAdminCategories } from "../hooks/useAdminCategories";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  RefreshCcw, 
  Search,
  Tag,
  AlertCircle,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function AdminCategoriesTable() {
  const { categories, loading, fetchCategories, createCategory, updateCategory, deleteCategory } = useAdminCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    if (editingId) {
      success = await updateCategory(editingId, formData);
    } else {
      success = await createCategory(formData);
    }

    if (success) {
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: "", description: "" });
    }
  };

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setFormData({ name: cat.name, description: cat.description || "" });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
          <Input 
            placeholder="SEARCH CATEGORIES..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-none focus:border-slate-900 dark:focus:border-white transition-all font-black uppercase tracking-widest text-[10px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => fetchCategories()}
            variant="outline"
            className="h-12 w-12 p-0 border-2 border-slate-100 hover:border-slate-900 rounded-none bg-white dark:bg-slate-900"
          >
            <RefreshCcw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
          <Button 
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({ name: "", description: "" });
            }}
            className="h-12 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-none font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-[4px_4px_0px_0px_rgba(225,29,72,1)] transition-all gap-2"
          >
            <Plus size={16} />
            Add Category
          </Button>
        </div>
      </div>

      {/* Category Grid/Table */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category Name</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-[10px] font-black text-slate-400">#{cat.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white">
                          <Tag size={14} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
                          {cat.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide line-clamp-1">
                        {cat.description || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(cat)}
                          className="h-8 w-8 p-0 rounded-none hover:bg-slate-900 hover:text-white transition-all"
                        >
                          <Edit2 size={12} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteCategory(cat.id)}
                          className="h-8 w-8 p-0 rounded-none hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <Tag size={40} className="text-slate-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">No Categories Found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal Overlay */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white p-8 shadow-[12px_12px_0px_0px_rgba(225,29,72,1)]"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-8">
                <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
                  {editingId ? "Edit Category" : "New Category"}
                </h3>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">
                  Define platform-wide job classifications
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Category Name</label>
                  <Input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-12 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-none focus:border-slate-900 dark:focus:border-white font-black uppercase tracking-widest text-xs"
                    placeholder="E.G. PLUMBING"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Description (Optional)</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full min-h-[100px] p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-none focus:border-slate-900 dark:focus:border-white font-bold uppercase tracking-widest text-[10px] resize-none outline-none transition-all"
                    placeholder="CATEGORY DETAILS..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    variant="outline"
                    className="flex-1 h-12 rounded-none border-2 border-slate-900 dark:border-white font-black uppercase tracking-widest text-[10px]"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 rounded-none bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[10px] gap-2"
                  >
                    {loading && <RefreshCcw size={14} className="animate-spin" />}
                    {editingId ? "Update Category" : "Save Category"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
