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
  }

  export interface ActionArgs {
    request: Request;
    formData: FormData;
  }

  export interface ComponentProps {
    loaderData: {
      products: Product[];
      timeframes: Timeframe[];
      currentTimeframe: string;
    };
    actionData?: Record<string, unknown>;
  }

  export type MetaFunction = ReactRouterMetaFunction;
}
