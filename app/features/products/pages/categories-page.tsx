import type { Route } from "./+types/categories-page.types";

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta() {
  return [
    { title: "Product Categories - WeMake" },
    { name: "description", content: "Browse products by category on WeMake" },
  ];
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Product Categories</h1>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/products/categories/${category.slug}`}
              className="block p-6 border rounded-lg hover:border-primary transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              {category.description && (
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {category.productCount} products
                </span>
                <span className="text-primary">View all →</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No categories found.</p>
        </div>
      )}
    </div>
  );
}
