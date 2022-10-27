import { IconType } from 'react-icons';

interface AlertProps {
  content: string;
  type: 'success' | 'error' | 'warning';
  className?: string;
  Icon?: IconType;
}

const Alert = (props: AlertProps) => {
  const { content, type, className, Icon } = props;
  const baseStyle = `border-l-4 px-3 py-3 font-poppins ${className}`;
  const styles = {
    success: 'bg-green-100 border-l-4 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  };
  return (
    <div className={baseStyle + styles[type]}>
      {Icon && <Icon className="mr-3 text-white" />}
      {content}
    </div>
  );
};

export default Alert;
