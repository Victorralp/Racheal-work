interface KPIBlockProps {
  value: string;
  label: string;
}

export const KPIBlock = ({ value, label }: KPIBlockProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};
