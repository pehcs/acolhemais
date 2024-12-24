import * as React from "react"

import {cn} from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { icon?: React.ReactNode }>(
    ({className, type, icon, ...props}, ref) => {
        return (
            <div className="relative flex items-center w-full">
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-xl border border-[#AFB1B6] text-[#61646B] bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            {icon && (
                <span className="absolute -right-1 bottom-3 text-[#61646B]">
            {icon}
          </span>
            )}
            </div>
        )
    }
);

Input.displayName = "Input"

export {Input}
