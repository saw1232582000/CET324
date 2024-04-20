import clsx from "clsx";

const PasswordStrengthBar = ({ score }: { score: number }) => {
  const strengthLevel = ["Weak", "Moderate", "Strong", "Strong", "Very Strong"];
  return (
    <div className="flex w-full flex-col">
      {score > 0 && (
        <span className="flex w-full justify-end text-green-400 text-[14px]">{strengthLevel[score - 1]}</span>
      )}
      <div className="flex w-full gap-x-1">
        <div
          className={clsx("h-[8px] w-full rounded-[5px] border-2", {
            "border-green-500 bg-green-500": score >= 1,
          })}
        ></div>
        <div
          className={clsx("h-[8px] w-full rounded-[5px] border-2", {
            "border-green-500 bg-green-500": score >= 2,
          })}
        ></div>
        <div
          className={clsx("h-[8px] w-full rounded-[5px] border-2", {
            "border-green-500 bg-green-500": score >= 3,
          })}
        ></div>
        <div
          className={clsx("h-[8px] w-full rounded-[5px] border-2", {
            "border-green-500 bg-green-500": score >= 4,
          })}
        ></div>
        <div
          className={clsx("h-[8px] w-full rounded-[5px] border-2", {
            "border-green-500 bg-green-500": score >= 5,
          })}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
