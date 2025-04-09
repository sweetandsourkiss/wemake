import type { Route } from "./+types/promote-page.types";

export function loader({ request }: Route.LoaderArgs) {
  return {
    plans: [
      {
        id: "basic",
        name: "Basic",
        price: 49,
        features: [
          "Featured on homepage for 24 hours",
          "Social media promotion",
          "Newsletter mention",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        price: 99,
        features: [
          "Featured on homepage for 72 hours",
          "Social media promotion",
          "Newsletter mention",
          "Featured in weekly digest",
          "Priority support",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 199,
        features: [
          "Featured on homepage for 1 week",
          "Social media promotion",
          "Newsletter mention",
          "Featured in weekly digest",
          "Priority support",
          "Custom promotion strategy",
          "Analytics dashboard",
        ],
      },
    ],
    products: [],
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const productId = formData.get("productId") as string;
  const planId = formData.get("planId") as string;

  // TODO: Process payment and activate promotion

  return {
    redirectTo: "/products",
  };
}

export function meta() {
  return [
    { title: "Promote Your Product - WeMake" },
    {
      name: "description",
      content: "Promote your product on WeMake to reach more users",
    },
  ];
}

export default function PromotePage({ loaderData }: Route.ComponentProps) {
  const { plans, products } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Promote Your Product</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Select a Product</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {product.upvotesCount} upvotes
                  </span>
                  <button
                    type="button"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              You don't have any products to promote yet.
            </p>
            <a
              href="/products/submit"
              className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Submit a Product
            </a>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Choose a Plan</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-6">${plan.price}</div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium"
              >
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
