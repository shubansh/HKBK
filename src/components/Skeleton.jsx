export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-100 dark:bg-slate-700 ${className}`}
      {...props}
    />
  );
}
