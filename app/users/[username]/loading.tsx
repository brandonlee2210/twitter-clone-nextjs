import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <SkeletonTheme highlightColor="#e5e5e5" height={150}>
      <p>
        <Skeleton count={2} />
      </p>
    </SkeletonTheme>
  );
}
