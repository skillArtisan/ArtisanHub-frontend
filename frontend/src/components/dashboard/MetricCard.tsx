import React, { ReactNode } from "react";

type Variant = "default" | "accent" | "warn" | "danger";

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  variant?: Variant;
  badge?: ReactNode;
};

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  subtext,
  variant = "default",
  badge,
}) => {
  let bgColor = "bg-white";
  let borderColor = "border-gray-200";
  let iconBgColor = "bg-blue-100";
  let iconColor = "text-blue-600";
  let valueColor = "text-gray-900";

  if (variant === "accent") {
    bgColor = "bg-gradient-to-br from-blue-50 to-blue-100";
    borderColor = "border-blue-300";
    iconBgColor = "bg-blue-200";
    iconColor = "text-blue-700";
    valueColor = "text-blue-900";
  } else if (variant === "warn") {
    bgColor = "bg-gradient-to-br from-yellow-50 to-yellow-100";
    borderColor = "border-yellow-300";
    iconBgColor = "bg-yellow-200";
    iconColor = "text-yellow-700";
    valueColor = "text-yellow-900";
  } else if (variant === "danger") {
    bgColor = "bg-gradient-to-br from-red-50 to-red-100";
    borderColor = "border-red-300";
    iconBgColor = "bg-red-200";
    iconColor = "text-red-700";
    valueColor = "text-red-900";
  }

  return (
    <article className={`${bgColor} border-2 ${borderColor} rounded-xl shadow-sm p-6 hover:shadow-md transition`} aria-label={label}>
      <div className="flex items-start justify-between mb-3">
        <div className={`${iconBgColor} ${iconColor} p-3 rounded-lg`} aria-hidden="true">
          {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
        {badge && <span className="text-xs font-bold">{badge}</span>}
      </div>
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <strong className={`text-3xl font-bold ${valueColor} block mb-1`}>{value}</strong>
      {subtext && <p className="text-xs text-gray-600">{subtext}</p>}
    </article>
  );
};
