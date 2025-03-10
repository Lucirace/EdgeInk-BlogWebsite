

export const BlogSkeleton = () => {
  return (
    <div 
      role="status" 
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6 max-w-screen-md animate-pulse"
    >
      <div className="p-5 sm:p-6">
        {/* Header: Category, Date and Read Time */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-3 items-center">
            <div className="h-2.5 bg-gray-200 rounded-full w-20"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-24"></div>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full w-16"></div>
        </div>
        
        {/* Optional image placeholder */}
        <div className="w-full h-48 mb-4 bg-gray-200 rounded-md"></div>
        
        {/* Title placeholder - multiple lines with different widths */}
        <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-2.5"></div>
        <div className="h-6 bg-gray-200 rounded-full w-1/2 mb-6"></div>
        
        {/* Content preview placeholders */}
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-gray-200 rounded-full w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full w-11/12"></div>
          <div className="h-3 bg-gray-200 rounded-full w-4/5"></div>
        </div>
        
        {/* Author section */}
        <div className="pt-3 border-t border-gray-100 flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="ml-3 flex-1">
            <div className="h-3 bg-gray-200 rounded-full w-24 mb-2"></div>
            <div className="flex items-center">
              <div className="h-2.5 bg-gray-200 rounded-full w-20"></div>
              <div className="ml-1 w-3 h-3 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <span className="sr-only">Loading blog content...</span>
    </div>
  );
};

// Export a list skeleton to display multiple skeleton items at once
export const BlogListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <BlogSkeleton key={index} />
      ))}
    </>
  );
};