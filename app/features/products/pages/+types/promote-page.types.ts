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

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
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
      plans: Plan[];
    };
    actionData?: {
      redirectTo: string;
    };
  }

  export type MetaFunction = ReactRouterMetaFunction;
}
