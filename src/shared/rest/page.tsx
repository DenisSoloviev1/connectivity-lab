import { useGetPosts } from "./hook";

const Rest = () => {
  const { posts, isLoading, error } = useGetPosts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Loading post...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md">
          <div className="flex items-center">
            <div className="text-red-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-red-800 font-medium">Error loading posts</h3>
              <p className="text-red-700 text-sm mt-1">{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Теперь проверяем posts
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center py-8 text-gray-500">No posts available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">REST API Test</h1>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Posts ({posts.length})
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                >
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.body}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-blue-600 font-medium">
                      User ID: {post.userId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rest;
