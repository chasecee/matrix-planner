interface MatrixDisplayProps {
  columnCount: number;
  lightCount: number;
  lightStripLength: number;
  lightStripsAmount: number;
  isSerpentine: string;
  lightStripColors: string[];
}

export const MatrixDisplay = ({
  columnCount,
  lightCount,
  lightStripLength,
  lightStripsAmount,
  isSerpentine,
  lightStripColors,
}: MatrixDisplayProps) => (
  <div className="relative w-full h-full">
    <div
      className="grid gap-[5px]"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: lightCount }, (_, index) => {
        let adjustedIndex = index;
        const row = Math.floor(index / columnCount);
        const isRowEven = row % 2 === 0;
        const positionInRow = index % columnCount;
        const isFirstInRow = positionInRow === 0;
        const isLastInRow = positionInRow === columnCount - 1;
        const totalRows = Math.ceil(lightCount / columnCount);
        const isLastRow = row === totalRows - 1;
        const isLastLight = adjustedIndex === lightCount - 1;
        const shouldShowConnector = !isLastLight;
        switch (isSerpentine) {
          case "serpentine":
            if (!isRowEven) {
              const startOfRow = row * columnCount;
              const endOfRow = startOfRow + columnCount - 1;
              adjustedIndex = endOfRow - (index - startOfRow);
            }
            break;
          default:
            // Handle any other unexpected cases
            break;
        }

        const stripIndex =
          Math.floor(adjustedIndex / lightStripLength) % lightStripsAmount;
        const bgColor = lightStripColors[stripIndex];

        const baseClass = "bg-current absolute z-[-1] transform-gpu top-1/2";

        return (
          <div
            key={`light-${adjustedIndex + 1}`}
            id={`light-${adjustedIndex + 1}`}
            className="flex flex-col items-center justify-center aspect-square rounded-md relative ani"
            style={{ backgroundColor: bgColor, color: bgColor }}
          >
            {isRowEven && !isLastInRow && shouldShowConnector && (
              <div
                className={`${baseClass} h-2 w-8 left-to-right top-1/2 left-full -translate-y-1/2 -translate-x-1/2`}
              ></div>
            )}
            {!isRowEven && !isFirstInRow && shouldShowConnector && (
              <div
                className={`${baseClass} h-2 w-8 right-to-left top-1/2 right-full -translate-y-1/2 translate-x-1/2`}
              ></div>
            )}
            {isRowEven && isLastInRow && shouldShowConnector && (
              <div
                className={`${baseClass} h-8 w-2 top-to-bottom top-full left-1/2 -translate-x-1/2`}
              ></div>
            )}
            {!isRowEven && isFirstInRow && shouldShowConnector && (
              <div
                className={`${baseClass} h-8 w-2 top-to-bottom top-full left-1/2 -translate-x-1/2`}
              ></div>
            )}

            <span className=" text-[11px] text-black/50 font-extraboldbold">
              {adjustedIndex + 1}
            </span>
          </div>
        );
      })}
    </div>
    <div
      className=" relative z-10 hidden"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: 40 }, (_, index) => {
        index += 1; // Offset index to start at 1
        const bgColor = "bg-yellow-100/0";

        return (
          <div
            key={index}
            className={`flex flex-col items-center justify-center border aspect-[3/2] border-red-500 ${bgColor}`}
            style={{ gridColumn: "span 3", gridRow: "span 2" }}
          >
            <span className="text-opacity-100 text-[16px] text-red-500">
              {index}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
