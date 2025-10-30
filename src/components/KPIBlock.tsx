interface KPIBlockProps {
  value: string;
  label: string;
  enableCounter?: boolean;
}

export const KPIBlock = ({ value, label, enableCounter = false }: KPIBlockProps) => {
  // Extract numeric value for counter animation
  const numericValue = enableCounter ? parseInt(value.replace(/[^0-9]/g, '')) : 0;
  
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="text-3xl font-bold text-primary mb-2">
        {enableCounter ? (
          <span 
            className="counter" 
            data-end={numericValue}
          >
            {value}
          </span>
        ) : (
          value
        )}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};
