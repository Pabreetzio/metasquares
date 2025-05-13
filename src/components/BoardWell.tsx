export function BoardWell({row, col, marble}: {row: number, col: number, marble?: string}) {
    const cx = 25 + col * 50;
    const cy = 25 + row * 50;
    let fill = "well-gradient";
    if (marble === "X") {
        fill = "red-marble";
    }
    else if (marble === "O") {  
        fill = "blue-marble";
    }
    return (
        <>
        <circle
          key={`${row}-${col}`}
          cx={cx}
          cy={cy}
          r="20"
          fill="url(#well-gradient)"
        />
        { marble &&  <circle
                key={`${row}-${col}-marble`}
                cx={cx}
                cy={cy}
                r="15"
                fill={`url(#${fill})`}
            /> }
           
        </>
      );
}