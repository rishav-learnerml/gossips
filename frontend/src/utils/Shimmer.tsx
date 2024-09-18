import { Skeleton } from "@/components/ui/skeleton";

const Shimmer = () => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-col gap-y-2 my-5 items-center py-2">
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
      </div>
      <div className="flex flex-col gap-y-2 my-5 items-center py-2">
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
      </div>
      <div className="flex flex-col gap-y-2 my-5 items-center py-2">
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
      </div>
      <div className="flex flex-col gap-y-2 my-5 items-center py-2">
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
        <Skeleton className="h-1 w-6/12 mx-10 py-3" />
      </div>
    </div>
  );
};

export default Shimmer;
