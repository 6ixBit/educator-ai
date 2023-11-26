import Skeleton from "@mui/material/Skeleton";

const SkeletonLoader = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <div className="flex flex-col gap-2 ">
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ bgcolor: "grey.900" }}
        width={width}
        height={height}
      />
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ bgcolor: "grey.900" }}
        width={width}
        height={height}
      />
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ bgcolor: "grey.900" }}
        width={width}
        height={height}
      />
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ bgcolor: "grey.900" }}
        width={width}
        height={height}
      />
    </div>
  );
};

export default SkeletonLoader;
