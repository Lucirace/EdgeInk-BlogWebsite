import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  category?: string;
  imageUrl?: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
  category = "Article",
  imageUrl,
}: BlogCardProps) => {
  // Calculate read time more accurately - average reading speed is 200-250 words per minute
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 225));
  
  // Format the first paragraph for preview
  const previewText = content.split('\n')[0].slice(0, 160) + (content.length > 160 ? "..." : "");

  return (
    <Link to={`/blog/${id}`} className="block group">
      <div className="bg-white hover:bg-gray-50 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md overflow-hidden mb-6 max-w-screen-md border border-gray-100">
        <div className="p-5 sm:p-6">
          {/* Top section: Category, Date and Read Time */}
          <div className="flex justify-between items-center mb-3 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center">
              <span className="font-medium text-emerald-600">{category}</span>
              <span className="mx-2">•</span>
              <span>{publishedDate}</span>
            </div>
            <span>{readTime} min read</span>
          </div>
          
          {/* Featured image (if provided) */}
          {imageUrl && (
            <div className="mb-4 w-full h-48 overflow-hidden rounded-md">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          
          {/* Title with hover effect */}
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h2>
          
          {/* Content preview with proper sanitization */}
          <div 
            className="text-gray-600 mb-4 line-clamp-2 sm:line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(previewText),
            }}
          />
          
          {/* Author section */}
          <div className="flex items-center pt-2 border-t border-gray-100">
            <Avatar name={authorName} />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{authorName}</p>
              <div className="flex items-center mt-0.5">
                <span className="text-xs text-gray-500 group-hover:text-indigo-600 transition-colors duration-200">
                  Read full article
                </span>
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  // Generate a random pastel background color based on name
  const getColorFromName = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-amber-100 text-amber-800',
      'bg-rose-100 text-rose-800',
      'bg-purple-100 text-purple-800',
      'bg-indigo-100 text-indigo-800',
      'bg-teal-100 text-teal-800',
      'bg-orange-100 text-orange-800',
    ];
    
    // Use the sum of character codes to select a color
    const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };
  
  const colorClasses = getColorFromName(name);
  
  return (
    <div className={`flex items-center justify-center w-10 h-10 rounded-full overflow-hidden ${colorClasses}`}>
      <span className="font-medium text-sm">
        {name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)}
      </span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg 
      className="w-3 h-3 ml-1 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M14 5l7 7m0 0l-7 7m7-7H3" 
      />
    </svg>
  );
}
export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
