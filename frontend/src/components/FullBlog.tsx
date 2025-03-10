import { useState, useEffect } from "react";
import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import DOMPurify from "dompurify";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [estimatedReadTime, setEstimatedReadTime] = useState("5 min");

  // Calculate reading time based on content length
  useEffect(() => {
    if (blog?.content) {
      const wordCount = blog.content.trim().split(/\s+/).length;
      const time = Math.max(1, Math.ceil(wordCount / 225));
      setEstimatedReadTime(`${time} min read`);
    }
  }, [blog]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format publication date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    try {
      return new Date(dateString  || Date.now()).toLocaleDateString(undefined, options);
    } catch (e) {
      return "May 10, 2024";
    }
  };

  // Extract first paragraph for featured snippet
  const getFirstParagraph = () => {
    if (!blog?.content) return "";
    const div = document.createElement("div");
    div.innerHTML = DOMPurify.sanitize(blog.content);
    const paragraphs = div.querySelectorAll("p");
    return paragraphs.length > 0 ? paragraphs[0].textContent || "" : "";
  };

  return (
    <div className="min-h-screen bg-white">
      <Appbar />
      
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gray-100">
        <div 
          className="h-full bg-indigo-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      
      <main className="pt-8 pb-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content area */}
            <article className="lg:col-span-8">
              {/* Article header */}
              <header className="mb-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                    {"Article"}
                  </span>
                  <span className="mx-2">•</span>
                 
                  <span className="mx-2">•</span>
                  <span>{estimatedReadTime}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                  {blog.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-6 font-serif italic">
                  {getFirstParagraph()}
                </p>
                
                {/* Social sharing */}
                <div className="flex items-center justify-between py-4 border-t border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-full ${isBookmarked ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-gray-500'} hover:bg-gray-100 transition-all`}
                    >
                      <BookmarkIcon filled={isBookmarked} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all">
                      <ShareIcon />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    { "1.2K"} views
                  </div>
                </div>
              </header>
              
              {/* Article content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.content),
                }}
              ></div>
              
              {/* Tags */}
              <div className="mt-12 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {( ["Programming", "Web Development", "React"]).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Article footer with reactions */}
              <div className="mt-12 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-800">
                      <ThumbsUpIcon />
                      <span>{ 42}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-800">
                      <CommentIcon />
                      <span>{7}</span>
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-indigo-600">
                      <TwitterIcon />
                    </button>
                    <button className="text-gray-500 hover:text-indigo-600">
                      <FacebookIcon />
                    </button>
                    <button className="text-gray-500 hover:text-indigo-600">
                      <LinkedInIcon />
                    </button>
                  </div>
                </div>
              </div>
            </article>
            
            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-20">
                {/* Author card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900">About the Author</h2>
                  
                  <div className="flex items-start">
                    <div className="mr-4">
                      <Avatar name={blog.author.email || blog.author.email} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {blog.author.email || formatUsername(blog.author.email)}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {`Writer and developer passionate about creating exceptional web experiences.`}
                      </p>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        Follow
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xl font-bold text-gray-900">{24}</div>
                        <div className="text-xs text-gray-500">Posts</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">{ 1.2}K</div>
                        <div className="text-xs text-gray-500">Followers</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">{18}K</div>
                        <div className="text-xs text-gray-500">Likes</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Related posts */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900">More from this author</h2>
                  
                  <div className="space-y-4">
                    {([1, 2, 3]).map((post, index) => (
                      <div key={index} className="group">
                        <a href="#" className="block">
                          <h3 className="text-base font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {typeof post === 'object' ? `How to build scalable React applications with best practices` : `How to build scalable React applications with best practices`}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate("2024-02-15")}
                          </p>
                        </a>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-6 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    See all posts
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper to format email into username
const formatUsername = (email: string): string => {
  return email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Icons
const BookmarkIcon = ({ filled = false }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const ThumbsUpIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

const CommentIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);