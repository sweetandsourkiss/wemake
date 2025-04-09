import type { Route } from "./+types/weekly-leaderboard-page.types";

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, week } = params;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Get the current week number
  const startOfYear = new Date(currentYear, 0, 1);
  const days = Math.floor(
    (currentDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  const currentWeek = Math.ceil(days / 7);

  return {
    products: [],
    year: parseInt(year, 10),
    week: parseInt(week, 10),
    currentYear,
    currentWeek,
    timeframes: [
      { id: "daily", name: "Daily", path: "/products/leaderboards/daily" },
      { id: "weekly", name: "Weekly", path: "/products/leaderboards/weekly" },
      {
        id: "monthly",
        name: "Monthly",
        path: "/products/leaderboards/monthly",
      },
      { id: "yearly", name: "Yearly", path: "/products/leaderboards/yearly" },
    ],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export function meta({ data }: Route.MetaFunction) {
  const { year, week } = data;
  return [
    { title: `Week ${week}, ${year} Product Leaderboard - WeMake` },
    {
      name: "description",
      content: `Top products on WeMake in week ${week} of ${year}`,
    },
  ];
}

export default function WeeklyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { products, year, week, currentYear, currentWeek, timeframes } =
    loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        Week {week}, {year} Product Leaderboard
      </h1>

      <div className="flex space-x-4 mb-8">
        {timeframes.map((timeframe) => (
          <a
            key={timeframe.id}
            href={timeframe.path}
            className={`px-4 py-2 rounded-md ${
              timeframe.id === "weekly"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {timeframe.name}
          </a>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 52 }, (_, i) => i + 1).map((w) => (
            <a
              key={w}
              href={`/products/leaderboards/weekly/${year}/${w}`}
              className={`px-4 py-2 rounded-md ${
                w === week
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Week {w}
            </a>
          ))}
        </div>
      </div>

      {products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center p-4 border rounded-lg"
            >
              <div className="w-12 h-12 flex items-center justify-center text-xl font-bold">
                #{index + 1}
              </div>

              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="font-bold">{product.upvotesCount}</div>
                  <div className="text-xs text-muted-foreground">Upvotes</div>
                </div>

                <div className="text-center">
                  <div className="font-bold">{product.viewsCount}</div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No products found for week {week} of {year}.
          </p>
        </div>
      )}
    </div>
  );
}
