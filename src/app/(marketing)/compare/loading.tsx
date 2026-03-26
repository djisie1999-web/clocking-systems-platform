import { Skeleton } from "@/components/ui/skeleton";

export default function CompareLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto" />
      </div>

      {/* Table header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="grid grid-cols-4 border-b border-gray-200">
          <div className="p-5 col-span-1">
            <Skeleton className="h-5 w-24" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 border-l border-gray-200 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-7 w-20" />
            </div>
          ))}
        </div>
        {/* Feature rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 border-b border-gray-100 last:border-0">
            <div className="px-5 py-4">
              <Skeleton className="h-4 w-32" />
            </div>
            {[1, 2, 3].map((j) => (
              <div key={j} className="px-5 py-4 border-l border-gray-100 flex justify-center">
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            ))}
          </div>
        ))}
        {/* CTA row */}
        <div className="grid grid-cols-4 bg-gray-50 pt-4 pb-5">
          <div className="p-5" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-5 border-l border-gray-100 flex justify-center">
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
