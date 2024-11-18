import React from "react";
import { ClipboardList, CheckCircle, Clock, XCircle } from "lucide-react";

type TicketCounts = {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
};

const TicketStats = ({ total, open, inProgress, closed }: TicketCounts) => {
  const stats = [
    { type: "open", count: open, label: "New (Open)", icon: CheckCircle },
    { type: "total", count: total, label: "Total Tickets", icon: ClipboardList },
    { type: "inProgress", count: inProgress, label: "In Progress", icon: Clock },
    { type: "closed", count: closed, label: "Closed", icon: XCircle },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.type}
          className="flex flex-1 flex-col gap-4 rounded-lg p-4 shadow-md border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-800"
        >
          <div className="flex items-center gap-3">
            <stat.icon className="w-6 h-6 text-neutral-800 dark:text-neutral-100" />
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
              {stat.count}
            </h2>
          </div>
          <p className="text-base text-neutral-800 dark:text-neutral-100">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TicketStats;
