interface IProps {
  children: string;
  onClick: (() => void) | undefined;
}

const Button = ({ children, onClick }: IProps) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
