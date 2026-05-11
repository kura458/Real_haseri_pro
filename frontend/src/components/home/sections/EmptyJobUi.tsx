"use client";

import { Inbox } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export const EmptyJobUi = ({ onRefresh }: { onRefresh?: () => void }) => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-border bg-white/90 p-10 text-center shadow-lg shadow-slate-900/5 dark:bg-slate-950 dark:border-slate-800">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Inbox className="h-10 w-10" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          No available requests at this time
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
          There are currently no open jobs matching your filters. Check back later for new opportunities or refresh the list to see the latest requests.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            variant="default"
            size="lg"
            className="rounded-full px-8"
            onClick={onRefresh}
            type="button"
          >
            Refresh jobs
          </Button>
        </div>
      </div>
    </section>
  );
};
