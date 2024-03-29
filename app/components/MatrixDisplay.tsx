interface MatrixDisplayProps {
  columnCount: number;
  lightCount: number;
  lightStripLength: number;
  lightStripsAmount: number;
  isSerpentine: string;
  lightStripColors: string[]; // Add this line
}

export const MatrixDisplay = ({
  columnCount,
  lightCount,
  lightStripLength,
  lightStripsAmount,
  isSerpentine,
  lightStripColors, // Add this line
}: MatrixDisplayProps) => (
  <div className="relative w-full h-full">
    <div
      className="grid gap-[1px]"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: lightCount }, (_, index) => {
        let adjustedIndex = index;
        const row = Math.floor(index / columnCount);
        const isRowEven = row % 2 === 0;

        switch (isSerpentine) {
          case "serpentine":
            if (!isRowEven) {
              const startOfRow = row * columnCount;
              const endOfRow = startOfRow + columnCount - 1;
              adjustedIndex = endOfRow - (index - startOfRow);
            }
            break;
          case "parallel":
            // In parallel mode, the adjustedIndex remains the same as the original index
            break;
          case "wrap":
            if (row % lightStripsAmount === 0 && row !== 0) {
              // When a new set of strips starts, wrap back to the start of the matrix
              adjustedIndex = index % (columnCount * lightStripsAmount);
            }
            break;
          default:
            // Handle any other unexpected cases
            break;
        }

        const stripIndex =
          Math.floor(adjustedIndex / lightStripLength) % lightStripsAmount;
        const bgColor = lightStripColors[stripIndex];

        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center aspect-square rounded-sm"
            style={{ backgroundColor: bgColor }}
          >
            <span className="text-opacity-50 text-[10px] text-black">
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
