import type { Route } from "./+types/category-page.types";

export function loader({ request, params }: Route.LoaderArgs) {
  const { category } = params;

  return {
    products: [],
    categories: [],
    currentCategory: category || null,
    sortBy: "newest",
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta({ data }: Route.MetaFunction) {
  const { currentCategory } = data;
  const title = currentCategory
    ? `${
        currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)
      } Products - WeMake`
    : "All Categories - WeMake";

  return [
    { title },
    {
      name: "description",
      content: `Browse ${currentCategory || "all"} products on WeMake`,
    },
  ];
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { products, categories, currentCategory, sortBy } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        {currentCategory
          ? `${
              currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)
            } Products`
          : "All Categories"}
      </h1>

      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <a
            href="/products/categories"
            className={`px-4 py-2 rounded-md ${
              !currentCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            All Categories
          </a>
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/products/categories/${category.slug}`}
              className={`px-4 py-2 rounded-md ${
                currentCategory === category.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {category.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <select className="border rounded-md px-3 py-2" defaultValue={sortBy}>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product cards would go here */}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {currentCategory
              ? `No products found in the ${currentCategory} category.`
              : "No products found."}
          </p>
        </div>
      )}
    </div>
  );
}
