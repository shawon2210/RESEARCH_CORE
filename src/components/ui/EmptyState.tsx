interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon = "info",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="material-symbols-outlined text-brand-gold text-[40px] mb-4 opacity-60">
        {icon}
      </span>
      <h3 className="body-mono-bold text-brand-gold mb-2 tracking-[0.1em] uppercase">
        {title}
      </h3>
      {description && (
        <p className="body-mono opacity-50 max-w-xs mb-6">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
