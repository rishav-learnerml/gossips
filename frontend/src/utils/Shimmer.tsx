import { Skeleton } from "@/components/ui/skeleton";

const Shimmer = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-6/12 w-screen rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-screen" />
        <Skeleton className="h-4 w-screen" />
      </div>
    </div>
  );
};

export default Shimmer;
