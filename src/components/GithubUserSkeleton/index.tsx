import { Skeleton } from '@/components/ui/skeleton';

export default function Index() {
    return (
        <div className="flex flex-col md:flex-row">
            <article className="flex flex-col space-y-3">
                <div className="flex justify-center md:justify-start">
                    <Skeleton className="w-48 h-48 my-4 rounded-full" />
                </div>
                <div className="flex flex-col space-y-2 px-2 items-center md:items-start">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[120px]" />
                </div>
            </article>
            <article className="w-full flex flex-col items-center">
                <Skeleton className="h-4 w-[340px] mt-4 text-center text-3xl" />
                <div className="w-6/6 grid grid-cols-1 gap-2 py-6 md:grid-cols-2">
                    <Skeleton className="h-[150px] rounded-xl md:w-[250px]" />
                    <Skeleton className="h-[150px] rounded-xl md:w-[250px]" />
                    <Skeleton className="h-[150px] rounded-xl md:w-[250px]" />
                    <Skeleton className="h-[150px] rounded-xl md:w-[250px]" />
                </div>
            </article>
        </div>
    );
}
