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
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
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
      categories: Category[];
      query: string;
      category: string;
      sortBy: "newest" | "popular" | "trending";
    };
    actionData?: {
      redirectTo: string;
    };
  }

  export type MetaFunction = ReactRouterMetaFunction;
}
