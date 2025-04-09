import type { MetaFunction as ReactRouterMetaFunction } from "react-router";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  upvotesCount: number;
  commentsCount: number;
  viewsCount: number;
  createdAt: string;
}

export interface Timeframe {
  id: string;
  name: string;
  path: string;
}

export namespace Route {
  export interface LoaderArgs {
    request: Request;
    params: {
      year: string;
    };
  }

  export interface ActionArgs {
    request: Request;
    formData: FormData;
  }

  export interface ComponentProps {
    loaderData: {
      products: Product[];
      year: number;
      currentYear: number;
      timeframes: Timeframe[];
    };
    actionData?: Record<string, unknown>;
  }

  export type MetaFunction = ReactRouterMetaFunction;
}
