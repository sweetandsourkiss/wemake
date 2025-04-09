import type { Route } from "./+types/submit-page.types";

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;

  // TODO: Validate and submit product

  return {
    redirectTo: "/products",
  };
}

export function meta() {
  return [
    { title: "Submit a Product - WeMake" },
    { name: "description", content: "Submit your product to WeMake" },
  ];
}

export default function SubmitPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Submit a Product</h1>

      <form method="post" className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter your product name"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Describe your product..."
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="https://example.com/image.jpg"
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Optional. Provide a URL to an image of your product.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
}
