type StatsCardProps = {
  title: string;
  value: string;
  borderColor?: string;
  textColor?: string;
  icon: React.ReactNode;
};

const StatsCard = ({
  title,
  value,
  icon,
}: StatsCardProps) => {
  return (
    <div
      className={`text-center  relative bg-gradient-to-r from-violet-600 to-indigo-600  rounded-lg shadow-lg p-6 custom-border-card $ `}
    >
      <div className={`flex items-center justify-center mb-4`}>
        <div className={`text-4xl text-[#fff]`}>{icon}</div>
      </div>
      <h3 className={`text-2xl font-semibold  text-[#a8b3cf]`}>
        {title}
      </h3>
      <p className={`text-4xl font-bold text-[#fff] mt-2`}>{value}</p>
    </div>
  );
};

export default StatsCard;
