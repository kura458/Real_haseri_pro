"use client";

import React, { useEffect } from "react";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { Pencil, Trash2, UserCheck, UserX } from "lucide-react";

const roleLabel = (role: string) => (role === "provider" ? "Technician" : role);

export function AdminUsersTable() {
  const { users, loading, fetchAll, activate, deactivate, remove } = useAdminUsers();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">User Management</h2>
          <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Manage all customers and technicians</p>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{users.length} users</div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/70 dark:bg-slate-800/50">
            <TableHead className="text-[10px] font-black uppercase tracking-widest">Name</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest">Email</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest">Role</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest">Phone</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Loading users...
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                <TableCell className="text-[11px] font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell className="text-[10px] font-semibold text-slate-500 lowercase">
                  {user.email}
                </TableCell>
                <TableCell className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  {roleLabel(user.role)}
                </TableCell>
                <TableCell className="text-[10px] font-semibold text-slate-500">
                  {user.phone || "—"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "rounded-none text-[9px] font-black uppercase tracking-widest border",
                      user.is_active
                        ? "bg-primary/10 text-primary border-primary/30"
                        : "bg-destructive/10 text-destructive border-destructive/30"
                    )}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-9 w-9 rounded-none border border-slate-200 hover:border-slate-900"
                      aria-label="Edit user"
                      disabled
                    >
                      <Pencil className="h-4 w-4 text-slate-400" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-9 w-9 rounded-none border border-slate-200 hover:border-primary"
                      aria-label={user.is_active ? "Deactivate user" : "Activate user"}
                      onClick={() => (user.is_active ? deactivate(String(user.id)) : activate(String(user.id)))}
                    >
                      {user.is_active ? (
                        <UserX className="h-4 w-4 text-slate-500" />
                      ) : (
                        <UserCheck className="h-4 w-4 text-primary" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-9 w-9 rounded-none border border-slate-200 hover:border-destructive"
                      aria-label="Delete user"
                      onClick={() => remove(String(user.id))}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
