"use client";

import React from "react";
import { Heading } from "@/src/features/shared/components";
import { Badge } from "@/src/components/ui/badge";
import type { ProviderSkill } from "../types";

interface ProviderSkillsCardProps {
  skills?: ProviderSkill[] | null;
}

export function ProviderSkillsCard({ skills }: ProviderSkillsCardProps) {
  const list = skills || [];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
      <Heading level={3} className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-900 dark:text-white">
        Skills
      </Heading>
      <div className="mt-4 flex flex-wrap gap-2">
        {list.length > 0 ? (
          list.map((skill) => (
            <Badge key={skill.id} variant="secondary" className="text-[10px] font-bold uppercase tracking-widest">
              {skill.skill_name}
            </Badge>
          ))
        ) : (
          <span className="text-[11px] font-semibold text-slate-500">No skills added yet.</span>
        )}
      </div>
    </div>
  );
}
