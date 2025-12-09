
import { useToast, toast } from "@/hooks/use-toast";

// Re-export with enhanced variant colors for better contrast
const enhancedToast = {
  ...toast,
  // Override the default method with contrast-enhanced versions
  success: (props: any) => toast({
    ...props,
    variant: "success",
    className: "toast-success"
  }),
  error: (props: any) => toast({
    ...props,
    variant: "destructive",
    className: "toast-error"
  }),
  default: (props: any) => toast({
    ...props,
    variant: "default",
    className: "toast-default"
  })
};

export { useToast, enhancedToast as toast };
