import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton = ({
  isLoading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      disabled={isLoading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {isLoading ? <Loader2 className="size-5 animate-spin" /> : props.children}
    </Button>
  );
};

export default LoadingButton;
