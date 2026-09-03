import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/layout";
import Controls from "./pages/controls/Controls";
import DraftPickOverlay from "./pages/overlays/draftpick/DraftPickOverlay";
import PostDraftOverlay from "./pages/overlays/postdraft/PostDraftOverlay";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Controls,
      },
      {
        path: "overlay",
        children: [
          {
            path: "draftpick",
            Component: DraftPickOverlay,
          },
          {
            path: "postdraft",
            Component: PostDraftOverlay,
          },
        ],
      },
    ],
  },
]);
