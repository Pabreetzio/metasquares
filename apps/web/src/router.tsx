import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexProvider } from "convex/react";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL;

  let convexQueryClient: ConvexQueryClient | undefined;
  let queryClient: QueryClient;

  if (CONVEX_URL) {
    convexQueryClient = new ConvexQueryClient(CONVEX_URL);
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          queryKeyHashFn: convexQueryClient.hashFn(),
          queryFn: convexQueryClient.queryFn(),
        },
      },
    });
    convexQueryClient.connect(queryClient);
  } else {
    console.warn("VITE_CONVEX_URL not set - Convex features will be disabled");
    queryClient = new QueryClient();
  }

  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultPreload: "intent",
      context: { queryClient },
      Wrap: ({ children }) => {
        if (convexQueryClient) {
          return (
            <ConvexProvider client={convexQueryClient.convexClient}>
              {children}
            </ConvexProvider>
          );
        }
        return <>{children}</>;
      },
    }),
    queryClient,
  );

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}