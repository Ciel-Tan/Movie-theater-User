import { Label } from "../ui/label";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ label, htmlFor, error, children }: FieldProps) => (
    <div className="space-y-1">
        <Label htmlFor={htmlFor}>{label}</Label>
        {children}
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
)
 
export default Field;