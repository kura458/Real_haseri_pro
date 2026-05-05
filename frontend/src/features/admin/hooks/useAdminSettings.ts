import { useState, useCallback } from "react";
import { adminApi } from "../services/admin.api";
import type { FeeSettings } from "../types";
import { toast } from "sonner";

export function useAdminSettings() {
  const [fees, setFees] = useState<FeeSettings | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminApi.getFees();
      if (response.data.success) {
        setFees(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch fee settings:", error);
      toast.error("Failed to load fee settings");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFees = async (data: FeeSettings) => {
    setLoading(true);
    try {
      await adminApi.updateFees(data);
      setFees(data);
      toast.success("Fee settings updated successfully");
      return true;
    } catch (error) {
      console.error("Failed to update fee settings:", error);
      toast.error("Failed to update fee settings");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    fees,
    loading,
    fetchFees,
    updateFees,
  };
}
