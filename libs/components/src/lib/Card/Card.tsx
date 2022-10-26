import { IconType } from 'react-icons';

interface CardProps {
  Icon: IconType;
  title: string;
  subtitle: string;
}

const Card = (props: CardProps) => {
  const { Icon, title, subtitle } = props;
  return (
    <div className="px-6 py-6 flex items-center space-x-4 shadow bg-white rounded-lg border-[1px] border-gray-200">
      {Icon && <Icon className="w-10 h-10 text-blue-500" />}
      <div>
        <p className="font-poppins font-medium">{title}</p>
        <p className="font-poppins text-sm text-blue-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;
