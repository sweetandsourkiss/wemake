import type { MetaFunction as ReactRouterMetaFunction } from "react-router";

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
      categories: Category[];
    };
    actionData?: Record<string, unknown>;
  }

  export type MetaFunction = ReactRouterMetaFunction;
}
