import type { Route } from "./+types/products-page.types";

export function loader({ request }: Route.LoaderArgs) {
  return {
    products: [],
    categories: [],
    currentCategory: null,
    sortBy: "newest",
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta({ data }: Route.MetaFunction) {
  return [
    { title: "Products - WeMake" },
    { name: "description", content: "Browse all products on WeMake" },
  ];
}

export default function ProductsPage({ loaderData }: Route.ComponentProps) {
  const { products, categories, currentCategory, sortBy } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="flex items-center gap-4">
          <select className="border rounded-md px-3 py-2" defaultValue={sortBy}>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/products/categories"
                className={`block py-2 px-3 rounded-md ${
                  !currentCategory
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                All Categories
              </a>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`/products/categories/${category.slug}`}
                  className={`block py-2 px-3 rounded-md ${
                    currentCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main className="md:col-span-3">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product cards would go here */}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
