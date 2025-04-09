import type { Route } from "./+types/daily-leaderboard-page.types";

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month, day } = params;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return {
    products: [],
    year: parseInt(year, 10),
    month: parseInt(month, 10),
    day: parseInt(day, 10),
    monthName: monthNames[parseInt(month, 10) - 1],
    currentYear,
    currentMonth,
    currentDay,
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
  const { year, monthName, day } = data;
  return [
    { title: `${monthName} ${day}, ${year} Product Leaderboard - WeMake` },
    {
      name: "description",
      content: `Top products on WeMake on ${monthName} ${day}, ${year}`,
    },
  ];
}

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const {
    products,
    year,
    month,
    day,
    monthName,
    currentYear,
    currentMonth,
    currentDay,
    timeframes,
  } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        {monthName} {day}, {year} Product Leaderboard
      </h1>

      <div className="flex space-x-4 mb-8">
        {timeframes.map((timeframe) => (
          <a
            key={timeframe.id}
            href={timeframe.path}
            className={`px-4 py-2 rounded-md ${
              timeframe.id === "daily"
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
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
            <a
              key={d}
              href={`/products/leaderboards/daily/${year}/${month}/${d}`}
              className={`px-4 py-2 rounded-md ${
                d === day
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {d}
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
            No products found for {monthName} {day}, {year}.
          </p>
        </div>
      )}
    </div>
  );
}
