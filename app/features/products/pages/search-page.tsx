import type { Route } from "./+types/search-page.types";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const category = url.searchParams.get("category") || "";
  const sortBy = url.searchParams.get("sort") || "newest";

  return {
    products: [],
    categories: [],
    query,
    category,
    sortBy,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const query = formData.get("q") as string;
  const category = formData.get("category") as string;
  const sortBy = formData.get("sort") as string;

  const searchParams = new URLSearchParams();
  if (query) searchParams.set("q", query);
  if (category) searchParams.set("category", category);
  if (sortBy) searchParams.set("sort", sortBy);

  return {
    redirectTo: `/products/search?${searchParams.toString()}`,
  };
}

export function meta({ data }: Route.MetaFunction) {
  const { query } = data;
  return [
    {
      title: query
        ? `Search results for "${query}" - WeMake`
        : "Search Products - WeMake",
    },
    {
      name: "description",
      content: `Search for products on WeMake${
        query ? ` matching "${query}"` : ""
      }`,
    },
  ];
}

export default function SearchPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { products, categories, query, category, sortBy } = loaderData;
  const redirectTo = actionData?.redirectTo;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Search Products</h1>

      <form method="post" className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              name="q"
              placeholder="Search products..."
              defaultValue={query}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="w-full md:w-48">
            <select
              name="category"
              defaultValue={category}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-48">
            <select
              name="sort"
              defaultValue={sortBy}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Search
          </button>
        </div>
      </form>

      {query && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Search results for "{query}"{category && ` in ${category}`}
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product cards would go here */}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Enter a search term to find products.
          </p>
        </div>
      )}
    </div>
  );
}
