
interface Props {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  onClick?: () => void;
}

export const Wrapper = ({ children, className, onClick }:Props) => {
  return (
    <div
      onClick={onClick}
      className={`${
        className || ""
      } border-2 md:border-4 border-black p-1 md:p-4 rounded-lg`}
    >
      {children}
    </div>
  );
};

