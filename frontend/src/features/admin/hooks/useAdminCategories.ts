import { useState, useCallback } from "react";
import { jobsApi } from "../../jobs/services/jobs.api";
import type { JobCategory } from "../../jobs/types";
import { toast } from "sonner";

export function useAdminCategories() {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await jobsApi.getCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = async (data: { name: string; description?: string }) => {
    setLoading(true);
    try {
      await jobsApi.createCategory(data);
      toast.success("Category created successfully");
      fetchCategories();
      return true;
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Failed to create category");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: number, data: { name?: string; description?: string }) => {
    setLoading(true);
    try {
      await jobsApi.updateCategory(id, data);
      toast.success("Category updated successfully");
      fetchCategories();
      return true;
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    setLoading(true);
    try {
      await jobsApi.deleteCategory(id);
      toast.success("Category deleted successfully");
      fetchCategories();
      return true;
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
