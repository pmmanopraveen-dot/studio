import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("icon icon-tabler icons-tabler-outline icon-tabler-building-temple", className)}
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 18h8" />
    <path d="M12 18v-5" />
    <path d="M20 7v-2a1 1 0 0 0 -1 -1h-2" />
    <path d="M4 7v-2a1 1 0 0 1 1 -1h2" />
    <path d="M17 4l-5 5l-5 -5" />
    <path d="M4 7h16" />
    <path d="M4 11h16" />
    <path d="M5 18h-.5a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h1" />
    <path d="M19 18h.5a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-1" />
  </svg>
);
